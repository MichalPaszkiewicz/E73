import {IAmAnAggregateRoot} from "./iamanaggregateroot";
import {IAmARobotEvent} from "./iamarobotevent";

export interface IAmADomainService{
    getAggregateRoot<T extends IAmAnAggregateRoot>(c: {new(id?: string): T; }, callback: (aggregateRoot: T) => void, id?: string);

    applyToAllAggregates(event: IAmARobotEvent);

    clear();
}