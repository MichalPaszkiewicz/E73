import { IAmASensationHandler } from "../framework/interfaces/iamasensationhandler";
import { IAmASensation } from "../framework/interfaces/iamasensation";
import { IAmADomainService } from "../framework/interfaces/iamadomainservice";
import { IAmARobotEvent } from "../framework/interfaces/iamarobotevent";

export class LogSensationHandler implements IAmASensationHandler {
    handles: string[] = ["*"];
    handle(trigger: IAmASensation, domainService: IAmADomainService): IAmARobotEvent[] {
        console.log(trigger);
        return [];
    }
}