// content of index.js
const http = require('http');
var gpio = require("rpi-gpio");
const port = 3000;

//setup gpios for writing
class Motor{
	_enablePin;
	_forwardPin;
	_backwardPin;

	_goingForwards = false;
	_goingBackwards = false;

	constructor(enablePin, forwardPin, backwardPin){
		this._enablePin = enablePin;
		gpio.setup(enablePin, gpio.DIR_OUT, (e) => {console.log(e)});
		this._forwardPin = forwardPin;
		gpio.setup(forwardPin, gpio.DIR_OUT, (e) => {console.log(e)});
		this._backwardPin = backwardPin;
		gpio.setup(backwardPin, gpio.DIR_OUT, (e) => {console.log(e)});		
	}

	forward(){
		var self = this;
		if(self._goingBackwards){
			return;
		}
		gpio.write(self._forwardPin, true);
		gpio.write(self._backwardPin, false);
		gpio.write(self._enablePin, true);
		self._goingForwards = true;
	}

	backward(){
		var self = this;
		if(self._goingForwards){
			return;
		}
		gpio.write(self._backwardPin, true);
		gpio.write(self._forwardPin, false);
		gpio.write(self._enablePin, true);
		self._goingBackwards = true;
	}

	off(){
		var self = this;
		self._goingForwards = false;
		self._goingBackwards = false;
		gpio.write(self._enablePin, false);		
	}
}

var motor1 = new Motor(5, 24, 27); // forwards motor
var motor2 = new Motor(17, 6, 22);
var motor3 = new Motor(12, 23, 16); // side to side motor
var motor4 = new Motor(25, 13, 18);

// these 3 parameters need to be figured out by trial & error
const maximumVelocity = 10;
const poweredAcceleration = 5;
const frictionCoefficient = 0.3;

// parameter to set position we are aiming towards
var targetPosition = 0;

// stores current turn action of motor
var currentTurnData = {
	position: 0,
	velocity: 0,
	acceleration: 0
}

var getDeltaS = (u, v, a) => {
	return (v * v - u * u) / (2 * a)
}

var drive = () => {
	var calculatedAcceleration;

	var deltaS = getDeltaS(currentTurnData.velocity, 0, -currentTurnData.velocity * frictionCoefficient);

	if(currentTurnData.position > targetPosition + deltaS){
		motor3.backward();
		calculatedAcceleration = - poweredAcceleration;
	}
	else if(currentTurnData.position < targetPosition - deltaS){
		motor3.forward();
		calculatedAcceleration = poweredAcceleration;
	}
	else{
		motor3.off();
		calculatedAcceleration = -currentTurnData.velocity * frictionCoefficient;
	}

	var newTurnData = {
		position: currentTurnData.position + currentTurnData.velocity,
		velocity: Math.min(maximumVelocity, currentTurnData.velocity + currentTurnData.acceleration),
		acceleration: calculatedAcceleration
	}

	if(newTurnData.position != currentTurnData.position){
		console.log(`(${newTurnData.position}, ${newTurnData.velocity}, ${newTurnData.acceleration})`);
	}

	currentTurnData = newTurnData;

	setTimeout(() => drive(), 10)
}

var frontTurn = (turnPosition) => {
	targetPosition = turnPosition;
}

var requestResponses = [
	{url: "/left/on", response: () => console.log("left on")},
	{url: "/left/off", response: () => console.log("left off")},
	{url: "/right/on", response: () => console.log("right on")},
	{url: "/right/off", response: () => console.log("right off")},
	{url: "/up/on", response: () => console.log("up on")},
	{url: "/up/off", response: () => console.log("up off")},
	{url: "/down/on", response: () => console.log("down on")},
	{url: "/down/off", response: () => console.log("down off")},
	{url: "/turn", response: (d) => console.log("turning to: " + (+d))},
	{url: "/turn", response: frontTurn},
	{url: "/up/on", response: () => {
		motor1.forward();
	}},
	{url: "/up/off", response: () => {
		motor1.off();
	}},
	{url: "/down/on", response: () => {
		motor1.backward();
	}},
	{url: "/down/off", response: () => {
		motor1.off();
	}}
]

const requestHandler = (request, response) => {
	var requestData = "";

	request.on("data", (chunk) => { requestData += chunk.toString() })

	request.on("end", () => { 
		requestResponses
			.filter(rr => rr.url == request.url)
			.forEach(rr => rr.response(requestData))
		response.writeHead(200, 'OK', {'Content-Type': 'text/html'})
		response.end('woop')
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
    gpio.destroy(function() {
        console.log('All pins unexported');
    });
}

process.on('SIGINT', () => {
	closePins();
	process.exit();
})