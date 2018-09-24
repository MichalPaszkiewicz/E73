import { IAmARobotEventHandler } from "../framework/interfaces/iamaroboteventhandler";
import { IAmASensor } from "../framework/interfaces/iamasensor";
import { PinsClearedEvent, PINS_CLEARED_EVENT_NAME } from "../events/pinsclearedevent";

export class SensorPinsClearedEventHandler implements IAmARobotEventHandler{
    handles: string[] = [PINS_CLEARED_EVENT_NAME];
    private _sensor: IAmASensor;
    handle(robotEvent: PinsClearedEvent) {
        this._sensor.clear();
    }
    constructor(sensor: IAmASensor){
        this._sensor = sensor;
    }
}