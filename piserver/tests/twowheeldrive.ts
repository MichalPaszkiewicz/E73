import {Motor} from "../src/hats/motozero/motor";
import {FakePin, fakePinFactory} from "../src/services/fakepinfactory";
import {TwoWheelDrive} from "../src/aggregateroots/twowheeldrive";
import { MotorSpeedSetEvent, MOTOR_SPEED_SET_EVENT_NAME } from "../src/hats/motozero/events/motorspeedsetevent";


test("turning drive forwards turns forward both wheels", () => {

    var leftMotor = new Motor<FakePin>("leftMotor", 1,2,3,fakePinFactory);
    var rightMotor = new Motor<FakePin>("rightMotor", 1,2,3,fakePinFactory);
    var testTwoWheelDrive = new TwoWheelDrive();

    testTwoWheelDrive.forward();

    expect(testTwoWheelDrive.unprocessedEvents.length).toBe(2);
    expect(testTwoWheelDrive.unprocessedEvents
        .filter((t2wd: MotorSpeedSetEvent) => t2wd.motorId == "leftMotor")
        .length).toBe(1);
    expect(testTwoWheelDrive.unprocessedEvents
        .filter((t2wd: MotorSpeedSetEvent) => t2wd.motorId == "rightMotor")
        .length).toBe(1);
    expect(testTwoWheelDrive.unprocessedEvents
        .filter((t2wd => t2wd.name == MOTOR_SPEED_SET_EVENT_NAME))
        .length).toBe(2);
});

test("turning drive backwards turns both wheels backwards", () => {
    var leftMotor = new Motor<FakePin>("leftMotor", 1,2,3,fakePinFactory);
    var rightMotor = new Motor<FakePin>("rightMotor", 1,2,3,fakePinFactory);
    var testTwoWheelDrive = new TwoWheelDrive();

    testTwoWheelDrive.backward();

    expect(testTwoWheelDrive.unprocessedEvents.length).toBe(2);
    expect(testTwoWheelDrive.unprocessedEvents
        .filter((t2wd: MotorSpeedSetEvent) => t2wd.motorId == "leftMotor")
        .length).toBe(1);
    expect(testTwoWheelDrive.unprocessedEvents
        .filter((t2wd: MotorSpeedSetEvent) => t2wd.motorId == "rightMotor")
        .length).toBe(1);
    expect(testTwoWheelDrive.unprocessedEvents
        .filter(t2wd => t2wd.name == MOTOR_SPEED_SET_EVENT_NAME)
        .length).toBe(2);
});

test("turning drive right sets directions correctly", () => {
    var leftMotor = new Motor<FakePin>("leftMotor", 1,2,3,fakePinFactory);
    var rightMotor = new Motor<FakePin>("rightMotor", 1,2,3,fakePinFactory);
    var testTwoWheelDrive = new TwoWheelDrive();

    testTwoWheelDrive.right();

    expect(testTwoWheelDrive.unprocessedEvents.length).toBe(2);
    expect(testTwoWheelDrive.unprocessedEvents
        .filter((t2wd: MotorSpeedSetEvent) => t2wd.motorId == "leftMotor")
        .length).toBe(1);
    expect(testTwoWheelDrive.unprocessedEvents
        .filter((t2wd: MotorSpeedSetEvent) => t2wd.motorId == "rightMotor")
        .length).toBe(1);
    expect(testTwoWheelDrive.unprocessedEvents
        .filter(t2wd => t2wd.name == MOTOR_SPEED_SET_EVENT_NAME)
        .length).toBe(2);
});

test("turning drive left sets directions correctly", () => {
    var leftMotor = new Motor<FakePin>("leftMotor", 1,2,3,fakePinFactory);
    var rightMotor = new Motor<FakePin>("rightMotor", 1,2,3,fakePinFactory);
    var testTwoWheelDrive = new TwoWheelDrive();

    testTwoWheelDrive.left();

    expect(testTwoWheelDrive.unprocessedEvents.length).toBe(2);
    expect(testTwoWheelDrive.unprocessedEvents
        .filter((t2wd: MotorSpeedSetEvent) => t2wd.motorId == "leftMotor")
        .length).toBe(1);
    expect(testTwoWheelDrive.unprocessedEvents
        .filter((t2wd: MotorSpeedSetEvent) => t2wd.motorId == "rightMotor")
        .length).toBe(1);
    expect(testTwoWheelDrive.unprocessedEvents
        .filter(t2wd => t2wd.name == MOTOR_SPEED_SET_EVENT_NAME)
        .length).toBe(2);
});

test("trim left trims the left motor", () => {
    var leftMotor = new Motor<FakePin>("leftMotor", 1,2,3,fakePinFactory);
    var rightMotor = new Motor<FakePin>("rightMotor", 1,2,3,fakePinFactory);
    var testTwoWheelDrive = new TwoWheelDrive();

    testTwoWheelDrive.forward();
    testTwoWheelDrive.trimLeft();

    expect(testTwoWheelDrive.unprocessedEvents.length).toBe(4);

    expect(testTwoWheelDrive.getLeftTrim()).toBe(0.05);
});

test("trim right trims the right motor", () => {
    var leftMotor = new Motor<FakePin>("leftMotor", 1,2,3,fakePinFactory);
    var rightMotor = new Motor<FakePin>("rightMotor", 1,2,3,fakePinFactory);
    var testTwoWheelDrive = new TwoWheelDrive();

    testTwoWheelDrive.forward();    
    testTwoWheelDrive.trimRight();

    expect(testTwoWheelDrive.unprocessedEvents.length).toBe(4);    

    expect(testTwoWheelDrive.getRightTrim()).toBe(0.05);
});