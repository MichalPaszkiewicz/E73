import {fakeMotorFactory} from "./hats/motozero/fakemotorfactory";
import {TwoWheelDrive} from "./aggregateroots/twowheeldrive";
import {Robot} from "./objects/robot";
import { DefaultControlModule } from "./framework/services/defaultcontrolmodule";
import { DefaultDomainService } from "./framework/services/defaultdomainservice";
import { LearningService } from "./services/learningservice";
import { LocalStorageService } from "./services/localstorageservice";
import { FrontEndCommandHandler } from "./commandhandlers/frontendcommandhandler";
import { Keyboard } from "./userinterfaces/keyboard";

var controlModule = new DefaultControlModule(new DefaultDomainService());

var robot = new Robot(controlModule, [
	new Keyboard()
], []);

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