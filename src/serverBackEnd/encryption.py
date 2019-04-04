import bcrypt
import sqlite3
import json
import serverFlask
import requests
from flask import Flask
app = Flask(__name__)


# USE SINGLE QUOTE

# user login functions
# get request for newguy()
# take nameID
# redirect to frontend


def hash_password(stringIt):  # hash input
    encode = stringIt.encode('utf-8')
    hashed = bcrypt.hashpw(encode, bcrypt.gensalt())
    return hashed


# print(hash_password("word") == '$2b$12$KerVzLy3YaOV/pcyt37SxOi.WbQyNKmDAAT0SSmXUO208uNv8hVwO')


database = 'gameDatabase.db'
userTable = 'users'
connect = sqlite3.connect('gameDatabase.db')
cursor = connect.cursor()
cursor.execute('CREATE TABLE IF NOT EXISTS users (ID, hash, user)')


def insertUser(ID, hash, username):
    cursor.execute('INSERT INTO users VALUES (?,?,?)', (ID, hash, username))


def userbase():
    return cursor.execute("SELECT * FROM users")


def get_users():
    KVS = {}
    for row in userbase():
        ID = row[0]
        hash = row[1]
        username = row[2]
        KVS[username] = {"ID": ID, "hash": hash, "username": username}
    return KVS


(insertUser("12345", "$2b$12$efdIVEAbQCoXR9Ho3mIPG.BB5G1Q96t7dVUo9wPUXQ5J650lKld9K", "player1"))
(insertUser("!@#", "$2b$12$efdIVEAbQCoXR9Ho3mIPG.BB5G1Q96t7dVUo9wPUXQ5J650lKld9K", "12yrold"))
(insertUser("stringpw", "$2b$12$efdIVEAbQCoXR9Ho3mIPG.BB5G1Q96t7dVUo9wPUXQ5J650lKld9K", "881321"))





connect.commit()
connect.close()
# store hashed pw to database
# compare hashed pw to input hash
# look through database
# match hash + salt
# generate an ID




@app.route('/log_on', methods=['GET'])
def log_on():
    info = serverFlask.newPlayer
    json.loads(info)
    print(json.loads(info))




# test for addplayer
# test for remove player with generic circle eating another circle
