var templists = [[420, 120], [120, 420], [420, 120], [20, 470], [320, 120], [120, 270]];


function setup() {
    var aspectx =920
    var aspecty = 680
    var zed = 23
    var ided = 223442
    createCanvas(aspectx, aspecty);
    var startx = 400
    var starty = 400
    user = new User("red", 0, 0);
}


function draw(){
    background(255,255,255)
    themcircles(templists);
    keyisPress();
}

function themcircles(x) { //so the x is going to be a json with a list of dots... go figure//
    for (ind in x) {
        fill(color(122, 0, 122))
        var i = x[ind]
        ellipse(i[0], i[1], 10, 10);
        //console.log(ind[0])//
    }
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
        } else {
            user.display();
        }
    }
