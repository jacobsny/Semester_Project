import json
from random import randint
from flask import Flask, send_from_directory, request, render_template
from flask_socketio import SocketIO, emit


from serverBackEnd import backEnd


app = Flask(__name__)
app.config['SECRET_KEY'] = 'aseopjikvnjkavcwoawojaf389012348679'
socket_server = SocketIO(app)

backEndCode = backEnd.BackEnd()
for i in range(120):
    backEndCode.newFood()

usernameToSid = {}
sidToUsername = {}


def handle_message():
    socket_server.emit('message', json.dumps(sendMessage('update', "")), broadcast=True)


def sendMessage(type, response):
    return {"action": type, "message": (response)}

#endpoint called that will create a new player when a person logs on
@socket_server.on('register')
def got_message(username):
    usernameToSid[username] = request.sid
    sidToUsername[request.sid] = username
    print(username + " connected")
    response = backEndCode.newGuy()
    #send_to_js(username, 'initialize', response)
    response = json.dumps(sendMessage('init', response))
    emit('message', response)


@socket_server.on('controller')
def controller(data):
    data = json.loads(data)
    nameID = data['nameid']
    if nameID in backEndCode.players:
        action = data['keyPress']
        if action == 'UP':
            backEndCode.players[nameID].up()
        if action == 'DOWN':
            backEndCode.players[nameID].down()
        if action == 'LEFT':
            backEndCode.players[nameID].left()
        if action == 'RIGHT':
            backEndCode.players[nameID].right()


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
    data = json.loads(data)
    nameOfPlayer = data["nameid"]
    loc = data["location"]
    if nameOfPlayer in backEndCode.players:
        response = backEndCode.fromJSON(nameOfPlayer, loc)
        response = json.dumps(sendMessage('message', response))
        emit('message', response)


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


