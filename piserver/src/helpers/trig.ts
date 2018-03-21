export var toPolarCoordinates = (x, y) => {
        var sideLength = 400;
        var middlePoint = {x: sideLength/2, y: sideLength/2};

        var r = Math.sqrt(Math.pow(x - middlePoint.x,2) + Math.pow(y - middlePoint.y,2));
        var angle = Math.atan2(x - sideLength / 2, y - sideLength / 2);

        

    return {r: r, angle: angle}
}

export var getCommand = (x, y) => {

    var polarCoordinates = toPolarCoordinates(x, y);

    var speed = Math.min(1, Math.max(0, polarCoordinates.r - 50) / 100);
    
    console.log("speed", speed);
    console.log("angle", polarCoordinates.angle);

    return {speed: speed}
}