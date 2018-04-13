import {IAmAPin} from "../framework/interfaces/iamapin";
import {IAmAPinFactory} from "../framework/interfaces/iamapinfactory";
import {PinState} from "../framework/enums/pinstate";
import { PinEdge } from "../framework/enums/pinedge";

export class FakePin implements IAmAPin{

    private _value: number = 0;
    private _state: PinState;
    private _edge: PinEdge;
    private _watch: (err: Error, value: 0 | 1) => void;

    value(){
        return this._value;
    }

    state(){
        return this._state;
    }

    edge(): PinEdge {
        return this._edge;
    }

    constructor(public pin: number, state: PinState, edge: PinEdge = PinEdge.NONE) {
        this._state = state;
        this._edge = edge;
    }

    writeSync(value: number): void {
        this._value = value;
    }

    watch(callback: (err: Error, value: 0 | 1) => void) {
        this._watch = callback;
    }

    triggerWatch(err: Error, value: 0 | 1){
        this._watch(err, value);
    }
}

export var fakePinFactory: IAmAPinFactory<FakePin> = (pin: number, state: PinState, edge?: PinEdge) => new FakePin(pin, state, edge);