export var toPolarCoordinates = (x, y) => {
        var sideLength = 400;
        var middlePoint = {x: sideLength/2, y: sideLength/2};

        var r = Math.sqrt(Math.pow(x - middlePoint.x,2) + Math.pow(y - middlePoint.y,2));
        var angle = Math.atan2(x - sideLength / 2, y - sideLength / 2);     

    return {r: r, angle: angle}
}

class PolarSpeedAdjustment{
    constructor(
        public maxAngle: number,
        public forwardOn: boolean,
        public backwardOn: boolean,
        public leftOn: boolean,
        public rightOn: boolean,
        public calculateSpeedDifference: (angle: number) => number
        ){

        }
}

export var getCommand = (x, y) => {

    var polarCoordinates = toPolarCoordinates(x, y);

    var speed = Math.min(1, Math.max(0, polarCoordinates.r - 50) / 100);
    
    var adjustments: PolarSpeedAdjustment[] = [
        new PolarSpeedAdjustment(-Math.PI / 2, true, false, true, false, (angle) => 4 * (angle + Math.PI) / Math.PI),
        new PolarSpeedAdjustment(0, false, true, true, false, (angle) => (- 4 * angle / Math.PI)),
        new PolarSpeedAdjustment(Math.PI / 2,false, true, false, true, (angle) => (4 * angle / Math.PI)),
        new PolarSpeedAdjustment(Math.PI, true, false, false, true, (angle) => 4 * (Math.PI - angle) / Math.PI)
    ]

    var result: any = {speed: speed};

    for(var i = 0; i < adjustments.length; i++){
        if(adjustments[i].maxAngle >= polarCoordinates.angle){
            result.forwardOn = adjustments[i].forwardOn;
            result.backwardOn = adjustments[i].backwardOn;
            result.leftOn = adjustments[i].leftOn;
            result.rightOn = adjustments[i].rightOn;
            result.speedDifference = adjustments[i].calculateSpeedDifference(polarCoordinates.angle)
            break;
        }
    }

    return result;
}