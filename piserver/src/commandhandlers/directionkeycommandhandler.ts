import {DIRECTION_KEY_COMMAND_NAME, DirectionKeyCommand} from "../commands/directionkeycommand";
import {IAmACommandHandler} from "../interfaces/iamacommandhandler";
import {Robot} from "../objects/robot";
import {getRequest} from "../helpers/httprequest";

export class DirectionKeyCommandHandler implements IAmACommandHandler {
    handlesCommand: string = DIRECTION_KEY_COMMAND_NAME;
    private _serverUrl: string;
    private _robot: Robot;

    constructor(serverUrl: string, robot: Robot){
        this._serverUrl = serverUrl;
        this._robot = robot;
    }

    handle(command: DirectionKeyCommand): void {
        this._robot.getRequestResponses().filter(c => c.url == command.requestUrl).forEach(c => c.response());
        getRequest(this._serverUrl, command.requestUrl);
    }
}