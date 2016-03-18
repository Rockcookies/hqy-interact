var $ = require('../$');

var toString = exports.toString = Object.prototype.toString;

exports.isUndefined = function(obj) {
	return obj === void 0;
};

exports.isNull = function(obj) {
	return obj === null;
};

$.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function (index, name) {
	exports['is' + name] = function (obj) {
		return toString.call(obj) === '[object ' + name + ']';
	};
});

function S4() {
	return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}

exports.uuid = function (prefix) {
	var id = '' + S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4();
	return prefix ? prefix + id : id;
};

exports.ucfirst = function (str) {
	if (!str) return str;
	return str.charAt(0).toUpperCase() + str.substring(1);
};

