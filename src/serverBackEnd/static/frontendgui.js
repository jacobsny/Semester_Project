var FrontEndFood = [];
var FrontEndplayers = [];
var colorer = "cyan";
var killState = false;
var speed = 5.0;
var loc =[0,0];
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
        convertingFromJson(gameState)
    }
    else if (action === 'init'){
        //console.log("received initialize");
        var initialize = gameState;
        loc = initialize["location"];
        nameid = initialize["nameid"];
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
function User(colorpalet, xer, yer) {
    stroke(255, 255, 255);
    var xy = colordetect("green");
    fill(color(xy));
    ellipse(50, 50, 20 * 2, 20 * 2);
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
    FrontEndFood = [];
    FrontEndplayers = [];
    var locations = parsed["locations"];
    for (var playerFood in locations){
        if(playerFood.substring(0,4) === "food"){
            FrontEndFood.push(locations[playerFood])
        }
        else{
            FrontEndplayers.push(locations[playerFood])
        }
    }
}


function setup() {
    var aspectX = window.innerWidth - 40;
    var aspectY = window.innerHeight - 20;
    createCanvas(aspectX, aspectY);

}

function draw(){
    background(255,255,255);
    keyisPress();
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

function keyisPress(){
    var obj = {};
    if ((keyCode === UP_ARROW)) {
        obj = {};
        obj.nameid = nameid;
        obj.keyPress = 'DOWN';
        socket.emit('controller', JSON.stringify(obj))
    }
    else if (keyCode === DOWN_ARROW) {
        obj = {};
        obj.nameid = nameid;
        obj.keyPress = 'UP';
        socket.emit('controller', JSON.stringify(obj))
    }
    else if (keyCode === LEFT_ARROW) {
        obj = {};
        obj.nameid = nameid;
        obj.keyPress = 'LEFT';
        socket.emit('controller', JSON.stringify(obj))
    }
    else if (keyCode === RIGHT_ARROW) {
        obj = {};
        obj.nameid = nameid;
        obj.keyPress = 'RIGHT';
        socket.emit('controller', JSON.stringify(obj))
    }
    if (!killState){
        socket.emit('update', createObject());
    }
}



