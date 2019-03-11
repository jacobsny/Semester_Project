from bottle import route, run, template, post, request, get


@route('/')
def index():
    return ('<b>Hello World</b>!')


@route('/hello/<name>')
def index(name):
    return template('<b>Hello {{name}}</b>!', name=name)

@post('/playerupdate')
def index():
    postdata = request.body.read()
    #responese = backEnd.fromJSON(postData)
    #return response

@get('/newPlayerEndpoint')
def index():
    return #backEnd.newGuy method


run(host='localhost', port=8080)
