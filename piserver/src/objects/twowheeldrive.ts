import {ISteerThings} from "../interfaces/isteerthings";
import {Command} from "./command";
import { IAmAMotor } from "../interfaces/iamamotor";
import { ControlPermutation } from "./controlpermutation";

export class TwoWheelDrive implements ISteerThings {

    private _leftMotor: IAmAMotor;
    private _rightMotor: IAmAMotor;
    private _forwardOn: boolean = false;
    private _backwardOn: boolean = false;
    private _leftOn: boolean = false;
    private _rightOn: boolean = false;
    private _trimLeft: number = 0;
    get leftTrim(){return this._trimLeft;};
    private _trimRight: number = 0;
    get rightTrim(){return this._trimRight;};
    private _trimIncrement: number = 0.05;
    private _speed: number = 1;
    get speed(){return this._speed;};
    private _speedDifference: number = 0.5;
    get speedDifference(){return this._speedDifference;};
    private _loggers: ((msg:string) => void)[] = [];

    constructor(leftMotor: IAmAMotor, rightMotor: IAmAMotor) {
        this._leftMotor = leftMotor;
        this._rightMotor = rightMotor;
    }

    attachLogger(logger: (msg:string) => void){
        this._loggers.push(logger);
    }

    clearLoggers(){
        this._loggers = [];
    }

    private _log(message: string){
        this._loggers.forEach((l) => l(message));
    }

    private _updateMotor(motor, velocity) {
        if (velocity > 0) {
            motor.forward();
            motor.setSpeed(velocity);
        }
        else if (velocity < 0) {
            motor.backward();
            motor.setSpeed(Math.abs(velocity));
        }
        else {
            motor.off();
        }
    }

    private _updateMotors() {
        var self = this;
        var speedDifference = this._speedDifference;

        // get untrimmed, unspecified motor velocities
        var controlPermutations = [
            new ControlPermutation(true, false, false, false, 1, 1),
            new ControlPermutation(true, true, false, false, 0, 0),
            new ControlPermutation(true, false, true, false, 1-speedDifference, 1),
            new ControlPermutation(true, false, false, true, 1, 1-speedDifference),
            new ControlPermutation(true, true, true, false, -1, 1),
            new ControlPermutation(true, true, false, true, 1, -1),
            new ControlPermutation(true, false, true, true, 1, 1),
            new ControlPermutation(true, true, true, true, 0, 0),
            new ControlPermutation(false, false, false, false, 0, 0),
            new ControlPermutation(false, true, false, false, -1, -1),
            new ControlPermutation(false, false, true, false, -1, 1),
            new ControlPermutation(false, false, false, true, 1, -1),
            new ControlPermutation(false, true, true, false, speedDifference - 1, -1),
            new ControlPermutation(false, true, false, true, -1, speedDifference - 1),
            new ControlPermutation(false, false, true, true, 0, 0),
            new ControlPermutation(false, true, true, true, -1, -1)
        ]

        var currentPermutation = controlPermutations.filter(cp => cp.isEqual(self._forwardOn, self._backwardOn, self._leftOn, self._rightOn))[0];
        self._log(currentPermutation.toString());

        var leftMotorVelocity = currentPermutation.leftMotorState * self._speed * (1 - self._trimLeft);
        var rightMotorVelocity = currentPermutation.rightMotorState * self._speed * (1 - self._trimRight);

        self._log(`State: [${leftMotorVelocity}, ${rightMotorVelocity}]`);
        self._log(`Trim: [${self._trimLeft}, ${self._trimRight}]`);
        self._log(`Speed: ${self._speed}`);

        self._updateMotor(self._leftMotor, leftMotorVelocity);
        self._updateMotor(self._rightMotor, rightMotorVelocity);
    }

    trimLeft() {
        if (this._trimRight > 0) {
            this._trimRight = Math.max(0, this._trimRight - this._trimIncrement);
        }
        else {
            this._trimLeft = Math.min(0.9, this._trimLeft + this._trimIncrement);
        }
        this._updateMotors();
    }

    trimRight() {
        if (this._trimLeft > 0) {
            this._trimLeft = Math.max(0, this._trimLeft - this._trimIncrement);
        }
        else {
            this._trimRight = Math.min(0.9, this._trimRight + this._trimIncrement);
        }
        this._updateMotors();
    }

    setSpeed(newSpeed) {
        this._speed = newSpeed;
        this._updateMotors();
    }

    forward() {
        this._forwardOn = true;
        this._updateMotors();
    }

    forwardOff() {
        this._forwardOn = false;
        this._updateMotors();
    }

    backward() {
        this._backwardOn = true;
        this._updateMotors();
    }

    backwardOff() {
        this._backwardOn = false;
        this._updateMotors();
    }

    left() {
        this._leftOn = true;
        this._updateMotors();
    }

    leftOff() {
        this._leftOn = false;
        this._updateMotors();
    }

    right() {
        this._rightOn = true;
        this._updateMotors();
    }

    rightOff() {
        this._rightOn = false;
        this._updateMotors();
    }

    setFullState(data){
        this._forwardOn = data.forwardOn;
        this._backwardOn = data.backwardOn;
        this._leftOn = data.leftOn;
        this._rightOn = data.rightOn;
        this._speed = data.speed;
        this._speedDifference = data.speedDifference;
        this._updateMotors();
    }

    off() {
        this._forwardOn = false;
        this._backwardOn = false;
        this._leftOn = false;
        this._rightOn = false;
        this._leftMotor.off();
        this._rightMotor.off();
    }

    getCommands(): Command[] {
        var self = this;
        return [
            new Command("/left/on", () => self.left()),
            new Command("/left/off", () => self.leftOff()),
            new Command("/right/on", () => self.right()),
            new Command("/right/off", () => self.rightOff()),
            new Command("/up/on", () => self.forward()),
            new Command("/up/off", () => self.forwardOff()),
            new Command("/down/on", () => self.backward()),
            new Command("/down/off", () => self.backwardOff()),
            new Command("/trim/left", () => self.trimLeft()),
            new Command("/trim/right", () => self.trimRight()),
            new Command("/speed", (requestData) => self.setSpeed(requestData)),
            new Command("/circle", (requestData) => self.setFullState(requestData))
        ]
    }
}