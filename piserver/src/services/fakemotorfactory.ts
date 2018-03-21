import {Motor} from "../objects/motor";
import {FakePin, fakePinFactory} from "./fakepinfactory";
import {IAmAMotorFactory} from "../interfaces/iamamotorfactory";

export var fakeMotorFactory: IAmAMotorFactory<Motor<FakePin>> = 
    (enablePin: number, forwardPin: number, backwardPin: number) => 
        new Motor(enablePin, forwardPin, backwardPin, fakePinFactory);