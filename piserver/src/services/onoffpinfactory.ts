import { Gpio } from 'onoff';
import {IAmAPin} from "../framework/interfaces/iamapin";
import {IAmAPinFactory} from "../framework/interfaces/iamapinfactory";
import {PinState} from "../framework/enums/pinstate";
import { PinEdge } from '../framework/enums/pinedge';

export class OnOffPin implements IAmAPin{

    private _gpio: Gpio;
    private _state: PinState;
    private _value: number = 0;
    private _edge: PinEdge;

    state(): PinState{
        return this._state;
    }

    value(): number {
        return this._value;
    }

    edge(): PinEdge {
        return this._edge;
    }

    constructor(pin: number, state: PinState, edge: PinEdge = PinEdge.NONE) {
        this._gpio = new Gpio(pin, state, edge);
        this._state = state;
        this._edge = edge;

    }

    writeSync(value: number): void {
        this._gpio.writeSync(value);
        this._value = value;
    }

    watch(callback: (err: Error, value: 0 | 1) => void) {
        this._gpio.watch((err, val: 0 | 1) => callback(err, val));
    }
}

export var onOffPinFactory: IAmAPinFactory<OnOffPin> = (pin: number, state: PinState, edge?: PinEdge) => new OnOffPin(pin, state, edge);