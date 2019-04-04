var express = require('express');

var app = express();
var server = app.listen(12345);

app.use(express.static('src/helloworld'));

console.log("why god")

var socket = require('socket.io');
var why = socket(server);