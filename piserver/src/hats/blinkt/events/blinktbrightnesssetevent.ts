import { IAmARobotEvent } from "../../../framework/interfaces/iamarobotevent";

export var BLINKT_BRIGHTNESS_SET_EVENT_NAME = "BlinktBrightnessSet";

export class BlinktBrightnessSetEvent implements IAmARobotEvent {
    name: string = BLINKT_BRIGHTNESS_SET_EVENT_NAME;

    constructor(
        public pixelNum: number,
        public brightness: number
    ){}
}