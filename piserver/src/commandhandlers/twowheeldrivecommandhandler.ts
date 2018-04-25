import { IAmACommandHandler } from "../framework/interfaces/iamacommandhandler";
import { IAmACommand } from "../framework/interfaces/iamacommand";
import { IAmADomainService } from "../framework/interfaces/iamadomainservice";
import { DIRECTION_KEY_COMMAND_NAME, DirectionKeyCommand } from "../commands/directionkeycommand";
import { TRIM_LEFT_COMMAND_NAME, TrimLeftCommand } from "../commands/trimleftcommand";
import { TRIM_RIGHT_COMMAND_NAME, TrimRightCommand } from "../commands/trimrightcommand";
import { TwoWheelDrive } from "../aggregateroots/twowheeldrive";
import { IAmARobotEvent } from "../framework/interfaces/iamarobotevent";
import { SET_FULL_STATE_COMMAND_NAME, SetFullStateCommand } from "../commands/setfullstatecommand";

export class TwoWheelDriveCommandHandler implements IAmACommandHandler {
    handles: string[] = [
        SET_FULL_STATE_COMMAND_NAME,
        DIRECTION_KEY_COMMAND_NAME,
        TRIM_LEFT_COMMAND_NAME,
        TRIM_RIGHT_COMMAND_NAME
    ]



    handle(command: SetFullStateCommand |
            DirectionKeyCommand |
            TrimLeftCommand |
            TrimRightCommand, domainService: IAmADomainService): IAmARobotEvent[] {
        var self = this;
        var robotEvents = [];
        domainService.getAggregateRoot(TwoWheelDrive, (ar) => {
            robotEvents = ar.handle(command);        
        });
        return robotEvents;
    }
}