var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var port = process.env.PORT || 4001;

server.listen(port, () => {console.log("server is running on port", server.address().port);});

app.use(express.static('static'));

// Should get info in this format: {"fromUsr": currentUser, "toUsr": toUser, "txt": inputText}

const chatroomName = (user1, user2) => {
    let roomName = ""
    if(user1 < user2){
      roomName = `${user1}&${user2}`
    } else {
      roomName = `${user2}&${user1}`
    };
    return(roomName);
  }

io.on('connection', (socket) => {
    socket.on('type', (data) => {
        socket.broadcast.to(chatroomName(data.toUsr, data.fromUsr)).emit('type',data);
        console.log(`${data.fromUsr} is typing ${data.txt} to ${data.toUsr} on room ${chatroomName(data.toUsr, data.fromUsr)}`);
    });

    socket.on('chat', (data) => {
        console.log(`${data.fromUser} has chatted ${data.msg} to ${data.toUsr} on room ${chatroomName(data.toUsr, data.fromUsr)}`);
        socket.broadcast.to(chatroomName(data.toUsr, data.fromUsr)).emit('chat',data);
    });

    socket.on('subscribe', (data) => {
        console.log(data.room)
        socket.join(data.room)
    })
});
