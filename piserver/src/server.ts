"use strict"

declare var process: any;

const port = 3000;

import {motorFactory} from "./hats/motozero/motorfactory";
import {TwoWheelDrive} from "./aggregateroots/twowheeldrive";
import {Robot} from "./objects/robot";
import {HttpService} from "./services/httpservice";
import { DefaultDomainService } from "./framework/services/defaultdomainservice";
import { DefaultControlModule } from "./framework/services/defaultcontrolmodule";
import { MotorEventHandler } from "./hats/motozero/motoreventhandler";
import { TwoWheelDriveCommandHandler } from "./commandhandlers/twowheeldrivecommandhandler";
import { LearningService } from "./services/learningservice";

var motor1 = motorFactory("motor1", 5, 24, 27);
var motor2 = motorFactory("motor2", 17, 6, 22);
var motor3 = motorFactory("motor3", 12, 23, 16);
var motor4 = motorFactory("motor4", 25, 13, 18);

var motorEventHandler = new MotorEventHandler([motor1, motor2]);

var domainService = new DefaultDomainService();
var controlModule = new DefaultControlModule(domainService);
controlModule.registerRobotEventHandler(motorEventHandler);
controlModule.registerCommandHandler(new TwoWheelDriveCommandHandler());

var learningService = new LearningService();
learningService.attachToControlModule(controlModule);

var httpService = new HttpService(port);

var robot = new Robot(controlModule, [
	httpService
], [
	
]);

process.on('SIGINT', () => {
	robot.off();
	process.exit();
});