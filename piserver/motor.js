"use strict"

var Gpio = require('onoff').Gpio;

class Motor{
    constructor(enablePin, forwardPin, backwardPin){
		this._pulseWidth = 5;
		this._pulses = 100;
		this._currentPulse = 0;
		this._speed = 0;
        this._enablePin = new Gpio(enablePin, 'out');
        this._forwardPin = new Gpio(forwardPin, 'out');
		this._backwardPin = new Gpio(backwardPin, 'out');
		this.loop();
	}
	
	loop(){
		var self = this;

		if(self._speed > self._currentPulse / self._pulses){
			self._enablePin.writeSync(1);
		}
		else{
			self._enablePin.writeSync(0);
		}

		self._currentPulse++;
		self._currentPulse = self._currentPulse % self._pulses;

		setTimeout(() => {
			self.loop();
		}, self._pulseWidth)
	}

    forward(){
        this._speed = 1;
        this._forwardPin.writeSync(1);
        this._backwardPin.writeSync(0);
    }

    backward(){
        this._speed = 1;
        this._forwardPin.writeSync(0);
        this._backwardPin.writeSync(1);
    }

    off(){
        this._speed = 0;
        this._forwardPin.writeSync(0);
        this._backwardPin.writeSync(0);
	}
	
	setSpeed(newSpeed){
		if(newSpeed > 1 || newSpeed < 0){
			throw new Error("The speed must be between 0 and 1");
		}
		this._speed = newSpeed;
	}
}

exports.Motor = Motor;