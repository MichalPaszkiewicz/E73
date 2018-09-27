import { IAmASensation } from "../../../framework/interfaces/iamasensation";

export var PICTURE_TAKEN_SENSATION_NAME = "PictureTaken";

export class PictureTakenSensation implements IAmASensation{
    name: string = PICTURE_TAKEN_SENSATION_NAME;

    constructor(public imagePath: string){
        
    }
}