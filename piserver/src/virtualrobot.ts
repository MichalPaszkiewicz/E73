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
var lineSensors = [];
for(var i = 0; i < 5; i++){
    var lineSensor = new LineSensor(i, i, fakePinFactory);
    lineSensorArray.registerLineSensor(lineSensor);
}

//how to trigger a pin.
//(<FakePin>lineSensorArray._lineSensors[0]._pin).triggerWatch(null, 1);

// controlModule.registerCommandHandler({
// 	handles: ["*"],
// 	handle: (c => {
// 		console.log("command", c);
// 		return [];
// 	})
// });

// controlModule.registerRobotEventHandler({
//     handles: ["*"],
//     handle: (e => {
//         console.log("event", e);
//     })
// });

var robot = new Robot(controlModule, [
    
], [
    lineSensorArray
]);

var keys = [];

var setKeyState = (keyName, state) => {
    if (keys[keyName] === state) {
        return;
    }
	keys[keyName] = state;
    controlModule.handle(new DirectionKeyCommand(keyName, state)); 
}

var tryKeySwitch = (keyCode, value) => {
	switch (keyCode) {
		case "ArrowLeft":
            setKeyState("left", value);
            break;
        case "ArrowRight":
            setKeyState("right", value);
            break;
        case "ArrowUp":
            setKeyState("up", value);
            break;
        case "ArrowDown":
            setKeyState("down", value);
            break;
        case "KeyS":
            (value && controlModule.handle(new StartLearningCommand("test")));
            break;
        case "KeyE":
            (value && controlModule.handle(new EndLearningCommand()));
            break;
        case "KeyR":
            (value && controlModule.handle(new RunLearntSequenceCommand("test")));
            break;
    }
}

var learningService = new LearningService();
learningService.attachToControlModule(controlModule);
learningService.sequences = [];

document.onkeydown = e => tryKeySwitch(e.code, true);
document.onkeyup = e => tryKeySwitch(e.code, false);

var canvas = <HTMLCanvasElement>document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var checkPositionColour: (v: Vector2d) => boolean = (v: Vector2d) => {
    var imgData = ctx.getImageData(v.x, v.y, 1, 1).data;
    
    return imgData[0] > 200 && imgData[1] == 0 && imgData[2] == 0;
}

class MyLine{
    points: Vector2d[] = [];

    addPoint(point: Vector2d){
        this.points.push(point);
    }

    draw(){
        if(this.points.length == 0){
            return;
        }
        ctx.beginPath();
        ctx.strokeStyle = "rgb(255,0,0)";
        ctx.lineWidth = 20;
        ctx.moveTo(this.points[0].x, this.points[0].y);        
        for(var i = 1; i < this.points.length; i++){
            ctx.lineTo(this.points[i].x, this.points[i].y);
        }
        ctx.stroke();
        ctx.closePath();
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
    }
}

var myLine = new MyLine();

canvas.onclick = (e) => {
    myLine.addPoint(new Vector2d(e.offsetX, e.offsetY));
}
var touchService = new TouchService(canvas);
touchService.registerOnTouchDownEvent((e) => myLine.addPoint(new Vector2d(e.offsetX, e.offsetY)));

var started = false;

class VirtualRobot{
    position: Vector2d = new Vector2d(100, 100);
    direction: Vector2d = new Vector2d(1, 1);

    draw(){
        var self = this;
        ctx.beginPath();
        ctx.arc(self.position.x, self.position.y, 10, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(self.position.x, self.position.y);
        var frontPoint = self.position.add(self.direction.multiplyBy(20));
        ctx.lineTo(frontPoint.x, frontPoint.y);
        var rightFront = frontPoint.add(self.direction.getPerpendicularVector().multiplyBy(32));
        var leftFront = frontPoint.add(self.direction.getPerpendicularVector().multiplyBy(32).reverse());
        ctx.moveTo(leftFront.x, leftFront.y);
        ctx.lineTo(rightFront.x, rightFront.y);
        ctx.stroke();
        ctx.closePath();
        var perp = self.direction.getPerpendicularVector().multiplyBy(16);
        for(var i = 0; i < 5; i++){
            ctx.beginPath();            
            var gr = 200 - 50 * i;
            ctx.fillStyle = `rgb(${gr},${gr},${gr})`;
            var pos = leftFront.add(perp.multiplyBy(i));
            ctx.arc(pos.x, pos.y, 3, 0, 2* Math.PI);
            ctx.fill();
            ctx.closePath();            
        }
    }

    update(){
        var self = this;
        var leftSpeed = leftMotor.getSpeed() * 5;
        var rightSpeed = rightMotor.getSpeed() * 5;

        var frontPoint = self.position.add(self.direction.multiplyBy(20));
        var leftFront = frontPoint.add(self.direction.getPerpendicularVector().multiplyBy(32).reverse());
        var perp = self.direction.getPerpendicularVector().multiplyBy(16);

        var pos = leftFront;
        for(var i = 0; i < 5; i++){
            var colourCheckPos = pos.add(self.direction.multiplyBy(2));
            var pin = (<FakePin>lineSensorArray._lineSensors[i]._pin);
            var isLine = checkPositionColour(colourCheckPos) ? 1 : 0;
            if(isLine != pin.value()){
                if(started == false){
                    controlModule.handle(new SetFullStateCommand(true, false, false, false, 0.2, 0));
                    started = true;
                }
                pin.triggerWatch(null, checkPositionColour(colourCheckPos) ? 1 : 0);
            }            
            pos = pos.add(perp);            
        }

        var leftVelocity = self.direction.multiplyBy(leftSpeed);
        var rightVelocity = self.direction.multiplyBy(rightSpeed);

        var averageVelocity = leftVelocity.add(rightVelocity).multiplyBy(0.5);
        var rotationAngle = (leftSpeed - rightSpeed) / 60;

        self.direction = self.direction.rotate(rotationAngle);

        self.position = self.position.add(averageVelocity);
    }
}

var virtualRobot = new VirtualRobot();

var run = () => {
    ctx.clearRect(0,0,canvas.width, canvas.height);
    myLine.draw();    
    virtualRobot.update();
    virtualRobot.draw();
    window.requestAnimationFrame(run);    
};

run();

