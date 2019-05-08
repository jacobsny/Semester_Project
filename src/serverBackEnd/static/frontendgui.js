var FrontEndFood = [];
var FrontEndplayers = [];
var colorer = "cyan";
var killState = false;
var speed = 5.0;
var loc =[0,0];
var nameid = "";
var username = "";
//{transports: ['websocket']}

var socket = io.connect('http://' + document.domain + ':' + location.port);


socket.on('message', (event) => {
    var gameState = event;
    var action = gameState["action"];
    socket.emit('print', gameState);
    if (action === 'message'){
        gameState = JSON.parse(gameState["message"]);
        socket.emit('print', gameState);
        convertingFromJson(gameState)
    }
    else if (action === 'init'){
        console.log("received initialize");
        var initialize = JSON.parse(gameState["message"]);
        console.log(initialize);
        loc = initialize["location"];
        nameid = initialize["nameid"];

        socket.emit("update", initialize)
    }
});

socket.on('connect', ()=> {
    socket.emit("register", username);
});

function initializeGame(inputUsername) {
    username = inputUsername;
}
function User(colorpalet, x, y, size) {
        stroke(255, 255, 255)
        var xy = colordetect(colorpalet);
        fill(color(xy));
        ellipse(x, y, size * 2, size * 2);
}


function colordetect(colorpalet){
    if (colorpalet == "blue") {
        var cols = color(0, 0, 255)
    }
    if (colorpalet == "yellow") {
        var cols =color(247, 255, 0)
    }
    if (colorpalet == "magenta") {
        var cols =color(255, 0, 222)
    }
    if (colorpalet == "cyan") {
        var cols =color(54, 247, 288)
    }
    if (colorpalet == "red") {
        var cols =color(255, 0, 0)
    }
    if (colorpalet == "green") {
        var cols =color(0, 255, 0)
    }
    return cols
}

function convertingFromJson(parsed){
    killState = parsed["kill"];
    var locations = parsed["locations"];
    console.log(locations)
    for (var playerFood in locations){
        if(playerFood.splice(0,4) == "food"){
            FrontEndFood.push(locations[playerFood])
        }
        else{
            FrontEndplayers.push(locations[playerFood])
        }
    }
}


function setup() {
    var aspectX = 1920;
    var aspectY = 1080;
    createCanvas(aspectX, aspectY);

}

function draw(){
    console.log(FrontEndFood)
    console.log(FrontEndplayers)
    background(255,255,255);
    // fill(color(122, 0, 122));
    // ellipse(10, 10, 60, 60);
    User(colorer, loc[0], loc[1], loc[2]);
    createFood(FrontEndFood);
    otherplayers(FrontEndplayers);
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
        fill(color(122, 0, 122));
        var i = placeholder[ind];
        ellipse(i[0], i[1], i[2], i[2]);
        console.log(ind[0])//
    }
}


while (!killState){
    document.addEventListener('keydown', function(e){
        if ((e.key === '38')) {
            loc[1] += speed;
            socket_server.emit('print',JSON.stringify("UP"))

        }
        if (e.key === '40') {
            loc[1] -= speed;
            socket_server.emit('print',JSON.stringify("DOWN"))
        }
        if (e.key === '37') {
            loc[0] -= speed;
            socket_server.emit('print',JSON.stringify("LEFT"))
        }
        if (e.key === '39') {
            loc[0] += speed;
            socket_server.emit('print',JSON.stringify("RIGHT"))
        }
        if ((e.key === 'w')) {
            loc[1] += speed;
            socket_server.emit('print',JSON.stringify("UP"))

        }
        if (e.key === 's') {
            loc[1] -= speed;
            socket_server.emit('print',JSON.stringify("DOWN"))
        }
        if (e.key === 'a') {
            loc[0] -= speed;
            socket_server.emit('print',JSON.stringify("LEFT"))
        }
        if (e.key === 'd') {
            loc[0] += speed;
            socket_server.emit('print',JSON.stringify("RIGHT"))
        }
    });
    var obj = '{'
        +'"nameid" : '
        + nameid
        +'"location" : '
        + loc.toString()
        +'}';
    socket_server.emit('update', obj)
}


