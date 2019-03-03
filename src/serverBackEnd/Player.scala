package serverBackEnd

class Player() {
  var location: Location = new Location(0,0)
  var size: Double = 5
  var killState = false
  override def toString(): String ={
    "[" + location.x + "," + location.y + "," + size + "]"
  }
}
