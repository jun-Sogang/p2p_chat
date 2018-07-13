$(function() {
  // Socket.io connection
  var socket = io.connect('http://localhost:3030'),
      roomId = '';

  // Send a message
  $('#submit').on('click', function() {
    roomId = $('#roomId').val();
    socket.emit('join:room', {
      roomId: roomId
    });

    var msg = $('#inputMessage').val();
    if(!msg) return;
    socket.emit('send:message', {
      roomId: roomId,
      message: msg
    });
  });

  // Receive a message
  socket.on('send:message', function(data) {
    $('.messages').append('<p>' + data + '</p>');
  });
});
