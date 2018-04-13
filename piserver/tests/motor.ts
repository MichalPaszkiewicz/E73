import {Motor} from "../src/hats/motozero/motor";
import {FakePin, fakePinFactory} from "../src/services/fakepinfactory";

test("motor can be turned forwards", () => {

    var testMotor  = new Motor<FakePin>("testMotor", 1, 2, 3, fakePinFactory);

    testMotor.setSpeed(1);

    expect(testMotor.getForwardPin().value()).toBe(1);
    expect(testMotor.getBackwardPin().value()).toBe(0);
});

test("motor can be turned backwards", () => {

    var testMotor = new Motor<FakePin>("testMotor", 1 ,2, 3, fakePinFactory);

    testMotor.setSpeed(-1);

    expect(testMotor.getForwardPin().value()).toBe(0);
    expect(testMotor.getBackwardPin().value()).toBe(1);
});

test("motor can be turned off",  () => {

    var testMotor = new Motor<FakePin>("testMotor", 1,2,3, fakePinFactory);

    testMotor.setSpeed(1);
    testMotor.off();

    expect(testMotor.getForwardPin().value()).toBe(0);
    expect(testMotor.getBackwardPin().value()).toBe(0);
    expect(testMotor.getSpeed()).toBe(0);
});

test("motor speed can be changed", () => {

    var testMotor = new Motor<FakePin>("testMotor", 1,2,3, fakePinFactory);

    testMotor.setSpeed(0.95);

    expect(testMotor.getSpeed()).toBe(0.95);
});

test("motor speed can't be set to more than 1", () => {

    var testMotor = new Motor<FakePin>("testMotor", 1,2,3, fakePinFactory);

    expect(() => testMotor.setSpeed(2)).toThrowError();
});

test("motor speed can't be set to less than -1", () => {

    var testMotor = new Motor<FakePin>("testMotor", 1,2,3, fakePinFactory);

    expect(() => testMotor.setSpeed(-1.1)).toThrowError();
});