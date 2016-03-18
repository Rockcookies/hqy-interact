---
layout: demos
title: Basic Resizable
---
<div id="demo" style="width:200px;height:150px;border:1px solid #ccc;">
	<div style="padding:20px">Resize Me</div>
</div>

<script type="text/javascript">
$('#demo').hqyResizable({
	minWidth: 50,
	minHeight: 50
});
</script>


### Overview

Click on the edge of box and move the edge to resize the box.

### Setup

{% highlight javascript %}
$('#demo').hqyResizable({
  minWidth: 50,
  minHeight: 50
});
{% endhighlight %}

### html

{% highlight html %}
<div id="demo" style="width:200px;height:150px;border:1px solid #ccc;">
  <div style="padding:20px">Resize Me</div>
</div>
{% endhighlight %}
