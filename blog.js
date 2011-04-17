function Blog() {}

var ArticleProvider = require('./articleprovider-memory').ArticleProvider;
var articleProvider = new ArticleProvider();

Blog.prototype.index = function(req, res) {
    articleProvider.findAll(function(error, docs) {
        res.render('blog/blog', {locals: {docs: docs, loginName:obtainLoginName(req)}});
    });
};
Blog.prototype.blogShowForm = function (req, res) {
    res.render('blog/blog_new', {locals: {title: 'New Blog Item', loginName:obtainLoginName(req)}});
};

Blog.prototype.blogPostForm = function (req, res) {
    console.log('The provided title is : %s', req.body.new_title);
    articleProvider.save({title: req.body.new_title, body: req.body.new_body},
            function(error, docs) {
                res.redirect('/blog');
            });
};

function obtainLoginName(req) {
    var loginName = '';
    if (req.session.oauth && req.session.user) {
        loginName = req.session.user.name;
    }
    return loginName;
}

module.exports = Blog;
