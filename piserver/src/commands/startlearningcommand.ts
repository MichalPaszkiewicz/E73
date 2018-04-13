import { IAmACommand } from "../framework/interfaces/iamacommand";

export var START_LEARNING_COMMAND_NAME = "StartLearning";

export class StartLearningCommand implements IAmACommand {
    name: string = START_LEARNING_COMMAND_NAME;

    constructor(public sequenceName: string){
        
    }
}