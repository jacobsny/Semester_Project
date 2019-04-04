//electron src/serverBackEnd/templates/main.js



var user = new themcircles("This_will_have_a_json_in_part_two_from_backend"); //edited
var circles = new User("red", startx, starty, zed. ided); //edited
function setup() {
    var aspectx =920
    var aspecty = 680
    var zed = 23
    var ided = 223442
    createCanvas(aspectx, aspecty);
    var startx = 400
    var starty = 400
    circles = new themcircles("This_will_have_a_json_in_part_two_from_backend")
    user = new User("red", startx, starty, zed. ided);

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
        user.display();
    }
}