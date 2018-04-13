import { IAmARobotEventHandler } from "../framework/interfaces/iamaroboteventhandler";
import { IAmARobotEvent } from "../framework/interfaces/iamarobotevent";

export class LogEventHandler implements IAmARobotEventHandler{
    handles = ["*"];

    handle(robotEvent: IAmARobotEvent){
        console.log(robotEvent);
    }
}