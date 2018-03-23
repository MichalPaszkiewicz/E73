import {LearnableEvent} from "../objects/learnableevent";
import {LearnableSequence} from "../objects/learnablesequence";

export class LearningService{

    sequences: LearnableSequence[] = [];

    getSequenceNames(): string[]{
        return this.sequences.map(s => s.name);
    }

    private _learningModeOn: boolean = false;

    currentSequence: LearnableSequence;
    currentSequenceStep: number = 0;

    currentLearningSequence: LearnableSequence;
    currentLearningSequenceTriggerTime: number = 0;

    constructor(){

    }

    startLearning(sequenceName: string){
        this._learningModeOn = true;
        this.currentLearningSequence = new LearnableSequence(sequenceName, []);
        this.currentLearningSequenceTriggerTime = (new Date()).getTime();
    }

    endLearning(){
        var currentTime = (new Date()).getTime();
        if(this.currentLearningSequence.events.length > 0){
            this.currentLearningSequence.events[this.currentLearningSequence.events.length - 1].waitTime = currentTime - this.currentLearningSequenceTriggerTime;
        }
        this.sequences.push(this.currentLearningSequence);
        this.currentLearningSequence = null;
        this.currentLearningSequenceTriggerTime = 0;
        this._learningModeOn = false;
    }

    learn(action: () => void){
        action();
        if(!this._learningModeOn){
            return;
        }
        var currentTime = (new Date()).getTime();
        if(this.currentLearningSequence.events.length > 0){
            this.currentLearningSequence.events[this.currentLearningSequence.events.length - 1].waitTime = currentTime - this.currentLearningSequenceTriggerTime;
        }
        this.currentLearningSequence.events.push(new LearnableEvent(action, 0));        
        this.currentLearningSequenceTriggerTime = currentTime;
    }

    _runStep(){
        var self = this;
        self.currentSequence.events[self.currentSequenceStep].action();
        if(self.currentSequenceStep >= self.currentSequence.events.length - 1){
            this.currentSequence = null;
            this.currentSequenceStep = 0;
            return;
        }
        self.currentSequenceStep++;
        setTimeout(() => self._runStep(), self.currentSequence.events[self.currentSequenceStep].waitTime);
    }

    run(sequence: string | LearnableSequence){
        if(typeof sequence == "string"){
            var sequencesOfName = this.sequences.filter(s => s.name == sequence);
            if(sequencesOfName.length == 0){
                throw new Error("no sequence of name: " + sequence);
            }
            this.currentSequence = sequencesOfName[0];
        }
        else{
            this.currentSequence = sequence;
        }
        this._runStep();
    }

}