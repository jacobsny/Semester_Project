var killState = false;
var location = [0,0];
var speed = 5.0;
var nameid = "";
var Food = [];
var Players = [];
var color = "cyan"

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
        var parsed = JSON.parse(this.response);
        location = parsed["location"]
        nameid = parsed["nameid"]
        convertingfromJson(this.response)
    }
};
xhttp.open("GET", "/newPlayerEndpoint");
xhttp.send();

socket = io.connect({transports: ['websocket']});

setupSocket();

function convertingfromJson(parsed){
    var parsed = JSON.parse(x);
    var players = {};
    var food = [];
    var players = {};
    var food = [];
    for (var ind of parsed){
        if (ind == "kill"){
            if (ind["kill"] == false){
                killState = false
            }
            else if(ind["kill"] == "False"){
                killState = false
            }
            else{
                killState = true
            }
        }
        else if(ind == "locations"){
            for (var playorfood of ind){
                if(playorfood[0] === "f" || playorfood[0] === 'f'){
                    food.push(ind[playorfood])
                }
                else{
                    players.push(ind[playorfood])
                }
            }
        }
    }
    return [food, players]
}

function loadVisual(gameStateDict){
    killState = gameStateDict["kill"]
    //set up everything for visual
}

function setupSocket() {
    socket.on('connect', function (event) {
        socket.send('Hello Server!');
    });
    socket.on('message', function (event) {
        // console.log(event);
        const gameState = JSON.parse(event);
        console.log(gameState);
        loadVisual(gameState);
    });
}


function setup() {
    var aspectx = 900
    var aspecty = 900
    createCanvas(aspectx, aspecty);
    var x = aspectx/2
    var y = aspecty/2
    circles = new themcircles()
    if (killState == false) {
        user = new User(color);
    }
}

function draw() {
    background(255,255,255)
    circles.minidot(Food);
    circles.otherplayers(Players)
    user.show(location[0], location [1], 30)
}

while (!killState){
    document.addEventListener('keydown', function(e){
        if ((e.key === '38')) {
            location[1] += speed;
            console.log("UP")

        }
        if (e.key === '40') {
            location[1] -= speed;
            console.log("DOWN")
        }
        if (e.key === '37') {
            location[0] -= speed;
            console.log("LEFT")
        }
        if (e.key === '39') {
            location[0] += speed;
            console.log("RIGHT")
        }
        if ((e.key === 'w')) {
            location[1] += speed;
            console.log("UP")

        }
        if (e.key === 's') {
            location[1] -= speed;
            console.log("DOWN")
        }
        if (e.key === 'a') {
            location[0] -= speed;
            console.log("LEFT")
        }
        if (e.key === 'd') {
            location[0] += speed;
            console.log("RIGHT")
        }
    });
    var obj = '{'
        +'"nameid" : '
        + nameid
        +'"location" : '
        + location.toString()
        +'}';
    socket.emit('update', obj)
}

//
// function keyisPress(){
//     if ((keyCode === UP_ARROW)) {
//         user.up()
//     }
//     if (keyCode === DOWN_ARROW) {
//         user.down()
//     }
//     if (keyCode === LEFT_ARROW) {
//         user.left()
//     }
//     if (keyCode === RIGHT_ARROW) {
//         user.right()
//     }
//     else {
//         user.show();
//     }
// }