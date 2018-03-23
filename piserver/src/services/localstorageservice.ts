import {IStoreThings} from "../interfaces/istorethings";

export class LocalStorageService implements IStoreThings {
    saveItem(name: string, document: any) {
        localStorage.setItem(name, JSON.stringify(document));
    }
    getItem(name: string) {
        return JSON.parse(localStorage.getItem(name));
    }
}