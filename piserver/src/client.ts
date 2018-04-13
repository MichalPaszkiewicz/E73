import {getRequest, postRequest} from "./helpers/httprequest";
import {drawCircleControl} from "./drawings/circlecontrol";
import {LearningService} from "./services/learningservice";
import {canvas, ctx, ctrlModule, learningModule} from "./clientbindings";
import {DirectionKeyCommand} from "./commands/directionkeycommand";
import {TrimLeftCommand} from "./commands/trimleftcommand";
import {TrimRightCommand} from "./commands/trimrightcommand";
import {ClickCircleCommand} from "./commands/clickcirclecommand";
import {LocalStorageService} from "./services/localstorageservice";
import {TouchService} from "./services/touchservice";
import { StartLearningCommand } from "./commands/startlearningcommand";
import { EndLearningCommand } from "./commands/endlearningcommand";
import { RunLearntSequenceCommand } from "./commands/runlearntsequencecommand";

var keys = {};

var setKeyState = (keyName, state) => {
    if (keys[keyName] === state) {
        return;
    }
	keys[keyName] = state;
    ctrlModule.handle(new DirectionKeyCommand(keyName, state)); 
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
    }
}

document.onkeydown = e => tryKeySwitch(e.code, true);
document.onkeyup = e => tryKeySwitch(e.code, false);

document.getElementById("trimleft").onclick = e => ctrlModule.handle(new TrimLeftCommand());	
document.getElementById("trimright").onclick = e => ctrlModule.handle(new TrimRightCommand());

canvas.onclick = (e) => ctrlModule.handle(new ClickCircleCommand(e.offsetX, e.offsetY));
var touchService = new TouchService(canvas);
touchService.registerOnTouchDownEvent((e) => ctrlModule.handle(new ClickCircleCommand(e.offsetX, e.offsetY)));

document.getElementById("record").onclick = e => {
    var name = window.prompt("Please type the name of the new sequence");
    ctrlModule.handle(new StartLearningCommand(name));
    sequences.push(name);
};

var sequences = [];

function addSequenceButtons(){
    var sequenceDiv = document.getElementById("sequences");
    sequenceDiv.innerHTML = "";
    sequences.forEach(sn => {
        var newButton = document.createElement("button");
        newButton.innerText = sn;
        newButton.onclick = (e) => ctrlModule.handle(new RunLearntSequenceCommand((<HTMLElement>e.target).innerText));
        sequenceDiv.appendChild(newButton); 
    })
}

document.getElementById("endrecord").onclick = e => {
    ctrlModule.handle(new EndLearningCommand());
    addSequenceButtons();
}

drawCircleControl(ctx);
addSequenceButtons();