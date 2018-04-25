import {IAmAControlModule} from "../interfaces/iamacontrolmodule";
import { IAmADomainService } from "../interfaces/iamadomainservice";
import { IAmACommandHandler } from "../interfaces/iamacommandhandler";
import { IAmACommand } from "../interfaces/iamacommand";
import { IAmASensationHandler } from "../interfaces/iamasensationhandler";
import { IAmASensation } from "../interfaces/iamasensation";
import { IAmARobotEventHandler } from "../interfaces/iamaroboteventhandler";
import { IAmARobotEvent } from "../interfaces/iamarobotevent";

type RobotEventFunc = (robotEvent: IAmARobotEvent) => void;

export class DefaultControlModule implements IAmAControlModule {
    
    constructor(public domainService: IAmADomainService){

    }

    private _commandHandlers: IAmACommandHandler[] = [];

    registerCommandHandler(commandHandler: IAmACommandHandler) {
        console.log("registered ch:", (<any>commandHandler.constructor).name)        
        this._commandHandlers.push(commandHandler);
    }
    handle(command: IAmACommand) {
        var self = this;
        var robotEvents = [];
        self._commandHandlers
            .filter(ch => ch.handles.some(st => st == "*" || st == command.name))
            .forEach(ch => {
                robotEvents = robotEvents.concat(ch.handle(command, self.domainService));
            });
        robotEvents.forEach(re => self.signal(re));        
    }

    private _sensationHandlers: IAmASensationHandler[] = [];

    registerSensationHandler(sensationHandler: IAmASensationHandler) {
        console.log("registered sh:", (<any>sensationHandler.constructor).name)        
        this._sensationHandlers.push(sensationHandler);
    }
    sense(sensation: IAmASensation) {
        var self = this;
        var robotEvents = [];
        self._sensationHandlers
            .filter(sh => sh.handles.some(st => st == "*" || st == sensation.name))
            .forEach(sh =>{
                var handled = sh.handle(sensation, self.domainService);
                if(sh["registerOnExtraEventsAdded"]){
                    sh["registerOnExtraEventsAdded"]((e) => self.signal(e));            
                }
                robotEvents = robotEvents.concat(handled)
            });
        robotEvents.forEach(re => self.signal(re));
    }

    private _robotEventHandlers: IAmARobotEventHandler[] = [];

    registerRobotEventHandler(robotEventHandler: IAmARobotEventHandler) {
        console.log("registered eh:", (<any>robotEventHandler.constructor).name)
        this._robotEventHandlers.push(robotEventHandler);
    }
    signal(robotEvent: IAmARobotEvent) {
        var self = this;

        self.domainService.applyToAllAggregates(robotEvent);

        self._robotEventHandlers
            .filter(reh => reh.handles.some(st => st == "*" || st == robotEvent.name))
            .forEach(reh => reh.handle(robotEvent));        
    }

    clear() {
        this._commandHandlers = [];
        this._sensationHandlers = [];
        this._robotEventHandlers = [];
        this.domainService.clear();
    }
}