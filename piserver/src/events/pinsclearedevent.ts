import { IAmARobotEvent } from "../framework/interfaces/iamarobotevent";

export var PINS_CLEARED_EVENT_NAME = "PinsCleared";

export class PinsClearedEvent implements IAmARobotEvent{
    name: string = PINS_CLEARED_EVENT_NAME;
}