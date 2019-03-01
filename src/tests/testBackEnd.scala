package tests

import org.scalatest.FunSuite
import play.api.libs.json.{JsValue, Json}
import serverBackEnd._

class testBackEnd extends FunSuite{
test("Test the Back End Code"){
  var player1 = new Player(new Location(0.0,0.0),5.0)
  var player2 = new Player(new Location(10.0,10.0),3.0)
  var back = new backEnd
  back.newGuy("id1234",player1)
  back.newGuy("id1235", player2)
  assert(back.players == Map("id1234" -> player1, "id1235" -> player2))
  var loc = new Location(2.0,0.0)
  var map: Map[String, JsValue] = Map("nameid" -> Json.toJson("id1235"), "location" -> Json.toJson(loc.toArray()))
  back.fromJSON(Json.stringify(Json.toJson(map)))
  assert(back.players("id1235").location.equals(loc))//test the update location of player
  back.checkCollision()
  assert(back.players("id1235").killState)//test that
    // check collision works, that findIntersect works and that eat works
}
}
