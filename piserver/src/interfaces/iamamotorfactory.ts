import {IAmAPinFactory} from "./iamapinfactory";
import {IAmAMotor} from "./iamamotor";

export type IAmAMotorFactory<T extends IAmAMotor> = (enablePin: number, forwardPin: number, backwardPin: number) => T;