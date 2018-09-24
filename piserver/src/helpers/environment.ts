import { Robot } from "../objects/robot";
import * as fs from "fs";
import { Settings } from "../settings";

declare var process: any;

export class Environment{

    private static _robot: Robot;

    static exceptionCount = 0;

    static exit(){
        console.log("exiting process safely...");
        Environment._robot.off();
        console.log("robot turned off...");
        Environment._robot.clear();
        console.log("pins cleared...");
        console.log("exiting...");
        process.exit();
    }

    static setup(robot: Robot){
        Environment._robot = robot;
        process.on('SIGINT', () => {
            Environment.exit();
        });

        process.on("uncaughtException", (err) => {
            var time = new Date();
            var msg = time.toString() + "/r/n" + JSON.stringify(err);
            fs.appendFileSync("./errorlog.txt", msg);
            if(Environment.exceptionCount > Settings.uncaughtErrorHandleCount){
                console.log(msg);
                Environment.exit();
            }
            Environment.exceptionCount++;
        });
    }
}
