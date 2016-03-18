var $ = require('../$'),
	Events = require('./events'),
	Widget = require('../utils/widget');

function Resizable () {}

$.extend(Resizable.prototype, Widget, {
	setup: function () {
		this.bindEvents();
	},

	bindEvents: function () {
		this.delegateEvents('mousemove', function (event) {
			if (this.get('disabled')) return;

			var dir = this.getDirection(Events.pointer(event));

			if (dir) {
				this.el.css('cursor', dir + '-resize');
				toggleInHotzone(true);
			} else {
				this.el.css('cursor', '');
				toggleInHotzone(false);
			}
		});

		this.delegateEvents('mouseleave', function (event) {
			if (this.get('disabled')) return;

			this.el.css('cursor', '');
			toggleInHotzone(false);
		});

		this.delegateEvents(Events.start, this.doResizeBefore);

		this.delegateEvents('click', function (event) {
			if (!this._allowClick) {
				event.preventDefault();
				event.stopPropagation();
				this._allowClick = true;
			}
		});
	},

	getDirection: function (pointer) {
		var offset = this.el.offset(),
			width = this.el.outerWidth(),
			height = this.el.outerHeight(),
			edge = this.get('edge'),
			pageX = pointer.x,
			pageY = pointer.y,
			dir = '';

		if (pageY > offset.top && pageY < offset.top + edge) {
			dir += 'n';
		} else if (pageY < offset.top + height && pageY > offset.top + height - edge) {
			dir += 's';
		}
		if (pageX > offset.left && pageX < offset.left + edge) {
			dir += 'w';
		} else if (pageX < offset.left + width && pageX > offset.left + width - edge) {
			dir += 'e';
		}

		var handles = this.get('handles').split(',');
		for(var i=0; i<handles.length; i++) {
			var handle = handles[i].replace(/(^\s*)|(\s*$)/g, '');
			if (handle == 'all' || handle == dir) {
				return dir;
			}
		}
		return false;
	},

	doResizeBefore: function (event) {
		// 重置点击事件标志位
		this._allowClick = true;

		// 不允许缩放
		if (event.which === 3 || this.get('disabled') || !canResize()) {
			return;
		}

		var pointer = Events.pointer(event);

		// 获取缩放的方向
		var dir = this.getDirection(pointer);
		if (!dir) return;

		// 阻止默认事件
		event.preventDefault();

		// 撤销 hotzone 状态
		toggleInHotzone(false);

		// 封装缩放数据
		var outerWidth = this.el.outerWidth();
		var outerHeight = this.el.outerHeight();
		var width = this.el.width();
		var height = this.el.height();

		event.data = {
			dir: dir,
			startLeft: getCssValue(this.el, 'left'),
			startTop: getCssValue(this.el, 'top'),
			left: getCssValue(this.el, 'left'),
			top: getCssValue(this.el, 'top'),
			startX: pointer.x,
			startY: pointer.y,
			startWidth: outerWidth,
			startHeight: outerHeight,
			width: outerWidth,
			height: outerHeight,
			deltaWidth: outerWidth - width,
			deltaHeight: outerHeight - height
		};

		if (this.triggerMethod('onBeforeResize', event) === false) return;

		var that = this,
			$doc = $(document),
			namespace = getEventNamespace(this.cid);

		$doc.on(Events.move + namespace, event.data, function (event) {
			if (!isResizing()) {
				that.doResizeStart(event);
			} else {
				that.doResizeMove(event);
			}
		});

		$doc.on(Events.end + namespace, event.data, function (event) {
			that.doResizeEnd(event);
		});
	},

	resize: function (event) {
		var resizeData = event.data;
		var dir = resizeData.dir;
		var pointer = Events.pointer(event);
		var pageX = pointer.x;
		var pageY = pointer.y;
		var width = 0;
		var height = 0;

		if (dir.indexOf('e') != -1) {
			width = resizeData.startWidth + pageX - resizeData.startX;
			width = Math.min(
						Math.max(width, this.get('minWidth')),
						this.get('maxWidth')
					);
			resizeData.width = width;
		}
		if (dir.indexOf('s') != -1) {
			height = resizeData.startHeight + pageY - resizeData.startY;
			height = Math.min(
					Math.max(height, this.get('minHeight')),
					this.get('maxHeight')
			);
			resizeData.height = height;
		}
		if (dir.indexOf('w') != -1) {
			width = resizeData.startWidth - pageX + resizeData.startX;
			width = Math.min(
						Math.max(width, this.get('minWidth')),
						this.get('maxWidth')
					);
			resizeData.width = width;
			resizeData.left = resizeData.startLeft + resizeData.startWidth - resizeData.width;
		}
		if (dir.indexOf('n') != -1) {
			height = resizeData.startHeight - pageY + resizeData.startY;
			height = Math.min(
						Math.max(height, this.get('minHeight')),
						this.get('maxHeight')
					);
			resizeData.height = height;
			resizeData.top = resizeData.startTop + resizeData.startHeight - resizeData.height;
		}
	},

	applySize: function (event) {
		var resizeData = event.data;

		this.el.css({
			left: resizeData.left,
			top: resizeData.top
		});

		if (this.el.outerWidth() != resizeData.width) {
			this.el.width(resizeData.width - resizeData.deltaWidth);
		}

		if (this.el.outerHeight() != resizeData.height) {
			this.el.height(resizeData.height - resizeData.deltaHeight);
		}
	},

	doResizeStart: function (event) {
		if (!this._isMoving) {
			// 阻止默认事件
			event.preventDefault();

			this._isMoving = true;
			return;
		}

		// 设置状态
		toggleResizing(true);

		$('body').css('cursor', event.data.dir+'-resize');

		// 触发回调
		this.triggerMethod('onStartDrag', event);

		// 设置一次缩放
		this.doResizeMove(event);
	},

	doResizeMove: function (event) {
		if (!isResizing()) return;

		// 阻止默认事件
		event.preventDefault();

		// 处理缩放数据
		this.resize(event);

		// 处理缩放数据
		if (this.triggerMethod('onResize', event) !== false) {
			this.applySize(event);
		}
	},

	doResizeEnd: function (event) {
		if (!isResizing()) {
			this.clearResizing();
			return;
		}

		// 重置一次缩放
		this.doResizeMove(event);

		// 设置点击事件标志位
		this._allowClick = false;

		// 触发回调
		this.triggerMethod('onStopResize', event);

		this.clearResizing();

		$('body').css('cursor','');
	},

	clearResizing: function () {
		this._isMoving = false;

		$(document).off(getEventNamespace(this.cid));

		setTimeout(function(){
			$('body').css('cursor','');
		},100);

		toggleResizing(false);
		toggleInHotzone(false);
	},

	destroy: function () {
		// 清除缩放事件产生的临时变量
		this.clearResizing();
		Widget.destroy.call(this);
	}
});

module.exports = Resizable;

// helpers
// ----------------

function getEventNamespace (cid) {
	return '.hqyResizable' + cid;
}

function canResize () {
	if ($.fn.hqyResizable.isResizing) return false;

	if ($.fn.hqyDraggable && $.fn.hqyDraggable.isDragging) {
		return false;
	}

	return true;
}

function toggleResizing (state) {
	$.fn.hqyResizable.isResizing = state;
}

function toggleInHotzone (state) {
	$.fn.hqyResizable.inHotzone = state;
}

function isResizing () {
	return $.fn.hqyResizable.isResizing;
}

function getCssValue(el, css) {
	var val = parseInt(el.css(css));
	if (isNaN(val)) {
		return 0;
	} else {
		return val;
	}
}


