---
layout: demos
title: Draggable Constrain
---

<div style="position:relative;overflow:hidden;height:310px;border: 1px solid #ccc;">
	<div class="draggable" style="width:100px;height:100px;background:#fafafa;border:1px solid #ccc;">
	</div>
</div>

<script type="text/javascript">
$('.draggable').hqyDraggable({
	onDrag: function (e, target) {
		var data = e.data;

		var $target = $(target),
			$parent = $target.parent();

		data.left = Math.max(0, data.left);
		data.top = Math.max(0, data.top);

		if (data.left + $target.outerWidth() > $parent.width()){
			data.left = $parent.width() - $target.outerWidth();
		}
		if (data.top + $target.outerHeight() > $parent.height()){
			data.top = $parent.height() - $target.outerHeight();
		}
	}
});
</script>


### Overview

The draggable object can only be moved within its parent container.

### Setup

{% highlight javascript %}
$('.draggable').hqyDraggable({
  onDrag: function (e, target) {
    var data = e.data;

    var $target = $(target),
      $parent = $target.parent();

    data.left = Math.max(0, data.left);
    data.top = Math.max(0, data.top);

    if (data.left + $target.outerWidth() > $parent.width()){
      data.left = $parent.width() - $target.outerWidth();
    }
    if (data.top + $target.outerHeight() > $parent.height()){
      data.top = $parent.height() - $target.outerHeight();
    }
  }
});
{% endhighlight %}

### html

{% highlight html %}
<div style="position:relative;overflow:hidden;height:310px;border: 1px solid #ccc;">
  <div class="draggable" style="width:100px;height:100px;background:#fafafa;border:1px solid #ccc;"></div>
</div>
{% endhighlight %}
