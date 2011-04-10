var ArticleProvider = require('./articleprovider-memory').ArticleProvider;
var articleProvider = new ArticleProvider();


exports.index = function(req, res) {
    articleProvider.findAll(function(error, docs) {
        res.render('blog/blog', {locals: {docs: docs}});
    });
};

exports.blogShowForm = function (req, res) {
    res.render('blog/blog_new', {locals: {title: 'New Blog Item'}});
};

exports.blogPostForm = function (req, res) {
    console.log('The provided title is : %s', req.body.new_title);
    articleProvider.save({title: req.body.new_title, body: req.body.new_body},
            function(error, docs) {
                res.redirect('/blog');
            });
};