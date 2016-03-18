var $ = require('../$'),
	Utils = require('../utils/utils'),
	Droppable = require('./droppable-class');

$.fn.hqyDroppable = function (options) {
	var args = arguments;

	return this.each(function () {
		var $ele = $(this);
		var instance = $ele.data('hqyDroppable');

		if (Utils.isString(options)){
			instance && instance[options].apply(instance, Array.prototype.slice.call(args, 1));
			return;
		}

		options = $.extend({}, $.fn.hqyDroppable.defaults, options || {});

		if (instance){
			instance.destroy();
		}

		instance = new $.fn.hqyDroppable.clz();
		instance.init(this, options);

		$ele.data('hqyDroppable', instance);
	});
};

$.fn.hqyDroppable.clz = Droppable;
$.fn.hqyDroppable.instances = Droppable.instances;

$.fn.hqyDroppable.defaults = {
	accept: null,
	disabled: false,
	cursor: 'copy',
	onDragEnter: function(event, source){},
	onDragOver: function(event, source){},
	onDragLeave: function(event, source){},
	onDrop: function(event, source){}
};
