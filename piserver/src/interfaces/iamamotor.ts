export interface IAmAMotor{
    forward();

    backward();

    off();

    setSpeed(value: number);
}