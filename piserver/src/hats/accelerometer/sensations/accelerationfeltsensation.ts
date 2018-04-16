import { IAmASensation } from "../../../framework/interfaces/iamasensation";

export var ACCELERATION_FELT_SENSATION_NAME = "AccelerationFelt";

export class AccelerationFeltSensation implements IAmASensation {
    name: string = ACCELERATION_FELT_SENSATION_NAME;

    constructor(public x: number, public y: number, public z: number, public units: string){
        
    }
}