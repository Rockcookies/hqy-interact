---
layout: demos
title: Basic Draggable
---
<div style="height: 310px;">
	<div id="d1" style="width:200px;height:150px;background:#fafafa;border:1px solid #ccc"></div>
	<div id="d2" data-options="handle:'#title'" style="width:200px;height:150px;background:#fafafa;border:1px solid #ccc;margin-top:10px">
		<div id="title" style="padding:5px;background:#ccc;color:#fff">Title</div>
	</div>
</div>

<script type="text/javascript">
$('#d1').hqyDraggable();

$('#d2').hqyDraggable({
	handle: '#title'
});
</script>


### Overview

Move the boxes by clicking on it with mouse.

### Setup

{% highlight javascript %}
$('#d1').hqyDraggable();

$('#d2').hqyDraggable({
  handle: '#title'
});
{% endhighlight %}

### html

{% highlight html %}
<div id="d1" style="width:200px;height:150px;background:#fafafa;border:1px solid #ccc"></div>
<div id="d2" data-options="handle:'#title'" style="width:200px;height:150px;background:#fafafa;border:1px solid #ccc;margin-top:10px">
  <div id="title" style="padding:5px;background:#ccc;color:#fff">Title</div>
</div>
{% endhighlight %}
