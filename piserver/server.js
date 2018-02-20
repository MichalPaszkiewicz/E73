// content of index.js
const http = require('http');
const port = 3000;

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
		// todo: turn Motor backward
		calculatedAcceleration = - poweredAcceleration;
	}
	else if(currentTurnData.position < targetPosition - deltaS){
		// todo: turn Motor forward
		calculatedAcceleration = poweredAcceleration;
	}
	else{
		// todo: turn Motor off
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
	{url: "/turn", response: frontTurn}
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
