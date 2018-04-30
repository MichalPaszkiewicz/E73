import { IAmASensor } from "../../framework/interfaces/iamasensor";
import { IAmASensation } from "../../framework/interfaces/iamasensation";
import { IAmAPin } from "../../framework/interfaces/iamapin";
import { IAmAPinFactory } from "../../framework/interfaces/iamapinfactory";
import { PinState } from "../../framework/enums/pinstate";
import { PinEdge } from "../../framework/enums/pinedge";
import { LineFoundSensation } from "./sensations/linefoundsensation";
import { LineLostSensation } from "./sensations/linelostsensation";

export class LineSensor<T extends IAmAPin> implements IAmASensor {

    _pin: IAmAPin;
    private _watchDefined: boolean = false;
    private _reversed: boolean = false;

    constructor(public id: number, public pinNumber: number, pinFactory: IAmAPinFactory<T>){
        this._pin = pinFactory(pinNumber, PinState.IN, PinEdge.BOTH);
    }

    reverse(){
        this._reversed = !this._reversed;
    }

    registerOnSensed(callback: (sensation: IAmASensation) => void) {
        var self = this;
        if(self._watchDefined){
            throw new Error("A watch has already been defined on sensor " + self.id);
        }
        self._watchDefined = true;
        self._pin.watch((err, val) => {
            if(self._reversed ? val == 0 : val == 1){
                callback(new LineFoundSensation(self.id, 1));
            }
            else{
                callback(new LineLostSensation(self.id, 1));
            }
        });
    }
}