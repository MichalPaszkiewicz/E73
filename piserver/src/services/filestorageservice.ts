import {IStoreThings} from "../interfaces/istorethings";
import * as fs from "fs";

export class FileStorageService implements IStoreThings {
    constructor(public filePath: string){
        if(!fs.existsSync(filePath)){
            fs.writeFileSync(filePath, {}, "utf-8");
        }
    }

    saveItem(name: string, document: any) {
        var text = fs.readFileSync(this.filePath, "utf-8");
        var obj = JSON.parse(text);
        obj[name] = document;
        var newText = JSON.stringify(obj);
        fs.writeFileSync(this.filePath, newText, "utf-8");
    }

    getItem(name: string) {
        var text = fs.readFileSync(this.filePath, "utf-8");
        var obj = JSON.parse(text);
        return obj[name];
    }
}