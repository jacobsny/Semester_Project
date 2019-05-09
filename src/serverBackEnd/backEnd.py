from random import randint
import json
import math


#python object orientated programming
#location is a class that takes x and y
#player class that takes location, size and kill state
class Location:
    def __init__(self, xcor, ycor):
        self.x = xcor
        self.y = ycor

    def distance(self, other):
        return math.sqrt(math.pow(self.x - other.x, 2) + math.pow(self.y - other.y, 2))

    def array(self):
        return [self.x, self.y]

    def generate(self):
        self.x = randint(-50, 50)
        self.y = randint(-50, 50)

    def generateFood(self):
        self.x = randint(-1400, 1400)
        self.y = randint(-1400, 1400)

    def string(self):
        return str([self.x, self.y])


class Player(object):
    def __init__(self):
        self.location = Location(0, 0)
        self.size = 25.0
        self.killState = False

    def string(self):
        return [self.location.x, self.location.y, self.size]
    #future map holding all players
    #future map holding all food

    def up(self):
        self.location.y += 2

    def down(self):
        self.location.y -= 2

    def left(self):
        self.location.x -= 2

    def right(self):
        self.location.x += 2


class BackEnd:
    def __init__(self):
        self.food = {}
        self.players = {}

    #is called to generate a 4 digit random number to be used in player naming
    def generateName(self):
        id = randint(0, 9999)
        while str("name" + str(id)) in self.players:
            id = randint(0, 9999)
        return str("name" + str(id))

    #is called to generate a 4 digit random number to be used in food naming
    def generateFood(self):
        id = randint(0, 9999)
        while str("food" + str(id)) in self.food:
            id = randint(0, 9999)
        return str("food" + str(id))

    #generates player and returns a new player
    def generatePlayer(self):
        ply = Player()
        ply.location.generate()
        return ply

    #generate food for the map
    def generateFoodPlayer(self):
        ply = Player()
        ply.location.generateFood()
        ply.size = 15.0
        return ply

    #endpoint for introducing a new player into the game.
    #returns a json string that Stephen will use to access
    #keys of nameid and location in format of List(x,y)
    def newGuy(self):
        name = self.generateName()
        player = self.generatePlayer()
        self.players[name] = player
        returnMap = {"nameid": name, "location": player.location.array()}
        return json.dumps(returnMap)

    #create food and add it to the food map
    def newFood(self):
        foodBit = self.generateFood()
        munch = self.generateFoodPlayer()
        self.food[foodBit] = munch

    #set kill state in map of player with id in parameter to true
    def kill(self, player):
        player.killState = True

    def findRadii(self, r1, r2):
        totalArea = math.pi * math.pow(r1, 2) + math.pi * math.pow(r2, 2)
        return math.sqrt(totalArea / math.pi)

    #takes two player ids and checks sizes and sees who eats who
    #larger of the two gets increased in size that of the other
    #smaller gets killed
    def eat(self, obj, obj2):
        player1 = self.players[obj]
        player2 = self.players[obj2]
        totalRadii = self.findRadii(player1.size, player2.size)
        if not player1.killState and not player2.killState:
            if player1.size > player2.size:
                self.kill(player2)
                player1.size = totalRadii
            elif player1.size < player2.size:
                self.kill(player1)
                player2.size = totalRadii

    def eatFood(self, obj, obj2):
        player1 = self.players[obj]
        player2 = self.food[obj2]
        totalRadii = self.findRadii(player1.size, player2.size)
        if not player1.killState and not player2.killState:
            if player1.size > player2.size:
                self.kill(player2)
                player1.size = totalRadii
            elif player1.size < player2.size:
                self.kill(player1)
                player2.size = totalRadii

    #mathematically calculates if two players touch or cross over
    def findIfIntersect(self, str, str1):
        user1 = self.players[str].location
        user2 = self.players[str1].location
        totalSize = self.players[str].size + self.players[str1].size
        return user1.distance(user2) <= totalSize

    def findIfIntersectFood(self, str, str1):
        user1 = self.players[str].location
        user2 = self.food[str1].location
        totalSize = self.players[str].size + self.food[str1].size
        return user1.distance(user2) <= totalSize

    #checks all of maps to see if any players or food intersect
    def checkCollision(self, user):
        for user2 in self.players:
            if user != user2 and self.findIfIntersect(user, user2):
                self.eat(user, user2)
        for munch in self.food:
            if self.findIfIntersectFood(user, munch):
                self.eatFood(user, munch)

    #converts to pixel use so Stephen can display on a 1920x1080
    def convertToMonitor(self, user, map):
        userLoc = map[user].location
        originx = userLoc.x + 960
        originy = userLoc.y - 540
        for i in map:
            temp = map[i]
            xcor = originx - temp.location.x
            ycor = temp.location.y - originy
            temp.location = Location(xcor, ycor)
            string = temp.string()
            map[i] = string
        return map

    #takes a user and finds all players and food in a 1920x1080 rectangle around the user
    #returns a json that has the kill state of the user as a key
    #then has a map of locations where the key is the id of the player or food
    #and the value in the locations map is an array of (x,y,size)
    #x and y are in terms of monitor coordinates not world coordinates
    def toJSON(self, user):
        base = self.players[user].string()
        x = 960 - base[0]
        y = 540 - base[1]
        proximity = {}
        for player in self.players:
            if not self.players[player].killState:
                temp = self.players[player].string()
                proximity[player] = [temp[0]+x, temp[1]+y, temp[2]]
        for food in self.food:
            if not self.food[food].killState:
                temp = self.food[food].string()
                proximity[food] = [temp[0]+x, temp[1]+y, temp[2]]
        kill = self.players[user].killState
        jsonMap = {"kill": kill, "locations": proximity}
        return (jsonMap)

    #used if someone tries to make an invalid request and they're not present in the game
    def invalidRequest(self):
        json.dumps({"kill": True, "locations": "N/A"})

    #is the recipient of the POST request Stephen will make
    #first updates the player location
    #then returns the players around if they are a valid player
    def fromJSON(self, name, loc):
        if name in self.players:
            self.checkCollision(name)
            ans = json.dumps(self.toJSON(name))
            return ans
        else:
            return self.invalidRequest()
