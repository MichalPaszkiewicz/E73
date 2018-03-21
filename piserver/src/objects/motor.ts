"use strict"

import {PinState} from "../enums/pinstate";
import {IAmAPin} from "../interfaces/iamapin";
import {IAmAPinFactory} from "../interfaces/iamapinfactory";
import {IAmAMotor} from "../interfaces/iamamotor";

export class Motor<T extends IAmAPin>implements IAmAMotor{
	private _pulseWidth: number = 5;
	private _pulses: number = 100;
	private _currentPulse: number = 0;
	private _speed: number = 0;
	public get speed(){return this._speed}
	private _enablePin: IAmAPin;
	public get enablePin(){ return this._enablePin; }
	private _forwardPin: IAmAPin;
	public get forwardPin(){return this._forwardPin;}
	private _backwardPin: IAmAPin;
	public get backwardPin(){return this._backwardPin;}

	constructor(enablePin: number, forwardPin: number, backwardPin: number, pinFactory: IAmAPinFactory<T>) {
		this._enablePin = pinFactory(enablePin, PinState.OUT);
		this._forwardPin = pinFactory(forwardPin, PinState.OUT);
		this._backwardPin = pinFactory(backwardPin, PinState.OUT);
		this._loop();
	}

	private _loop() {
		var self = this;

		if (self._speed > self._currentPulse / self._pulses) {
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

	forward() {
		this._speed = 1;
		this._forwardPin.writeSync(1);
		this._backwardPin.writeSync(0);
	}

	backward() {
		this._speed = 1;
		this._forwardPin.writeSync(0);
		this._backwardPin.writeSync(1);
	}

	off() {
		this._speed = 0;
		this._forwardPin.writeSync(0);
		this._backwardPin.writeSync(0);
	}

	setSpeed(newSpeed) {
		if (newSpeed > 1 || newSpeed < 0) {
			throw new Error("The speed must be between 0 and 1");
		}
		this._speed = newSpeed;
	}
}