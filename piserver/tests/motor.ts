import {Motor} from "../src/objects/motor";
import {FakePin, fakePinFactory} from "../src/services/fakepinfactory";

test("motor can be turned forwards", () => {

    var testMotor  = new Motor<FakePin>(1, 2, 3, fakePinFactory);

    testMotor.forward();

    expect(testMotor.forwardPin.value()).toBe(1);
    expect(testMotor.backwardPin.value()).toBe(0);
});

test("motor can be turned backwards", () => {

    var testMotor = new Motor<FakePin>(1 ,2, 3, fakePinFactory);

    testMotor.backward();

    expect(testMotor.forwardPin.value()).toBe(0);
    expect(testMotor.backwardPin.value()).toBe(1);
});

test("motor can be turned off",  () => {

    var testMotor = new Motor<FakePin>(1,2,3, fakePinFactory);

    testMotor.forward();
    testMotor.off();

    expect(testMotor.forwardPin.value()).toBe(0);
    expect(testMotor.backwardPin.value()).toBe(0);
    expect(testMotor.speed).toBe(0);
});

test("motor speed can be changed", () => {

    var testMotor = new Motor<FakePin>(1,2,3, fakePinFactory);

    testMotor.forward();
    testMotor.setSpeed(0.95);

    expect(testMotor.speed).toBe(0.95);
});

test("motor speed can't be set to more than 1", () => {

    var testMotor = new Motor<FakePin>(1,2,3, fakePinFactory);

    testMotor.forward();
    expect(() => testMotor.setSpeed(2)).toThrowError();
});

test("motor speed can't be set to more than 1", () => {

    var testMotor = new Motor<FakePin>(1,2,3, fakePinFactory);

    testMotor.forward();
    expect(() => testMotor.setSpeed(-0.1)).toThrowError();
});