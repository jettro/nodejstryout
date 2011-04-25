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

Redis.prototype.obtainMessages = function(start,amount,callback) {
    if (redisEnabled) {
        initClient();
        client.lrange("messages", start, amount-1, function(err, replies) {
            callback(replies);
        });
        client.quit();
    } else {
        callback([]);
    }
};

Redis.prototype.writeWarning = function(message) {
    if (redisEnabled) {
        initClient();
        client.lpush("warnings", message);
        client.quit();
    }
};

Redis.prototype.obtainWarnings = function(callback) {
    if (redisEnabled) {
        initClient();
        client.lrange("warnings", 0, -1, function(err, replies){
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