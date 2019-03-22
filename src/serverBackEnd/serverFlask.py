from flask import Flask, request, send_from_directory, render_template
import backEnd
app = Flask(__name__)


@app.route('/')
def index():
    return '<b>Hello World</b>!'


@app.route('/game')
def gameCall():
    return render_template("index.html")


@app.route('/frontendgui.js')
def frontEnd():
    string = "C:\\Users\\jacob\\IdeaProjects\\Semester_Project\\src\\phaserswap"
    return send_from_directory("frontendgui.js", string)


@app.route('/individual.js')
def player():
    string = "C:\\Users\\jacob\\IdeaProjects\\Semester_Project\\src\\phaserswap"
    return send_from_directory("individual.js", string)


@app.route('/themdots.js')
def dots():
    string = "C:\\Users\\jacob\\IdeaProjects\\Semester_Project\\src\\phaserswap"
    return send_from_directory("themdots.js", string)


@app.route('/playerupdate', methods=['POST'])
def update():
    postdata = request.body.read()
    response = backEnd.fromJSON(postdata)
    return response


@app.route('/newPlayerEndpoint', methods=['GET'])
def newPlayer():
    jsonResponse = backEnd.newGuy()
    return jsonResponse


if __name__ == "__main__":
    app.run(debug=True)
