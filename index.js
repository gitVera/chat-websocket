var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

server.listen(3000);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html')
});

users = [];
connections = [];

io.sockets.on('connection', function(socket) {
    console.log('успешное соединение');
    connections.push(socket);
    socket.on('disconnect', function(data) {
        connections.splice(connections.indexOf(socket), 1);
        console.log('отключились');
    })
    socket.on('send mess', function(data) {
        io.sockets.emit('add mess', {mess: data.mess, name: data.name, className: data.className});
    })
})