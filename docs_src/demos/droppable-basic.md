---
layout: demos
title: Basic Droppable
---

<style type="text/css">
.draggable{
	height: 60px;
	width: 60px;
	line-height: 60px;
	text-align: center;
	color: #fff;
	font-size: 24px;
	margin-bottom: 10px;
	z-index: 10;
}

.droppable{
	height: 300px;
	line-height: 300px;
	text-align: center;
	font-size: 24px;
}
</style>

<div class="row">
	<div class="col-xs-4">
		<div class="draggable bg-red">A</div>
		<div class="draggable bg-green">B</div>
		<div class="draggable bg-pink">C</div>

	</div>
	<div class="col-xs-8">
		<div style="background: #f5f5f5;">
			<div class="droppable">Drop here</div>
		</div>
	</div>
</div>


<script type="text/javascript">
$('.draggable').hqyDraggable({
	proxy: 'clone'
});

$('.droppable').hqyDroppable({
	onDragEnter:function(e,source){
		$(this).html('enter');
	},
	onDragLeave: function(e,source){
		$(this).html('leave');
	},
	onDrop: function(e,source){
		$(this).html($(source).html() + ' dropped');
	}
});
</script>

### Overview

Drag the boxed on left to the target area on right.

### Setup

{% highlight javascript %}
$('.draggable').hqyDraggable({
  proxy: 'clone'
});

$('.droppable').hqyDroppable({
  onDragEnter:function(e,source){
    $(this).html('enter');
  },
  onDragLeave: function(e,source){
    $(this).html('leave');
  },
  onDrop: function(e,source){
    $(this).html($(source).html() + ' dropped');
  }
});
{% endhighlight %}

### html

{% highlight html %}
<style type="text/css">
.draggable{
  height: 60px;
  width: 60px;
  line-height: 60px;
  text-align: center;
  color: #fff;
  font-size: 24px;
  margin-bottom: 10px;
  z-index: 10;
}

.droppable{
  height: 300px;
  line-height: 300px;
  text-align: center;
  font-size: 24px;
}
</style>

<div class="row">
  <div class="col-xs-4">
    <div class="draggable bg-red">A</div>
    <div class="draggable bg-green">B</div>
    <div class="draggable bg-pink">C</div>
  </div>
  <div class="col-xs-8">
    <div style="background: #f5f5f5;">
      <div class="droppable">Drop here</div>
    </div>
  </div>
</div>
{% endhighlight %}

