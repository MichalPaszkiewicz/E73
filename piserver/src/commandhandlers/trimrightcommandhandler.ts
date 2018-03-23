import {TRIM_RIGHT_COMMAND_NAME, TrimRightCommand} from "../commands/trimrightcommand";
import {IAmACommandHandler} from "../interfaces/iamacommandhandler";
import {Robot} from "../objects/robot";
import {getRequest} from "../helpers/httprequest";

export class TrimRightCommandHandler implements IAmACommandHandler {
    handlesCommand: string = TRIM_RIGHT_COMMAND_NAME;
    private _serverUrl: string;
    private _robot: Robot;

    constructor(serverUrl: string, robot: Robot){
        this._serverUrl = serverUrl;
        this._robot = robot;
    }

    handle(command: TrimRightCommand): void {
        this._robot.getRequestResponses().filter(c => c.url == "/trim/right").forEach(c => c.response());
        getRequest(this._serverUrl, "/trim/right");
    }
}