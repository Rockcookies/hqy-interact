var $ = require('../$'),
	Utils = require('../utils/utils'),
	Draggable = require('./draggable-class');

$.fn.hqyDraggable = function (options) {
	var args = arguments;

	return this.each(function () {
		var $ele = $(this);
		var instance = $ele.data('hqyDraggable');

		if (Utils.isString(options)){
			instance && instance[options].apply(instance, Array.prototype.slice.call(args, 1));
			return;
		}

		options = $.extend({}, $.fn.hqyDraggable.defaults, options || {});

		if (instance){
			instance.destroy();
		}

		instance = new $.fn.hqyDraggable.clz();
		instance.init(this, options);

		$ele.data('hqyDraggable', instance);
	});
};

$.fn.hqyDraggable.clz = Draggable;

$.fn.hqyDraggable.defaults = {
	proxy:null,
	revert:false,
	revertDuration: 0,
	deltaX:null,
	deltaY:null,
	handle: null,
	disabled: false,
	axis:null,	// x or y
	cursor: 'move',

	onBeforeDrag: function(event){},
	onStartDrag: function(event, target){},
	onDrag: function(event, target){},
	onStopDrag: function(event, target){}
};
