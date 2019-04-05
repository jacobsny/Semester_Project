import unittest
from serverBackEnd.backEnd import newGuy, players, fromJSON,food,Location, eat
import json

class TestIsRhyme(unittest.TestCase):

    def setUp(self):
        pass

    def test_creation_player(self):
        response = json.loads(newGuy())
        name = response["nameid"]
        location = response["location"]
        self.assertTrue(name[:4] == "name" and len(location) == 2)
        self.assertTrue(players[name].location.x == location[0] and players[name].location.y == location[1])
        newGuy()
        newGuy()
        newGuy()
        newGuy()
        response2 = json.loads(fromJSON(json.dumps(response)))
        print(response2)

    def testEat(self):
        response0 = json.loads(newGuy())
        name0 = response0["nameid"]
        response1 = json.loads(newGuy())
        name1 = response1["nameid"]
        players[name0].size += 1
        players[name0].location = Location(1,1)
        players[name1].location = Location(1,1)
        eat(name0,name1)
        self.asserttrue(players[name0].size == 11)
        self.asserttrue(players[name1].killstate)







if __name__ == '__main__':
    unittest.main()