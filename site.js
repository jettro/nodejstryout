/**
 * The site module is initialized using a properties object. This objects needs to have the following parameters:
 * - consumer.key
 * - consumer.secret
 * - host
 *
 * The key and secret are used to connect to twitter for authentication. The host is used for the callback for twitter.
 *
 */

var consumer_key;
var consumer_secret;
var host;

function Site(properties) {
    consumer_key = properties.consumer.key;
    consumer_secret = properties.consumer.secret;
    host = properties.host;
}

Site.prototype.index = function(req, res) {
    var loginName = '';
    if (req.session.oauth && req.session.user) {
        loginName = req.session.user.name;
    }
    res.render('index', {locals: {loginName:loginName}});
};

Site.prototype.authenticated = function(req, res, next) {
    if (req.session.oauth) {
        req.session.oauth.verifier = req.query.oauth_verifier;
        var oauth = req.session.oauth;

        oa.getOAuthAccessToken(oauth.token, oauth.token_secret, oauth.verifier,
                function(error, oauth_access_token, oauth_access_token_secret, results) {
                    if (error) new Error(error);
                    req.session.user = {name:results.screen_name};
                    res.redirect("/");
                }
                );
    } else {
        next(new Error('No OAuth information stored in the session. How did you get here?'));
    }
};

Site.prototype.authenticate = function(req, res) {
    var sys = require('sys');
    var OAuth = require('oauth').OAuth;
    oa = new OAuth("https://api.twitter.com/oauth/request_token",
            "https://api.twitter.com/oauth/access_token",
            consumer_key, consumer_secret,
            "1.0A", host + "/authenticated", "HMAC-SHA1");
    req.session.oauth = oa;

    oa.getOAuthRequestToken(function(error, oauth_token, oauth_token_secret, results) {
        if (error) new Error(error.data);
        else {
            req.session.oauth.token = oauth_token;
            req.session.oauth.token_secret = oauth_token_secret;
            res.redirect('https://api.twitter.com/oauth/authenticate?oauth_token=' + oauth_token);
        }
    });
};

module.exports = Site;