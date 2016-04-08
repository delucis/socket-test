var port = process.env.PORT || 3000
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var moniker = require('moniker');

app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){
  var id = moniker.choose();
  console.log(id + ' connected.');
  socket.on('disconnect', function(){
    console.log(id + ' disconnected.');
  });
  socket.on('chat message', function(msg){
    named_msg = id + ': ' + msg;
    io.emit('chat message', named_msg);
    console.log(named_msg);
  });
});

http.listen(port, function(){
  console.log('listening on *:3000');
});
