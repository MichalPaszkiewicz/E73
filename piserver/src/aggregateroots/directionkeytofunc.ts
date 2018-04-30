import { DirectionKeyDirection, DirectionKeyCommand } from "../commands/directionkeycommand";

export class DirectionKeyToFunc{

    constructor(public direction: DirectionKeyDirection, public isKeyDown: boolean, public func: () => void){

    }

    matchesCommand(command: DirectionKeyCommand){
        return command.direction == this.direction && command.isKeyDown == this.isKeyDown;
    }

}