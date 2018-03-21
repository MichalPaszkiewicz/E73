import {PinState} from "../enums/pinstate";

export interface IAmAPin{
    writeSync(value: number): void;
    value(): number;
    state(): PinState;
}