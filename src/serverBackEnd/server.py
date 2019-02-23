from flask import Flask

app = Flask("server backend")

@app.route("/")
def logon():
    return "Hello World"