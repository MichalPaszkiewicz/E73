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

    private _onExtraEventsAdded: (e: IAmARobotEvent) => void;

    registerOnExtraEventsAdded(func: (e: IAmARobotEvent) => void){
        this._onExtraEventsAdded = func;
    }

    handle(sensation: LineFoundSensation | LineLostSensation, domainService: IAmADomainService): IAmARobotEvent[]{
        var self = this;
        var robotEvents = [];
        domainService.getAggregateRoot(TwoWheelDrive, (a) => {
            if(a["registerOnExtraEventsAdded"] && this._onExtraEventsAdded){
                a.registerOnExtraEventsAdded((e) => self._onExtraEventsAdded(e));            
            }
            robotEvents = a.sense(sensation);
        });
        return robotEvents;
    }
}