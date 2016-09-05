var $ = require('../$'),
	Utils = require('./utils');

var DELEGATE_EVENT_NS = '.delegate-events-';

module.exports = {
	// 初始化
	init: function (element, options) {
		this.initCid();

		this.initOptions(options);

		this.initElement(element);

		this.setup();
	},

	// 初始化 ID
	initCid: function () {
		this.cid = uuid();
	},

	// 初始化 dom 对象
	initElement: function (element) {
		this.originalElement = element;
		this.element = $(element)[0];
		if (!this.element) {
			throw new Error('element is invalid');
		}
		this.el = $(this.element);
	},

	// 初始化 参数
	initOptions: function (options) {
		this.originalAttrs = options;
		this.attrs = $.extend({}, this.originalAttrs);
	},

	// 提供子类覆盖
	setup: function () {},

	// 获取属性
	get: function (key) {
		return this.attrs[key];
	},

	// 设置属性
	set: function (key, val) {
		if (key) {
			this.attrs[key] = val;
		}
	},

	// 在 this.el 内寻找匹配节点
	$: function(selector) {
		return this.el.find(selector);
	},

	triggerMethod: function (name) {
		var cb = this.get(name);

		if (isFunction(cb)) {
			return cb.apply(this.element, Array.prototype.slice.call(arguments, 1));
		}
	},

	// 注册事件代理
	delegateEvents: function(element, events, handler) {
		var argus = trimRightUndefine(Array.prototype.slice.call(arguments));

		// delegateEvents()
		if (argus.length === 0) {
			return this;

		// delegateEvents({
		//   'click p': 'fn1',
		//   'click li': 'fn2'
		// })
		} else if (argus.length === 1) {
			events = element;
      		element = this.el;
		}

		// delegateEvents('click p', function(ev) { ... })
		else if (argus.length === 2) {
			handler = events;
			events = element;
			element = this.el;
		}

		// delegateEvents(element, 'click p', function(ev) { ... })
		else {
			element || (element = this.el)
			this._delegateElements || (this._delegateElements = [])
			this._delegateElements.push($(element))
		}

		// 'click p' => {'click p': handler}
		if (isString(events) && isFunction(handler)) {
			var o = {};
			o[events] = handler;
			events = o;
		}

		// key 为 'event selector'
		for (var key in events) {
			if (!events.hasOwnProperty(key)) continue;

			var args = parseEventKey(key, this);
			var eventType = args.type;
			var selector = args.selector;

			;(function(handler, widget) {
				var callback = function(ev) {
					var args = Array.prototype.slice.call(arguments);

					if (isFunction(handler)) {
						return handler.apply(widget, args);
					} else {
						return widget[handler].apply(widget, args);
					}
				}

				// delegate
				if (selector) {
					$(element).on(eventType, selector, callback);
				}
				// normal bind
				// 分开写是为了兼容 zepto，zepto 的判断不如 jquery 强劲有力
				else {
					$(element).on(eventType, callback);
				}

			})(events[key], this);
		}

		return this;
	},

	// 卸载事件代理
	unDelegateEvents: function(element, eventKey) {
		var argus = trimRightUndefine(Array.prototype.slice.call(arguments));

		if (!eventKey) {
			eventKey = element;
			element = null;
		}

		// 卸载所有
		// .undelegateEvents()
		if (argus.length === 0) {
			var type = DELEGATE_EVENT_NS + this.cid;

			this.el && this.el.off(type);

			// 卸载所有外部传入的 element
			if (this._delegateElements) {
				for (var de in this._delegateElements) {
					if (!this._delegateElements.hasOwnProperty(de)) continue;
					this._delegateElements[de].off(type);
				}
			}

		} else {
			var args = parseEventKey(eventKey, this);

			// 卸载 this.el
			// .undelegateEvents(events)
			if (!element) {
				this.el && this.el.off(args.type, args.selector);
			}

			// 卸载外部 element
			// .undelegateEvents(element, events)
			else {
				$(element).off(args.type, args.selector);
			}
		}

		return this;
	},


	destroy: function () {
		this.unDelegateEvents();

		for (var p in this) {
			if (this.hasOwnProperty(p)) {
				delete this[p];
			}
		}

		this.destroy = function() {};
	}
};

// Helpers
// ------
var uuid = Utils.uuid,
	isString = Utils.isString,
	isFunction = Utils.isFunction;

var EVENT_KEY_SPLITTER = /^(\S+)\s*(.*)$/;
var EXPRESSION_FLAG = /{{([^}]+)}}/g;
var INVALID_SELECTOR = 'INVALID_SELECTOR';

function parseEventKey(eventKey, widget) {
	var match = eventKey.match(EVENT_KEY_SPLITTER);
	var eventType = match[1] + DELEGATE_EVENT_NS + widget.cid;

	// 当没有 selector 时，需要设置为 undefined，以使得 zepto 能正确转换为 bind
	var selector = match[2] || undefined;

	if (selector && selector.indexOf('{{') > -1) {
		selector = parseExpressionInEventKey(selector, widget);
	}

	return {
		type: eventType,
		selector: selector
	};
}

// 解析 eventKey 中的 {{xx}}, {{yy}}
function parseExpressionInEventKey(selector, widget) {

	return selector.replace(EXPRESSION_FLAG, function(m, name) {
		var parts = name.split('.');
		var point = widget, part;

		while (part = parts.shift()) {
			if (point === widget.attrs) {
				point = widget.get(part);
			} else {
				point = point[part];
			}
		}

		// 已经是 className，比如来自 dataset 的
		if (isString(point)) {
			return point;
		}

		// 不能识别的，返回无效标识
		return INVALID_SELECTOR;
	});
}


function trimRightUndefine(argus) {
	for (var i = argus.length - 1; i >= 0; i--) {
		if (argus[i] === undefined) {
			argus.pop();
		} else {
			break;
		}
	}
	return argus;
}


