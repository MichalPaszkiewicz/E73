import { IAmACommandHandler } from "../framework/interfaces/iamacommandhandler";
import { IAmACommand } from "../framework/interfaces/iamacommand";
import { IAmADomainService } from "../framework/interfaces/iamadomainservice";
import { IAmARobotEvent } from "../framework/interfaces/iamarobotevent";
import { CLEAR_PINS_COMMAND_NAME, ClearPinsCommand } from "../commands/clearpinscommand";
import { PinsClearedEvent } from "../events/pinsclearedevent";

export class ClearPinsCommandHandler implements IAmACommandHandler{
    handles: string[] = [
        CLEAR_PINS_COMMAND_NAME
    ]
    
    handle(trigger: ClearPinsCommand, domainService: IAmADomainService): IAmARobotEvent[] {
        return [new PinsClearedEvent()];
    }
}