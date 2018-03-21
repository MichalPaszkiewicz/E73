import {ISteerThings} from "../interfaces/isteerthings";

export class Robot {
    
    private _drive: ISteerThings;

    constructor(drive: ISteerThings){
        this._drive = drive;
    }

    getCommands(){
        return this._drive.getCommands();
    }

    off(){
        this._drive.off();
    }
}