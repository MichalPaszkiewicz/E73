import { IAmACommandHandler } from "../interfaces/iamacommandhandler";
import { OFF_COMMAND_NAME, OffCommand } from "../commands/offcommand";
import { IAmADomainService } from "../interfaces/iamadomainservice";
import { SwitchAggregateRoot } from "../aggregateroots/switchaggregateroot";
import { IAmARobotEvent } from "../interfaces/iamarobotevent";

export class OffCommandHandler implements IAmACommandHandler {
    handles: string[] = [OFF_COMMAND_NAME]
    handle(offCommand: OffCommand, domainService: IAmADomainService): IAmARobotEvent[] {
        domainService.getAggregateRoot(SwitchAggregateRoot, (ar) => {
            ar.handle(offCommand);
        });
        return [];
    }
}