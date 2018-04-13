import { IAmACommand } from "../framework/interfaces/iamacommand";

export var END_LEARNING_COMMAND_NAME = "EndLearning";

export class EndLearningCommand implements IAmACommand {
    name: string = END_LEARNING_COMMAND_NAME;
}