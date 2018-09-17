import { IAmACommandHandler } from "../framework/interfaces/iamacommandhandler";
import { IAmACommand } from "../framework/interfaces/iamacommand";
import { IAmADomainService } from "../framework/interfaces/iamadomainservice";
import { IAmARobotEvent } from "../framework/interfaces/iamarobotevent";
import { POWER_OFF_COMMAND_NAME } from "../commands/poweroffcommand";
import { RESTART_COMMAND_NAME } from "../commands/restartcommand";
import { PoweredOffEvent } from "../events/poweredoffevent";
import { RestartedEvent } from "../events/restartedevent";

export class PowerCommandHandler implements IAmACommandHandler{
    handles: string[] = [
        POWER_OFF_COMMAND_NAME,
        RESTART_COMMAND_NAME
    ]
    
    handle(trigger: IAmACommand, domainService: IAmADomainService): IAmARobotEvent[] {
        switch(trigger.name){
            case POWER_OFF_COMMAND_NAME:
                return [new PoweredOffEvent()];
            case RESTART_COMMAND_NAME:
                return [new RestartedEvent()];
            default:
                return [];
        }
    }
}