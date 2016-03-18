var $ = require('../$'),
	Events = require('./events'),
	Utils = require('../utils/utils'),
	Widget = require('../utils/widget');

function Draggable () {}

$.extend(Draggable.prototype, Widget, {
	setup: function () {
		this.bindEvents();
	},

	bindEvents: function () {
		var handle = this.get('handle') || this.el;

		if (isString(handle)) {
			handle = this.$(handle);
		}

		this.delegateEvents(handle, Events.start, this.doDragBefore);

		this.delegateEvents('click', function (event) {
			if (!this._allowClick) {
				event.preventDefault();
				event.stopPropagation();
				this._allowClick = true;
			}
		});
	},

	drag: function (event) {
		var dragData = event.data;
		var proxy = this._proxy;
		var axis = this.get('axis');
		var pointer = Events.pointer(event);
		var pageX = pointer.x;
		var pageY = pointer.y;

		var left = dragData.startLeft + pageX - dragData.startX;
		var top = dragData.startTop + pageY - dragData.startY;

		var parent;

		// 只有在 proxy 的情况下才计算 deltaX 和 deltaY
		if (proxy) {
			var deltaX = this.get('deltaX');
			var deltaY = this.get('deltaY');

			parent = proxy.parent();

			if (parent[0] == document.body){
				if (isValid(deltaX)) {
					left = pageX + deltaX;
				} else {
					left = pageX - dragData.offsetWidth;
				}

				if (isValid(deltaY)){
					top = pageY + deltaY;
				} else {
					top = pageY - dragData.offsetHeight;
				}
			} else {
				if (isValid(deltaX)) {
					left += dragData.offsetWidth + deltaX;
				}

				if (isValid(deltaY)){
					top += dragData.offsetHeight + deltaY;
				}
			}
		} else {
			parent = this.el.parent();
		}

		if (parent[0] != document.body) {
			left += parent.scrollLeft();
			top += parent.scrollTop();
		}


		if (axis == 'x') {
			dragData.left = left;
		} else if (axis == 'y') {
			dragData.top = top;
		} else {
			dragData.left = left;
			dragData.top = top;
		}
	},

	applyDrag: function (event) {
		(this._proxy || this.el).css({
			left: event.data.left,
			top: event.data.top
		});
	},

	doDragBefore: function (event) {
		// 重置点击事件标志位
		this._allowClick = true;

		// 不允许拖放
		if (event.which === 3 || this.get('disabled') || !canDrag()) {
			return;
		}


		// 阻止默认事件
		event.preventDefault();

		var position = this.el.position(),
			offset = this.el.offset(),
			pointer = Events.pointer(event);

		event.data = {
			startTime: new Date().getTime(), // 开始时间
			startPosition: this.el.css('position'), // 开始的 position，如 static，relative，方便拖拽结束后还原
			startLeft: position.left,
			startTop: position.top,
			left: position.left,
			top: position.top,
			startX: pointer.x,
			startY: pointer.y,
			offsetWidth: (pointer.x - offset.left),
			offsetHeight: (pointer.y - offset.top)
		};

		// 触发回调
		if (this.triggerMethod('onBeforeDrag', event) === false) return;

		var that = this,
			$doc = $(document),
			namespace = getEventNamespace(this.cid);

		$doc.on(Events.move + namespace, event.data, function (event) {
			if (!isDragging()) {
				that.doDragStart(event);
			} else {
				that.doDragMove(event);
			}
		});

		$doc.on(Events.end + namespace, event.data, function (event) {
			that.doDragEnd(event);
		});
	},

	doDragStart: function (event) {
		if (!this._isMoving) {
			// 阻止默认事件
			event.preventDefault();

			this._isMoving = true;
			return;
		}

		// 设置状态
		toggleDragging(true);

		var that = this;

		// drop 对象
		this._drops = $.grep(drops(), function (droppable) {
			// 排除 draggable 元素也是 droppable 元素
			if (that.element === droppable.element) {
				return false;
			}

			var accept = droppable.get('accept');

			// 询问每一个 drop 元素是否接受该拖拽对象
			if (isFunction(accept)) {
				return accept.call(droppable.element, that.element);

			// 如果 accept 是选择器
			} else if (accept) {
				return $(accept).filter(function(){
					return this === that.element;
				}).length > 0;

			// 默认接受该拖拽元素
			} else {
				return true;
			}
		});

		// 清理 proxy（上一次 revert 动画还没有执行完成）
		this.clearProxy();

		// 创建 proxy
		var userProxy = this.get('proxy');

		if (userProxy === 'clone'){
			this._proxy = this.el.clone().insertAfter(this.el);
		} else if (isFunction(userProxy)) {
			this._proxy = userProxy.call(this.element, this.element);
		}

		var target = this._proxy || this.el;

		// 设置定位
		target.css('position', 'absolute');

		// 设置拖拽指针样式
		$('body').css('cursor', this.get('cursor'));

		// 触发回调
		this.triggerMethod('onStartDrag', event, target[0]);

		// 设置一次位置
		this.doDragMove(event);
	},

	doDragMove: function (event) {
		if (!isDragging()) return;

		// 阻止默认事件
		event.preventDefault();

		// 处理拖拽数据
		this.drag(event);

		// 应用拖拽数据
		if (this.triggerMethod('onDrag', event, (this._proxy || this.el)[0]) !== false){
			this.applyDrag(event);
		}

		var that = this,
			$body = $('body'),
			target = this._proxy || this.el;

		// 触发 droppable 的事件
		dropsEach(event, this._drops, function (droppable, isContain) {
			var droppableElement = droppable.element,
				cursor = droppable.get('cursor');

			if (isContain) {
				// 如果未划入 drop 对象，则触发 _dragenter
				if (!droppableElement.entered) {
					$(droppableElement).trigger('_dragenter', [event, target[0]]);
					droppableElement.entered = true;
					// 设置拖拽指针样式
					cursor && $body.css('cursor', cursor);
				}

				// 同时触发 _dragover
				$(droppableElement).trigger('_dragover', [event, target[0]]);
			} else {
				// 如果已经划入，再划出，则触发 _dragleave
				if (droppableElement.entered){
					$(droppableElement).trigger('_dragleave', [event, target[0]]);
					droppableElement.entered = false;
					// 设置拖拽指针样式
					$body.css('cursor', that.get('cursor'));
				}
			}
		});
	},

	doDragEnd: function (event) {
		// 如果没有 drag 则什么都不做，并且清除执行中间数据
		if (!isDragging()) {
			this.clearProxy();
			this.clearDragging();
			return;
		}

		// 重置一次位置
		this.doDragMove(event);

		// 设置点击事件标志位
		this._allowClick = false;

		var that = this,
			revert = this.get('revert'),
			revertDuration = this.get('revertDuration'),
			target = this._proxy || this.el;


		dropsEach(event, this._drops, function (droppable, isContain) {
			if (!isContain) return;

			$(droppable.element).trigger('_drop', [event, target[0]]);

			droppable.element.entered = false;
			return false;
		});


		var reset = function (clearProxy) {
			// 触发 onStopDrag
			that.triggerMethod('onStopDrag', event, target[0]);

			that.clearDragging();

			// 清除代理
			clearProxy && that.clearProxy();
		}

		var doProxy = function () {
			if (revert) {
				var left, top;
				if (target.parent()[0] == document.body){
					left = event.data.startX - event.data.offsetWidth;
					top = event.data.startY - event.data.offsetHeight;
				} else {
					left = event.data.startLeft;
					top = event.data.startTop;
				}

				// 这里不能清空代理元素，有可能在执行动画
				reset();

				revertElement(target, {
					left: left,
					top: top
				}, revertDuration, function () {
					// 清除代理
					that.clearProxy();
				});
			} else {
				// 触发回调
				reset(true);
			}
		}

		var doEl = function () {
			if (revert) {
				revertElement(target, {
					left: event.data.startLeft,
					top: event.data.startTop
				}, revertDuration, function () {
					// 充值为初始 position
					target.css('position', event.data.startPosition);
				});
			}
			/* else {
				target.css({
					left: event.data.startLeft,
					top: event.data.startTop,
					position: event.data.startPosition
				});
			}*/

			// 触发回调
			reset(true);
		}

		if (this._proxy) {
			doProxy(target);
		} else {
			doEl(target);
		}
	},

	clearProxy: function () {
		if (this._proxy) {
			this._proxy.stop(true).remove();
			this._proxy = null;
		}
	},

	clearDragging: function () {
		this._drops = null;

		this._isMoving = false;

		$(document).off(getEventNamespace(this.cid));

		setTimeout(function(){
			$('body').css('cursor','');
		},100);

		toggleDragging(false);
	},

	destroy: function () {
		// 清除拖拽事件产生的临时变量
		this.clearDragging();

		Widget.destroy.call(this);
	}
});

