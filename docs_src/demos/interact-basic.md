---
layout: demos
title:  Basic Interact
---

<div class="demo-box">
  <div id="demo" class="bg-blue" style="position:absolute;padding:100px;text-align:center;">drag resize</div>
</div>

### Overview

Basic usage of hqyDraggable & hqyResizable.

### Setup

{% highlight javascript %}
$('#demo').hqyDraggable().hqyResizeable();
{% endhighlight %}

### html
{% highlight html %}
<div class="demo-box">
  <div id="demo" class="bg-red" style="position:absolute;padding:100px;text-align:center;">drag resize</div>
</div>
{% endhighlight %}

<script type="text/javascript">
$('#demo').hqyDraggable().hqyResizable()
</script>
