/**
 * Server atual: coleta todos os formulário sdo form crawler
 */

const http = require('http').Server();
const io = require('socket.io')(http);
const config = require(__dirname + '/../etc/shellac.json');
const { spawn, execSync } = require('child_process');

// console.log(config);

io.on('connection', (socket) => {
    var socketId = socket.id;
    io.emit('config', config);
    console.log('connection');
    socket.on('action', (data) => {
        let action = config.actions.find(obj => { return obj.name === data.action})
        let commandEnv = {}
        delete data.action;

        console.log([action, data]); //info.selectionText $SHELLAC_INFO_SELECTIONTEXT

        Object.keys(data).map(dataKey => {
            let envKey = "SHELLAC_" + dataKey.replace(".","_").toUpperCase();
            process.env[envKey] = data[dataKey];
        })
        
        var stdout = require('child_process').execSync(action.command, {
            env:process.env
        }).toString();
        console.log(stdout);
    });

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
