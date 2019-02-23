package serverBackEnd

class Player(var location: Location, var size: Double) {
  var killState = false
  override def toString(): String ={
    "(" + location.x + "," + location.y + "," + size + ")"
  }
}
