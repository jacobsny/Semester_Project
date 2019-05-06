var killState = false;
var location = [0,0];
var speed = 5.0;
var nameid = "";
var FrontEndFood = [];
var FrontEndplayers = [];
var color = "cyan"
var Playersize = 50


var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
        var parsed = JSON.parse(this.response);
        location = parsed["location"]
        nameid = parsed["nameid"]
    }
};
xhttp.open("GET", "/newPlayerEndpoint");
xhttp.send();


socket = io.connect({transports: ['websocket']});

setupSocket();

function convertingfromJson(parsed){
    for (var ind of parsed){
        if(ind == "locations"){
            for (var playorfood of ind){
                if(playorfood[0] === "f" || playorfood[0] === 'f' || playorfood.contains("food")){
                    FrontEndFood.push(ind[playorfood])
                }
                else{
                    FrontEndplayers.push(ind[playorfood])
                }
            }
        }
    }
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
        console.log(gameState + "front");
        convertingfromJson(gameState)

    });
}


function setup() {
    var aspectx = 900
    var aspecty = 900
    createCanvas(aspectx, aspecty);
    if (killState == false) {
        user = new User(color);
    }
}

function draw(){
    user.show(location[0], location[1], location[2])
    background(255,255,255)
    createfood(FrontEndFood);
    otherplayers(FrontEndplayers)
}

function createfood(placeholder){
        for (var ind in placeholder) {
            fill(color(122, 0, 122))
            var i = placeholder[ind]
            ellipse(i[0], i[1], i[2], i[2]);
            //console.log(ind[0])//
        }
    }
    function otherplayers(placeholder){
        for (var ind in placeholder) {
            fill(color(22, 33, 122))
            var i = placeholder[ind]
            ellipse(i[0], i[1], i[2], i[2]);
            //console.log(ind[0])//
        }
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

