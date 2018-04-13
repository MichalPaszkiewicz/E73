import {IAmACommand} from "../framework/interfaces/iamacommand";

export var TRIM_RIGHT_COMMAND_NAME = "TrimRight";

export class TrimRightCommand implements IAmACommand{
    name: string = TRIM_RIGHT_COMMAND_NAME;
}