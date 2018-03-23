import {IAmACommand} from "../interfaces/iamacommand";

export var DIRECTION_KEY_COMMAND_NAME = "DirectionKey";

export class DirectionKeyCommand implements IAmACommand{
    name: string = DIRECTION_KEY_COMMAND_NAME;
    
    constructor(public requestUrl: string){
        
    }
}