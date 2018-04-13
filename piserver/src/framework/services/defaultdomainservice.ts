import {IAmADomainService} from "../interfaces/iamadomainservice";
import {IAmAnAggregateRoot} from "../interfaces/iamanaggregateroot";
import {IAmARobotEvent} from "../interfaces/iamarobotevent";

export class DefaultDomainService implements IAmADomainService {
    private _aggregateRoots: IAmAnAggregateRoot[] = [];

    private _sessionEvents: IAmARobotEvent[] = [];

    getAggregateRoot<T extends IAmAnAggregateRoot>(c: new (id?: string) => T, callback: (aggregateRoot: T) => void, id?: string) {
        var self = this;
        var similarAggregateRoots = self._aggregateRoots
            .filter((ar) => ar instanceof c)
            .filter((ar) => ar.id === id);

        if(similarAggregateRoots.length == 0){
            var newAggregateRoot = new c(id);
            
            self._sessionEvents.forEach(se => newAggregateRoot.apply(se));
            
            self._aggregateRoots.push(newAggregateRoot);
            callback(<T>newAggregateRoot);
            return;
        }
        callback(<T>similarAggregateRoots[0]);
    }
    applyToAllAggregates(event: IAmARobotEvent) {
        this._sessionEvents.push(event);
        this._aggregateRoots.forEach(ar => ar.apply(event));
    }
    clear() {
        this._sessionEvents = [];
        this._aggregateRoots = [];
    }
}