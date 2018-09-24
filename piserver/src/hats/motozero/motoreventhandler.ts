import { IAmARobotEventHandler } from "../../framework/interfaces/iamaroboteventhandler";
import { IAmARobotEvent } from "../../framework/interfaces/iamarobotevent";
import { MOTOR_TURNED_OFF_EVENT_NAME, MotorTurnedOffEvent } from "./events/motorturnedoffevent";
import { MOTOR_SPEED_SET_EVENT_NAME, MotorSpeedSetEvent } from "./events/motorspeedsetevent";
import { TURNED_OFF_EVENT_NAME, TurnedOffEvent } from "../../framework/events/turnedoffevent";
import { Motor } from "./motor";
import { IAmAPin } from "../../framework/interfaces/iamapin";
import { PINS_CLEARED_EVENT_NAME } from "../../events/pinsclearedevent";

export class MotorEventHandler<T extends IAmAPin> implements IAmARobotEventHandler {
    handles: string[] = [
        TURNED_OFF_EVENT_NAME,
        MOTOR_TURNED_OFF_EVENT_NAME,
        MOTOR_SPEED_SET_EVENT_NAME,
        PINS_CLEARED_EVENT_NAME
    ];

    constructor(public motors: Motor<T>[]){

    }

    handle(robotEvent: TurnedOffEvent |
                MotorTurnedOffEvent |
                MotorSpeedSetEvent) {
        var self = this;
        switch(robotEvent.name){
            case TURNED_OFF_EVENT_NAME:
                self.motors.forEach(m => m.off());
                break;
            case MOTOR_TURNED_OFF_EVENT_NAME:
                var turnedOff = <MotorTurnedOffEvent>robotEvent;
                self.motors
                    .filter(m => m.id == turnedOff.motorId)
                    .forEach(m => m.off());
                break;
            case MOTOR_SPEED_SET_EVENT_NAME:
                var speedSet = <MotorSpeedSetEvent>robotEvent;
                self.motors
                    .filter(m => m.id == speedSet.motorId)
                    .forEach(m => m.setSpeed(speedSet.speed));
                break;
            case PINS_CLEARED_EVENT_NAME:
                self.motors.forEach(motor => {
                    motor.clear();
                });
                break;
            default:
                break;
        }
    }
}