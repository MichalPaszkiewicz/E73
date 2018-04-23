import { IAmAPin } from "../../framework/interfaces/iamapin";
import { IAmASensor } from "../../framework/interfaces/iamasensor";
import { IAmASensation } from "../../framework/interfaces/iamasensation";
import { LineSensor } from "./linesensor";
import { LineFoundSensation } from "./sensations/linefoundsensation";
import { LineLostSensation } from "./sensations/linelostsensation";

export class LineSensorArray<T extends IAmAPin> implements IAmASensor {

    _lineSensors: LineSensor<T>[] = [];
    private _watchDefined: boolean = false;    
    private _onSensationFunc: (sensation: IAmASensation) => void;

    reverse(){
        this._lineSensors.forEach(ls => ls.reverse());
    }

    registerLineSensor(lineSensor: LineSensor<T>){
        var self = this;
        lineSensor.registerOnSensed((s: LineFoundSensation | LineLostSensation) => {
            s.totalLineSensors = self._lineSensors.length;
            self._onSensationFunc(s);
        });
        this._lineSensors.push(lineSensor);
    }

    registerOnSensed(callback: (sensation: IAmASensation) => void) {
        var self = this;
        if(self._watchDefined){
            throw new Error("A watch has already been defined on this line sensor array");
        }
        self._watchDefined = true;
        this._onSensationFunc = callback;
    }
}