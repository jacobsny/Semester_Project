import unittest
from serverBackEnd import backEnd
import json

class TestBackEnd(unittest.TestCase):

    def setUp(self):
        pass

    def test_creation_player(self):
        backEndCode = backEnd.BackEnd()
        response = json.loads(backEndCode.newGuy())
        name = response["nameid"]
        location = response["location"]
        self.assertTrue(name[:4] == "name" and len(location) == 2)
        self.assertTrue(backEndCode.players[name].location.x == location[0] and
                        backEndCode.players[name].location.y == location[1])
        backEndCode.newGuy()
        backEndCode.newGuy()
        backEndCode.newGuy()
        backEndCode.newGuy()
        response2 = json.loads(backEndCode.fromJSON(json.dumps(response)))
        print(response2)

    def testEat(self):
        backEndCode = backEnd.BackEnd()
        response0 = json.loads(backEndCode.newGuy())
        name0 = response0["nameid"]
        response1 = json.loads(backEndCode.newGuy())
        name1 = response1["nameid"]
        backEndCode.players[name0].size += 1
        backEndCode.players[name0].location = backEnd.Location(1,1)
        backEndCode.players[name1].location = backEnd.Location(1,1)
        backEndCode.eat(name0, name1)
        self.assertTrue(backEndCode.players[name0].size == 11)
        self.assertTrue(backEndCode.players[name1].killState)







if __name__ == '__main__':
    unittest.main()
