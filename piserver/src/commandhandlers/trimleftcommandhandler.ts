import {TRIM_LEFT_COMMAND_NAME, TrimLeftCommand} from "../commands/trimleftcommand";
import {IAmACommandHandler} from "../interfaces/iamacommandhandler";
import {Robot} from "../objects/robot";
import {getRequest} from "../helpers/httprequest";

export class TrimLeftCommandHandler implements IAmACommandHandler {
    handlesCommand: string = TRIM_LEFT_COMMAND_NAME;
    private _serverUrl: string;
    private _robot: Robot;

    constructor(serverUrl: string, robot: Robot){
        this._serverUrl = serverUrl;
        this._robot = robot;
    }

    handle(command: TrimLeftCommand): void {
        this._robot.getRequestResponses().filter(c => c.url == "/trim/left").forEach(c => c.response());
        getRequest(this._serverUrl, "/trim/left");
    }
}