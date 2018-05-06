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
import { MotorSpeedSetEvent, MOTOR_SPEED_SET_EVENT_NAME } from "../hats/motozero/events/motorspeedsetevent";
import { MotorTurnedOffEvent, MOTOR_TURNED_OFF_EVENT_NAME } from "../hats/motozero/events/motorturnedoffevent";
import { SET_FULL_STATE_COMMAND_NAME, SetFullStateCommand } from "../commands/setfullstatecommand";
import { TURNED_OFF_EVENT_NAME } from "../framework/events/turnedoffevent";
import { LINE_FOUND_SENSATION_NAME, LineFoundSensation } from "../hats/linesensor/sensations/linefoundsensation";
import { LINE_LOST_SENSATION_NAME, LineLostSensation } from "../hats/linesensor/sensations/linelostsensation";
import { LineMeasure } from "./valueobjects/linemeasure";
import { DirectionKeyToFunc } from "./directionkeytofunc";
import { LineMeasureArray } from "./entities/linemeasurearray";
import { LineMeasureArrayMemory } from "./entities/linemeasurearraymemory";
import { Vector2d } from "../helpers/vector";

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

                var directionKeyMap: DirectionKeyToFunc[] = [
                    new DirectionKeyToFunc(DirectionKeyDirection.UP, true, () => self.forward()),
                    new DirectionKeyToFunc(DirectionKeyDirection.UP, false, () => self.forwardOff()),
                    new DirectionKeyToFunc(DirectionKeyDirection.DOWN, true, () => self.backward()),
                    new DirectionKeyToFunc(DirectionKeyDirection.DOWN, false, () => self.backwardOff()),
                    new DirectionKeyToFunc(DirectionKeyDirection.LEFT, true, () => self.left()),
                    new DirectionKeyToFunc(DirectionKeyDirection.LEFT, false, () => self.leftOff()),
                    new DirectionKeyToFunc(DirectionKeyDirection.RIGHT, true, () => self.right()),
                    new DirectionKeyToFunc(DirectionKeyDirection.RIGHT, false, () =>  self.rightOff())
                ];
                directionKeyMap.filter(dk => dk.matchesCommand(directionKey)).forEach(dk => dk.func());
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
        }

        var robotEvents = self.unprocessedEvents;
        self.unprocessedEvents = [];

        return robotEvents;
    }

    private _lineMeasures: LineMeasureArrayMemory;

    private founds = 0;
    private losts = 0;

    sense(sensation: LineLostSensation | LineFoundSensation): IAmARobotEvent[] {
        var self = this;

        if(!this._lineMeasures){
            this._lineMeasures = new LineMeasureArrayMemory(sensation.totalLineSensors, 5);
        }

        switch(sensation.name){
            case LINE_FOUND_SENSATION_NAME:
                this._lineMeasures.setValue(sensation.lineSensorId, true); 
                this.adjust(this._lineMeasures.getLineCentre());
                break;
            case LINE_LOST_SENSATION_NAME:
                this._lineMeasures.setValue(sensation.lineSensorId, false);
                this.adjust(this._lineMeasures.getLineCentre());
                break;
        }

        var robotEvents = self.unprocessedEvents;
        self.unprocessedEvents = [];

        return robotEvents;
    }

    apply(robotEvent: IAmARobotEvent) {
        switch(robotEvent.name){
            case MOTOR_SPEED_SET_EVENT_NAME:
                var speedSet = <MotorSpeedSetEvent>robotEvent;
                if(speedSet.motorId == this.leftMotorId){
                    this._leftMotorVelocity = speedSet.speed;
                }
                if(speedSet.motorId == this.rightMotorId){
                    this._rightMotorVelocity = speedSet.speed;
                }
                break;
            case MOTOR_TURNED_OFF_EVENT_NAME:
                var motorTurnedOff = <MotorTurnedOffEvent>robotEvent;
                if(motorTurnedOff.motorId == this.leftMotorId){
                    this._leftMotorVelocity = 0;
                }
                if(motorTurnedOff.motorId == this.rightMotorId){
                    this._rightMotorVelocity = 0;
                }
                break;
            case TURNED_OFF_EVENT_NAME:
                this._leftMotorVelocity = 0;
                this._rightMotorVelocity = 0;
                this._forwardOn = false;
                this._backwardOn = false;
                this._leftOn = false;
                this._rightOn = false;
                this._speed = 0;
                break;
        }
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
    _leftMotorVelocity: number = 0;
    _rightMotorVelocity: number = 0;

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

    adjustTurnLeft(turnStrength: number){
        this.unprocessedEvents.push(new MotorSpeedSetEvent(this.leftMotorId, -turnStrength));
        this.unprocessedEvents.push(new MotorSpeedSetEvent(this.rightMotorId, turnStrength));
    }

    adjustTurnRight(turnStrength: number){
        this.unprocessedEvents.push(new MotorSpeedSetEvent(this.leftMotorId, turnStrength));
        this.unprocessedEvents.push(new MotorSpeedSetEvent(this.rightMotorId, -turnStrength));
    }


    private _onExtraEventsAdded: (e: IAmARobotEvent) => void;

    registerOnExtraEventsAdded(func: (e: IAmARobotEvent) => void){
        this._onExtraEventsAdded = func;
    }

    private _reverseMode = false;
    private _leftPreference = true;

    private _timer: NodeJS.Timer;

    adjust(vector: Vector2d){
        var self = this;

        if(this._reverseMode == true){
            return;
        }
        if(self._timer){
            clearTimeout(self._timer);
        }
        if(vector.y < 0){
            self._reverseMode = true;
            
            var lineCentre = self._lineMeasures.getLineCentre();

            var preferenceTested = Math.abs(vector.x) < 0.2 ? 
                Math.abs(lineCentre.x) > 0.05 ? lineCentre.x > 0 ? 0.2 : -0.2 :
                self._leftPreference ? -1 : 1 : vector.x;

            self._onExtraEventsAdded(new MotorSpeedSetEvent(self.leftMotorId, -0.1));
            self._onExtraEventsAdded(new MotorSpeedSetEvent(self.rightMotorId, -0.1));

            self._timer = setTimeout(() => {
                if(vector.x < 0){
                    self.adjustTurnLeft(0.5 * Math.abs(preferenceTested));
                }
                if(vector.x > 0){
                    self.adjustTurnRight(0.5 * Math.abs(preferenceTested));
                }
                self._timer = setTimeout(() => {
                    if(self._onExtraEventsAdded){
                        self._onExtraEventsAdded(new MotorSpeedSetEvent(self.leftMotorId, 0.15));
                        self._onExtraEventsAdded(new MotorSpeedSetEvent(self.rightMotorId, 0.15));
                    }

                    self._reverseMode = false;
                }, 400 * Math.abs(preferenceTested));
            }, 200);
            return;
        }

        if(vector.x < 0){
            self.adjustTurnLeft(0.5 * Math.abs(vector.x));
        }
        if(vector.x > 0){
            self.adjustTurnRight(0.5 * Math.abs(vector.x));
        }

        self._timer = setTimeout(() => {
            if(self._onExtraEventsAdded){
                self._onExtraEventsAdded(new MotorSpeedSetEvent(self.leftMotorId, 0.15));
                self._onExtraEventsAdded(new MotorSpeedSetEvent(self.rightMotorId, 0.15));
            }
        }, 200 * Math.abs(vector.x));
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