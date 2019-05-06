var FrontEndFood = [];
var FrontEndplayers = [];
var color = "cyan";
var Playersize = 50;


var killState = false;
var speed = 5.0;
var location =[0,0];
var nameid = "";


socket = io.connect({transports: ['websocket']});

setupSocket();

function setupSocket() {
    socket.on('connect', function (event) {
        socket.send('Hello Server!');
    });
    socket.on('message', function (event) {
        // console.log(event);
        const gameState = JSON.parse(event);
        console.log(gameState + "front");
        convertingFromJson(gameState)

    });
    socket.on('register', function (event) {
        // console.log(event);
        const initialize = JSON.parse(event);
        location = initialize["location"];
        nameid = initialize["nameid"];

    });
}
function initializeGame(inputUsername) {
    username = inputUsername;
    socket.emit("register", username);
}

function convertingFromJson(parsed){
    for (var ind of parsed){
        if(ind === "locations"){
            for (var playerFood of ind){
                if(playerFood[0] === "f" || playerFood[0] === 'f' || playerFood.contains("food")){
                    FrontEndFood.push(ind[playerFood])
                }
                else{
                    FrontEndplayers.push(ind[playerFood])
                }
            }
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
    user.show(location[0], location[1], location[2]);
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

