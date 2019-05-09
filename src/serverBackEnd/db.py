from flask import Flask
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
udb = SQLAlchemy(app)
engine = create_engine('sqlite:///users.db', echo=True)
Base = declarative_base()



class User(db.Model):
    newPlayer = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=True, nullable=False)

    def __init__(self, newPlayer, password):
        """"""
        self.newPlayer = newPlayer
        self.password = password

        # create tables
        Base.metadata.create_all(engine)

    def __repr__(self):
        return '<User %r>' % self.newPlayer
