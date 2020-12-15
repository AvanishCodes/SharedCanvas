
var express= require('express');
var app=express();
require('dotenv').config()
var socket=require('socket.io');


var server=app.listen(process.env.PORT);

//set to use the public folder
app.use(express.static('public'));

var io=socket(server);


//call newConnection method when new user connects
io.sockets.on('connection',(socket)=>{
    io.sockets.emit('changed',socket.client.conn.server.clientsCount);
    socket.on('mouse',(data)=>{
        socket.broadcast.emit('mouse',data);
    });
    socket.on('disconnect',()=>{
        io.sockets.emit('changed',socket.client.conn.server.clientsCount);
    });
});
