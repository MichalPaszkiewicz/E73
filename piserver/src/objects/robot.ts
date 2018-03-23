import {ISteerThings} from "../interfaces/isteerthings";

export class Robot {
    
    private _drive: ISteerThings;

    constructor(drive: ISteerThings){
        this._drive = drive;
    }

    getRequestResponses(){
        return this._drive.getRequestResponses();
    }

    off(){
        this._drive.off();
    }
}