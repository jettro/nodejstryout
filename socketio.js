function Socketio() {
}

// url handling
Socketio.prototype.index = function(req, res) {
    console.log('Opening up the socket.io sample');
    var loginName='';
    if (req.session.oauth) {
        loginName = req.session.user.name;
    }

    res.render('socketio/index', {layout: 'socketio/layout', locals:{loginName:loginName}});
};

// socket io configuration
var io = require('socket.io');
var buffer = [];
var clients = [];
var Redis = require('./redis');
var redis = new Redis();
var sanitize = require('validator').sanitize;

redis.obtainMessages(0,15,function(replies) {
    replies.forEach(function (reply, i) {
        buffer.push(JSON.parse(reply));
    });
    buffer.reverse();
});

Socketio.prototype.init = function(app) {
    io = io.listen(app);

    io.on('connection', function(client) {
        client.send({ buffer: buffer });

        client.on('message', function(message) {
            if (hackFoundInMessage(message)) return;

            if ('newName' in message) {
                console.log("Received a new name: " + message.newName);
                clients[client.sessionId] = message.newName;
                client.broadcast({ announcement: clients[client.sessionId] + ' connected' });
                sendClients(client);
                return;
            }
            var msg = { chat: [clients[client.sessionId], message.message] };
            buffer.push(msg);
            if (buffer.length > 15) buffer.shift();
            client.broadcast(msg);
            io.emit('newMessage',msg);
        });

        client.on('disconnect', function() {
            client.broadcast({ announcement: clients[client.sessionId] + ' disconnected' });
            removeClient(client.sessionId);
            sendClients(client)
        });
    });

    io.on('newMessage', function(obj) {
        redis.storeMessage(JSON.stringify(obj));
    });

    function removeClient(id) {
        delete clients[id];
    }

    function sendClients(client) {
        var curClients = [];
        for (var i in clients) {
            curClients[curClients.length] = clients[i];
        }
        client.broadcast({users: curClients});
        client.send({users: curClients});
    }

    function hackFoundInMessage(message) {
        var hackFound = false;
        var jsonMessage = JSON.stringify(message);
        var xssMessage = sanitize(jsonMessage).xss();
        if (jsonMessage != xssMessage) {
            var hack = {"hack":{"old":jsonMessage, "new":xssMessage, "date":new Date()}};
            redis.writeWarning(JSON.stringify(hack));
            hackFound = true; // Might want to do something with a callback
        }
        return hackFound;
    }

};

module.exports = Socketio;
