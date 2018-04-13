import { IAmACommand } from "../framework/interfaces/iamacommand";

export var RUN_LEARNT_SEQUENCE_COMMAND_NAME = "RunLearntSequence";

export class RunLearntSequenceCommand implements IAmACommand{
    name: string = RUN_LEARNT_SEQUENCE_COMMAND_NAME;

    constructor(public sequenceName: string){
        
    }
}