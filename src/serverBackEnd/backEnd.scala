package serverBackEnd

import play.api.libs.json.{JsValue, Json}

class backEnd {
  var players: Map[String, Player] = Map.empty
  var food: Map[String, Player] = Map.empty

  def newGuy(name:String, player: Player): Unit ={
    players = players ++ Map(name -> player)
  }
  def kill(player: Player): Unit ={
    player.killState = true
  }
  def eat(obj: String, obj2: String): Unit ={
    var player1 = players(obj)
    var player2 = players(obj2)
    if (player1.size > player2.size){
      kill(player2)
      player1.size += player2.size
    }
    else if(player1.size < player2.size){
      kill(player1)
      player2.size += player1.size
    }
  }
  def updatePlayer(name: String, loc: Location): Unit = {
    players(name).location = loc
  }

  def findIfIntersect(str: String, str1: String): Boolean = {
    var user1 = players(str).location
    var user2 = players(str1).location
    var totalSize = players(str).size + players(str1).size
    user1.distance(user2) <= totalSize
  }
  def checkCollision(): Unit = {
    for (user <- players.keysIterator){
      for(user2 <- players.keysIterator){
        if (user != user2 && findIfIntersect(user, user2)){
          eat(user, user2)
        }
      }
      for(munch <- food.keysIterator){
        if (findIfIntersect(user, munch)){
          players(user).size += food(munch).size
          food -= munch
        }
      }
    }
  }
  def toJson(user: String): String = {
    var player = players(user)
    var xLower = player.location.x - 50
    var xUpper = player.location.x + 50
    var yLower = player.location.y - 50
    var yUpper = player.location.y + 50
    var proximity = Map.empty[String, String]
    for (users <- players.keysIterator){
      var loc = players(users).location
      if ((xLower < loc.x && loc.x < xUpper) && (yLower < loc.y && loc.y < yUpper)){
        proximity = proximity ++ Map(users -> players(users).toString())
      }
    }
    for (munch <- food.keysIterator){
      var loc = players(munch).location
      if ((xLower < loc.x && loc.x < xUpper) && (yLower < loc.y && loc.y < yUpper)){
        proximity = proximity ++ Map(munch -> players(munch).toString())
      }
    }
    var js: JsValue = Json.toJson(proximity)
    var kill = Json.toJson(players(user).killState)
    var jsonMap: Map[String, JsValue] = Map("kill" -> kill, "locations" -> js)
    Json.stringify(Json.toJson(jsonMap))
  }
}
