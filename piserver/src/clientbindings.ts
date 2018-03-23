import {DirectionKeyCommandHandler} from "./commandhandlers/directionkeycommandhandler";
import {TrimLeftCommandHandler} from "./commandhandlers/trimleftcommandhandler";
import {TrimRightCommandHandler} from "./commandhandlers/trimrightcommandhandler";
import {ClickCircleCommandHandler} from "./commandhandlers/clickcirclecommandhandler";
import {ApplicationService} from "./services/applicationservice";
import {fakeMotorFactory} from "./services/fakemotorfactory";
import {TwoWheelDrive} from "./objects/twowheeldrive";
import {Robot} from "./objects/robot";

var motor1 = fakeMotorFactory(5, 24, 27);
var motor2 = fakeMotorFactory(17, 6, 22);
var motor3 = fakeMotorFactory(12, 23, 16);
var motor4 = fakeMotorFactory(25, 13, 18);

var drive = new TwoWheelDrive(motor1, motor2);

drive.attachLogger((msg) => {
    var box = document.getElementById("myconsole");
    var pre = document.createElement("pre");
    pre.innerText = msg;
    box.appendChild(pre);
    if(box.childElementCount > 4){
        var firstChild = box.firstChild;
        box.removeChild(firstChild);
    }
});

var robot = new Robot(drive);

var serverUrl = window.location.origin;

var appService = new ApplicationService();

var cvs = <HTMLCanvasElement>document.getElementById("controlCanvas");
var context = cvs.getContext("2d");

appService.registerCommandHandler(new DirectionKeyCommandHandler(serverUrl, robot));
appService.registerCommandHandler(new TrimLeftCommandHandler(serverUrl, robot));
appService.registerCommandHandler(new TrimRightCommandHandler(serverUrl, robot));
appService.registerCommandHandler(new ClickCircleCommandHandler(serverUrl, robot, context))

export var clientApplicationService = appService;
export var canvas = cvs;
export var ctx = context;