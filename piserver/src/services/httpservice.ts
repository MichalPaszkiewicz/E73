import * as http from 'http';
import * as fs from "fs";
import { IAmAUserInterface } from '../framework/interfaces/iamauserinterface';
import { IAmACommand } from '../framework/interfaces/iamacommand';
import { IAmARobotEvent } from '../framework/interfaces/iamarobotevent';

export class HttpService implements IAmAUserInterface{

    private _onCommanded: (command: IAmACommand) => void;
    unFetchedEvents: IAmARobotEvent[] = [];

    constructor(port: number){
        var self = this;
        var requestHandler = (request, response) => {
            var requestData = "";
            request.on("data", (chunk) => { requestData += chunk.toString() })
            request.on("end", () => {
                if(request.url.indexOf(".js") > 0 || request.url.indexOf(".ts") > 0){
                    var content = fs.readFileSync("." + request.url, "utf-8");
                    response.writeHead(200, 'OK', { 'Content-Type': 'text/javascript' });
                    response.end(content, 'utf-8');
                    return;
                }
                if(request.url.indexOf(".html") > 0){
                    var content = fs.readFileSync("." + request.url, "utf-8");
                    response.writeHead(200, 'OK', { 'Content-Type': 'text/html' });
                    response.end(content, 'utf-8');
                    return;
                }
                if(request.url.indexOf("events") > 0){
                    var content = JSON.stringify(self.unFetchedEvents);
                    self.unFetchedEvents = [];                    
                    response.writeHead(200, "ok", {"Content-Type": "application/json"});
                    response.end(content, "utf-8");
                    return;
                }
                var jsonData = !!requestData ? JSON.parse(requestData) : "";
                var command = <IAmACommand>jsonData;

                self._onCommanded(command);

                response.writeHead(200, 'OK', { 'Content-Type': 'text/html' });
                response.end('woop');
            });
        
            response.setHeader('Access-Control-Allow-Origin', '*');
            response.setHeader('Access-Control-Request-Method', '*');
            response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
            response.setHeader('Access-Control-Allow-Headers', '*');
        }

        var server = http.createServer(requestHandler);

        server.listen(port, (err) => {
            if (err) {
                return console.log('something bad happened', err)
            }
            console.log(`server is listening on ${port}`)
        });
    }

    registerOnCommanded(callback: (command: IAmACommand) => void) {
        this._onCommanded = callback;
    }

    applyEvent(event: IAmARobotEvent){
        this.unFetchedEvents.push(event);
    }
}