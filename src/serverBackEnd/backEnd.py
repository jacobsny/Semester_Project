import random,json,math


class Location:
    def __init__(self, xcor, ycor):
        self.x = xcor
        self.y = ycor

    def distance(self, other):
        return math.sqrt(math.pow(self.x - other.x, 2) + math.pow(self.y - other.y, 2))

    def array(self):
        return [self.x, self.y]

    def generate(self):
        self.x = random.randint(-50, 50)
        self.y = random.randint(-50, 50)


class Player:
    location = Location(0, 0)
    size = 5.0
    killState = False

    def string(self):
        return "[" + self.location.x + "," + self.location.y + "," + self.size + "]"

class backEnd:
    players = {}
    food = {}

    def generateName(self):
        id1 = random.randint(0, 9)
        id2 = random.randint(0, 9)
        id3 = random.randint(0, 9)
        id4 = random.randint(0, 9)
        id = str(id1) + str(id2) + str(id3) + str(id4)
        while str("name" + id) in self.players:
            id1 = random.randint(0, 9)
            id2 = random.randint(0, 9)
            id3 = random.randint(0, 9)
            id4 = random.randint(0, 9)
            id = str(id1) + str(id2) + str(id3) + str(id4)
        return str("name" + id)

    def generatePlayer(self):
        ply = Player()
        ply.location.generate()
        return ply

    def newGuy(self):
        name = self.generateName()
        player = self.generatePlayer()
        self.players[name] = player
        returnMap = {"nameid": name, "location": player.location.array()}
        return json.dumps(returnMap)

    def kill(self, player):
        player.killState = True

    def eat(self, obj, obj2):
        player1 = self.players[obj]
        player2 = self.players[obj2]
        if player1.size > player2.size:
            self.kill(player2)
            player1.size += player2.size
        elif player1.size < player2.size:
            self.kill(player1)
            player2.size += player1.size

    def findIfIntersect(self, str, str1):
        user1 = self.players[str].location
        user2 = self.players[str1].location
        totalSize = self.players[str].size + self.players[str1].size
        return user1.distance(user2) <= totalSize

    def checkCollision(self):
        for user in self.players:
            for user2 in self.players:
                if user != user2 and self.findIfIntersect(user,user2):
                    self.eat(user,user2)
            for munch in self.food:
                if self.findIfIntersect(user,munch):
                    self.players[user].size += self.food[munch].size
                    del self.food[munch]

    def toJSON(self, user):
        player = self.players[user]
        xLower = player.location.x - 50
        xUpper = player.location.x + 50
        yLower = player.location.y - 50
        yUpper = player.location.y + 50
        proximity = {}
        for users in self.players:
            loc = self.players[users].location
            if (xLower < loc.x < xUpper) and (yLower < loc.y < yUpper):
                proximity[users] = self.players[users].string()
        for munch in self.players:
            loc = self.players[munch].location
            if (xLower < loc.x < xUpper) and (yLower < loc.y < yUpper):
                proximity[munch] = self.players[munch].string()
        kill = self.players[user].killState
        jsonMap = {"kill": kill, "locations": proximity}
        return json.dumps(jsonMap)

    def invalidRequest(self):
        json.dumps({"kill": True, "locations": "N/A"})

    def fromJSON(self, string):
        parsed = json.loads(string)
        name = parsed["nameid"]
        loc = parsed["location"]
        if(name in self.players):
            self.players[name].location = Location(loc[0],loc[1])
            self.toJSON(name)
        else:
            self.invalidRequest()






