package tests

import org.scalatest.FunSuite
import play.api.libs.json.{JsValue, Json}
import serverBackEnd._

class testBackEnd extends FunSuite{
test("Test the Back End Code"){
  var back = new backEnd
  var play1 = back.newGuy()
  var play2 = back.newGuy()
  var playe1 = Json.parse(play1)
  var loc1 = (playe1 \ "location").as[Array[Double]]
  var playe2 = Json.parse(play2)
  var loc2 = (playe2 \ "location").as[Array[Double]]
  var player1 = new Player()
  player1.location =  new Location(loc1(0),loc1(1))
  player1.size = 5.0
  var player2 = new Player()
  player2.location = new Location(loc2(0),loc2(1))
  player2.size = 5.0
  var playerMap = Map((playe1 \ "nameid").as[String] -> player1, (playe2 \ "nameid").as[String] -> player2)
  assert(mapEquals(back.players, playerMap))
  var loc = new Location(loc1(0)-2.0,loc1(1)-0.0)
  var map: Map[String, JsValue] = Map("nameid" -> Json.toJson((playe2 \ "nameid").as[String]), "location" -> Json.toJson(loc.toArray()))
  back.fromJSON(Json.stringify(Json.toJson(map)))
  assert(back.players((playe2 \ "nameid").as[String]).location.equals(loc))//test the update location of player
  back.checkCollision()
  assert(!back.players((playe2 \ "nameid").as[String]).killState)//test that
    // check collision works, that findIntersect works and that eat works
  back.players((playe2 \ "nameid").as[String]).size -= 1
  back.checkCollision()
  assert(back.players((playe2 \ "nameid").as[String]).killState)//test that
  // check collision works, that findIntersect works and that eat works when one is bigger
}
  def mapEquals(map1: Map[String, Player], map2: Map[String, Player]): Boolean ={
    for (ply <- map1.keysIterator){
      if (!map2.contains(ply)){
        return false
      }
      else if(map1(ply).toString() != map2(ply).toString()){
        return false
      }
    }
    true
  }

}
