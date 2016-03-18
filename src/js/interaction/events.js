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

