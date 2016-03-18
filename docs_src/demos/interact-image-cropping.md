---
layout: demos
title:  Image Cropping
---

<div class="demo-cropping">
  <div class="selection"></div>
</div>


<script type="text/javascript">
$('.selection').hqyDraggable({
  onDrag : function(e, source){
    var data = e.data;

    if (data.left < 0) {
      data.left = 0;
    }

    if (data.top < 0) {
      data.top = 0;
    }

    var $s = $(source),
      maxWidth = $('.demo-cropping').width(),
      maxHeight = $('.demo-cropping').height();

    if (data.left + $s.outerWidth() > maxWidth){
      data.left = maxWidth - $s.outerWidth();
    }

    if (data.top + $s.outerHeight() > maxHeight){
      data.top = maxHeight - $s.outerHeight();
    }
  }
}).hqyResizable({
  onResize : function(e){
    var data = e.data,
      maxWidth = $('.demo-cropping').width(),
      maxHeight = $('.demo-cropping').height();

    data.left = Math.max(0, data.left);
    data.top = Math.max(0, data.top);

    if (data.left + data.width > maxWidth) {
      data.width = maxWidth - data.left;
    }

    if (data.top + data.height > maxHeight) {
      data.height = maxHeight - data.top;
    }
  }
});

</script>


### Overview

Attach it to any image on your page with the simple code below, and start cropping!

### Setup

{% highlight javascript %}
$('.selection').hqyDraggable({
  onDrag : function(e, source){
    var data = e.data;

    if (data.left < 0) {
      data.left = 0;
    }

    if (data.top < 0) {
      data.top = 0;
    }

    var $s = $(source),
      maxWidth = $('.demo-cropping').width(),
      maxHeight = $('.demo-cropping').height();

    if (data.left + $s.outerWidth() > maxWidth){
      data.left = maxWidth - $s.outerWidth();
    }

    if (data.top + $s.outerHeight() > maxHeight){
      data.top = maxHeight - $s.outerHeight();
    }
  }
}).hqyResizable({
  onResize : function(e){
    var data = e.data,
      maxWidth = $('.demo-cropping').width(),
      maxHeight = $('.demo-cropping').height();

    data.left = Math.max(0, data.left);
    data.top = Math.max(0, data.top);

    if (data.left + data.width > maxWidth) {
      data.width = maxWidth - data.left;
    }

    if (data.top + data.height > maxHeight) {
      data.height = maxHeight - data.top;
    }
  }
});
{% endhighlight %}

### html

{% highlight html %}
<div class="demo-cropping">
  <div class="selection"></div>
</div>
{% endhighlight %}
