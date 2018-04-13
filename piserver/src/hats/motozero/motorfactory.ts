import {Motor} from "./motor";
import {OnOffPin, onOffPinFactory} from "../../services/onoffpinfactory";
import {IAmAMotorFactory} from "./interfaces/iamamotorfactory";

export var motorFactory: IAmAMotorFactory<Motor<OnOffPin>> = 
    (id: string, enablePin: number, forwardPin: number, backwardPin: number) => 
        new Motor(id, enablePin, forwardPin, backwardPin, onOffPinFactory);