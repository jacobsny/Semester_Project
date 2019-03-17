import bottle
from bottle import route, run, template, post, request, get
import backEnd
import requests


@route('/')
def index():
    return '<b>Hello World</b>!'


@route('/game')
def index():
    return bottle.static_file("index.html", root="C:\\Users\\jacob\\IdeaProjects\\Semester_Project\\src\\phaserswap")


@route('/frontendgui.js')
def index():
    return bottle.static_file("frontendgui.js",
                              root="C:\\Users\\jacob\\IdeaProjects\\Semester_Project\\src\\phaserswap")


@route('/individual.js')
def index():
    return bottle.static_file("individual.js", root="C:\\Users\\jacob\\IdeaProjects\\Semester_Project\\src\\phaserswap")


@route('/themdots.js')
def index():
    return bottle.static_file("themdots.js", root="C:\\Users\\jacob\\IdeaProjects\\Semester_Project\\src\\phaserswap")


@route('/hello/<name>')
def index(name):
    return template('<b>Hello {{name}}</b>!', name=name)


@post('/playerupdate')
def index():
    postdata = request.body.read()
    response = backEnd.fromJSON(postdata)
    return response


@get('/newPlayerEndpoint')
def index():
    jsonResponse = backEnd.newGuy()
    return jsonResponse


run(host='localhost', port=8080, debug=True)
