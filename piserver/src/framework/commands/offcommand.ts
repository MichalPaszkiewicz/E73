import { IAmACommand } from "../interfaces/iamacommand";

export var OFF_COMMAND_NAME = "OffCOmmand";

export class OffCommand implements IAmACommand {
    name: string = OFF_COMMAND_NAME;
}