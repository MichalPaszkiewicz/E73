import { IAmASensor } from "../../framework/interfaces/iamasensor";
import { IAmASensation } from "../../framework/interfaces/iamasensation";
import { IAmAPin } from "../../framework/interfaces/iamapin";
import { IAmAPinFactory } from "../../framework/interfaces/iamapinfactory";
import { PinState } from "../../framework/enums/pinstate";
import { MotionDetectedSensation } from "./sensations/motiondetectedsensation";
import { PinEdge } from "../../framework/enums/pinedge";
import { MotionStoppedSensation } from "./sensations/motionstoppedsensation";

export class MotionSensor<T extends IAmAPin> implements IAmASensor {

    private _pin: IAmAPin;
    private _watchDefined = false;

    constructor(public pinNumber: number, pinFactory: IAmAPinFactory<T>){
        this._pin = pinFactory(pinNumber, PinState.IN, PinEdge.BOTH);
    }

    registerOnSensed(callback: (sensation: IAmASensation) => void) {
        if(this._watchDefined){
            throw new Error("A watch has already been set for this pin");
        }
        this._watchDefined = true;
        this._pin.watch((err, val) => {
            if(val == 1){
                callback(new MotionDetectedSensation());
            }
            else{
                callback(new MotionStoppedSensation());
            }
        });
    }

    clear(){
        this._pin.clear();
    }
}