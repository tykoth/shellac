var http = require('http').Server();
const io = require('socket.io')(http);

io.on('connection', function(socket){
    var socketId = socket.id;
    console.log('connection');

    socket.on('formCrawler.newInputs', function(input){
        console.log(input);
    });

    socket.on('message', function(data){
        console.log(data);
    });

});

http.listen(55777, function(){
  console.log('listening on *:55777');
});
