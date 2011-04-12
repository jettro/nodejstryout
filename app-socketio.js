var Socketio = require('./socketio');
var socketio = new Socketio();

var App = require('./app');
var app = new App();

app.start(socketio);