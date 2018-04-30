import { IAmAUserInterface } from "../framework/interfaces/iamauserinterface";
import { IAmACommand } from "../framework/interfaces/iamacommand";
import { IAmARobotEvent } from "../framework/interfaces/iamarobotevent";
import { DirectionKeyCommand } from "../commands/directionkeycommand";
import { StartLearningCommand } from "../commands/startlearningcommand";
import { EndLearningCommand } from "../commands/endlearningcommand";
import { RunLearntSequenceCommand } from "../commands/runlearntsequencecommand";

export class Keyboard implements IAmAUserInterface {
    _onCommandedFuncs: ((command: IAmACommand) => void)[] = [];

    constructor(){
        var self = this;
        document.onkeydown = e => self.tryKeySwitch(e.code, true);
        document.onkeyup = e => self.tryKeySwitch(e.code, false);
    }

    keys: {} = {};

    setKeyState(keyName, state){
        if (this.keys[keyName] === state) {
            return;
        }
        this.keys[keyName] = state;
        this._onCommandedFuncs.forEach(ocf => ocf(new DirectionKeyCommand(keyName, state))); 
    }

    tryKeySwitch(keyCode, value){
        var self = this;
        switch (keyCode) {
            case "ArrowLeft":
                self.setKeyState("left", value);
                break;
            case "ArrowRight":
                self.setKeyState("right", value);
                break;
            case "ArrowUp":
                self.setKeyState("up", value);
                break;
            case "ArrowDown":
                self.setKeyState("down", value);
                break;
            case "KeyS":
                (value && self._onCommandedFuncs.forEach(ocf => ocf(new StartLearningCommand("test"))));
                break;
            case "KeyE":
                (value && self._onCommandedFuncs.forEach(ocf => ocf(new EndLearningCommand())));
                break;
            case "KeyR":
                (value && self._onCommandedFuncs.forEach(ocf => ocf(new RunLearntSequenceCommand("test"))));
                break;
        }
    }

    registerOnCommanded(callback: (command: IAmACommand) => void) {
        this._onCommandedFuncs.push(callback);
    }
    applyEvent(event: IAmARobotEvent) {
        
    }
}

