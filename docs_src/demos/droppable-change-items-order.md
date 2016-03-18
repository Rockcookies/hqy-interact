---
layout: demos
title: Basic Droppable
---

<style type="text/css">
.draggable{
	height: 60px;
	width: 320px;
	line-height: 60px;
	text-align: center;
	color: #fff;
	font-size: 24px;
	margin-bottom: 10px;
	z-index: 10;
}

.active{
	opacity: 0.4;
}
</style>

<div class="draggable bg-blue">index 1</div>
<div class="draggable bg-red">index 2</div>
<div class="draggable bg-orange">index 3</div>
<div class="draggable bg-green">index 4</div>
<div class="draggable bg-pink">index 5</div>
<div class="draggable bg-blue">index 6</div>
<div class="draggable bg-red">index 7</div>
<div class="draggable bg-orange">index 8</div>
<div class="draggable bg-green">index 9</div>
<div class="draggable bg-pink">index 10</div>



<script type="text/javascript">
var $ph, aixsY;

$('.draggable').hqyDraggable({
	proxy: 'clone',
	onStartDrag: function (event, target) {
		$ph = $(this).clone().addClass('active');
		$(this).hide().before($ph);
	},
	onStopDrag: function () {
		$ph.after(this);
		$ph.remove();
		$ph = null;
		$(this).show();
	}
}).hqyDroppable({
	onDragEnter: function () {
		axisY = 0;
	},
	onDragOver: function (event, dragElement) {
		if (event.data.top > axisY) {
			$(this).after($ph);
		} else {
			$(this).before($ph);
		}

		axisY = event.data.top;
	}
});
</script>

### Overview

Drag the list items to change their order.

### Setup

{% highlight javascript %}
var $ph, aixsY;

$('.draggable').hqyDraggable({
  proxy: 'clone',
  onStartDrag: function (event, target) {
    $ph = $(this).clone().addClass('active');
    $(this).hide().before($ph);
  },
  onStopDrag: function () {
    $ph.after(this);
    $ph.remove();
    $ph = null;
    $(this).show();
  }
}).hqyDroppable({
  onDragEnter: function () {
    axisY = 0;
  },
  onDragOver: function (event, dragElement) {
    if (event.data.top > axisY) {
      $(this).after($ph);
    } else {
      $(this).before($ph);
    }

    axisY = event.data.top;
  }
});
{% endhighlight %}

### html

{% highlight html %}
<style type="text/css">
.draggable{
  height: 60px;
  width: 320px;
  line-height: 60px;
  text-align: center;
  color: #fff;
  font-size: 24px;
  margin-bottom: 10px;
  z-index: 10;
}

.active{
  opacity: 0.4;
}
</style>

<div class="draggable bg-blue">index 1</div>
<div class="draggable bg-red">index 2</div>
<div class="draggable bg-orange">index 3</div>
<div class="draggable bg-green">index 4</div>
<div class="draggable bg-pink">index 5</div>
<div class="draggable bg-blue">index 6</div>
<div class="draggable bg-red">index 7</div>
<div class="draggable bg-orange">index 8</div>
<div class="draggable bg-green">index 9</div>
<div class="draggable bg-pink">index 10</div>

{% endhighlight %}

