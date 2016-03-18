---
layout: demos
title:  Events
---

<div class="demo-box">
  <div id="drop" class="bg-orange" style="position:absolute;left: 50%; top: 50%; height: 100px; width: 100px; margin-left: -50px; margin-top: -50px; text-align: center;">drop here</div>
  <div id="drag" class="bg-green" style="position:absolute; height: 100px; width: 100px; text-align: center;">drag resize</div>
</div>


<div class="row">
	<div class="col-md-4">
		<h3>hqyDraggable</h3>
		<div class="callbacks">
			<div><span class="on onBeforeDrag">on</span> onBeforeDrag</div>
			<div><span class="on onStartDrag">on</span> onStartDrag</div>
			<div><span class="on onDrag">on</span> onDrag</div>
			<div><span class="on onStopDrag">on</span> onStopDrag</div>
		</div>
	</div>

	<div class="col-md-4">
		<h3>hqyDroppable</h3>
		<div class="callbacks">
			<div><span class="on onDragEnter">on</span> onDragEnter</div>
			<div><span class="on onDragOver">on</span> onDragOver</div>
			<div><span class="on onDragLeave">on</span> onDragLeave</div>
			<div><span class="on onDrop">on</span> onDrop</div>
		</div>
	</div>

	<div class="col-md-4">
		<h3>hqyResizable</h3>
		<div class="callbacks">
			<div><span class="on onBeforeResize">on</span> onBeforeResize</div>
			<div><span class="on onStartResize">on</span> onStartResize</div>
			<div><span class="on onResize">on</span> onResize</div>
			<div><span class="on onStopResize">on</span> onStopResize</div>
		</div>
	</div>
</div>

<script type="text/javascript">
function callback (type) {
	return function () {
		$('.' + type).addClass('active');
		window.setTimeout(function() {
			$('.' + type)
			.removeClass('active');
		}, 500);
	}
}

$('#drag').hqyDraggable({
	onBeforeDrag: callback('onBeforeDrag'),
	onStartDrag: callback('onStartDrag'),
	onDrag: callback('onDrag'),
	onStopDrag: callback('onStopDrag')
}).hqyResizable({
	onBeforeResize: callback('onBeforeResize'),
	onStartResize: callback('onStartResize'),
	onResize: callback('onResize'),
	onStopResize: callback('onStopResize')
});

$('#drop').hqyDroppable({
	onDragEnter: callback('onDragEnter'),
	onDragOver: callback('onDragOver'),
	onDragLeave: callback('onDragLeave'),
	onDrop: callback('onDrop')
});
</script>


