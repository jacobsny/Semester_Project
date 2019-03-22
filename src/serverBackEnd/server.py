import bottle
from bottle import route, run, template, post, request, get
import backEnd


@route('/')
def index():
    return '<b>Hello World</b>!'


@route('/game')
def gameCall():
    string = "C:\\Users\\jacob\\IdeaProjects\\Semester_Project\\src\\phaserswap"
    return bottle.static_file("index.html",root= string)


@route('/frontendgui.js')
def frontEnd():
    string = "C:\\Users\\jacob\\IdeaProjects\\Semester_Project\\src\\phaserswap"
    return bottle.static_file("frontendgui.js",root=string)


@route('/individual.js')
def player():
    string = "C:\\Users\\jacob\\IdeaProjects\\Semester_Project\\src\\phaserswap"
    return bottle.static_file("individual.js", root=string)


@route('/themdots.js')
def dots():
    string = "C:\\Users\\jacob\\IdeaProjects\\Semester_Project\\src\\phaserswap"
    return bottle.static_file("themdots.js", root=string)


@route('/hello/<name>')
def testingInput(name):
    return template('<b>Hello {{name}}</b>!', name=name)


@post('/playerupdate')
def update():
    postdata = request.body.read()
    response = backEnd.fromJSON(postdata)
    return response


@get('/newPlayerEndpoint')
def newPlayer():
    jsonResponse = backEnd.newGuy()
    return jsonResponse


run(host='localhost', port=8080)
