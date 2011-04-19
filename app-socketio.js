/**
 * Used to start the sample application while making use of raw socket.io. No special libraries are used to wrap
 * socket.io functionality.
 *
 * This is just a small wrapper to load the socket.io specific things. The generic application code is available in the
 * app.js file that is included as well.
 *
 * The application is started with an implementation for the chat functionality. In the socket.io case, chat is
 * implemented using the socketio.js file or module.
 *
 */
var Socketio = require('./socketio');
var socketio = new Socketio();

var AppUniform = require('./app-uniform');
var app = new AppUniform();

app.start(socketio);