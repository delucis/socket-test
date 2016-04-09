$(document).ready(function() {
  var socket = io();
  $('form').submit(function(){
    socket.emit('menu select', $('#n').val());
    return false;
  });
});
