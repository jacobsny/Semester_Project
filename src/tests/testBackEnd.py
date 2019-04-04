import unittest
from serverBackEnd.backEnd import newGuy, players, fromJSON
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






if __name__ == '__main__':
    unittest.main()