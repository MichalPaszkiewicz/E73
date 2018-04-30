import { Robot } from "./objects/robot";
import { FakePin, fakePinFactory } from "./services/fakepinfactory";
import { LineSensor } from "./hats/linesensor/linesensor";
import { LineSensorArray } from "./hats/linesensor/linesensorarray";
import { DefaultControlModule } from "./framework/services/defaultcontrolmodule";
import { DefaultDomainService } from "./framework/services/defaultdomainservice";
import { LineSensationHandler } from "./sensationhandlers/linesensationhandler";
import { MotorEventHandler } from "./hats/motozero/motoreventhandler";
import { fakeMotorFactory } from "./hats/motozero/fakemotorfactory";
import { TwoWheelDriveCommandHandler } from "./commandhandlers/twowheeldrivecommandhandler";
import { DirectionKeyCommand, DirectionKeyDirection } from "./commands/directionkeycommand";
import { LearningService } from "./services/learningservice";
import { StartLearningCommand } from "./commands/startlearningcommand";
import { EndLearningCommand } from "./commands/endlearningcommand";
import { RunLearntSequenceCommand } from "./commands/runlearntsequencecommand";
import { Vector2d } from "./helpers/vector";
import { TouchService } from "./services/touchservice";
import { SetFullStateCommand } from "./commands/setfullstatecommand";
import {VirtualRobot} from "./drawings/virtualrobot";
import { MyLine } from "./drawings/myline";
import { Keyboard } from "./userinterfaces/keyboard";

var domainService = new DefaultDomainService();
var controlModule = new DefaultControlModule(domainService);

controlModule.registerSensationHandler(new LineSensationHandler());

var leftMotor = fakeMotorFactory("leftMotor", 20,21,22);
var rightMotor = fakeMotorFactory("rightMotor", 23, 24, 25);

controlModule.registerCommandHandler(new TwoWheelDriveCommandHandler());
controlModule.registerRobotEventHandler(new MotorEventHandler([
    leftMotor,
    rightMotor
]));

var lineSensorArray = new LineSensorArray();
for(var i = 0; i < 5; i++){
    var lineSensor = new LineSensor(i, i, fakePinFactory);
    lineSensorArray.registerLineSensor(lineSensor);
}

var robot = new Robot(controlModule, [
    new Keyboard()
], [
    lineSensorArray
]);

var learningService = new LearningService();
learningService.attachToControlModule(controlModule);
learningService.sequences = [];

var canvas = <HTMLCanvasElement>document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var myLine = new MyLine(20);

canvas.onclick = (e) => {
    myLine.addPoint(new Vector2d(e.offsetX, e.offsetY));
}

var touchService = new TouchService(canvas);
touchService.registerOnTouchDownEvent((e) => myLine.addPoint(new Vector2d(e.offsetX, e.offsetY)));

var virtualRobot = new VirtualRobot();

var run = () => {
    ctx.clearRect(0,0,canvas.width, canvas.height);
    myLine.draw(ctx);    
    virtualRobot.update(ctx, controlModule, lineSensorArray, leftMotor, rightMotor);
    virtualRobot.draw(ctx);
    window.requestAnimationFrame(run);    
};

run();