function AppUniform() {
}

var properties = require('./properties');
var Site = require('./site');
var Blog = require('./blog');
var Data = require('./data');

AppUniform.prototype.start = function(chat) {
    var pub = __dirname + '/public';

    var express = require('express')
            , app = express.createServer()
            , blog = new Blog()
            , site = new Site(properties)
            , data = new Data(properties);

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

// chat
    app.get('/chat', chat.index);

// data
    app.get('/data',data.index);
    app.get('/data/messages',data.messages);
    app.get('/data/warnings',data.warnings);

    app.listen(process.env.VCAP_APP_PORT || 8008);
    console.log('Express server started on port %s', app.address().port);

    chat.init(app);
};
module.exports = AppUniform;