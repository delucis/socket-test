var port = process.env.PORT || 3000
var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io').listen(http);
var moniker = require('moniker');

app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/performer/', function(req, res){
  res.sendFile(__dirname + '/performer/index.html');
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
  console.log('listening on *:' + port);
});
