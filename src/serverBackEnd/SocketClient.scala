import io.socket.client.{IO, Socket}
import io.socket.emitter.Emitter
import play.api.libs.json.Json
class HandleMessagesFromPython() extends Emitter.Listener {
  override def call(objects: Object*): Unit = {
    val response = objects.apply(0).toString
    println(response)
  }
}
class HandleInitializeFromPython() extends Emitter.Listener {
  override def call(objects: Object*): Unit = {
    val response = Json.parse(objects.apply(0).toString)
    println(response)
    ScalaClient.nameID = (response \ "nameid").as[String]
    ScalaClient.location = (response \ "location").as[List[Int]]
    ScalaClient.firstReceive = true
    println(ScalaClient.nameID, ScalaClient.location.toString())

  }
}
object ScalaClient {
  var firstReceive = false
  var killState = false
  var location = List(0,0)
  var nameID = ""

  def main(args: Array[String]): Unit = {
    val socket: Socket = IO.socket("http://localhost:8080/")
    println("Connected Successfully")
    socket.connect()
    socket.emit("register", "ScalaUser")
    socket.on("message", new HandleMessagesFromPython)
    /*socket.on("initialize", new HandleInitializeFromPython)
    /while(firstReceive && !killState){
      var returnMap = Map("nameid" -> Json.toJson(nameID), "location" -> Json.toJson(location))
      var data = Json.stringify(Json.toJson(returnMap))
      socket.emit("update", data)
    }*/
  }
}
