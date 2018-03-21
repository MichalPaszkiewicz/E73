import {IAmAPin} from "../interfaces/iamapin";
import {IAmAPinFactory} from "../interfaces/iamapinfactory";
import {PinState} from "../enums/pinstate";

export class FakePin implements IAmAPin{

    private _value: number = 0;
    private _state: PinState;

    value(){
        return this._value;
    }

    state(){
        return this._state;
    }

    constructor(public pin: number, state: PinState) {
        this._state = state;
    }

    writeSync(value: number): void {
        this._value = value;
    }
}

export var fakePinFactory: IAmAPinFactory<FakePin> = (pin: number, state: PinState) => new FakePin(pin, state);