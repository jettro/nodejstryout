var pub = __dirname + '/public';

var Socketio = require('./socketio');

var express = require('express')
    , app = express.createServer()
    , site = require('./site')
    , socketio = new Socketio()
    , nowjs = require('./nowjs')
    , blog = require('./blog');

app.configure(function() {
    app.set('view engine', 'jade');
    app.set('views', __dirname + '/views');
    app.set('view options', { layout: 'layout' });
    app.use(express.compiler({ src: pub, enable: ['sass'] }));
    app.use(express.methodOverride());
    app.use(express.static(pub));
    app.use(express.logger());
    app.use(express.bodyParser());
});

// general
app.get('/', site.index);

// blog
app.get('/blog', blog.index);
app.get('/blog/new', blog.blogShowForm);
app.post('/blog/new', blog.blogPostForm);

// socketio
app.get('/socketio', socketio.index);

app.get('/nowjs', nowjs.index);

app.listen(8008);
console.log('Express server started on port %s', app.address().port);
socketio.init(app);

// Configure NowJS
//var nowjs = require("now");
//var everyone = nowjs.initialize(app,{clientWrite: false});
//
//everyone.now.availablePersons = [];
//var logs = [];
//
//everyone.now.distributeMessage = function(message) {
//    console.log('Received a message to distribute: %s for %s', message, this.now.name);
//    everyone.now.receiveMessage(this.now.name, message);
//};
//
//everyone.now.cleanLogs = function() {
//    logs = [];
//};
//
//everyone.now.obtainLogs = function(callback) {
//    callback(null,logs);
//};
//
//everyone.now.enterGeneralRoom = function() {
//    addToLog("About to enter the general room: " + this.now.name);
//    var group = nowjs.getGroup('general');
//    group.addUser(this.user.clientId);
//};
//
//everyone.connected(function() {
//    addToLog("Joined: " + this.now.name);
//    if (nameIsDefined(this.now.name)) {
////        addNameToAvailablePersons(this.now.name);
//        everyone.now.newlyJoined(this.now.name);
//        addToLog("Asking the client to refresh persons list after new connect: " + this.now.name);
//        everyone.now.refreshPersonsList();
//    }
//});
//
//everyone.disconnected(function() {
//    addToLog("Left: " + this.now.name);
//    if (nameIsDefined(this.now.name)) {
////        removeNameFromAvailablePersons(this.now.name);
//        everyone.now.hasLeft(this.now.name);
//        addToLog("Asking the client to refresh persons list after leaving: " + this.now.name);
//        everyone.now.refreshPersonsList();
//    }
//});
//// Utility functions
//function removeNameFromAvailablePersons(name) {
//    addToLog("Remove from list: " + name);
//    for (var i = everyone.now.availablePersons.length - 1; i >= 0; i--) {
//        if (everyone.now.availablePersons[i] == name) {
//            everyone.now.availablePersons.splice(i, 1);
//        }
//    }
//    addToLog("Removed from list: " + name);
//}
//
//function addNameToAvailablePersons(name) {
//    addToLog("Add to list of available persons: " + name);
//    everyone.now.availablePersons[everyone.now.availablePersons.length] = name;
//    addToLog("Added to list of available persons: " + name);
//}
//
//function nameIsDefined(name) {
//    return undefined != name;
//}
//
//function addToLog(message) {
//    console.log(message);
//    logs[logs.length] = message;
//}
//
