import {IAmARobotEvent} from "../framework/interfaces/iamarobotevent";

export class LearnableEvent{
    constructor(public robotEvent: IAmARobotEvent, public waitTime: number){

    }
} 