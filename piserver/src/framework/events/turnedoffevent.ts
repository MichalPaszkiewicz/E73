import { IAmARobotEvent } from "../interfaces/iamarobotevent";

export var TURNED_OFF_EVENT_NAME = "TurnedOffEvent";

export class TurnedOffEvent implements IAmARobotEvent {
    name: string = TURNED_OFF_EVENT_NAME;
}