module.exports = Draggable;


// helpers
// ----------------

var isString = Utils.isString,
	isFunction = Utils.isFunction,
	isUndefined = Utils.isUndefined,
	isNull = Utils.isNull;

function getEventNamespace (cid) {
	return '.hqyDraggable' + cid;
}

function canDrag () {
	if ($.fn.hqyDraggable.isDragging) return false;

	if ($.fn.hqyResizable && ($.fn.hqyResizable.isResizing || $.fn.hqyResizable.inHotzone)) {
		return false;
	}

	return true;
}

function toggleDragging (state) {
	$.fn.hqyDraggable.isDragging = state;
}

function isDragging () {
	return $.fn.hqyDraggable.isDragging;
}

function drops () {
	return ($.fn.hqyDroppable && $.fn.hqyDroppable.instances) || [];
}

function isValid (val) {
	return !isUndefined(val) && !isNull(val);
}

function dropsEach (event, drops, cb) {
	var pointer = Events.pointer(event);

	var pageX = pointer.x;
	var pageY = pointer.y;

	$.each(drops, function (index, droppable) {
		if (droppable.get('disabled')) {
			return;
		}

		var p2 = droppable.el.offset();

		var isContain = pageX > p2.left &&
						pageX < p2.left + droppable.el.outerWidth() &&
						pageY > p2.top &&
						pageY < p2.top + droppable.el.outerHeight();

		return cb.call(droppable.element, droppable, isContain);
	});
}


function revertElement (target, animateTo, duration, cb) {
	cb = cb || $.noop();

	if (duration > 0) {
		target.animate(animateTo, duration, cb);
	} else {
		target.css(animateTo);
		cb();
	}
}
