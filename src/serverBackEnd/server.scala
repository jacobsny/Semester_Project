package serverBackEnd
import org.scalatra._

abstract class server extends ScalatraServlet {
  var code = new backEnd
  get("/hello/:name") {
    // Matches "GET /hello/foo" and "GET /hello/bar"
    // params("name") is "foo" or "bar"
    <p>Hello, {params("name")}</p>
  }
//post that calls fromJSON using stephen's location JSON
  post("/playerupdate") {
    val jsonString = request.body
    val response = code.fromJSON(jsonString)
    response
  }
  get("/newPlayerEndpoint"){
    val jsonString = code.newGuy()
    jsonString
  }


}
