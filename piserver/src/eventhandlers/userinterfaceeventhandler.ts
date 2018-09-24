import { IAmARobotEventHandler } from "../framework/interfaces/iamaroboteventhandler";
import { IAmARobotEvent } from "../framework/interfaces/iamarobotevent";
import { IAmAUserInterface } from "../framework/interfaces/iamauserinterface";

export class UserInterfaceEventHandler implements IAmARobotEventHandler{
    handles: string[] = ["*"]   
    private _userInterface: IAmAUserInterface;
    handle(robotEvent: IAmARobotEvent) {
        this._userInterface.applyEvent(robotEvent);
    }

    constructor(userInterface: IAmAUserInterface){
        this._userInterface = userInterface;
    }
}