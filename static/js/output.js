const socket = io();

socket.on('connect', function () {
    console.log('connected...')
    socket.emit('output_id', '')
});

socket.on('disconnect', function () {
    console.log('disconnected...')
});

socket.on('circles_draw', function (c) {
    console.log('------')
    console.log(c)
    output.height = c.height;
    output.width = c.width;
    ctx.clearRect(0, 0, c.width, c.height);
    c["circles"].forEach((element) => {
        console.log(element)
        ctx.beginPath();
        ctx.arc(element["x"], element["y"], element["r"], 0, 2 * Math.PI);
        ctx.strokeStyle = "red";
        ctx.stroke();
    });
});