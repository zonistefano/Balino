const socket = io();

socket.on('connect', function () {
    console.log('connected...')
});

socket.on('disconnect', function () {
    console.log('disconnected...')
});

const FPS = 20;
setInterval(() => {
    if (playing) {
        sendImg()
    } else {
        context.clearRect(0, 0, videoIn.width, videoIn.height);
        circumferenceClear();
    }
}, 1000 / FPS);

function sendImg() {
    width = videoIn.width;
    height = videoIn.height;
    context.drawImage(videoIn, 0, 0, width, height);
    eval();
}

function eval() {
    let src = cv.imread(canvas);
    context.clearRect(0, 0, width, height);
    circumferenceClear();
    let circles = new cv.Mat();
    cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, 0);
    // You can try more different parameters
    cv.HoughCircles(src, circles, cv.HOUGH_GRADIENT, 1, parseFloat(minDist.value), parseFloat(param1.value), parseFloat(param2.value), parseFloat(minR.value), parseFloat(maxR.value));
    // draw circles
    let circlesJSON = { circles: [], height: height, width: width }; // create an empty JSON object

    for (let i = 0; i < circles.cols; ++i) {
        let x = circles.data32F[i * 3];
        let y = circles.data32F[i * 3 + 1];
        let radius = circles.data32F[i * 3 + 2];
        circumferenceStart(x, y, radius);

        // create a new circle object with x, y, and radius properties
        let circle = { x: x, y: y, r: radius };
        // add the circle object to the JSON array
        circlesJSON.circles.push(circle);
    }
    socket.emit('circles', circlesJSON)
    console.log(circlesJSON)
    src.delete(); circles.delete();
}