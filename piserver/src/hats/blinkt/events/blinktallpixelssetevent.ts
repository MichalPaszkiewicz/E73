import { IAmARobotEvent } from "../../framework/interfaces/iamarobotevent";

export var BLINKT_ALL_PIXELS_SET_EVENT_NAME = "BlinktAllPixelsSet";

export class BlinktAllPixelsSetEvent implements IAmARobotEvent {
    name: string = BLINKT_ALL_PIXELS_SET_EVENT_NAME;

    constructor(
        public red: number, 
        public green: number, 
        public blue: number, 
        public brightness: number){

    }
}