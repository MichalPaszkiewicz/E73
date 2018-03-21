import { Gpio } from 'onoff';
import {IAmAPin} from "../interfaces/iamapin";
import {IAmAPinFactory} from "../interfaces/iamapinfactory";
import {PinState} from "../enums/pinstate";

export class OnOffPin implements IAmAPin{

    private _gpio: Gpio;
    private _state: PinState;
    private _value: number = 0;

    state(): PinState{
        return this._state;
    }

    value(): number {
        return this._value;
    }

    constructor(pin: number, state: PinState) {
        this._gpio = new Gpio(pin, state);
    }

    writeSync(value: number): void {
        this._gpio.writeSync(value);
        this._value = value;
    }
}

export var onOffPinFactory: IAmAPinFactory<OnOffPin> = (pin: number, state: PinState) => new OnOffPin(pin, state);