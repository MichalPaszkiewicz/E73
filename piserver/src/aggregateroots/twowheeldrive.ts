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

    private _lineMeasures: LineMeasure[];

    private founds = 0;
    private losts = 0;

    sense(sensation: LineLostSensation | LineFoundSensation): IAmARobotEvent[] {
        var self = this;

        if(!this._lineMeasures){
            this._lineMeasures = [];
            for(var i = 0; i < sensation.totalLineSensors; i++){
                this._lineMeasures.push(new LineMeasure(false));
            }
        }

        console.log(sensation);
        switch(sensation.name){
            // case LINE_FOUND_SENSATION_NAME:
            //     this._lineMeasures[sensation.lineSensorId].value = true;

            //     if(sensation.lineSensorId == 0){
            //         this.adjustLeft(0.5 + this._leftMotorVelocity - this._rightMotorVelocity );
            //     }
            //     else{
            //         this.adjustRight(Math.pow(1.1, this.founds) * 0.05 / (10 * this._leftMotorVelocity));
            //     }

            //     this.founds++;
            //     this.losts = 0;

            //     break;
            // case LINE_LOST_SENSATION_NAME:
            //     this._lineMeasures[sensation.lineSensorId].value = false;
                
            //     if(sensation.lineSensorId == 5){
            //         this.adjustRight(0.5 + this._rightMotorVelocity - this._leftMotorVelocity);
            //     }{
            //     this.adjustLeft(Math.pow(1.1, this.losts) * 0.05 / (10 * this._rightMotorVelocity));
            //     }

            //     this.losts++;
            //     this.founds = 0;

            //     break;

            case LINE_FOUND_SENSATION_NAME:
                this._lineMeasures[sensation.lineSensorId].value = true;
                this.adjust(this.getLinePosition());
                
                break;
            case LINE_LOST_SENSATION_NAME:
                this._lineMeasures[sensation.lineSensorId].value = false;
                this.adjust(this.getLinePosition());

                break;
        }

        var robotEvents = self.unprocessedEvents;
        self.unprocessedEvents = [];

        return robotEvents;
    }

    getLinePosition(){
        var ons = [];
        for(var i = 0; i < this._lineMeasures.length; i++){
            if(this._lineMeasures[i].value== true){
                ons.push(i);
            }
        }
        var sum = 0;
        if(ons.length == 0){
            return 0;
        }
        ons.forEach(o => sum+=o);
        var average = sum / this._lineMeasures.length;

        // -1 for left to +1 for right
        var normalised = 2 * average / (ons.length) - 1;

        return normalised;
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

    adjustTurnLeft(turnStrength: number){
        var self = this;

        self.unprocessedEvents.push(new MotorSpeedSetEvent(self.leftMotorId, -turnStrength));
        self.unprocessedEvents.push(new MotorSpeedSetEvent(self.rightMotorId, turnStrength));

        //self.unprocessedEvents.push(new MotorSpeedSetEvent(self.leftMotorId, Math.max(-1, self._leftMotorVelocity - turnStrength)));
        //self.unprocessedEvents.push(new MotorSpeedSetEvent(self.rightMotorId, Math.min(1, self._rightMotorVelocity + turnStrength)));
    }

    adjustTurnRight(turnStrength: number){
        var self = this;

        
        self.unprocessedEvents.push(new MotorSpeedSetEvent(self.leftMotorId, turnStrength));
        self.unprocessedEvents.push(new MotorSpeedSetEvent(self.rightMotorId, -turnStrength));

        //self.unprocessedEvents.push(new MotorSpeedSetEvent(self.rightMotorId, Math.max(-1, self._rightMotorVelocity - turnStrength)));
        //self.unprocessedEvents.push(new MotorSpeedSetEvent(self.leftMotorId, Math.min(1, self._leftMotorVelocity + turnStrength)));
    }


    private _onExtraEventsAdded: (e: IAmARobotEvent) => void;

    registerOnExtraEventsAdded(func: (e: IAmARobotEvent) => void){
        this._onExtraEventsAdded = func;
    }

    adjust(amount: number){
        console.log("adjust", amount);
        var self = this;
        if(amount < 0){
            self.adjustTurnLeft(0.3 * Math.abs(amount));
        }

        if(amount > 0){
            self.adjustTurnRight(0.3 * Math.abs(amount));
        }

        setTimeout(() => {
            if(self._onExtraEventsAdded){
                self._onExtraEventsAdded(new MotorSpeedSetEvent(self.leftMotorId, 0.1));
                self._onExtraEventsAdded(new MotorSpeedSetEvent(self.rightMotorId, 0.1));
            }
        }, 100 * Math.abs(amount));
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