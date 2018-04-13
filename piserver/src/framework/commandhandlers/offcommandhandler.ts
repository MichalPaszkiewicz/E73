import { IAmACommandHandler } from "../interfaces/iamacommandhandler";
import { OFF_COMMAND_NAME, OffCommand } from "../commands/offcommand";
import { IAmACommand } from "../interfaces/iamacommand";
import { IAmADomainService } from "../interfaces/iamadomainservice";
import { SwitchAggregateRoot } from "../aggregateroots/switchaggregateroot";

export class OffCommandHandler implements IAmACommandHandler {
    handles: string[] = [OFF_COMMAND_NAME]
    handle(offCommand: OffCommand, domainService: IAmADomainService): void {
        domainService.getAggregateRoot(SwitchAggregateRoot, (ar) => {
            ar.handle(offCommand);
        });
    }
}