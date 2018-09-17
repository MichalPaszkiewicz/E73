# Read Me, Please. Pleeeeeease

Put the whole piserver folder on the R-PI

Open a command prompt in the location of package.json on the R-PI

run `npm install`

If typescript is not installed (`tsc -v` returns error), run `npm install typescript -g`

run `tsc -p build/client`

run `tsc -p build/server`

when finished, run `node dist/server.js`


the controller can then be opened up by going to http://[ip of r-pi]:3000/client.html


Arrow keys on a keyboard should move the robot around, or it can be controlled using the circular controller. The "start recording" and "end recording" buttons can be used to record a sequence of events that will be replayable afterwards.


After physically connecting up the robot to the motozero hat, go to src/server.ts and modify the ids of the motors that are in use to "leftMotor" and "rightMotor" (picking the correct ones).


If a motor is doing the opposite of what is expected, find the motor in server.js and switch the forward and backward pins (2nd and 3rd parameter in the motor constructors [lines 54 - 57]). Or you could reverse the wiring of the motors.


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

run `tsc -p build/simulation`

run `node sim/simulation.js`

## Virtual line tracker

You can test out the virtual line tracker by putting this code on a machine with a decent browser.

run `tsc -p build/virtualrobot`

And then open up "virtual.html". You can draw lines by clicking on the box. The robot will start moving when it first detects a line.

## todo

Check that direction of bottom area of circle is as required

Create switch between line sensor/control mode

Shutdown/restart option on controller

## Further information

Please see ./src/zCODING_GUIDE.md and ./src/hats/*/README.md for further information.