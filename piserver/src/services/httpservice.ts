import {RequestResponse} from "../objects/requestresponse";
import * as http from 'http';
import * as fs from "fs";

export class HttpService{

    constructor(port: number, requestResponses: RequestResponse[]){
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
                var jsonData = !!requestData ? JSON.parse(requestData) : "";
                requestResponses.filter(rr => rr.url == request.url)
                    .forEach(rr => rr.response(jsonData));
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
}