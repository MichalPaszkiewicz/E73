import {CLICK_CIRCLE_COMMAND_NAME, ClickCircleCommand} from "../commands/clickcirclecommand";
import {IAmACommandHandler} from "../interfaces/iamacommandhandler";
import {Robot} from "../objects/robot";
import {postRequest} from "../helpers/httprequest";
import {getCommand} from "../helpers/trig";
import {drawCircleControl} from "../drawings/circlecontrol";
import {drawClickPoint} from "../drawings/clickpoint";

export class ClickCircleCommandHandler implements IAmACommandHandler {
    handlesCommand: string = CLICK_CIRCLE_COMMAND_NAME;
    private _serverUrl: string;
    private _robot: Robot;
    private _ctx: CanvasRenderingContext2D;

    constructor(serverUrl: string, robot: Robot, ctx: CanvasRenderingContext2D){
        this._serverUrl = serverUrl;
        this._robot = robot;
        this._ctx = ctx;
    }

    handle(command: ClickCircleCommand): void {
        var adjustedCommand = getCommand(command.x, command.y);        
        this._robot.getRequestResponses().filter(c => c.url == "/circle").forEach(c => c.response(adjustedCommand));
        postRequest(this._serverUrl, "/circle", adjustedCommand)
        drawCircleControl(this._ctx);
        drawClickPoint(this._ctx, command.x, command.y);  
    }
}