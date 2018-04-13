import {IAmACommand} from "./iamacommand";
import {IAmASensation} from "./iamasensation";
import {IAmACommandHandler} from "./iamacommandhandler";
import {IAmASensationHandler} from "./iamasensationhandler";
import {IAmARobotEvent} from "./iamarobotevent";
import {IAmARobotEventHandler} from "./iamaroboteventhandler";
import {IAmADomainService} from "./iamadomainservice";

export interface IAmAControlModule{
    domainService: IAmADomainService;

    registerCommandHandler(commandHandler: IAmACommandHandler);
    handle(command: IAmACommand);

    registerSensationHandler(sensationHandler: IAmASensationHandler);
    sense(sensation: IAmASensation);

    registerRobotEventHandler(robotEventHandler: IAmARobotEventHandler);
    signal(robotEvent: IAmARobotEvent);

    clear();
}