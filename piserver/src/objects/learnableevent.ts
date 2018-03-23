import {IAmACommand} from "../interfaces/iamacommand";

export class LearnableEvent{
    constructor(public command: IAmACommand, public waitTime: number){

    }
} 