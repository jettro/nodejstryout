var NowjsApp = require('./nowjs');
var nowjsApp = new NowjsApp();

var App = require('./app');
var app = new App();

app.start(nowjsApp);