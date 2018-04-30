import { IAmACommandHandler } from "../framework/interfaces/iamacommandhandler";
import { IAmACommand } from "../framework/interfaces/iamacommand";
import { IAmADomainService } from "../framework/interfaces/iamadomainservice";
import { IAmARobotEvent } from "../framework/interfaces/iamarobotevent";

export class LogCommandHandler implements IAmACommandHandler {
    handles: string[] = ["*"]
    handle(trigger: IAmACommand, domainService: IAmADomainService): IAmARobotEvent[] {
        console.log(trigger);
        return [];
    }
}