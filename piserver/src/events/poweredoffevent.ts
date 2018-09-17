import { IAmARobotEvent } from "../framework/interfaces/iamarobotevent";

export var POWERED_OFF_EVENT_NAME = "PoweredOff";

export class PoweredOffEvent implements IAmARobotEvent{
    name: string = POWERED_OFF_EVENT_NAME;
}