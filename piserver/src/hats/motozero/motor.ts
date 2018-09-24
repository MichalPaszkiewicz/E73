"use strict"

import {PinState} from "../../framework/enums/pinstate";
import {IAmAPin} from "../../framework/interfaces/iamapin";
import {IAmAPinFactory} from "../../framework/interfaces/iamapinfactory";
import {IAmAMotor} from "./interfaces/iamamotor";

export class Motor<T extends IAmAPin>implements IAmAMotor{
	private _pulseWidth: number = 5;
	private _pulses: number = 100;
	private _currentPulse: number = 0;
	private _speed: number = 0;
	public getSpeed(){return this._speed}
	private _enablePin: IAmAPin;
	public getEnablePin(){ return this._enablePin; }
	private _forwardPin: IAmAPin;
	public getForwardPin(){return this._forwardPin;}
	private _backwardPin: IAmAPin;
	public getBackwardPin(){return this._backwardPin;}

	constructor(public id: string, enablePin: number, forwardPin: number, backwardPin: number, pinFactory: IAmAPinFactory<T>) {
		this._enablePin = pinFactory(enablePin, PinState.OUT);
		this._forwardPin = pinFactory(forwardPin, PinState.OUT);
		this._backwardPin = pinFactory(backwardPin, PinState.OUT);
		this._loop();
	}

	private _loop() {
		var self = this;

		if (Math.abs(self._speed) > self._currentPulse / self._pulses) {
			self._enablePin.writeSync(1);
		}
		else {
			self._enablePin.writeSync(0);
		}

		self._currentPulse++;
		self._currentPulse = self._currentPulse % self._pulses;

		setTimeout(() => {
			self._loop();
		}, self._pulseWidth)
	}

	off() {
		this._speed = 0;
		this._forwardPin.writeSync(0);
		this._backwardPin.writeSync(0);
	}

	clear(){
		this.off();
		this._enablePin.clear();
		this._forwardPin.clear();
		this._backwardPin.clear();
	}

	setSpeed(newSpeed) {
		if (newSpeed > 1 || newSpeed < -1) {
			throw new Error("The speed must be between -1 and 1");
		}
		if(newSpeed > 0){
			this._backwardPin.writeSync(0);			
			this._forwardPin.writeSync(1);
		}
		else if(newSpeed < 0){
			this._forwardPin.writeSync(0);
			this._backwardPin.writeSync(1);
		}
		else{
			this.off();
		}
		this._speed = newSpeed;
	}
}