var consumer_key = "gD4vivMJ2QxeECPr50CGA";
var consumer_secret = "E2090oHPThSwdVSPDyMfvhFW6styfDRtA9qCDZwle4";

exports.index = function(req, res) {
    res.render('index', {locals: {login:'login to this app'}});
};

exports.authenticated = function(req, res, next) {
    if (req.session.oauth) {
        req.session.oauth.verifier = req.query.oauth_verifier;
        var oauth = req.session.oauth;

        oa.getOAuthAccessToken(oauth.token, oauth.token_secret, oauth.verifier,
                function(error, oauth_access_token, oauth_access_token_secret, results) {
                    if (error) new Error(error);
                    console.log(results.screen_name)
                }
                );
    } else
        next(new Error('No OAuth information stored in the session. How did you get here?'));
    res.render('index');
};

exports.authenticate = function(req, res) {
    var sys = require('sys');
    var OAuth = require('oauth').OAuth;
    oa = new OAuth("https://api.twitter.com/oauth/request_token",
            "https://api.twitter.com/oauth/access_token",
            consumer_key, consumer_secret,
            "1.0A", "http://localhost:8008/authenticated", "HMAC-SHA1");
    req.session.oauth = oa;

    oa.getOAuthRequestToken(function(error, oauth_token, oauth_token_secret, results) {
        if (error) new Error(error.data);
        else {
            req.session.oauth.token = oauth_token
            req.session.oauth.token_secret = oauth_token_secret
            res.redirect('https://api.twitter.com/oauth/authenticate?oauth_token=' + oauth_token)
        }
    });
};