"use strict"

import * as http from 'http';
const port = 3000;
import {Motor} from "./motor";
import {Robot} from "./robot";

var motor1 = new Motor(5,24,27);
var motor2 = new Motor(17, 6, 22);
var motor3 = new Motor(12, 23, 16);
var motor4 = new Motor(25, 13, 18);

var robot = new Robot(motor1, motor2);

var requestResponses = [
	{url: "/left/on", response: () => robot.left()},
	{url: "/left/off", response: () => robot.leftOff()},
	{url: "/right/on", response: () => robot.right()},
	{url: "/right/off", response: () => robot.rightOff()},
	{url: "/up/on", response: () => robot.forward()},
	{url: "/up/off", response: () => robot.forwardOff()},
	{url: "/down/on", response: () => robot.backward()},
	{url: "/down/off", response: () => robot.backwardOff()},
	{url: "/trim/left", response: () => robot.trimLeft()},
	{url: "/trim/right", response: () => robot.trimRight()},
	{url: "/speed", response: (requestData) => {
		robot.setSpeed(+requestData);
	}}
]

const requestHandler = (request, response) => {
	var requestData = "";
	request.on("data", (chunk) => { requestData += chunk.toString() })
	request.on("end", () => { 
		requestResponses.filter(rr => rr.url == request.url)
						.forEach(rr => rr.response(requestData));
		response.writeHead(200, 'OK', {'Content-Type': 'text/html'});
		response.end('woop');
	});
  
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Request-Method', '*');
  response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
  response.setHeader('Access-Control-Allow-Headers', '*');
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }
  console.log(`server is listening on ${port}`)
})


function closePins() {
    robot.off();
}

process.on('SIGINT', () => {
	closePins();
	process.exit();
})