import { IAmAMotor } from "../hats/motozero/interfaces/iamamotor";
import { ControlPermutation } from "./controlpermutation";
import { IAmAnAggregateRoot } from "../framework/interfaces/iamanaggregateroot";
import { IAmACommand } from "../framework/interfaces/iamacommand";
import { IAmARobotEvent } from "../framework/interfaces/iamarobotevent";
import { IAmASensation } from "../framework/interfaces/iamasensation";
import { TRIM_LEFT_COMMAND_NAME } from "../commands/trimleftcommand";
import { TRIM_RIGHT_COMMAND_NAME } from "../commands/trimrightcommand";
import { DIRECTION_KEY_COMMAND_NAME, DirectionKeyCommand, DirectionKeyDirection } from "../commands/directionkeycommand";
import { CLICK_CIRCLE_COMMAND_NAME, ClickCircleCommand } from "../commands/clickcirclecommand";
import { MotorSpeedSetEvent } from "../hats/motozero/events/motorspeedsetevent";
import { MotorTurnedOffEvent } from "../hats/motozero/events/motorturnedoffevent";
import { SET_FULL_STATE_COMMAND_NAME, SetFullStateCommand } from "../commands/setfullstatecommand";

export class TwoWheelDrive implements IAmAnAggregateRoot{

    id?: string;
    handle(command: IAmACommand): IAmARobotEvent[] {
        var self = this;
        switch(command.name){
            case TRIM_LEFT_COMMAND_NAME:
                self.trimLeft();
                break;
            case TRIM_RIGHT_COMMAND_NAME:
                self.trimRight();
                break;
            case DIRECTION_KEY_COMMAND_NAME:
                var directionKey = <DirectionKeyCommand>command;
                switch(directionKey.direction){
                    case DirectionKeyDirection.UP:
                        if(directionKey.isKeyDown){
                            self.forward();
                        }
                        else{
                            self.forwardOff();
                        }
                        break;
                    case DirectionKeyDirection.DOWN:
                        if(directionKey.isKeyDown){
                            self.backward();
                        }
                        else{
                            self.backwardOff();
                        }
                        break;
                    case DirectionKeyDirection.LEFT:
                        if(directionKey.isKeyDown){
                            self.left();
                        }
                        else{
                            self.leftOff();
                        }
                        break;
                    case DirectionKeyDirection.RIGHT:
                        if(directionKey.isKeyDown){
                            self.right();
                        }
                        else{
                            self.rightOff();
                        }
                        break;
                }
                break;
            case SET_FULL_STATE_COMMAND_NAME:
                var setFullState = <SetFullStateCommand>command;
                self.setFullState(
                    setFullState.forwardOn,
                    setFullState.backwardOn,
                    setFullState.leftOn,
                    setFullState.rightOn,
                    setFullState.speed,
                    setFullState.speedDifference);
                break;
            default:
                break;
        }

        var robotEvents = self.unprocessedEvents;
        self.unprocessedEvents = [];

        return robotEvents;
    }
    sense(sensation: IAmASensation): IAmARobotEvent[] {
        throw new Error("Method not implemented.");
    }
    apply(robotEvent: IAmARobotEvent) {
    }

    leftMotorId = "leftMotor";
    rightMotorId = "rightMotor";
    private _forwardOn: boolean = false;
    private _backwardOn: boolean = false;
    private _leftOn: boolean = false;
    private _rightOn: boolean = false;
    private _trimLeft: number = 0;
    getLeftTrim(){return this._trimLeft;};
    private _trimRight: number = 0;
    getRightTrim(){return this._trimRight;};
    private _trimIncrement: number = 0.05;
    private _speed: number = 1;
    getSpeed(){return this._speed;};
    private _speedDifference: number = 0.5;
    getSpeedDifference(){return this._speedDifference;};
    private _loggers: ((msg:string) => void)[] = [];

    clearLoggers(){
        this._loggers = [];
    }

    unprocessedEvents: IAmARobotEvent[] = [];

    private _updateMotor(motorId: string, velocity: number) {
        if (velocity != 0) {
            this.unprocessedEvents.push(new MotorSpeedSetEvent(motorId, velocity));
        }
        else {
            this.unprocessedEvents.push(new MotorTurnedOffEvent(motorId));
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

        var currentPermutation = controlPermutations.filter(cp => cp.isEqual(
            this._forwardOn, 
            this._backwardOn, 
            this._leftOn, 
            this._rightOn))[0];

        var leftMotorVelocity = currentPermutation.leftMotorState * self._speed * (1 - self._trimLeft);
        var rightMotorVelocity = currentPermutation.rightMotorState * self._speed * (1 - self._trimRight);

        self._updateMotor(self.leftMotorId, leftMotorVelocity);
        self._updateMotor(self.rightMotorId, rightMotorVelocity);
    }

    trimLeft() {
        var trimRight = this._trimRight;
        var trimLeft = this._trimLeft;
        if (this._trimRight > 0) {
            this._trimRight = Math.max(0, this._trimRight - this._trimIncrement);
        }
        else {
            this._trimLeft = Math.min(0.9, this._trimLeft + this._trimIncrement);
        }
        this._updateMotors();
    }

    trimRight() {
        var trimRight = this._trimRight;
        var trimLeft = this._trimLeft;
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

    setFullState(
        forwardOn: boolean, 
        backwardOn: boolean, 
        leftOn: boolean, 
        rightOn: boolean, 
        speed: number, 
        speedDifference: number){
        this._forwardOn = forwardOn;
        this._backwardOn = backwardOn;
        this._leftOn = leftOn;
        this._rightOn = rightOn;
        this._speed = speed;
        this._speedDifference = speedDifference;
        this._updateMotors();
    }
}