//const io = require("socket.io-client");

var FrontEndFood = [];
var FrontEndplayers = [];
var color = "cyan";


var killState = false;
var speed = 5.0;
var loc =[0,0];
var nameid = "";
var username = "";

var socket = io.connect({transports: ['websocket']});

setupSocket();

console.log("openedGame");
function setupSocket() {

    socket.on('message', (event) => {
        console.log("received message");
        var gameState = JSON.parse(event);
        console.log(gameState);
        convertingFromJson(gameState)

    });
    socket.on('initialize', (event)=> {
        console.log("received initialize");
        var initialize = JSON.parse(event);
        console.log(initialize);
        loc = initialize["location"];
        nameid = initialize["nameid"];
    });
}


function initializeGame(inputUsername) {
    username = inputUsername;
    console.log("Sending Register");
    socket.emit("register", username);
}

function convertingFromJson(parsed){
    killState = parsed["kill"];
    var locations = parsed["locations"];
    for (var playerFood of locations){
        if(playerFood[0] === "f" || playerFood[0] === 'f' || playerFood.contains("food")){
            FrontEndFood.push(locations[playerFood])
        }
        else{
            FrontEndplayers.push(locations[playerFood])
        }
    }
}

function loadVisual(gameStateDict){
    killState = gameStateDict["kill"]
    //set up everything for visual
}


function setup() {
    var aspectX = 900;
    var aspectY = 900;
    createCanvas(aspectX, aspectY);
    if (killState === false) {
        user = new User(color);
    }
}

function draw(){
    user.show(loc[0], loc[1], loc[2]);
    background(255,255,255);
    createFood(FrontEndFood);
    otherplayers(FrontEndplayers)
}

function createFood(placeholder){
        for (var ind in placeholder) {
            fill(color(122, 0, 122));
            var i = placeholder[ind];
            ellipse(i[0], i[1], i[2], i[2]);
            //console.log(ind[0])//
        }
    }
    function otherplayers(placeholder){
        for (var ind in placeholder) {
            fill(color(22, 33, 122));
            var i = placeholder[ind];
            ellipse(i[0], i[1], i[2], i[2]);
            //console.log(ind[0])//
        }
    }


while (!killState){
    document.addEventListener('keydown', function(e){
        if ((e.key === '38')) {
            loc[1] += speed;
            socket.emit('print',"UP")

        }
        if (e.key === '40') {
            loc[1] -= speed;
            socket.emit('print',"DOWN")
        }
        if (e.key === '37') {
            loc[0] -= speed;
            socket.emit('print',"LEFT")
        }
        if (e.key === '39') {
            loc[0] += speed;
            socket.emit('print',"RIGHT")
        }
        if ((e.key === 'w')) {
            loc[1] += speed;
            socket.emit('print',"UP")

        }
        if (e.key === 's') {
            loc[1] -= speed;
            socket.emit('print',"DOWN")
        }
        if (e.key === 'a') {
            loc[0] -= speed;
            socket.emit('print',"LEFT")
        }
        if (e.key === 'd') {
            loc[0] += speed;
            socket.emit('print',"RIGHT")
        }
    });
    var obj = '{'
        +'"nameid" : '
        + nameid
        +'"location" : '
        + loc.toString()
        +'}';
    socket.emit('update', obj)
}

