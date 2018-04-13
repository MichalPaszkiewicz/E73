import { IAmASensation } from "../../../framework/interfaces/iamasensation";

export var MOTION_DETECTED_SENSATION_NAME = "MotionDetectedSensation";

export class MotionDetectedSensation implements IAmASensation {
    name: string = MOTION_DETECTED_SENSATION_NAME;
}