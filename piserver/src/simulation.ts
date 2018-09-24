"use strict"

const port = 3000;

import {fakeMotorFactory} from "./hats/motozero/fakemotorfactory";
import {Robot} from "./objects/robot";
import {HttpService} from "./services/httpservice";
import { DefaultControlModule } from "./framework/services/defaultcontrolmodule";
import { DefaultDomainService } from "./framework/services/defaultdomainservice";
import { MotorEventHandler } from "./hats/motozero/motoreventhandler";
import { TwoWheelDriveCommandHandler } from "./commandhandlers/twowheeldrivecommandhandler";
import { LogEventHandler } from "./eventhandlers/logeventhandler";
import { LearningService } from "./services/learningservice";
import { PowerCommandHandler } from "./commandhandlers/powercommandhandler";
import { Environment } from "./helpers/environment";

var motor1 = fakeMotorFactory("leftMotor", 5, 24, 27);
var motor2 = fakeMotorFactory("rightMotor", 17, 6, 22);
var motor3 = fakeMotorFactory("motor3", 12, 23, 16);
var motor4 = fakeMotorFactory("motor4", 25, 13, 18);

var motorEventHandler = new MotorEventHandler([motor1, motor2]);

var httpService = new HttpService(port);

var domainService = new DefaultDomainService();
var controlModule = new DefaultControlModule(domainService);

controlModule.registerRobotEventHandler(motorEventHandler);
controlModule.registerCommandHandler(new TwoWheelDriveCommandHandler());

var logEventHandler = new LogEventHandler();
controlModule.registerRobotEventHandler(logEventHandler);

var learningService = new LearningService();
learningService.attachToControlModule(controlModule);

controlModule.registerCommandHandler(new PowerCommandHandler());

var robot = new Robot(controlModule, [
	httpService
], [

]);

Environment.setup(robot);