import { Vector2d } from "./vector";

export var checkPositionColour: (context: CanvasRenderingContext2D, v: Vector2d) => boolean = (context: CanvasRenderingContext2D, v: Vector2d) => {
    var imgData = context.getImageData(v.x, v.y, 1, 1).data;
    
    return imgData[0] > 200 && imgData[1] == 0 && imgData[2] == 0;
}
