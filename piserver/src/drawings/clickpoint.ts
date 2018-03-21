export var drawClickPoint = (context, x, y) => {
    context.beginPath();
    var grd = context.createRadialGradient(x, y, 0, x, y, 10);
    grd.addColorStop(0.000, 'black');
    grd.addColorStop(0.6, "black");
    grd.addColorStop(1.000, 'rgba(0,0,0,0)');
    context.fillStyle = grd;
    context.arc(x, y, 15,0, 2*Math.PI);    
    context.fill();
}