import {IAmACommand} from "../framework/interfaces/iamacommand";

export var DIRECTION_KEY_COMMAND_NAME = "DirectionKey";

export enum DirectionKeyDirection{
    UP = "up",
    DOWN = "down",
    LEFT = "left",
    RIGHT = "right"
}

export class DirectionKeyCommand implements IAmACommand{
    name: string = DIRECTION_KEY_COMMAND_NAME;
    
    constructor(public direction: DirectionKeyDirection, public isKeyDown: boolean){
        
    }
}