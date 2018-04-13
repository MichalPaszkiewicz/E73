import {IAmASensation} from "../interfaces/iamasensation";

export var LINE_TRACK_SENSATION_NAME = "Line Track Sensation";

export class LineTrackSensation implements IAmASensation {
    name: string = LINE_TRACK_SENSATION_NAME;

    constructor(public value: boolean){

    }
}