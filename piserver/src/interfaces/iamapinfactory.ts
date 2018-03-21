import {IAmAPin} from "./iamapin";
import {PinState} from "../enums/pinstate";

export type IAmAPinFactory<T extends IAmAPin> = (pin: number, state: PinState) => T;