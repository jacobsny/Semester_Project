from flask import Flask, request, send_from_directory, render_template
import backEnd
app = Flask(__name__)

#logon html page
#will be used for integration of login system coded by Dan
#template based off of some css styling
@app.route('/')
def index():
    return render_template("logon.html")

#game endpoint
#displays Stephen's html that access' his javascript files
#javascript hosted at other endpoints
@app.route('/game')
def gameCall():
    return render_template("index.html")

#front end js file that Stephen wrote to display his GUI
@app.route('/frontendgui.js')
def frontEnd():
    string = "C:\\Users\\jacob\\IdeaProjects\\Semester_Project\\src\\serverBackEnd\\static\\frontendgui.js"
    return send_from_directory("frontendgui.js", string)

#front end js file that Stephen wrote to display his player character
@app.route('/individual.js')
def player():
    string = "C:\\Users\\jacob\\IdeaProjects\\Semester_Project\\src\\serverBackEnd\\static\\phaserswap"
    return send_from_directory("individual.js", string)


#front end js file that Stephen wrote to display his food character
@app.route('/themdots.js')
def dots():
    string = "C:\\Users\\jacob\\IdeaProjects\\Semester_Project\\src\\serverBackEnd\\static\\phaserswap"
    return send_from_directory("themdots.js", string)

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


print (newPlayer())

if __name__ == "__main__":
    app.run(host='localhost', port=80, debug=True)
