import {Motor} from "./motor";
import {FakePin, fakePinFactory} from "../../services/fakepinfactory";
import {IAmAMotorFactory} from "./interfaces/iamamotorfactory";

export var fakeMotorFactory: IAmAMotorFactory<Motor<FakePin>> = 
    (motorId: string, enablePin: number, forwardPin: number, backwardPin: number) => 
        new Motor(motorId, enablePin, forwardPin, backwardPin, fakePinFactory);