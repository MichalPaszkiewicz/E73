import {IAmARobotEvent} from "./iamarobotevent";

export interface IAmARobotEventHandler{
    handles: string[];

    handle(robotEvent: IAmARobotEvent);
}