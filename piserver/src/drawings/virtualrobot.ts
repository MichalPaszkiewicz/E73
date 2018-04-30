import { Motor } from "../hats/motozero/motor";
import { Vector2d } from "../helpers/vector";
import { IAmAPin } from "../framework/interfaces/iamapin";
import { FakePin } from "../services/fakepinfactory";
import { LineSensorArray } from "../hats/linesensor/linesensorarray";
import { checkPositionColour} from "../helpers/canvas";
import { IAmAControlModule } from "../framework/interfaces/iamacontrolmodule";
import { SetFullStateCommand } from "../commands/setfullstatecommand";

export class VirtualRobot{
    position: Vector2d = new Vector2d(100, 100);
    direction: Vector2d = new Vector2d(1, 1);

    started = false;

    draw(context: CanvasRenderingContext2D){
        var self = this;
        context.beginPath();
        context.arc(self.position.x, self.position.y, 10, 0, 2 * Math.PI);
        context.stroke();
        context.beginPath();
        context.moveTo(self.position.x, self.position.y);
        var frontPoint = self.position.add(self.direction.multiplyBy(30));
        context.lineTo(frontPoint.x, frontPoint.y);
        var rightFront = frontPoint.add(self.direction.getPerpendicularVector().multiplyBy(32));
        var leftFront = frontPoint.add(self.direction.getPerpendicularVector().multiplyBy(32).reverse());
        context.moveTo(leftFront.x, leftFront.y);
        context.lineTo(rightFront.x, rightFront.y);
        context.stroke();
        context.closePath();
        var perp = self.direction.getPerpendicularVector().multiplyBy(16);
        for(var i = 0; i < 5; i++){
            context.beginPath();            
            var gr = 200 - 50 * i;
            context.fillStyle = `rgb(${gr},${gr},${gr})`;
            var pos = leftFront.add(perp.multiplyBy(i));
            context.arc(pos.x, pos.y, 3, 0, 2* Math.PI);
            context.fill();
            context.closePath();            
        }
    }

    update(context: CanvasRenderingContext2D, controlModule: IAmAControlModule, lineSensorArray: LineSensorArray<FakePin>, leftMotor: Motor<FakePin>, rightMotor: Motor<T>){
        var self = this;
        var leftSpeed = leftMotor.getSpeed() * 5;
        var rightSpeed = rightMotor.getSpeed() * 5;

        var frontPoint = self.position.add(self.direction.multiplyBy(30));
        var leftFront = frontPoint.add(self.direction.getPerpendicularVector().multiplyBy(32).reverse());
        var perp = self.direction.getPerpendicularVector().multiplyBy(16);

        var pos = leftFront;
        for(var i = 0; i < 5; i++){
            var colourCheckPos = pos.add(self.direction.multiplyBy(2));
            var pin = (<FakePin>lineSensorArray._lineSensors[i]._pin);
            var isLine = checkPositionColour(context, colourCheckPos) ? 1 : 0;
            if(isLine != pin.value()){
                if(self.started == false){
                    controlModule.handle(new SetFullStateCommand(true, false, false, false, 0.2, 0));
                    self.started = true;
                }
                pin.triggerWatch(null, checkPositionColour(context, colourCheckPos) ? 1 : 0);
            }            
            pos = pos.add(perp);            
        }

        var leftVelocity = self.direction.multiplyBy(leftSpeed);
        var rightVelocity = self.direction.multiplyBy(rightSpeed);

        var averageVelocity = leftVelocity.add(rightVelocity).multiplyBy(0.5);
        var rotationAngle = (leftSpeed - rightSpeed) / 60;

        self.direction = self.direction.rotate(rotationAngle);

        self.position = self.position.add(averageVelocity);
    }
}