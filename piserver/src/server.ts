"use strict"

declare var process: any;

const port = 3000;

import {motorFactory} from "./services/motorfactory";
import {TwoWheelDrive} from "./objects/twowheeldrive";
import {Robot} from "./objects/robot";
import {HttpService} from "./services/httpservice";

var motor1 = motorFactory(5, 24, 27);
var motor2 = motorFactory(17, 6, 22);
var motor3 = motorFactory(12, 23, 16);
var motor4 = motorFactory(25, 13, 18);

var drive = new TwoWheelDrive(motor1, motor2);
var robot = new Robot(drive);

var httpService = new HttpService(port, robot.getRequestResponses());

process.on('SIGINT', () => {
	robot.off();
	process.exit();
});