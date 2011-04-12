function Nowjs() {
}

// url handling
Nowjs.prototype.index = function(req, res) {
    console.log('Opening up the nowjs sample');
    res.render('now/index', {layout: 'now/layout'})
};

// nowjs configuration
var now = require("now");
var everyone;

Nowjs.prototype.init = function(app) {
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

    everyone.connected(function() {
        addToLog("Joined: " + this.user.clientId);
        everyone.now.availablePersons[this.user.clientId] = this.user.clientId;
        everyone.now.newlyJoined(this.user.clientId);
    });

    everyone.disconnected(function() {
        addToLog("Left: " + this.user.clientId);
        delete everyone.now.availablePersons[this.user.clientId];
        everyone.now.hasLeft(this.user.clientId);
        everyone.now.refreshPersonsList();
    });

    function addToLog(message) {
        console.log(message);
    }

};

module.exports = Nowjs;