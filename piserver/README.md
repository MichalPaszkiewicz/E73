# Read Me, Please. Pleeeeeease

Put client.html + client.js on a computer/controller.


Edit the `serverUrl` in client.js to have the port of the R-PI instead of "localhost"


Put the whole piserver folder on the R-PI

Open a command prompt in the location of package.json on the R-PI

run `npm install`

If typescript is not installed (`tsc -v` returns error), run `npm install typescript -g`

run `tsc -p buildclient`

run `tsc -p buildserver`

when finished, run `node dist/server.js`


open up client.html on the computer/controller.


Up and down arrow keys should move robot forwards + backwards, the slider in the display should change direction of the wheels. 


If it is doing the opposite of what is expected, find the motor in server.js and switch the forward and backward pins (2nd and 3rd parameter in the motor constructors [lines 54 - 57]).


## how to run tests

you will need to install jest

`npm install jest -g`

You will probably need to install typescript locally

`npm install typescript`

`jest`

You can run the tests while you code by running

`jest --watchAll`

## Simulation?

There is an option for building and running a "simulation". This is essentially the same as the standard server, but does not require access to pins (so can be run on any machine).

To set it up:

run `tsc -p buildsimulation`

run `node sim/simulation.js`