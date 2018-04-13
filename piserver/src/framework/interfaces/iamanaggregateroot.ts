import {IAmASensation} from "./iamasensation";
import {IAmACommand} from "./iamacommand";
import {IAmARobotEvent} from "./iamarobotevent";

export interface IAmAnAggregateRoot{
    id?: string;

    handle(command: IAmACommand): IAmARobotEvent[];
    
    sense(sensation: IAmASensation): IAmARobotEvent[];

    apply(robotEvent: IAmARobotEvent);
}