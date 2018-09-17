import { IAmARobotEventHandler } from "../framework/interfaces/iamaroboteventhandler";
import { IAmARobotEvent } from "../framework/interfaces/iamarobotevent";
import { POWERED_OFF_EVENT_NAME } from "../../sim/events/poweredoffevent";
import { RESTARTED_EVENT_NAME } from "../../sim/events/restartedevent";
import {exec} from "child_process";

export class PowerEventHandler implements IAmARobotEventHandler{
    handles = [
        POWERED_OFF_EVENT_NAME,
        RESTARTED_EVENT_NAME   
    ];

    handle(robotEvent: IAmARobotEvent){
        switch(robotEvent.name){
            case POWERED_OFF_EVENT_NAME:
                exec("sudo /sbin/shutdown --poweroff");
                return;
            case RESTARTED_EVENT_NAME:
                exec("sudo /sbin/reboot");
                return;
            default:
                return;
        }
    }
}