import { IAmACommand } from "../framework/interfaces/iamacommand";

export var TURN_ON_AUTOMATIC_CONTROL_COMMAND_NAME = "TurnOnAutomaticControl";

export class TurnOnAutomaticControlCommand implements IAmACommand{
    name: string = TURN_ON_AUTOMATIC_CONTROL_COMMAND_NAME;
}