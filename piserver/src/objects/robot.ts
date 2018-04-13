import {IAmAControlModule} from "../framework/interfaces/iamacontrolmodule";
import { OffCommand } from "../framework/commands/offcommand";
import { IAmASensor } from "../framework/interfaces/iamasensor";
import { IAmAUserInterface } from "../framework/interfaces/iamauserinterface";

export class Robot {
    
    private _sensors: IAmASensor[] = [];
    private _controlModule: IAmAControlModule;
    private _userInterfaces: IAmAUserInterface[] = [];

    constructor(controlModule: IAmAControlModule, userInterfaces: IAmAUserInterface[], sensors: IAmASensor[] = []){
        var self = this;
        self._controlModule = controlModule;
        userInterfaces.forEach(ui => self.addUserInterface(ui));
        sensors.forEach(s => self.addSensor(s));
    }

    addUserInterface(userInterface: IAmAUserInterface){
        var self = this;
        userInterface.registerOnCommanded((command) => {
            self._controlModule.handle(command);
        });
        self._controlModule.registerRobotEventHandler({
            handles: ["*"],
            handle: (e) => userInterface.applyEvent(e)
        });
        self._userInterfaces.push(userInterface);
    }

    addSensor(sensor: IAmASensor){
        var self = this;
        sensor.registerOnSensed((sensation) => {
            self._controlModule.sense(sensation);
        });
        self._sensors.push(sensor);
    }

    off(){
        this._controlModule.handle(new OffCommand());
    }
}