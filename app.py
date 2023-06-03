from flask import Flask, render_template, request
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

output_id = 0

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/detect_circles')
def detect_circles():
    return render_template('detect_circles.html')

@app.route('/tracking')
def tracking():
    return render_template('tracking.html')

@app.route('/input')
def input():
    return render_template('input.html')

@app.route('/output')
def output():
    return render_template('output.html')

@socketio.on('output_id')
def out_id(a):
    global output_id
    output_id = request.sid

@socketio.on("circles")
def circles(data):
    global output_id
    emit("circles_draw", data, room=output_id)

@socketio.on("track")
def track(data):
    ciao=0

if __name__ == '__main__':
    socketio.run(app, debug=False)