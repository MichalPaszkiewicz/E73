import {Command} from "../objects/command";

export interface IAmAUserControl{
    getCommands(): Command[];    
}