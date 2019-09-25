var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
// var activate = socket.on('active', function());

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
    socket.broadcast.emit('hi');
    socket.broadcast.to('#socketid').emit('message', 'active');
    socket.on('active', function(online) {
        console.log(online + " is now online!");

        socket.on('disconnect', function() {
            console.log(online + ' disconnected');
        });
    });
    socket.on('chat message', function(username, msg) {
        socket.broadcast.emit('chhat message', username);
        socket.broadcast.emit('chat message', msg);
        console.log(username + " : " + msg);
    });
});

http.listen(port, function() {
    console.log('listening on *:' + port);
});

// io.emit('some event', { for: 'everyone' });