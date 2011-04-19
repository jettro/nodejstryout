function NowjsApp() {
}

// url handling
NowjsApp.prototype.index = function(req, res) {
    console.log('Opening up the nowjs sample');
    var loginName='';
    if (req.session.oauth) {
        loginName = req.session.user.name;
    }

    res.render('now/index', {layout: 'now/layout', locals:{loginName:loginName}})
};

// nowjs configuration
var now = require('now');
var everyone;
var buffer = [];

NowjsApp.prototype.init = function(app) {
    addToLog("Initializing the nowjs app");
    everyone = now.initialize(app, {clientWrite: false});
    everyone.now.availablePersons = [];

    everyone.now.distributeMessage = function(message) {
        console.log('Received a message to distribute: %s for %s', message, everyone.now.availablePersons[this.user.clientId]);
        var msg = { chat: [everyone.now.availablePersons[this.user.clientId], message] };
        buffer.push(msg);
        if (buffer.length > 15) buffer.shift();

        everyone.now.receiveMessage(msg);
    };

    everyone.now.setName = function(name) {
        addToLog("Set name to: " + name);
        everyone.now.availablePersons[this.user.clientId] = name;
        everyone.now.newlyJoined(name);
        sendClients();

    };

    everyone.on('connect', function() {
        addToLog("Joined: " + this.user.clientId);
        this.now.bufferedMessages({buffer:buffer});
    });

    everyone.on('disconnect', function() {
        addToLog("Left: " + this.user.clientId);
        delete everyone.now.availablePersons[this.user.clientId];
        everyone.now.hasLeft(this.user.clientId);
        sendClients();
    });

    function addToLog(message) {
        console.log(message);
    }

    function sendClients() {
        var curClients = [];
        for (var i in everyone.now.availablePersons) {
            curClients[curClients.length] = everyone.now.availablePersons[i];
        }
        console.log("Number of clients: " + curClients);
        everyone.now.refreshAvailablePersons({users: curClients});
    }

};

module.exports = NowjsApp;