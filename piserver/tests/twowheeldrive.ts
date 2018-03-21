import {Motor} from "../src/objects/motor";
import {FakePin, fakePinFactory} from "../src/services/fakepinfactory";
import {TwoWheelDrive} from "../src/objects/twowheeldrive";


test("turning drive forwards turns forward both wheels", () => {

    var leftMotor = new Motor<FakePin>(1,2,3,fakePinFactory);
    var rightMotor = new Motor<FakePin>(1,2,3,fakePinFactory);
    var testTwoWheelDrive = new TwoWheelDrive(leftMotor, rightMotor);

    testTwoWheelDrive.forward();

    expect(leftMotor.forwardPin.value()).toBe(1);
    expect(leftMotor.backwardPin.value()).toBe(0);

    expect(rightMotor.forwardPin.value()).toBe(1);
    expect(rightMotor.backwardPin.value()).toBe(0);
});

test("turning drive backwards turns both wheels backwards", () => {
    var leftMotor = new Motor<FakePin>(1,2,3,fakePinFactory);
    var rightMotor = new Motor<FakePin>(1,2,3,fakePinFactory);
    var testTwoWheelDrive = new TwoWheelDrive(leftMotor, rightMotor);

    testTwoWheelDrive.backward();

    expect(leftMotor.forwardPin.value()).toBe(0);
    expect(leftMotor.backwardPin.value()).toBe(1);

    expect(rightMotor.forwardPin.value()).toBe(0);
    expect(rightMotor.backwardPin.value()).toBe(1);
});

test("turning drive right sets directions correctly", () => {
    var leftMotor = new Motor<FakePin>(1,2,3,fakePinFactory);
    var rightMotor = new Motor<FakePin>(1,2,3,fakePinFactory);
    var testTwoWheelDrive = new TwoWheelDrive(leftMotor, rightMotor);

    testTwoWheelDrive.right();

    expect(leftMotor.forwardPin.value()).toBe(1);
    expect(leftMotor.backwardPin.value()).toBe(0);

    expect(rightMotor.forwardPin.value()).toBe(0);
    expect(rightMotor.backwardPin.value()).toBe(1);
});

test("turning drive left sets directions correctly", () => {
    var leftMotor = new Motor<FakePin>(1,2,3,fakePinFactory);
    var rightMotor = new Motor<FakePin>(1,2,3,fakePinFactory);
    var testTwoWheelDrive = new TwoWheelDrive(leftMotor, rightMotor);

    testTwoWheelDrive.left();

    expect(leftMotor.forwardPin.value()).toBe(0);
    expect(leftMotor.backwardPin.value()).toBe(1);

    expect(rightMotor.forwardPin.value()).toBe(1);
    expect(rightMotor.backwardPin.value()).toBe(0);
});

test("trim left trims the left motor", () => {
    var leftMotor = new Motor<FakePin>(1,2,3,fakePinFactory);
    var rightMotor = new Motor<FakePin>(1,2,3,fakePinFactory);
    var testTwoWheelDrive = new TwoWheelDrive(leftMotor, rightMotor);

    testTwoWheelDrive.trimLeft();

    expect(testTwoWheelDrive.leftTrim).toBe(0.05);
});

test("trim right trims the right motor", () => {
    var leftMotor = new Motor<FakePin>(1,2,3,fakePinFactory);
    var rightMotor = new Motor<FakePin>(1,2,3,fakePinFactory);
    var testTwoWheelDrive = new TwoWheelDrive(leftMotor, rightMotor);

    testTwoWheelDrive.trimRight();

    expect(testTwoWheelDrive.rightTrim).toBe(0.05);
});

test("the drive can be turned off", () => {
    var leftMotor = new Motor<FakePin>(1,2,3,fakePinFactory);
    var rightMotor = new Motor<FakePin>(1,2,3,fakePinFactory);
    var testTwoWheelDrive = new TwoWheelDrive(leftMotor, rightMotor);

    testTwoWheelDrive.forward();
    testTwoWheelDrive.off();

    expect(leftMotor.forwardPin.value()).toBe(0);
    expect(leftMotor.backwardPin.value()).toBe(0);
    
    expect(rightMotor.forwardPin.value()).toBe(0);
    expect(rightMotor.backwardPin.value()).toBe(0);
    
    expect(leftMotor.speed).toBe(0);
});

test("the drive can be turned forwards with a command", () => {
    var leftMotor = new Motor<FakePin>(1,2,3,fakePinFactory);
    var rightMotor = new Motor<FakePin>(1,2,3,fakePinFactory);
    var testTwoWheelDrive = new TwoWheelDrive(leftMotor, rightMotor);
    var commands = testTwoWheelDrive.getCommands();

    var url = "/up/on";

    commands.filter(c => c.url == url).forEach(c => c.response());

    expect(leftMotor.forwardPin.value()).toBe(1);
    expect(leftMotor.backwardPin.value()).toBe(0);

    expect(rightMotor.forwardPin.value()).toBe(1);
    expect(rightMotor.backwardPin.value()).toBe(0);
});

test("the drive can be turned backwards with a command", () => {
    var leftMotor = new Motor<FakePin>(1,2,3,fakePinFactory);
    var rightMotor = new Motor<FakePin>(1,2,3,fakePinFactory);
    var testTwoWheelDrive = new TwoWheelDrive(leftMotor, rightMotor);
    var commands = testTwoWheelDrive.getCommands();

    var url = "/down/on";

    commands.filter(c => c.url == url).forEach(c => c.response());

    expect(leftMotor.forwardPin.value()).toBe(0);
    expect(leftMotor.backwardPin.value()).toBe(1);

    expect(rightMotor.forwardPin.value()).toBe(0);
    expect(rightMotor.backwardPin.value()).toBe(1);
});

test("the drive can be turned right with a command", () => {
    var leftMotor = new Motor<FakePin>(1,2,3,fakePinFactory);
    var rightMotor = new Motor<FakePin>(1,2,3,fakePinFactory);
    var testTwoWheelDrive = new TwoWheelDrive(leftMotor, rightMotor);
    var commands = testTwoWheelDrive.getCommands();

    var url = "/right/on";

    commands.filter(c => c.url == url).forEach(c => c.response());

    expect(leftMotor.forwardPin.value()).toBe(1);
    expect(leftMotor.backwardPin.value()).toBe(0);

    expect(rightMotor.forwardPin.value()).toBe(0);
    expect(rightMotor.backwardPin.value()).toBe(1);
});

test("the drive can be turned left with a command", () => {
    var leftMotor = new Motor<FakePin>(1,2,3,fakePinFactory);
    var rightMotor = new Motor<FakePin>(1,2,3,fakePinFactory);
    var testTwoWheelDrive = new TwoWheelDrive(leftMotor, rightMotor);
    var commands = testTwoWheelDrive.getCommands();

    var url = "/left/on";

    commands.filter(c => c.url == url).forEach(c => c.response());

    expect(leftMotor.forwardPin.value()).toBe(0);
    expect(leftMotor.backwardPin.value()).toBe(1);

    expect(rightMotor.forwardPin.value()).toBe(1);
    expect(rightMotor.backwardPin.value()).toBe(0);
});