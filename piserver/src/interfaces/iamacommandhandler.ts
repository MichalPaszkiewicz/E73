import {IAmACommand} from "./iamacommand";

export interface IAmACommandHandler{

    handlesCommand: string;

    handle(command: IAmACommand): void; 

}