var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

var connectedUsers = 0;

io.on('connection', function(socket) {
    io.emit('user connected', 'user connected' );
    connectedUsers++;

        io.emit('connectedUsers', connectedUsers);


     socket.on('chat message', function(msg) {
       
        io.emit('chat message', msg);
    });
    socket.on('disconnect', function() {
        connectedUsers--;
       
        io.emit('user disconnected', 'user disconnected');
    })
    socket.on('isTyping', function(msg) {
        io.emit('isTyping', msg );
    })
});

http.listen(3000 , function() {
    console.log('listening on *:3000');
});
