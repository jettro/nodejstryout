// https://github.com/mranney/node_redis
var properties = require("./properties");

var redisEnabled = false;
var redis;
var client;

function Redis() {
    redisEnabled = properties.redis.enabled;
    if (redisEnabled) {
        redis = require("redis");
    }
}

Redis.prototype.storeMessage = function (chatMessage) {
    if (redisEnabled) {
        initClient();
        client.lpush("messages", chatMessage);
        client.quit();
    }
};

Redis.prototype.obtainMessages = function(callback) {
    if (redisEnabled) {
        initClient();
        client.lrange("messages", 0, 14, function(err, replies) {
            callback(replies);
        });
        client.quit();
    } else {
        callback([]);
    }
};

function initClient() {
    client = redis.createClient();
    client.on("error", function (err) {
        console.log("Error " + err);
    });
}

module.exports = Redis;