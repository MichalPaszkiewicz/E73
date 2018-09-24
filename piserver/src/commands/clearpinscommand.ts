import { IAmACommand } from "../framework/interfaces/iamacommand";

export var CLEAR_PINS_COMMAND_NAME = "ClearPins";

export class ClearPinsCommand implements IAmACommand{
    name: string = CLEAR_PINS_COMMAND_NAME;
}