var $ = require('../$'),
	Widget = require('../utils/widget');

function Droppable () {}

$.extend(Droppable.prototype, Widget, {
	setup: function () {
		delegate(this, '_dragenter', 'onDragEnter');

		delegate(this, '_dragleave', 'onDragLeave');

		delegate(this, '_dragover', 'onDragOver');

		delegate(this, '_drop', 'onDrop');

		this.el.attr('hqy-droppable-element', 'active');

		instances.push(this);
	},

	destroy: function () {
		this.el.removeAttr('hqy-droppable-element');

		for (var i=0; i<instances.length; i++) {
			if (this === instances[i]) {
				instances.splice(i--, 1);
			}
		}

		Widget.destroy.call(this);
	}
});

module.exports = Droppable;

var instances = Droppable.instances = [];


// helpers
// ----------------

function delegate (instance, type, method) {
	instance.delegateEvents(type, function (event, dragEvent, dragElement) {
		this.triggerMethod(method, dragEvent, dragElement);
	});
}
