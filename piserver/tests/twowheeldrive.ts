import {Motor} from "../src/hats/motozero/motor";
import {FakePin, fakePinFactory} from "../src/services/fakepinfactory";
import {TwoWheelDrive} from "../src/aggregateroots/twowheeldrive";
import { MotorSpeedSetEvent, MOTOR_SPEED_SET_EVENT_NAME } from "../src/hats/motozero/events/motorspeedsetevent";
import { LineFoundSensation } from "../src/hats/linesensor/sensations/linefoundsensation";
import { LineLostSensation } from "../src/hats/linesensor/sensations/linelostsensation";


test("turning drive forwards turns forward both wheels", () => {
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
    var testTwoWheelDrive = new TwoWheelDrive();

    testTwoWheelDrive.forward();
    testTwoWheelDrive.trimLeft();

    expect(testTwoWheelDrive.unprocessedEvents.length).toBe(4);

    expect(testTwoWheelDrive.getLeftTrim()).toBe(0.05);
});

test("trim right trims the right motor", () => {
    var testTwoWheelDrive = new TwoWheelDrive();

    testTwoWheelDrive.forward();    
    testTwoWheelDrive.trimRight();

    expect(testTwoWheelDrive.unprocessedEvents.length).toBe(4);    

    expect(testTwoWheelDrive.getRightTrim()).toBe(0.05);
});

test("line found on single line tracker shifts drive left", () => {
    var twoWheelDrive = new TwoWheelDrive();

    var events = twoWheelDrive.sense(new LineFoundSensation(0, 1));
    events.forEach(e => twoWheelDrive.apply(e));

    expect(twoWheelDrive._leftMotorVelocity).toBeLessThan(twoWheelDrive._rightMotorVelocity);
});

test("line lost on single line tracker shifts drive right", () => {
    var twoWheelDrive = new TwoWheelDrive();

    var events = twoWheelDrive.sense(new LineLostSensation(0, 1));
    events.forEach(e => twoWheelDrive.apply(e));

    expect(twoWheelDrive._rightMotorVelocity).toBeLessThan(twoWheelDrive._leftMotorVelocity);
});