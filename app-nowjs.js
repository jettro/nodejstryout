var Nowjs = require('./nowjs');
var nowjs = new Nowjs();

var App = require('./app');
var app = new App();

app.start(nowjs);