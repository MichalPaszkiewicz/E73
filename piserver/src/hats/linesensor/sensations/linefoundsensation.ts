import { IAmASensation } from "../../../framework/interfaces/iamasensation";

export var LINE_FOUND_SENSATION_NAME = "LineFound";

export class LineFoundSensation implements IAmASensation {
    name: string = LINE_FOUND_SENSATION_NAME;

    constructor(public lineSensorId: string){

    }
}