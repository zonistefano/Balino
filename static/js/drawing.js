var out = 0;
var circle = 0;
var drawIn = 0;
var rectan = 0;
var m_rectan = 0;

function circleStart(x, y, r) {
    out = Raphael(div_out);
    div_out.style.backgroundColor = 'black';
    circle = out.circle(x, y, r);
    // Sets the fill attribute of the circle to red (#f00)
    circle.attr("fill", "#f00");
    // Sets the stroke attribute of the circle to red
    circle.attr("stroke", "#f00");
    circle.g = circle.glow({'width': 10, 'fill': true, 'color': 'red'});
}

function circleUpdate(x,y) {
    circle.animate({ cx: x, cy: y }, 100);
    circle.g.remove();
    circle.g = circle.glow({'width': 10, 'fill': true, 'color': 'red'});
}

function circleClear() {
    circle.g.remove();
    circle.remove();
    div_out.style.backgroundColor = '';
}

function rectangleStart(x,y, w, h) {
    drawIn = Raphael(div_in);
    rectan = drawIn.rect(x, y, w, h, 1);
    rectan.attr({'stroke': 'red', 'stroke-width': 2});
}

function rectangleUpdate(x, y, w, h) {
    rectan.animate({'x': x, 'y': y, 'width': w, 'height': h }, 100);
}

function rectangleClear() {
    rectan.remove();
}

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

function m_rectangleStart(x1, y1, x2, y2, x3, y3, x4, y4) {
    var path = "M" + x1 + "," + y1 + "L" + x2 + "," + y2 + "L" + x3 + "," + y3 + "L" + x4 + "," + y4 + "L" + x1 + "," + y1;
    drawIn = Raphael(div_in);
    m_rectan = drawIn.path(path);
    m_rectan.attr({'stroke': 'red', 'stroke-width': 2});
}

function m_rectangleUpdate(x1, y1, x2, y2, x3, y3, x4, y4) {
    var path = "M" + x1 + "," + y1 + "L" + x2 + "," + y2 + "L" + x3 + "," + y3 + "L" + x4 + "," + y4 + "L" + x1 + "," + y1;
    m_rectan.animate({'path': path}, 100);
}

function m_rectangleClear() {
    m_rectan.remove();
}