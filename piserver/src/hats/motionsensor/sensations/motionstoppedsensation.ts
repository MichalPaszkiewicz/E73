import { IAmASensation } from "../../../framework/interfaces/iamasensation";

export var MOTION_STOPPED_SENSATION_NAME = "MotionStopped";

export class MotionStoppedSensation implements IAmASensation{
    name: string = MOTION_STOPPED_SENSATION_NAME;
}