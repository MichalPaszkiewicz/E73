import { IAmACommand } from "./iamacommand";
import { IAmARobotEvent } from "./iamarobotevent";

export interface IAmAUserInterface{

    registerOnCommanded(callback: (command: IAmACommand) => void);   
    
    applyEvent(event: IAmARobotEvent);

}