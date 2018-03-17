# HOW TO USE

Put client.html + client.js on a computer/controller.


Edit the `serverUrl` in client.js to have the port of the R-PI instead of "localhost"


Put package.json, motor.js, robot.js && server.js on the R-PI


Open a command prompt in the location of server.js on the R-PI


run `npm install`


when finished, run `node server.js`


open up client.html on the computer/controller.


Up and down arrow keys should move robot forwards + backwards, the slider in the display should change direction of the wheels. 


If it is doing the opposite of what is expected, find the motor in server.js and switch the forward and backward pins (2nd and 3rd parameter in the motor constructors [lines 54 - 57]).