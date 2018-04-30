import { Vector2d } from "../helpers/vector";

export class MyLine{
    points: Vector2d[] = [];

    constructor(public lineWidth: number){
    
    }

    addPoint(point: Vector2d){
        this.points.push(point);
    }

    draw(context: CanvasRenderingContext2D){
        var self = this;
        if(this.points.length == 0){
            return;
        }
        context.beginPath();
        context.strokeStyle = "rgb(255,0,0)";
        context.lineWidth = self.lineWidth;
        context.moveTo(this.points[0].x, this.points[0].y);        
        for(var i = 1; i < this.points.length; i++){
            context.lineTo(this.points[i].x, this.points[i].y);
        }
        context.stroke();
        context.closePath();
        context.strokeStyle = "black";
        context.lineWidth = 1;
    }
}