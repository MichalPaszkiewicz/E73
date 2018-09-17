import { IAmARobotEvent } from "../framework/interfaces/iamarobotevent";

export var RESTARTED_EVENT_NAME = "Restarted";

export class RestartedEvent implements IAmARobotEvent{
    name: string = RESTARTED_EVENT_NAME;
}