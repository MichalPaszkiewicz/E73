import {Motor} from "../objects/motor";
import {OnOffPin, onOffPinFactory} from "./onoffpinfactory";
import {IAmAMotorFactory} from "../interfaces/iamamotorfactory";

export var motorFactory: IAmAMotorFactory<Motor<OnOffPin>> = 
    (enablePin: number, forwardPin: number, backwardPin: number) => 
        new Motor(enablePin, forwardPin, backwardPin, onOffPinFactory);