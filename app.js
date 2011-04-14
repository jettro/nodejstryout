function App() {
}

var chat;
App.prototype.start = function(chat) {
    var pub = __dirname + '/public';

    var express = require('express')
            , app = express.createServer()
            , site = require('./site')
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
        app.use(express.cookieParser());
        app.use(express.session({ secret: "keyboard cat" }));
    });

// general
    app.get('/', site.index);
    app.get('/authenticate', site.authenticate);
    app.get('/authenticated', site.authenticated);

// blog
    app.get('/blog', blog.index);
    app.get('/blog/new', blog.blogShowForm);
    app.post('/blog/new', blog.blogPostForm);

    app.get('/chat', chat.index);
    app.listen(8008);

    console.log('Express server started on port %s', app.address().port);

    chat.init(app);
};
module.exports = App;