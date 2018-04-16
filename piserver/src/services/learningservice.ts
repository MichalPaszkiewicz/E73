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
import { IAmACommandHandler } from "../framework/interfaces/iamacommandhandler";
import { IAmADomainService } from "../framework/interfaces/iamadomainservice";
import { IAmARobotEventHandler } from "../framework/interfaces/iamaroboteventhandler";

type SequenceFunc = (sequence: LearnableSequence) => void;

class LearningServiceCommandHandler implements IAmACommandHandler {
    handles: string[] = [
        START_LEARNING_COMMAND_NAME,
        END_LEARNING_COMMAND_NAME,
        RUN_LEARNT_SEQUENCE_COMMAND_NAME
    ];
    private _onHandle: (command: IAmACommand) => void;
    registerOnHandle(callback: (command: IAmACommand) => void){
        this._onHandle = (c: IAmACommand) => callback(c);
    }
    handle(trigger: IAmACommand, domainService: IAmADomainService): IAmARobotEvent[] {
        if(this._onHandle){
            this._onHandle(trigger);
        }
        return [];
    }
}

class LearningServiceEventHandler implements IAmARobotEventHandler {
    handles: string[] = ["*"];
    private _onHandle: (robotEvent: IAmARobotEvent) => void;
    registerOnHandle(callback: (robotEvent: IAmARobotEvent) => void){
        this._onHandle = (c: IAmACommand) => callback(c);
    }
    handle(robotEvent: IAmARobotEvent) {
        if(this._onHandle){
            this._onHandle(robotEvent);
        }
    }
}

export class LearningService{

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
    
    sequences: LearnableSequence[] = [];
    private _onSequenceAddedFuncs: SequenceFunc[] = [];
    applyEvent: (robotEvent: IAmARobotEvent) => void;

    attachToControlModule(controlModule: IAmAControlModule){
        var self = this;
        self.applyEvent = (e) => controlModule.signal(e);
        var ch = new LearningServiceCommandHandler();
        ch.registerOnHandle((c) => {self.handle(c)});
        controlModule.registerCommandHandler(ch);
        var eh = new LearningServiceEventHandler();
        eh.registerOnHandle((e) => self.learn(e));
        controlModule.registerRobotEventHandler(eh);
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
        if(!this.currentLearningSequence){
            return;
        }
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
        
        self.applyEvent(self.currentSequence.events[self.currentSequenceStep].robotEvent);
        self.currentSequenceStep++;

        if (self.currentSequenceStep > self.currentSequence.events.length - 1) {
            this.currentSequence = null;
            this.currentSequenceStep = 0;
            return;
        }

        setTimeout(() => self._runStep(), self.currentSequence.events[self.currentSequenceStep - 1].waitTime);
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