import json
import socket
from threading import Thread
from serverBackEnd import backEnd
from random import randint

from flask import Flask, send_from_directory, request, render_template
from flask_socketio import SocketIO

import eventlet

eventlet.monkey_patch()

app = Flask(__name__)
socket_server = SocketIO(app)

usernameToSid = {}
sidToUsername = {}


@socket_server.on('register')
def got_message(username):
    usernameToSid[username] = request.sid
    sidToUsername[request.sid] = username
    print(username + " connected")
    message = {"username": username, "action": "connected"}


@socket_server.on('disconnect')
def got_connection():
    if request.sid in sidToUsername:
        username = sidToUsername[request.sid]
        del sidToUsername[request.sid]
        del usernameToSid[username]
        print(username + " disconnected")
        message = {"username": username, "action": "disconnected"}


@socket_server.on('update')
def updateShit(data):
    #data is array [x,y]
    username = sidToUsername[request.sid]
    message = {"nameid": username, "location": json.loads(data)}
    response = backEnd.fromJSON(message)
    user_socket = usernameToSid.get(username, None)
    if user_socket:
        socket_server.emit('message', response, room=user_socket)


@app.route('/')
def index():
    return send_from_directory('templates', 'login.html')


@app.route('/game', methods=["POST", "GET"])
def game():
    if request.method == "POST":
        username = request.form.get('username')
    else:
        username = "guest" + str(randint(0, 100000))
    return render_template('index.html')


@app.route('/<path:filename>')
def static_files(filename):
    return send_from_directory('static', filename)
#post endpoint that will be called by Stephen using a json body
#body contains player id and location of player
#output will be a map for the player on where all other players and food are
#while also telling the player whether they are dead or not or if they have increased in size
@app.route('/playerupdate', methods=['POST'])
def update():
    postdata = request.body.read()
    response = backEnd.fromJSON(postdata)
    return response

#endpoint called that will create a new player when a person logs on
@app.route('/newPlayerEndpoint', methods=['GET'])
def newPlayer():
    jsonResponse = backEnd.newGuy()
    return jsonResponse


print("Python Server Running")
socket_server.run(app, port=8080, debug=True)
