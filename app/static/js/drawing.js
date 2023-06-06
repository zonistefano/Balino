function circumferenceStart(x,y,r) {
    ctx_ci.beginPath();
    ctx_ci.arc(x, y, r, 0, 2 * Math.PI, false);
    ctx_ci.strokeStyle = "red";
    ctx_ci.lineWidth = 2;
    ctx_ci.stroke();
}

function circumferenceClear() {
    ctx_ci.clearRect(0, 0, videoIn.width, videoIn.height);
}