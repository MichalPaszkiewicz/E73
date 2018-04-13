import {IAmASensationHandler} from "../framework/interfaces/iamasensationhandler";
import {LineTrackSensation, LINE_TRACK_SENSATION_NAME} from "../sensations/linetracksensation";

export class LineTrackSensationHandler implements IAmASensationHandler {
    handles = [LINE_TRACK_SENSATION_NAME];

    constructor(){
        
    }

    handle(sensation: LineTrackSensation): void {
        throw new Error("Method not implemented.");
    }
}