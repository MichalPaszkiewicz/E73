import { IAmACommandHandler } from "../framework/interfaces/iamacommandhandler";
import { CLICK_CIRCLE_COMMAND_NAME, ClickCircleCommand } from "../commands/clickcirclecommand";
import { DIRECTION_KEY_COMMAND_NAME } from "../commands/directionkeycommand";
import { TRIM_LEFT_COMMAND_NAME } from "../commands/trimleftcommand";
import { TRIM_RIGHT_COMMAND_NAME } from "../commands/trimrightcommand";
import { IAmACommand } from "../framework/interfaces/iamacommand";
import { IAmADomainService } from "../framework/interfaces/iamadomainservice";
import { postRequest } from "../helpers/httprequest";
import { drawCircleControl } from "../drawings/circlecontrol";
import { drawClickPoint } from "../drawings/clickpoint";
import { IAmARobotEvent } from "../framework/interfaces/iamarobotevent";
import { getCommand } from "../helpers/trig";
import { START_LEARNING_COMMAND_NAME } from "../commands/startlearningcommand";
import { END_LEARNING_COMMAND_NAME } from "../commands/endlearningcommand";
import { RUN_LEARNT_SEQUENCE_COMMAND_NAME } from "../commands/runlearntsequencecommand";
import { Settings } from "../settings";

export class FrontEndCommandHandler implements IAmACommandHandler {
    handles: string[] = [
        CLICK_CIRCLE_COMMAND_NAME,
        DIRECTION_KEY_COMMAND_NAME,
        TRIM_LEFT_COMMAND_NAME,
        TRIM_RIGHT_COMMAND_NAME,
        START_LEARNING_COMMAND_NAME,
        END_LEARNING_COMMAND_NAME,
        RUN_LEARNT_SEQUENCE_COMMAND_NAME
    ];

    private _serverUrl: string;
    private _ctx: CanvasRenderingContext2D;

    constructor(serverUrl: string, ctx: CanvasRenderingContext2D){
        this._serverUrl = serverUrl;
        this._ctx = ctx;
    }

    handle(command: IAmACommand, domainService: IAmADomainService): IAmARobotEvent[] {
        switch(command.name){
            case CLICK_CIRCLE_COMMAND_NAME:
                var clickCircle = <ClickCircleCommand>command;
                drawCircleControl(this._ctx);
                drawClickPoint(this._ctx, clickCircle.x, clickCircle.y); 
                postRequest(this._serverUrl, "/command", getCommand(clickCircle.x, clickCircle.y, Settings.sideLength));
                break;
            default:
                postRequest(this._serverUrl, "/command", command);        
                break;
        }
        return [];
    }
}