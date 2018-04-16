import {fakeMotorFactory} from "./hats/motozero/fakemotorfactory";
import {TwoWheelDrive} from "./aggregateroots/twowheeldrive";
import {Robot} from "./objects/robot";
import { DefaultControlModule } from "./framework/services/defaultcontrolmodule";
import { DefaultDomainService } from "./framework/services/defaultdomainservice";
import { LearningService } from "./services/learningservice";
import { LocalStorageService } from "./services/localstorageservice";
import { FrontEndCommandHandler } from "./commandhandlers/frontendcommandhandler";

var motor1 = fakeMotorFactory("motor1", 5, 24, 27);
var motor2 = fakeMotorFactory("motor2", 17, 6, 22);
var motor3 = fakeMotorFactory("motor3", 12, 23, 16);
var motor4 = fakeMotorFactory("motor4", 25, 13, 18);

var domainService = new DefaultDomainService();
var controlModule = new DefaultControlModule(domainService);

var robot = new Robot(controlModule, [], []);

var serverUrl = window.location.origin;

var cvs = <HTMLCanvasElement>document.getElementById("controlCanvas");
var context = cvs.getContext("2d");

controlModule.registerCommandHandler(new FrontEndCommandHandler(serverUrl, context));

const LEARNING_STORE_STRING = "LearntSequences";
var localStorageService = new LocalStorageService();
var sequences = localStorageService.getItem(LEARNING_STORE_STRING);

var learningService = new LearningService();
learningService.attachToControlModule(controlModule);
learningService.sequences = sequences || [];
learningService.registerOnSequenceAdded((s) => {
	localStorageService.saveItem(LEARNING_STORE_STRING, learningService.sequences);
});

export var learningModule = learningService;
export var ctrlModule = controlModule;
export var canvas = cvs;
export var ctx = context;