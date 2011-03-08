var express = require('express');

var pub = __dirname + '/public';

var app = express.createServer();

var ArticleProvider = require('./articleprovider-memory').ArticleProvider;

app.configure(function() {
    app.set('view engine', 'jade');
    app.set('views', __dirname + '/views');
    app.use(express.compiler({ src: pub, enable: ['sass'] }))
    app.use(express.methodOverride());
    app.use(express.static(pub));
    app.use(express.logger());
});

var articleProvider = new ArticleProvider();

app.get('/', function(req, res) {
    articleProvider.findAll(function(error, docs) {
        res.render('blog', {locals: {docs: docs}});
    });
});

app.listen(3000);
console.log('Express server started on port %s', app.address().port);