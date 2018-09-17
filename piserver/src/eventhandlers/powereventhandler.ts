import { IAmARobotEventHandler } from "../framework/interfaces/iamaroboteventhandler";
import { IAmARobotEvent } from "../framework/interfaces/iamarobotevent";
import {exec} from "child_process";
import { POWERED_OFF_EVENT_NAME } from "../events/poweredoffevent";
import { RESTARTED_EVENT_NAME } from "../events/restartedevent";

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