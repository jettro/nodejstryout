var express = require('express');
var io = require('socket.io');

var pub = __dirname + '/public';

var app = express.createServer();

var ArticleProvider = require('./articleprovider-memory').ArticleProvider;

var socket = io.listen(app);

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
        res.render('blog', {locals: {docs: docs}});
    });
});

app.get('/blog/new', function (req, res) {
    res.render('blog_new', {locals: {title: 'New Blog Item'}});
});

app.post('/blog/new', function (req, res) {
    console.log('The provided title is : %s',req.body.new_title);
    articleProvider.save({title: req.body.new_title, body: req.body.new_body},
            function(error, docs) {
                socket.emit('saved');
                res.redirect('/');
            });
});

app.listen(8008);
console.log('Express server started on port %s', app.address().port);

socket.on('connection', function(client) {
    console.log('A client connected');
    client.broadcast({ announcement: client.sessionId + ' connected' });
    
    client.on('message',function(message) {
        console.log('Received a message from the client : ' + message);
        client.broadcast({ announcement: 'message from ' + client.sessionId + ' : ' + message });

    });
    client.on('disconnect', function() {
        console.log('Client disconnected');
    });
});

socket.on('saved',function() {
    console.log('Yep it is saved and I received an event!!');
});
