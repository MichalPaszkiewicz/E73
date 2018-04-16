import { IAmASensor } from "../../framework/interfaces/iamasensor";
import { IAmASensation } from "../../framework/interfaces/iamasensation";
import { AccelerationFeltSensation } from "./sensations/accelerationfeltsensation";
const ADXL345 = require("adxl345-sensor");

const UPDATE_SPEED = 200;

export class Accelerometer implements IAmASensor {

    private _adxl345: any;
    private _onSensed: (sensation: AccelerationFeltSensation) => void;

    constructor(){
        var self = this;
        self._adxl345 = new ADXL345();
        self._adxl345.init()
            .then(() => {
                self.getAcceleration();
            })
            .catch((err) => console.error(`ADXL345 initialization failed: ${err}`));
    }

    getAcceleration(){
        var self = this;

        self._adxl345.getAcceleration(false)
            .then((acceleration) => {
                self._onSensed(acceleration); 
                setTimeout(() => {
                    self.getAcceleration();
                }, UPDATE_SPEED)
            })
            .catch((err) => {
                console.log(`ADXL345 read error: ${err}`);
                setTimeout(() => {
                    self.getAcceleration();
                }, UPDATE_SPEED);
            });
    }

    registerOnSensed(callback: (sensation: AccelerationFeltSensation) => void) {
        this._onSensed = (s) => callback(s);
    }
}