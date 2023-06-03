let start = {}
var hammertime = new Hammer(canvas);
hammertime.get('pan').set({ direction: Hammer.DIRECTION_ALL });
window.started = false

hammertime.on('panstart', function (ev) {
    if (playing) {
        if (!started) {
            start = getMousePos(canvas, ev['center']);
            window.x1 = start.x;
            window.y1 = start.y;
        }
    }
});
hammertime.on('panmove', function (ev) {
    if (playing) {
        if (!started) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.beginPath();
            context.rect(x1, y1, ev['deltaX'], ev['deltaY']);
            context.strokeStyle = "red";
            context.stroke();
        }
    }
});
hammertime.on('panend', function (ev) {
    if (playing) {
        if (!started) {
            window.ww = ev['deltaX']
            window.hh = ev['deltaY']
            if (ww < 0) {
                window.x1 = x1 + ww;
                window.ww = -ww;
            }
            if (hh < 0) {
                window.y1 = y1 + hh;
                window.hh = -hh;
            }
            sendImg();
            context.clearRect(0, 0, canvas.width, canvas.height);
            window.started = true
        }
    }

});

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect(),
        scaleX = canvas.width / rect.width,
        scaleY = canvas.height / rect.height;

    return {
        x: (evt.x - rect.left) * scaleX,
        y: (evt.y - rect.top) * scaleY
    }
}