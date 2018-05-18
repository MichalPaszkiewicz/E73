import {IStoreThings} from "../interfaces/istorethings";
import * as fs from "fs";

export class MultiFileStorageService implements IStoreThings {
    constructor(public directory: string){

    }

    saveItem(name: string, document: any) {
        var newText = JSON.stringify(document);
        fs.writeFileSync(this.directory + "/" + name, newText, "utf-8");
    }

    getItem(name: string) {
        if(!fs.existsSync(this.directory + "/" + name)){
            return null;
        }
        var text = fs.readFileSync(this.directory + "/" + name, "utf-8");
        return JSON.parse(text);
    }
}