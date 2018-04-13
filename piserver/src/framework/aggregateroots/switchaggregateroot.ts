import { IAmAnAggregateRoot } from "../interfaces/iamanaggregateroot";
import { IAmARobotEvent } from "../interfaces/iamarobotevent";
import { IAmACommand } from "../interfaces/iamacommand";
import { IAmASensation } from "../interfaces/iamasensation";
import { OFF_COMMAND_NAME } from "../commands/offcommand";
import { TurnedOffEvent } from "../events/turnedoffevent";

export class SwitchAggregateRoot implements IAmAnAggregateRoot {
    id?: string;
    handle(command: IAmACommand): IAmARobotEvent[] {
        if(command.name == OFF_COMMAND_NAME){
            return [new TurnedOffEvent()]
        }

        return [];
    }
    sense(sensation: IAmASensation): IAmARobotEvent[] {
        return [];
    }
    apply(robotEvent: IAmARobotEvent) {
        return [];
    }
}