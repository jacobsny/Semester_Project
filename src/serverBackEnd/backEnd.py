import random, json, math


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
        return "[" + str(self.location.x) + "," + str(self.location.y) + "," + str(self.size) + "]"


players = {}
food = {}


def generateName():
    id1 = random.randint(0, 9)
    id2 = random.randint(0, 9)
    id3 = random.randint(0, 9)
    id4 = random.randint(0, 9)
    id = str(id1) + str(id2) + str(id3) + str(id4)
    while str("name" + id) in players:
        id1 = random.randint(0, 9)
        id2 = random.randint(0, 9)
        id3 = random.randint(0, 9)
        id4 = random.randint(0, 9)
        id = str(id1) + str(id2) + str(id3) + str(id4)
    return str("name" + id)


def generatePlayer():
    ply = Player()
    ply.location.generate()
    return ply


def newGuy():
    name = generateName()
    player = generatePlayer()
    players[name] = player
    returnMap = {"nameid": name, "location": player.location.array()}
    return json.dumps(returnMap)


def kill(player):
    player.killState = True


def eat(obj, obj2):
    player1 = players[obj]
    player2 = players[obj2]
    if player1.size > player2.size:
        kill(player2)
        player1.size += player2.size
    elif player1.size < player2.size:
        kill(player1)
        player2.size += player1.size


def findIfIntersect(str, str1):
    user1 = players[str].location
    user2 = players[str1].location
    totalSize = players[str].size + players[str1].size
    return user1.distance(user2) <= totalSize


def checkCollision():
    for user in players:
        for user2 in players:
            if user != user2 and findIfIntersect(user,user2):
                eat(user,user2)
        for munch in food:
            if findIfIntersect(user,munch):
                players[user].size += food[munch].size
                del food[munch]


def convertToMonitor(user, map):
    userLoc = map[user].location
    originx = userLoc.x + 960
    originy = userLoc.y - 540
    for i in map:
        temp = map[i]
        x = originx - temp.location.x
        y = temp.location.y - originy
        temp.location = Location(x, y)
        string = temp.string()
        map[i] = string
    return map


def toJSON(user):
    player = players[user]
    xLower = player.location.x - 960
    xUpper = player.location.x + 960
    yLower = player.location.y - 540
    yUpper = player.location.y + 540
    proximity = {}
    for users in players:
        loc = players[users].location
        if (xLower < loc.x < xUpper) and (yLower < loc.y < yUpper):
            proximity.update({users: players[users]})
            #proximity[users] = players[users]
    for munch in food:
        loc = players[munch].location
        if (xLower < loc.x < xUpper) and (yLower < loc.y < yUpper):
            proximity.update({munch: food[munch]})
            #proximity[munch] = food[munch]
    proximity = convertToMonitor(user, proximity)
    kill = players[user].killState
    jsonMap = {"kill": kill, "locations": proximity}
    return json.dumps(jsonMap)


def invalidRequest():
    json.dumps({"kill": True, "locations": "N/A"})


def fromJSON(string):
    parsed = json.loads(string)
    name = parsed["nameid"]
    loc = parsed["location"]
    if name in players:
        players[name].location = Location(loc[0], loc[1])
        return toJSON(name)
    else:
        return invalidRequest()


#jsonresponse = newGuy()
#i = 0
#while i < 100:
#    newGuy()
#    i += 1
#print(jsonresponse)
#print(fromJSON(jsonresponse))