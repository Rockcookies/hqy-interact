---
layout: docs
cate: Getting Started
title: Installation
---

---

### Include JS

Yep, include jQuery and `hqy.interact.min.js` into the footer.


{% highlight html %}
<script src="jquery.min.js"></script>
<script src="hqyinteract/hqy.interact.min.js"></script>
{% endhighlight %}


### Call the plugin


{% highlight html %}
<div id="demo">drag me</div>

<script type="text/javascript">
  $("#demo").hqyDraggable();
</script>
{% endhighlight %}


> See [demos](../demos/index.html) for customisation and options usage.

