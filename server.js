var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function(socket){
    console.log('Connection established');
    socket.on('new_msg', function(msg){
        console.log(msg);
        io.emit("receive_msg", msg);
    });
});

http.listen('3000', function(){
    console.log("Connection good");
});