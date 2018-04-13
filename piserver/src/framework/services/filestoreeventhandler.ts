import { IAmARobotEventHandler } from "../interfaces/iamaroboteventhandler";
import { IAmARobotEvent } from "../interfaces/iamarobotevent";
import * as fs from "fs";

export class FileStoreEventHandler implements IAmARobotEventHandler {
    handles: string = "*";

    constructor(public fileName: string){

    }

    handle(robotEvent: IAmARobotEvent) {
        var self = this;
        var robotEvents = self.getRobotEvents();

        robotEvents.push(robotEvent);
        var stringifiedNewData = JSON.stringify(robotEvents);

        fs.writeFileSync(self.fileName, stringifiedNewData, "utf-8");
    }

    /// if using getRobotEvents to load up control module, make sure to do it before registering as a RobotEventHandler.
    getRobotEvents(): IAmARobotEvent[]{
        var self = this;
        if(!fs.existsSync(self.fileName)){
            fs.writeFileSync(self.fileName, "[]", "utf-8");
        }
        var textData = fs.readFileSync(self.fileName, "utf-8");
        var events = <IAmARobotEvent[]>JSON.parse(textData);

        return events;
    }
}