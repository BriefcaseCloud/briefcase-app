var appModule = require('../dist/app');
var debug = require('debug')('svr:server');
var http = require('http');
var app = appModule.Server.bootstrap().app;

var port = normalizePort(process.env.PORT || '3000');
app.set('port',port);


var server = http.createServer(app);

server.listen(port);
// server.on('error',onError);
// server.on('listening',onListening);

function normalizePort(val) {
    var port = parseInt(val,10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
}

