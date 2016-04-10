$(document).ready(function() {
  var socket = io();
  socket.emit('newSocket', 'instruments');
  $('form').submit(function(){
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });
  socket.on('chat message', function(msg){
    $('#messages').append($('<li>').text(msg));
  });
  socket.on('menu select', function(sel){
    $('#num').text(sel);
  });
});
