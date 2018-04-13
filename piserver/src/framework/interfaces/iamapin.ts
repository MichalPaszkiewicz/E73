import {PinState} from "../enums/pinstate";
import { PinEdge } from "../enums/pinedge";

export interface IAmAPin{
    writeSync(value: 0 | 1): void;
    value(): number;
    state(): PinState;
    edge(): PinEdge;

    watch(callback: (err: Error, value: 0 | 1) => void);
}