import {IAmAPinFactory} from "../../../framework/interfaces/iamapinfactory";
import {IAmAMotor} from "./iamamotor";

export type IAmAMotorFactory<T extends IAmAMotor> = (id: string, enablePin: number, forwardPin: number, backwardPin: number) => T;