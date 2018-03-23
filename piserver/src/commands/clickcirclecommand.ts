import {IAmACommand} from "../interfaces/iamacommand";

export var CLICK_CIRCLE_COMMAND_NAME = "ClickCircle";

export class ClickCircleCommand implements IAmACommand{
    name: string = CLICK_CIRCLE_COMMAND_NAME;

    constructor(public x: number, public y: number){
    }
}