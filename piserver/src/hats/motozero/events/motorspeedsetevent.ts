import { IAmARobotEvent } from "../../../framework/interfaces/iamarobotevent";

export var MOTOR_SPEED_SET_EVENT_NAME = "MotorSpeedSet";

export class MotorSpeedSetEvent implements IAmARobotEvent {
    name: string = MOTOR_SPEED_SET_EVENT_NAME;

    constructor(public motorId: string, public speed: number){
        
    }
}