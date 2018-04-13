import { IAmACommand } from "../framework/interfaces/iamacommand";

export var SET_FULL_STATE_COMMAND_NAME = "SetFullState";

export class SetFullStateCommand implements IAmACommand {
    name: string = SET_FULL_STATE_COMMAND_NAME;

    constructor(public forwardOn: boolean,
        public backwardOn: boolean,
        public leftOn: boolean,
        public rightOn: boolean,
        public speed: number,
        public speedDifference: number){
            
        }
}