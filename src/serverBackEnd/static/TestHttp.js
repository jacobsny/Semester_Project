var killState = false;
var location = [0,0];
var speed = 5.0;
var nameid = "";

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

console.log("hello");

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
function loadVisual(gameStateDict){
    killState = gameStateDict["kill"]
    //set up everything for visual
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

