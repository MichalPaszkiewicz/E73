// content of index.js
const http = require('http')
const port = 3000

var frontTurn = (turnPosition) => {

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
	{url: "/turn", response: (d) => frontTurn}
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
