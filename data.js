var twitterAccount;
var Redis = require('./redis');
var redis = new Redis();

function Data(properties) {
    twitterAccount = properties.admin.twitter;
}

Data.prototype.index = function(req,res) {
    if (!checkAdminUser(req,res)) return;

    res.render('data/index', {locals: {loginName:req.session.user.name}});
};

Data.prototype.messages = function(req,res) {
    if (!checkAdminUser(req,res)) return;
    var messages = [];
    redis.obtainMessages(0,0,function(replies) {
        replies.forEach(function (reply, i) {
            messages.push(JSON.parse(reply));
        });

        res.render('data/messages', {locals: {loginName:req.session.user.name, messages:messages}});
    });
};

Data.prototype.warnings = function(req,res) {
    if (!checkAdminUser(req,res)) return;
    var warnings = [];
    redis.obtainWarnings(function(replies) {
        replies.forEach(function (reply, i) {
            console.log("warning: %s", reply);
            warnings.push(JSON.parse(reply));
        });

        res.render('data/warnings', {locals: {loginName:req.session.user.name, warnings:warnings}});
    });
};

function checkAdminUser(req,res) {
    var loginName = '';
    if (req.session.oauth && req.session.user) {
        loginName = req.session.user.name;
        if (req.session.user.name == twitterAccount) {
            return true;
        }
    }
    res.render('404',{locals: {loginName:loginName}});
    return false;
}

module.exports = Data;