import { IAmARobotEvent } from "../../framework/interfaces/iamarobotevent";

export var BLINKT_PIXEL_SET_EVENT_NAME = "BlinktPixelSet";

export class BlinktPixelSetEvent implements IAmARobotEvent {
    name: string = BLINKT_PIXEL_SET_EVENT_NAME;

    constructor(
        public pixelNum: number,
        public red: number,
        public green: number,
        public blue: number,
        public brightness: number
    ){

    }
}