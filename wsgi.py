from app.web import socketio, app
import sys

if __name__ == '__main__':
    socketio.run(app, debug=False, port=int(sys.argv[1]), host='0.0.0.0')