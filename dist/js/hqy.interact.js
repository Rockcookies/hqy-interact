/*!!
 * Hqy Interact v1.0.1
 * Copyright 2015-2016 HQY ( email: hqy321@gmail.com)
 * Licensed under MIT
 */

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(7);
	__webpack_require__(9);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(2),
		Utils = __webpack_require__(3),
		Draggable = __webpack_require__(4);
	
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


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = window.jQuery || window.Zepto;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(2);
	
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
	


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(2),
		Events = __webpack_require__(5),
		Utils = __webpack_require__(3),
		Widget = __webpack_require__(6);
	
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


/***/ },
/* 5 */
/***/ function(module, exports) {

	var touch = !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
	
	if (touch) {
		exports.start = 'touchstart';
		exports.move = 'touchmove';
		exports.end = 'touchend';
	} else {
		var navigator = window.navigator;
		var desktopEvents = ['mousedown', 'mousemove', 'mouseup'];
		if (navigator.pointerEnabled) desktopEvents = ['pointerdown', 'pointermove', 'pointerup'];
		else if (navigator.msPointerEnabled) desktopEvents = ['MSPointerDown', 'MSPointerMove', 'MSPointerUp'];
	
		exports.start = desktopEvents[0];
		exports.move = desktopEvents[1];
		exports.end = desktopEvents[2];
	}
	
	
	exports.pointer = function (event) {
		var result = { x: null, y: null };
	
		event = event.originalEvent || event || window.event;
	
		event = event.touches && event.touches.length ?
				event.touches[0] : event.changedTouches && event.changedTouches.length ?
					event.changedTouches[0] : event;
	
		if (event.pageX) {
			result.x = event.pageX;
			result.y = event.pageY;
		} else {
			result.x = event.clientX;
			result.y = event.clientY;
		}
	
		return result;
	};
	


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(2),
		Utils = __webpack_require__(3);
	
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
			this.undelegateEvents();
	
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
	
	


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(2),
		Utils = __webpack_require__(3),
		Droppable = __webpack_require__(8);
	
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


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(2),
		Widget = __webpack_require__(6);
	
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


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(2),
		Utils = __webpack_require__(3),
		Resizable = __webpack_require__(10);
	
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


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(2),
		Events = __webpack_require__(5),
		Widget = __webpack_require__(6);
	
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
	
	


/***/ }
/******/ ]);
//# sourceMappingURL=hqy.interact.js.map