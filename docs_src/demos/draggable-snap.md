---
layout: demos
title: Draggable Constrain
---

<div style="position:relative;overflow:hidden;height:310px;border: 1px solid #ccc;">
	<div class="draggable" style="width:100px;height:100px;background:#fafafa;border:1px solid #ccc;">
	</div>
</div>

<script type="text/javascript">
function repair(v){
	var r = parseInt(v/20)*20;
	if (Math.abs(v % 20) > 10){
		r += v > 0 ? 20 : -20;
	}
	return r;
}

$('.draggable').hqyDraggable({
	onDrag: function (e, target) {
		var data = e.data;
		data.left = repair(data.left);
		data.top = repair(data.top);
	}
});
</script>


### Overview

This sample shows how to snap a draggable object to a 20x20 grid.

### Setup

{% highlight javascript %}
function repair(v){
  var r = parseInt(v/20)*20;
  if (Math.abs(v % 20) > 10){
    r += v > 0 ? 20 : -20;
  }
  return r;
}

$('.draggable').hqyDraggable({
  onDrag: function (e, target) {
    var data = e.data;
    data.left = repair(data.left);
    data.top = repair(data.top);
  }
});
{% endhighlight %}

### html

{% highlight html %}
<div style="position:relative;overflow:hidden;height:310px;border: 1px solid #ccc;">
  <div class="draggable" style="width:100px;height:100px;background:#fafafa;border:1px solid #ccc;"></div>
</div>
{% endhighlight %}
