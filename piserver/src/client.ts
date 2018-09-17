import {drawCircleControl} from "./drawings/circlecontrol";
import {canvas, ctx, ctrlModule, learningModule} from "./clientbindings";
import {TrimLeftCommand} from "./commands/trimleftcommand";
import {TrimRightCommand} from "./commands/trimrightcommand";
import {ClickCircleCommand} from "./commands/clickcirclecommand";
import {TouchService} from "./services/touchservice";
import { StartLearningCommand } from "./commands/startlearningcommand";
import { EndLearningCommand } from "./commands/endlearningcommand";
import { RunLearntSequenceCommand } from "./commands/runlearntsequencecommand";

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