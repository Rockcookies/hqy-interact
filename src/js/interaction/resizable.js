var $ = require('../$'),
	Utils = require('../utils/utils'),
	Resizable = require('./resizable-class');

$.fn.hqyResizable = function (options) {
	var args = arguments;

	return this.each(function () {
		var $ele = $(this);
		var instance = $ele.data('hqyResizable');

		if (Utils.isString(options)){
			instance && instance[options].apply(instance, Array.prototype.slice.call(args, 1));
			return;
		}

		options = $.extend({}, $.fn.hqyResizable.defaults, options || {});

		if (instance){
			instance.destroy();
		}

		instance = new $.fn.hqyResizable.clz();
		instance.init(this, options);

		$ele.data('hqyResizable', instance);
	});
};

$.fn.hqyResizable.clz = Resizable;

$.fn.hqyResizable.defaults = {
	disabled: false,
	handles:'n, e, s, w, ne, se, sw, nw, all',
	minWidth: 10,
	minHeight: 10,
	maxWidth: 10000,
	maxHeight: 10000,
	edge:5,
	onBeforeResize: function (e) {},
	onStartResize: function(e) {},
	onResize: function(e) {},
	onStopResize: function(e) {}
};
