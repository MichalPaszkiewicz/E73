import {getRequest, postRequest} from "./helpers/httprequest";
import {drawCircleControl} from "./drawings/circlecontrol";
import {LearningService} from "./services/learningservice";
import {clientApplicationService, canvas, ctx} from "./clientbindings";
import {DirectionKeyCommand} from "./commands/directionkeycommand";
import {TrimLeftCommand} from "./commands/trimleftcommand";
import {TrimRightCommand} from "./commands/trimrightcommand";
import {ClickCircleCommand} from "./commands/clickcirclecommand";
import {LocalStorageService} from "./services/localstorageservice";
import {TouchService} from "./services/touchservice";

var learningService = new LearningService(clientApplicationService);
const LEARNING_STORE_STRING = "LearntSequences";
var localStorageService = new LocalStorageService();
var sequences = localStorageService.getItem(LEARNING_STORE_STRING);
learningService.sequences = sequences || [];

var keys = {};

var setKeyState = (keyName, state, requestUrl) => {
    if (keys[keyName] === state) {
        return;
    }
	keys[keyName] = state;
    learningService.learn(new DirectionKeyCommand(requestUrl)); 
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

document.getElementById("trimleft").onclick = e => learningService.learn(new DirectionKeyCommand("/trim/left"));	
document.getElementById("trimright").onclick = e => learningService.learn(new DirectionKeyCommand("/trim/right"));

canvas.onclick = (e) => learningService.learn(new ClickCircleCommand(e.offsetX, e.offsetY));
var touchService = new TouchService(canvas);
touchService.registerOnTouchDownEvent((e) => learningService.learn(new ClickCircleCommand(e.offsetX, e.offsetY)));

document.getElementById("record").onclick = e => learningService.startLearning(window.prompt("Please type the name of the new sequence"));

function addSequenceButtons(){
    var sequenceDiv = document.getElementById("sequences");
    sequenceDiv.innerHTML = "";
    learningService.getSequenceNames().forEach(sn => {
        var newButton = document.createElement("button");
        newButton.innerText = sn;
        newButton.onclick = (e) => learningService.run((<HTMLElement>e.target).innerText);
        sequenceDiv.appendChild(newButton); 
    })
}

document.getElementById("endrecord").onclick = e => {
    learningService.endLearning();
    addSequenceButtons();
    localStorageService.saveItem(LEARNING_STORE_STRING, learningService.sequences);
}

drawCircleControl(ctx);
addSequenceButtons();