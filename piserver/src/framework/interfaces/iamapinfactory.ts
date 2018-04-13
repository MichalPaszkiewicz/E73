import {IAmAPin} from "./iamapin";
import {PinState} from "../enums/pinstate";
import { PinEdge } from "../enums/pinedge";

export type IAmAPinFactory<T extends IAmAPin> = (pin: number, state: PinState, edge?: PinEdge) => T;