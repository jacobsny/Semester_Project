package serverBackEnd
import org.scalatra._

abstract class server extends ScalatraServlet {
  get("/hello/:name") {
    // Matches "GET /hello/foo" and "GET /hello/bar"
    // params("name") is "foo" or "bar"
    <p>Hello, {params("name")}</p>
  }


}
