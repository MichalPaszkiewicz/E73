import { FileStoreEventHandler } from "../../src/framework/services/filestoreeventhandler";
import { IAmARobotEvent } from "../../src/framework/interfaces/iamarobotevent";
import * as fs from "fs";

var testFileName = "test_file_name.json";

class TestRobotEvent implements IAmARobotEvent {
    name: string = "Test Robot Event";
}

test("file store event handler creates a file if none before", () => {
    var testFileStoreEventHandler = new FileStoreEventHandler(testFileName);

    var testEvent = new TestRobotEvent();

    testFileStoreEventHandler.handle(testEvent);

    expect(fs.existsSync(testFileName)).toBe(true);
    
    fs.unlinkSync(testFileName);
});

test("file store event handler creates a file with one record if none before", () => {
    var testFileStoreEventHandler = new FileStoreEventHandler(testFileName);

    var testEvent = new TestRobotEvent();

    testFileStoreEventHandler.handle(testEvent);

    var stringData = fs.readFileSync(testFileName, "utf-8");
    var jsonData = JSON.parse(stringData);

    expect(jsonData.length).toBe(1);

    fs.unlinkSync(testFileName);    
});
