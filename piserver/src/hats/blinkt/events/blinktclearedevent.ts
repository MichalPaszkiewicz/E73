import { IAmARobotEvent } from "../../framework/interfaces/iamarobotevent";

export var BLINKT_CLEARED_EVENT_NAME = "BlinktClearedEvent";

export class BlinktClearedEvent implements IAmARobotEvent {
    name: string = BLINKT_CLEARED_EVENT_NAME;
}