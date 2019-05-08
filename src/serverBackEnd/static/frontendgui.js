var FrontEndFood = [];
var FrontEndplayers = [];
var colorer = "cyan";
var killState = false;
var speed = 5.0;
var loc =[0,0,0];
var nameid = "";
var username = "";

var socket = io.connect({transports: ['websocket']});

function createObject() {
    var obj = {};
    obj.nameid = nameid;
    obj.location = loc;
    return JSON.stringify(obj)
}


socket.on('message', (event) => {
    var gameState = JSON.parse(event);
    var action = gameState["action"];
    gameState = JSON.parse(gameState["message"]);
    if (action === 'message'){
        console.log(gameState["kill"]);
        convertingFromJson(gameState)
    }
    else if (action === 'init'){
        //console.log("received initialize");
        var initialize = gameState;
        loc = initialize["location"];
        nameid = initialize["nameid"];
        console.log(nameid, loc);
        socket.emit("update", createObject())
    }
    else if (action === 'update'){
        if (!killState){
            socket.emit('update', createObject());
        }
    }
});

socket.on('connect', ()=> {
    socket.emit("register", username);
});

function initializeGame(inputUsername) {
    username = inputUsername;
}
function User(colorpalet, x, y, size) {
        stroke(255, 255, 255);
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
    socket.emit('print', killState);
    for (var playerFood in locations){
        if(playerFood.substring(0,4) === "food"){
            FrontEndFood.push(locations[playerFood])
        }
        else{
            FrontEndplayers.push(locations[playerFood])
        }
    }
    console.log(FrontEndFood);
    console.log(FrontEndplayers);
}


function setup() {
    var aspectX = window.innerWidth;
    var aspectY = window.innerHeight;
    createCanvas(aspectX, aspectY);

}

function draw(){
    //console.log(FrontEndFood)
    //console.log(FrontEndplayers)
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
        //console.log(ind[0])//
    }
}


document.addEventListener('keydown', function(e){
    if ((e.key === '38') || (e.key === 'w')) {
        loc[1] += speed;
        socket.emit('print',JSON.stringify("UP"));


    }
    if (e.key === '40' || (e.key === 's')) {
        loc[1] -= speed;
        socket.emit('print',JSON.stringify("DOWN"));

    }
    if (e.key === '37' || (e.key === 'a')) {
        loc[0] -= speed;
        socket.emit('print',JSON.stringify("LEFT"));

    }
    if (e.key === '39' || (e.key === 'd')) {
        loc[0] += speed;
        socket.emit('print',JSON.stringify("RIGHT"));

    }
    else {
        if (!killState){
            socket.emit('update', createObject());
        }
    }
});


