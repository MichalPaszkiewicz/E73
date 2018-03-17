"use strict"

class ControlPermutation{
    constructor(forwardOn, backwardOn,leftOn, rightOn, leftMotorState, rightMotorState){
        this.forwardOn = forwardOn;
        this.backwardOn = backwardOn;
        this.leftOn = leftOn;
        this.rightOn = rightOn;
        this.leftMotorState = leftMotorState;
        this.rightMotorState = rightMotorState;
    }

    isEqual(forwardOn, backwardOn, leftOn, rightOn){
        return this.forwardOn == forwardOn &&
                this.backwardOn == backwardOn &&
                this.leftOn == leftOn &&
                this.rightOn == rightOn;
    }

    print(){
        var self = this;
        console.log(`     ${self.forwardOn ? 1 : 0}
  ${self.leftOn ? 1 : 0}     ${self.rightOn ? 1 : 0}
     ${self.backwardOn ? 1 : 0}`)
    }
}

class Robot{
    constructor(motor1, motor2){
        this._motor1 = motor1;
        this._motor2 = motor2;
        this._forwardOn = false;
        this._backwardOn = false;
        this._leftOn = false;
        this._rightOn = false;
        this._trimLeft = 0;
        this._trimRight = 0;
        this._trimIncrement = 0.05;
        this._speed = 1;
    }

    _updateMotor(motor, velocity){
        if(velocity > 0){
            motor.forward();
            motor.setSpeed(velocity);
        }
        else if(velocity < 0){
            motor.backward();
            motor.setSpeed(Math.abs(velocity));
        }
        else{
            motor.off();
        }
    }

    _updateMotors(){
        var self = this;
        var lowerSpeed = 0.5;

        // get untrimmed, unspecified motor velocities
        var controlPermutations = [
            new ControlPermutation(true, false, false, false, 1, 1),
            new ControlPermutation(true, true, false, false, 0, 0),
            new ControlPermutation(true, false, true, false, lowerSpeed, 1),
            new ControlPermutation(true, false, false, true, 1, lowerSpeed),
            new ControlPermutation(true, true, true, false, -1, 1),
            new ControlPermutation(true, true, false, true, 1, -1),
            new ControlPermutation(true, false, true, true, 1, 1),
            new ControlPermutation(true, true, true, true, 0, 0),
            new ControlPermutation(false, false, false, false, 0, 0),
            new ControlPermutation(false, true, false, false, -1, -1),
            new ControlPermutation(false, false, true, false, -1, 1),
            new ControlPermutation(false, false, false, true, 1, -1),
            new ControlPermutation(false, true, true, false, -lowerSpeed, -1),
            new ControlPermutation(false, true, false, true, -1, -lowerSpeed),
            new ControlPermutation(false, false, true, true, 0, 0),
            new ControlPermutation(false, true, true, true, -1, -1)
        ]

        var currentPermutation = controlPermutations.filter(cp => cp.isEqual(self._forwardOn, self._backwardOn, self._leftOn, self._rightOn))[0];
        currentPermutation.print();

        var leftMotorVelocity = currentPermutation.leftMotorState * self._speed * (1 - self._trimLeft);
        var rightMotorVelocity = currentPermutation.rightMotorState * self._speed * (1 - self._trimRight);

        console.print(`State: [${leftMotorVelocity}, ${rightMotorVelocity}]`);
        console.print(`Trim: [${self._trimLeft}, ${self._trimRight}`);
        console.print(`Speed: ${self._speed}`);

        self._updateMotor(self._motor1, leftMotorVelocity);
        self._updateMotor(self._motor2, rightMotorVelocity);
    }

    trimLeft(){
        //for aligning straight
        if(this._trimRight > 0){
            this._trimRight = Math.max(0, this._trimRight - this._trimIncrement);
        }
        else{
            this._trimLeft = Math.min(0.9, this._trimLeft + this._trimIncrement);
        }
        this._updateMotors();
    }

    trimRight(){
        //for aligning straight        
        if(this._trimLeft > 0){
            this._trimLeft = Math.max(0, this._trimLeft - this._trimIncrement);
        }
        else{
            this._trimRight = Math.min(0.9, this._trimRight + this._trimIncrement);
        }
        this._updateMotors();
    }

    setSpeed(newSpeed){
        this._speed = newSpeed;
        this._updateMotors();
    }

    forward(){
        this._forwardOn = true;
        this._updateMotors();
    }

    forwardOff(){
        this._forwardOn = false;
        this._updateMotors();
    }

    backward(){
        this._backwardOn = true;
        this._updateMotors();
    }

    backwardOff(){
        this._backwardOn = false;
        this._updateMotors();
    }

    left(){
        this._leftOn = true;
        this._updateMotors();
    }

    leftOff(){
        this.leftOn = false;
        this._updateMotors();
    }

    right(){
        this._rightOn = true;
        this._updateMotors();
    }

    rightOff(){
        this._rightOn = false;
        this._updateMotors();
    }

    off(){
        this._forwardOn = false;
        this._backwardOn = false;
        this._leftOn = false;
        this._rightOn = false;
        this._motor1.off();
        this._motor2.off();
    }   
}

exports.Robot = Robot;