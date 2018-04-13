import {IAmATrigger} from "./iamatrigger";
import {IAmADomainService} from "./iamadomainservice";
import { IAmARobotEvent } from "./iamarobotevent";

export interface IAmATriggerHandler<T extends IAmATrigger>{

    handles: string[];

    handle(trigger: T, domainService: IAmADomainService): IAmARobotEvent[]; 

}