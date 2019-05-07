var FrontEndFood = [];
var FrontEndplayers = [];
var color = "cyan";
var Playersize = 50;


var killState = false;
var speed = 5.0;
var location =[0,0];
var nameid = "";


socket = io.connect({transports: ['websocket']});

socket.emit('print', "openedGame");

setupSocket();

function setupSocket() {
    socket.on('connect', function (event) {
        socket.send('Hello Server!');
    });
    socket.on('message', function (event) {
        // console.log(event);
        const gameState = JSON.parse(event);
        socket.emit('print', gameState + "front");
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


while (!killState){
    document.addEventListener('keydown', function(e){
        if ((e.key === '38')) {
            location[1] += speed;
            socket.emit('print',"UP")

        }
        if (e.key === '40') {
            location[1] -= speed;
            socket.emit('print',"DOWN")
        }
        if (e.key === '37') {
            location[0] -= speed;
            socket.emit('print',"LEFT")
        }
        if (e.key === '39') {
            location[0] += speed;
            socket.emit('print',"RIGHT")
        }
        if ((e.key === 'w')) {
            location[1] += speed;
            socket.emit('print',"UP")

        }
        if (e.key === 's') {
            location[1] -= speed;
            socket.emit('print',"DOWN")
        }
        if (e.key === 'a') {
            location[0] -= speed;
            socket.emit('print',"LEFT")
        }
        if (e.key === 'd') {
            location[0] += speed;
            socket.emit('print',"RIGHT")
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

