export var drawCircleControl = (context) => {
    context.clearRect(0,0,400,400);
    context.beginPath();
    context.arc(200, 200, 150, 0, 2 * Math.PI);
    var grd = context.createRadialGradient(200, 200, 30, 200, 200, 160);
    grd.addColorStop(0.000, 'yellow');
    grd.addColorStop(1.000, 'red');
    context.fillStyle = grd;
    context.fill();
    context.stroke();
    context.beginPath();
    context.arc(200, 200, 50, 0, 2 * Math.PI);
    context.fillStyle = "white";
    context.fill();
    context.font = "16px Arial"
    context.fillStyle = "black";
    context.textAlign = "center";
    context.fillText("[1,1]", 200, 40);
    context.fillText("[1,-1]", 375, 200);
    context.fillText("[-1,1]", 25, 200);
    context.fillText("[-1,-1]", 200, 370);
    context.fillText("[1,0]", 330, 90);
    context.fillText("[-1,0]", 330, 320);
    context.fillText("[0,-1]", 70, 320);
    context.fillText("[0,1]", 70, 90);
}