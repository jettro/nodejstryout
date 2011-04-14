// Based on: https://github.com/theteam/node-properties/blob/master/lib/properties.js
var fs = require('fs');

var properties_file = process.cwd() + '/config/config.json';
var properties = {};

try {
	properties = JSON.parse(fs.readFileSync(properties_file, 'utf8'));
} catch (err){
	console.log(err);
}

for (attrname in properties) {
	properties[attrname] = properties[attrname];
}

module.exports = properties;