var user;
var circles;
function setup() {

    var aspectx = window.innerWidth
    var aspecty = window.innerHeight
    var zed = 23
    var ided = 223442
    createCanvas(aspectx, aspecty);
    var x = aspectx/2
    var y = aspecty/2
    circles = new themcircles("This_will_have_a_json_in_part_two_from_backend")
    user = new User("cyan", x, y, zed. ided);

}


function draw() {
    background(255,255,255)
    circles.minidot();
    keyisPress();


}
function keyisPress(){
    if ((keyCode === UP_ARROW)) {
        user.up()
        console.log("W")
    }
    if (keyCode === DOWN_ARROW) {
        user.down()
        console.log("s")
    }
    if (keyCode === LEFT_ARROW) {
        user.left()
        console.log("L")
    }
    if (keyCode === RIGHT_ARROW) {
        user.right()
        console.log("R")
    }
    else {
        user.show();
    }
}