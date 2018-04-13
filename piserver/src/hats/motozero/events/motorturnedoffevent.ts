import { IAmARobotEvent } from "../../../framework/interfaces/iamarobotevent";

export var MOTOR_TURNED_OFF_EVENT_NAME = "MotorTurnedOff";

export class MotorTurnedOffEvent implements IAmARobotEvent {
    name: string = MOTOR_TURNED_OFF_EVENT_NAME;
    
    constructor(public motorId: string){
        
    }
}