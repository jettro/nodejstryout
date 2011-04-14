function NowjsApp() {
}

// url handling
NowjsApp.prototype.index = function(req, res) {
    console.log('Opening up the nowjs sample');
    res.render('now/index', {layout: 'now/layout'})
};

// nowjs configuration
var now = require("/Users/jcoenradie/sources/external/nodejs/now");
var everyone;

NowjsApp.prototype.init = function(app) {
    addToLog("Initializing the nowjs app");
    everyone = now.initialize(app, {clientWrite: true});
    everyone.now.availablePersons = [];

    everyone.now.distributeMessage = function(message) {
        console.log('Received a message to distribute: %s for %s', message, this.user.clientId);
        everyone.now.receiveMessage(this.user.clientId, message);
    };

    everyone.now.setName = function() {
        addToLog("Set name to: " + this.now.name);
        everyone.now.availablePersons[this.user.clientId] = this.now.name;
        everyone.now.refreshPersonsList();
    };

    everyone.on('connect', function() {
        everyone.now.availablePersons[this.user.clientId] = this.user.clientId;
        everyone.now.newlyJoined(this.user.clientId);
        addToLog("Joined: " + this.user.clientId);
    });

    everyone.on('disconnect', function() {
        addToLog("Left: " + this.user.clientId);
        delete everyone.now.availablePersons[this.user.clientId];
        everyone.now.hasLeft(this.user.clientId);
        everyone.now.refreshPersonsList();
    });

    function addToLog(message) {
        console.log(message);
    }

};

module.exports = NowjsApp;