import json
from random import randint

from flask import Flask, send_from_directory, request, render_template
from flask_socketio import SocketIO


from serverBackEnd import backEnd


app = Flask(__name__)
socket_server = SocketIO(app)

backEndCode = backEnd.BackEnd()

usernameToSid = {}
sidToUsername = {}


def send_to_js(username, type, data):
    user_socket = usernameToSid.get(username,None)
    if user_socket:
        socket_server.emit(type, data, room=user_socket)


#endpoint called that will create a new player when a person logs on
@socket_server.on('register')
def got_message(username):
    usernameToSid[username] = request.sid
    sidToUsername[request.sid] = username
    print(username + " connected at: " + request.sid)
    response = backEndCode.newGuy()
    print("sending message to: " + request.sid)
    send_to_js(username, 'initialize', response)


@socket_server.on('disconnect')
def got_connection():
    if request.sid in sidToUsername:
        username = sidToUsername[request.sid]
        del sidToUsername[request.sid]
        del usernameToSid[username]
        print(username + " disconnected")

#post endpoint that will be called by Stephen using a json body
#body contains player id and location of player
#output will be a map for the player on where all other players and food are
#while also telling the player whether they are dead or not or if they have increased in size
@socket_server.on('update')
def updateShit(data):
    print("update Called")
    #data is array [x,y]
    username = sidToUsername[request.sid]
    message = {"nameid": username, "location": json.loads(data)}
    response = backEndCode.fromJSON(message)
    send_to_js(username, 'message', response)


@socket_server.on('print')
def printShit(data):
    print(data)


@app.route('/')
def index():
    return send_from_directory('templates', 'login.html')


@app.route('/game', methods=["POST", "GET"])
def game():
    if request.method == "POST":
        username = request.form.get('username')
    else:
        username = "guest" + str(randint(0, 100000))
    return render_template('index.html', username=username)


@app.route('/<path:filename>')
def static_files(filename):
    return send_from_directory('static', filename)


@app.errorhandler(404)
def page_not_found(e):
    # note that we set the 404 status explicitly
    return render_template('404.html'), 404

print("Python Server Running")
socket_server.run(app, port=8080, debug=True)
