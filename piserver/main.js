// content of index.js
const http = require('http')
const port = 3000

const requestHandler = (request, response) => {
  switch(request.url){
	case "/left/on":
		console.log("left on");
		break;
	case "/left/off":
		console.log("left off");
		break;
	case "/right/on":
		console.log("right on");
		break;
	case "/right/off":
		console.log("right off");
		break;
	default:
		console.log(request.url);
  }
  
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Request-Method', '*');
  response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
  response.setHeader('Access-Control-Allow-Headers', '*');
  response.end('woop')
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})
