socket = io.connect({transports: ['websocket']});
console.log("hello")
socket.on('update', parseGameState);



function parseGameState(event) {
    // console.log(event);
    const gameState = JSON.parse(event);
    console.log(gameState)
}
