import {IAmACommand} from "../interfaces/iamacommand";
import {IAmACommandHandler} from "../interfaces/iamacommandhandler";

export class ApplicationService{

    private _commandHandlers: IAmACommandHandler[] = [];

    registerCommandHandler(commandHandler: IAmACommandHandler){
        this._commandHandlers.push(commandHandler);
    }

    handleCommand(command: IAmACommand){
        this._commandHandlers
                .filter(c => c.handlesCommand == command.name)
                .forEach(c => c.handle(command));
    }
    
}