import {fakeMotorFactory} from "./services/fakemotorfactory";
import {TwoWheelDrive} from "./objects/twowheeldrive";
import {Robot} from "./objects/robot";
import {getRequest, postRequest} from "./helpers/httprequest";
import {drawCircleControl} from "./drawings/circlecontrol";
import {drawClickPoint} from "./drawings/clickpoint";
import {getCommand} from "./helpers/trig";
import {LearningService} from "./services/learningservice";

var motor1 = fakeMotorFactory(5, 24, 27);
var motor2 = fakeMotorFactory(17, 6, 22);
var motor3 = fakeMotorFactory(12, 23, 16);
var motor4 = fakeMotorFactory(25, 13, 18);

var drive = new TwoWheelDrive(motor1, motor2);
var robot = new Robot(drive);

var learningService = new LearningService();

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

var keys = {};
var serverUrl = window.location.origin;

var setKeyState = (keyName, state, requestUrl) => {
    if (keys[keyName] === state) {
        return;
    }
	keys[keyName] = state;
    learningService.learn(() => {
        robot.getCommands().filter(c => c.url == requestUrl).forEach(c => c.response());
        getRequest(serverUrl, requestUrl);
    }); 
}

var tryKeySwitch = (keyCode, value) => {
	switch (keyCode) {
		case "ArrowLeft":
            setKeyState("left", value, "/left/" + (value ? "on" : "off"));
            break;
        case "ArrowRight":
            setKeyState("right", value, "/right/" + (value ? "on" : "off"));
            break;
        case "ArrowUp":
            setKeyState("up", value, "/up/" + (value ? "on" : "off"));
            break;
        case "ArrowDown":
            setKeyState("down", value, "/down/" + (value ? "on" : "off"));
    }
}

document.onkeydown = e => tryKeySwitch(e.code, true);
document.onkeyup = e => tryKeySwitch(e.code, false);

document.getElementById("trimleft").onclick = e => {
    learningService.learn(() => {
        robot.getCommands().filter(c => c.url == "/trim/left").forEach(c => c.response());
        postRequest(serverUrl, "/trim/left");
    });	
}

document.getElementById("trimright").onclick = e => {
    learningService.learn(() => {
        robot.getCommands().filter(c => c.url == "/trim/right").forEach(c => c.response());	
        postRequest(serverUrl, "/trim/right");
    });
}

// document.getElementById("speed").onchange = e => { 
// 	var newSpeed = +(<HTMLInputElement>e.target).value / 100;
// 	robot.getCommands().filter(c => c.url == "/speed").forEach(c => c.response(newSpeed));	
// 	postRequest(serverUrl, "/speed", newSpeed); 
// }

var canvas = <HTMLCanvasElement>document.getElementById("controlCanvas");
var ctx = canvas.getContext("2d");

canvas.onclick = (e) => {
    console.log(e.offsetX, e.offsetY);
    var command = getCommand(e.offsetX, e.offsetY);
    learningService.learn(() => {
        robot.getCommands().filter(c => c.url == "/circle").forEach(c => c.response(command));
        postRequest(serverUrl, "/circle", command)
        drawCircleControl(ctx);
        drawClickPoint(ctx, e.offsetX, e.offsetY);  
    });
}

document.getElementById("record").onclick = e => {
    learningService.startLearning(window.prompt("Please type the name of the new sequence"));
}

document.getElementById("endrecord").onclick = e => {
    learningService.endLearning();
    var sequenceDiv = document.getElementById("sequences");
    sequenceDiv.innerHTML = "";
    learningService.getSequenceNames().forEach(sn => {
        var newButton = document.createElement("button");
        newButton.innerText = sn;
        newButton.onclick = (e) => learningService.run((<HTMLElement>e.target).innerText);
        sequenceDiv.appendChild(newButton); 
    })
}

drawCircleControl(ctx);
