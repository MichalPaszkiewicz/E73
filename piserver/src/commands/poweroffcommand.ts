import { IAmACommand } from "../framework/interfaces/iamacommand";

export var POWER_OFF_COMMAND_NAME = "PowerOff";

export class PowerOffCommand implements IAmACommand{
    name: string = POWER_OFF_COMMAND_NAME;
}