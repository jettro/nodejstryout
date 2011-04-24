// https://github.com/mranney/node_redis
function Redis() {}

var redis = require("redis");
var client;

Redis.prototype.storeMessage = function (chatMessage) {
    initClient();
    client.lpush("messages",chatMessage);
    client.quit();
};

Redis.prototype.obtainMessages = function(callback) {
    initClient();
    client.lrange("messages",0,14,function(err, replies) {
        callback(replies);
    });
    client.quit();
};

function initClient() {
    client = redis.createClient();
    client.on("error", function (err) {
        console.log("Error " + err);
    });
}

module.exports = Redis;