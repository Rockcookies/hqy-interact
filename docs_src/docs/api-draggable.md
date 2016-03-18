---
layout: docs
cate: API
title: Draggable
---

---

### Properties


#### proxy

Type: `string,function`<br/>
Default: `null`

A proxy element to be used when dragging, when set to 'clone', a clone element is used as proxy. If a function is specified, it must return a jQuery object.

The example below shows how to create a simple proxy object.

{% highlight javascript %}
$('.dragitem').hqyDraggable({
  proxy: function(source){
    var p = $('<div style="border:1px solid #ccc;width:80px"></div>');
    p.html($(source).html()).appendTo('body');
    return p;
  }
});
{% endhighlight %}

---

#### revert

Type: `boolean`<br/>
Default: `false`

If set to true, the element will return to its start position when dragging stops.

---

#### cursor

Type: `string`<br/>
Default: `move`

The css cursor when dragging.

---

#### deltaX

Type: `number`<br/>
Default: `null`

The dragged element position x corresponding to current cursor.

---

#### deltaY

Type: `number`<br/>
Default: `null`

The dragged element position y corresponding to current cursor.

---

#### handle

Type: `selector`<br/>
Default: `null`

The handle that start the draggable.

---

#### disabled

Type: `boolean`<br/>
Default: `false`

True to stop draggable.

---

#### axis

Type: `string`<br/>
Default: `null`

Defines the axis which the dragged elements moves on, available value is 'v' or 'h', when set to null will move across 'v' and 'h' direction.

---


### events

#### onBeforeDrag

Parameters: `event`

Fires when the target object start dragging.

---


#### onStartDrag

Parameters: `event,target`

Fires when the target object start dragging.

---

#### onDrag

Parameters: `event,target`

Fires during dragging. Return false will not do dragging actually.

---

#### onStopDrag

Parameters: `event,target`

Fires when the dragging stops.
