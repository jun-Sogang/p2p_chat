const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = require('socket.io').listen(server);

app.set('port', process.env.PORT || 3030);

server.listen(app.get('port'), () => {
  console.log('Express erver listening on port' + app.get('port'));
});

// Socket.io

io.sockets.on('connection', (socket) => {

  // Join Room
  socket.on('join:room', (data) => {
    socket.join(`room${data.roomId}`);
  });

  //  Broadcast to room
  socket.on('send:message', (data) => {
    io.sockets.in(`room${data.roomId}`).emit('send:message', data.message);
  })
})
