import { IAmASensation } from "../../../framework/interfaces/iamasensation";

export var LINE_LOST_SENSATION_NAME = "LineLost";

export class LineLostSensation implements IAmASensation {
    name: string = LINE_LOST_SENSATION_NAME;

    constructor(public lineSensorId: number, public totalLineSensors: number){
        
    }
}