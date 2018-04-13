import { IAmACommand } from "../framework/interfaces/iamacommand";
import { LearnableEvent } from "../objects/learnableevent";
import { LearnableSequence } from "../objects/learnablesequence";
import { IAmAControlModule } from "../framework/interfaces/iamacontrolmodule";
import { IAmARobotEvent } from "../framework/interfaces/iamarobotevent";
import { IAmAnAggregateRoot } from "../framework/interfaces/iamanaggregateroot";
import { IAmASensation } from "../framework/interfaces/iamasensation";
import { START_LEARNING_COMMAND_NAME, StartLearningCommand } from "../commands/startlearningcommand";
import { END_LEARNING_COMMAND_NAME, EndLearningCommand } from "../commands/endlearningcommand";
import { RUN_LEARNT_SEQUENCE_COMMAND_NAME, RunLearntSequenceCommand } from "../commands/runlearntsequencecommand";

type SequenceFunc = (sequence: LearnableSequence) => void;

export class LearningService implements IAmAnAggregateRoot{

    id?: string;
    handle(command: IAmACommand): IAmARobotEvent[] {
        var self = this;
        var robotEvents = []
        switch(command.name){
            case START_LEARNING_COMMAND_NAME:
                var startLearning = <StartLearningCommand>command;
                self.startLearning(startLearning.sequenceName);
                break;
            case END_LEARNING_COMMAND_NAME:
                var endLearning = <EndLearningCommand>command;
                self.endLearning();
                break;
            case RUN_LEARNT_SEQUENCE_COMMAND_NAME:
                var runSequence = <RunLearntSequenceCommand>command;
                self.run(runSequence.sequenceName);
                break;
            default:
                break;
        }
        return robotEvents;
    }
    sense(sensation: IAmASensation): IAmARobotEvent[] {
        throw new Error("Method not implemented.");
    }
    apply(robotEvent: IAmARobotEvent) {
        this.learn(robotEvent);
    }
    sequences: LearnableSequence[] = [];
    private _onSequenceAddedFuncs: SequenceFunc[] = [];
    applyEvent: (robotEvent: IAmARobotEvent) => void;

    attachToControlModule(controlModule: IAmAControlModule){
        var self = this;
        self.applyEvent = (e) => controlModule.signal(e);
        // is this a good idea, or make this a command handler?
    }

    getSequenceNames(): string[] {
        return this.sequences.map(s => s.name);
    }

    private _learningModeOn: boolean = false;

    currentSequence: LearnableSequence;
    currentSequenceStep: number = 0;

    currentLearningSequence: LearnableSequence;
    currentLearningSequenceTriggerTime: number = 0;

    startLearning(sequenceName: string) {
        this._learningModeOn = true;
        this.currentLearningSequence = new LearnableSequence(sequenceName, []);
        this.currentLearningSequenceTriggerTime = (new Date()).getTime();
    }

    endLearning() {
        var currentTime = (new Date()).getTime();
        if (this.currentLearningSequence.events.length > 0) {
            this.currentLearningSequence.events[this.currentLearningSequence.events.length - 1].waitTime = currentTime - this.currentLearningSequenceTriggerTime;
        }
        this.sequences.push(this.currentLearningSequence);
        this.currentLearningSequence = null;
        this.currentLearningSequenceTriggerTime = 0;
        this._learningModeOn = false;
    }

    registerOnSequenceAdded(func: (sequence: LearnableSequence) => void) {
        this._onSequenceAddedFuncs.push(func);
    }

    clearOnSequenceAddedFuncs() {
        this._onSequenceAddedFuncs = [];
    }

    learn(robotEvent: IAmARobotEvent) {
        if (!this._learningModeOn) {
            return;
        }
        var currentTime = (new Date()).getTime();
        if (this.currentLearningSequence.events.length > 0) {
            this.currentLearningSequence.events[this.currentLearningSequence.events.length - 1].waitTime = currentTime - this.currentLearningSequenceTriggerTime;
        }
        this.currentLearningSequence.events.push(new LearnableEvent(robotEvent, 0));
        this.currentLearningSequenceTriggerTime = currentTime;
    }

    private _runStep() {
        var self = this;

        if (self.currentSequenceStep >= self.currentSequence.events.length - 1) {
            this.currentSequence = null;
            this.currentSequenceStep = 0;
            return;
        }
        self.applyEvent(self.currentSequence.events[self.currentSequenceStep].robotEvent);
        self.currentSequenceStep++;
        setTimeout(() => self._runStep(), self.currentSequence.events[self.currentSequenceStep].waitTime);
    }

    run(sequence: string | LearnableSequence) {
        if (typeof sequence == "string") {
            var sequencesOfName = this.sequences.filter(s => s.name == sequence);
            if (sequencesOfName.length == 0) {
                throw new Error("no sequence of name: " + sequence);
            }
            this.currentSequence = sequencesOfName[0];
        }
        else {
            this.currentSequence = sequence;
        }
        this.currentSequenceStep = 0;
        this._runStep();
    }

}