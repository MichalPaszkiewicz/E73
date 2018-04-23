import { IAmASensationHandler } from "../framework/interfaces/iamasensationhandler";
import { LINE_FOUND_SENSATION_NAME, LineFoundSensation } from "../hats/linesensor/sensations/linefoundsensation";
import { LINE_LOST_SENSATION_NAME, LineLostSensation } from "../hats/linesensor/sensations/linelostsensation";
import { IAmADomainService } from "../framework/interfaces/iamadomainservice";
import { TwoWheelDrive } from "../aggregateroots/twowheeldrive";
import { IAmARobotEvent } from "../framework/interfaces/iamarobotevent";

export class LineSensationHandler implements IAmASensationHandler{
    handles = [
        LINE_FOUND_SENSATION_NAME,
        LINE_LOST_SENSATION_NAME
    ]

    handle(sensation: LineFoundSensation | LineLostSensation, domainService: IAmADomainService): IAmARobotEvent[]{
        var robotEvents = [];
        domainService.getAggregateRoot(TwoWheelDrive, (a) => {
            robotEvents = a.sense(sensation);
        });
        return robotEvents;
    }
}