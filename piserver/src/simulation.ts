"use strict"

declare var process: any;

const port = 3000;

import {fakeMotorFactory} from "./services/fakemotorfactory";
import {TwoWheelDrive} from "./objects/twowheeldrive";
import {Robot} from "./objects/robot";
import {HttpService} from "./services/httpservice";

var motor1 = fakeMotorFactory(5, 24, 27);
var motor2 = fakeMotorFactory(17, 6, 22);
var motor3 = fakeMotorFactory(12, 23, 16);
var motor4 = fakeMotorFactory(25, 13, 18);

var drive = new TwoWheelDrive(motor1, motor2);
drive.attachLogger(console.log);
var robot = new Robot(drive);

var httpService = new HttpService(port, robot.getCommands());

process.on('SIGINT', () => {
	robot.off();
	process.exit();
});