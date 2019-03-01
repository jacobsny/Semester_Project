package serverBackEnd

class Location(var x: Double, var y: Double) {
  def distance(other: Location): Double =
    math.sqrt(math.pow(x - other.x, 2) + math.pow(y - other.y, 2))
  def equals(obj: Location): Boolean ={
    this.x == obj.x && this.y == obj.y
  }
}
