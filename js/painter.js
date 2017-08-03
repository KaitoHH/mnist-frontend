'use strict';
var painter = document.getElementById('painter');
var ctx = painter.getContext('2d');
var painting = false;
var scale = painter.clientHeight / painter.height;
var points = [];
var lastStroke;

ctx.fillStyle = 'white';
//ctx.strokeStyle = '#7f7f7f';
//ctx.shadowColor = 'black';
ctx.fillRect(0, 0, painter.width, painter.height);
ctx.lineJoin = ctx.lineCap = 'round';
ctx.lineWidth = 1.1;
//ctx.shadowBlur = 0.1;


function getPos(e) {
    if (e.type == 'touchmove' || e.type == 'touchstart') {
        e.offsetX = e.touches[0].pageX - e.touches[0].target.offsetLeft;
        e.offsetY = e.touches[0].pageY - e.touches[0].target.offsetTop;
    }
    return {
        'X': Math.floor(e.offsetX / scale),
        'Y': Math.floor(e.offsetY / scale)
    };
}

function paintStart(e) {
    lastStroke = ctx.getImageData(0, 0, painter.width, painter.width);
    painting = true;
    var pos = getPos(e);
    //ctx.moveTo(pos.X, pos.Y);
    points.push(pos);
}

function paintFinish() {
    painting = false;
    points.length = 0;
}

function paintOnGoing(e) {
    var pos = getPos(e);
    if (painting) {
        //ctx.lineTo(pos.X, pos.Y);
        //ctx.stroke();
        ctx.putImageData(lastStroke, painter.width, painter.height);
        points.push(pos);
        ctx.beginPath();
        for (var i = 1; i < points.length; i++) {
            ctx.lineTo(points[i].X, points[i].Y);
        }
        ctx.stroke();
    }
}

painter.addEventListener('mousedown', paintStart);
painter.addEventListener('mousemove', paintOnGoing);
painter.addEventListener('mouseup', paintFinish);
painter.addEventListener('mouseleave', paintFinish);

painter.addEventListener('touchstart', paintStart);
painter.addEventListener('touchmove', paintOnGoing);
painter.addEventListener('touchend', paintFinish);
painter.addEventListener('touchleave', paintFinish);

document.getElementById('export').addEventListener('click', function() {
    ctx.fillRect(0, 0, painter.width, painter.height);
});
