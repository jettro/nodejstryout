var express = require('express');
var io = require('socket.io');

var pub = __dirname + '/public';

var app = express.createServer();

var ArticleProvider = require('./articleprovider-memory').ArticleProvider;

app.configure(function() {
    app.set('view engine', 'jade');
    app.set('views', __dirname + '/views');
    app.use(express.compiler({ src: pub, enable: ['sass'] }));
    app.use(express.methodOverride());
    app.use(express.static(pub));
    app.use(express.logger());
    app.use(express.bodyParser());
});

var articleProvider = new ArticleProvider();

app.get('/', function(req, res) {
    articleProvider.findAll(function(error, docs) {
        res.render('blog', {locals: {docs: docs}, layout: false });
    });
});

app.get('/blog/new', function (req, res) {
    res.render('blog_new', {locals: {title: 'New Blog Item'}});
});

app.post('/blog/new', function (req, res) {
    console.log('The provided title is : %s', req.body.new_title);
    articleProvider.save({title: req.body.new_title, body: req.body.new_body},
            function(error, docs) {
                res.redirect('/');
            });
});

app.listen(8008);
console.log('Express server started on port %s', app.address().port);


// Configure NowJS
var everyone = require("now").initialize(app);
everyone.now.availablePersons = [];

everyone.now.distributeMessage = function(message) {
    console.log('Received a message to distribute: %s for %s', message, this.now.name);
    everyone.now.receiveMessage(this.now.name, message);
};

everyone.connected(function() {
    console.log("Joined: " + this.now.name);
    if (nameIsDefined(this.now.name)) {
        addNameToAvailablePersons(this.now.name);
        everyone.now.newlyJoined(this.now.name);
        everyone.now.refreshPersonsList();
    }
});

everyone.disconnected(function() {
    console.log("Left: " + this.now.name);
    if (nameIsDefined(this.now.name)) {
        removeNameFromAvailablePersons(this.now.name);
        everyone.now.hasLeft(this.now.name);
        everyone.now.refreshPersonsList();
    }
});

// Utility functions
function removeNameFromAvailablePersons(name) {
    for (var i = everyone.now.availablePersons.length - 1; i >= 0; i--) {
        if (everyone.now.availablePersons[i] == name) {
            everyone.now.availablePersons.splice(i, 1);
        }
    }
}

function addNameToAvailablePersons(name) {
    everyone.now.availablePersons[everyone.now.availablePersons.length] = name;
}

function nameIsDefined(name) {
    return undefined != name;
}
