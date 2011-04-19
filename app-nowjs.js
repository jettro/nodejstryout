var NowjsApp = require('./nowjs');
var nowjsApp = new NowjsApp();

var AppUniform = require('./app-uniform');
var app = new AppUniform();

app.start(nowjsApp);