import { IAmASensor } from "../../framework/interfaces/iamasensor";
import { IAmASensation } from "../../framework/interfaces/iamasensation";
import { AccelerationFeltSensation } from "./sensations/accelerationfeltsensation";

const UPDATE_SPEED = 200;

export class FakeAccelerometer implements IAmASensor {
    private _onSensed: (sensation: AccelerationFeltSensation) => void;
    
    private _acceleration: AccelerationFeltSensation = new AccelerationFeltSensation(0,0,0, "ms-2")

    constructor(){
        this.getAcceleration();
    }

    setAcceleration(x: number, y: number, z: number){
        this._acceleration.x = x;
        this._acceleration.y = y;
        this._acceleration.z = z;
    }

    getAcceleration(){
        var self = this;
        self._onSensed(self._acceleration);

        setTimeout(() => {
            self.getAcceleration();
        }, UPDATE_SPEED);        
    }

    registerOnSensed(callback: (sensation: AccelerationFeltSensation) => void) {
        this._onSensed = (s) => callback(s);
    }

    clear(){
        throw new Error("Fake accelerometer has not implemented a clear method yet");
    }
}