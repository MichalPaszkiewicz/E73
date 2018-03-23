import {IAmACommand} from "../interfaces/iamacommand";

export var TRIM_LEFT_COMMAND_NAME = "TrimLeft";

export class TrimLeftCommand implements IAmACommand{
    name: string = TRIM_LEFT_COMMAND_NAME;
}