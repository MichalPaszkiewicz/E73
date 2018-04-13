import {DefaultControlModule} from "../../src/framework/services/defaultcontrolmodule";
import { DefaultDomainService } from "../../src/framework/services/defaultdomainservice";
import { IAmACommand } from "../../src/framework/interfaces/iamacommand";
import { IAmACommandHandler } from "../../src/framework/interfaces/iamacommandhandler";
import { IAmADomainService } from "../../src/framework/interfaces/iamadomainservice";
import { IAmASensation } from "../../src/framework/interfaces/iamasensation";
import { IAmASensationHandler } from "../../src/framework/interfaces/iamasensationhandler";
import { IAmARobotEventHandler } from "../../src/framework/interfaces/iamaroboteventhandler";
import { IAmARobotEvent } from "../../src/framework/interfaces/iamarobotevent";

class TestCommand implements IAmACommand {
    name: string = "TestCommand";
}

class TestCommandHandler implements IAmACommandHandler {
    handles = ["TestCommand"];
    counter: number = 0;
    handle(trigger: IAmACommand, domainService: IAmADomainService): IAmARobotEvent[] {
        this.counter++;
        return [];
    }
}

test("DefaultControlModule's Handle calls registered command handler", () => {
    var domainService = new DefaultDomainService();
    var controlModule = new DefaultControlModule(domainService);
    var testCommandHandler = new TestCommandHandler();

    controlModule.registerCommandHandler(testCommandHandler);
    controlModule.handle(new TestCommand());

    expect(testCommandHandler.counter).toBe(1);
});

test("DefaultControlModule's Handle calls wildcard command handler", () => {
    var domainService = new DefaultDomainService();
    var controlModule = new DefaultControlModule(domainService);
    var testCommandHandler = new TestCommandHandler();
    testCommandHandler.handles = ["*"];

    controlModule.registerCommandHandler(testCommandHandler);
    controlModule.handle(new TestCommand());

    expect(testCommandHandler.counter).toBe(1);
});

class TestSensation implements IAmASensation{
    name: string = "TestSensation";
}

class TestSensationHandler implements IAmASensationHandler {
    handles = ["TestSensation"];
    counter: number = 0;
    handle(trigger: IAmASensation, domainService: IAmADomainService): IAmARobotEvent[] {
        this.counter++;
        return [];
    }
}

test("DefaultControlModule's sense calls registered sense handler", () => {
    var domainService = new DefaultDomainService();
    var controlModule = new DefaultControlModule(domainService);
    var testSensationHandler = new TestSensationHandler();

    controlModule.registerSensationHandler(testSensationHandler);
    controlModule.sense(new TestSensation());
    
    expect(testSensationHandler.counter).toBe(1);
});

test("DefaultControlModule's sense calls wildcard sense handler", () => {
    var domainService = new DefaultDomainService();
    var controlModule = new DefaultControlModule(domainService);
    var testSensationHandler = new TestSensationHandler();
    testSensationHandler.handles = ["*"];

    controlModule.registerSensationHandler(testSensationHandler);
    controlModule.sense(new TestSensation());
    
    expect(testSensationHandler.counter).toBe(1);
});

class TestRobotEvent implements IAmARobotEvent {
    name: string = "TestRobotEvent";
}

class TestRobotEventHandler implements IAmARobotEventHandler {
    handles = ["TestRobotEvent"];
    counter: number = 0;
    handle(robotEvent: IAmARobotEvent) {
        this.counter++;
    }
}

test("DefaultControlModule's signal calls registered robot event handler",  () => {
    var domainService = new DefaultDomainService();
    var controlModule = new DefaultControlModule(domainService);
    var testRobotEventHandler = new TestRobotEventHandler();

    controlModule.registerRobotEventHandler(testRobotEventHandler);
    controlModule.signal(new TestRobotEvent());

    expect(testRobotEventHandler.counter).toBe(1);
});

test("DefaultControlModule's signal calls wildcard robot event handler",  () => {
    var domainService = new DefaultDomainService();
    var controlModule = new DefaultControlModule(domainService);
    var testRobotEventHandler = new TestRobotEventHandler();
    testRobotEventHandler.handles = ["*"];

    controlModule.registerRobotEventHandler(testRobotEventHandler);
    controlModule.signal(new TestRobotEvent());

    expect(testRobotEventHandler.counter).toBe(1);
});