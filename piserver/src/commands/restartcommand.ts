import { IAmACommand } from "../framework/interfaces/iamacommand";

export var RESTART_COMMAND_NAME = "Restart";

export class RestartCommand implements IAmACommand{
    name: string = RESTART_COMMAND_NAME;
}