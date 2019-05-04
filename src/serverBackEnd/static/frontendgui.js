var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
        var jacob = why(this.response);
        console.log("Connected")

    }
};
xhttp.open("GET", "/playerupdate");
xhttp.send();


function why(x){
    console.log(10)
    var converted = JSON.parse(x)
    return converted
}

function printer(x){
    console.log(10)
    return x
}

function setup(x) {
    var aspectx = 900
    var aspecty = 900
    var zed = 23
    var ided = 223442
    createCanvas(aspectx, aspecty);
    var x = aspectx/2
    var y = aspecty/2
    circles = new themcircles("This_will_have_a_json_in_part_two_from_backend")
    user = new User("cyan", x, y, zed. ided);
}

function draw(x) {
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