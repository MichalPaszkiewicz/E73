import {DefaultDomainService} from "../../src/framework/services/defaultdomainservice";
import { IAmAnAggregateRoot } from "../../src/framework/interfaces/iamanaggregateroot";
import { IAmACommand } from "../../src/framework/interfaces/iamacommand";
import { IAmASensation } from "../../src/framework/interfaces/iamasensation";
import { IAmARobotEvent } from "../../src/framework/interfaces/iamarobotevent";

class TestAggregateRoot implements IAmAnAggregateRoot {
    id?: string;
    counter: number = 0;

    handle(command: IAmACommand) {
        throw new Error("Method not implemented.");
    }
    sense(sensation: IAmASensation) {
        throw new Error("Method not implemented.");
    }
    apply(robotEvent: IAmARobotEvent) {
        this.counter++;
    }
}

test("Domain service gets an aggregate root of a certain type", () => {
    var domainService = new DefaultDomainService();

    domainService.getAggregateRoot(TestAggregateRoot, (ar) => {

        expect(ar instanceof TestAggregateRoot).toBe(true);

    });

})

test("Domain service applies events to aggregate root", () => {
    var domainService = new DefaultDomainService();
    var testAggregate;    
    domainService.getAggregateRoot(TestAggregateRoot, (ar) => {
        testAggregate = ar;        
    });
    
    domainService.applyToAllAggregates({name:"someEvent"});
    
    domainService.getAggregateRoot(TestAggregateRoot, (ar) => {
        expect(ar).toBe(testAggregate);        
        expect(ar.counter).toBe(1);    
    });
});

test("Domain service updates an aggregate root as it is created", () => {
    var domainService = new DefaultDomainService();
    domainService.clear();

    domainService.applyToAllAggregates({name:"someEvent"});

    domainService.getAggregateRoot(TestAggregateRoot, (ar) => {
        expect(ar.counter).toBe(1);
    })
});

test("clear clears domain service", () => {
    var domainService = new DefaultDomainService();
    domainService.getAggregateRoot(TestAggregateRoot, (ar) => {});
    
    domainService.applyToAllAggregates({name:"someEvent"});
    domainService.clear();

    domainService.getAggregateRoot(TestAggregateRoot, (ar) => {
        expect(ar.counter).toBe(0);    
    });
});