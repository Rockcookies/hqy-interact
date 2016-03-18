---
layout: docs
cate: API
title: Droppable
---

---

### Properties


#### accept

Type: `selector,function`<br/>
Default: `null`

Determine which draggable element will be accepted.

---

#### disabled

Type: `boolean`<br/>
Default: `false`

True to stop droppable.

---

#### cursor

Type: `boolean`<br/>
Default: `false`

The css cursor when the draggable element is dragged enter.

---


### events

#### onDragEnter

Parameters: `event,source`

Fires when the draggable element is dragged enter. The source parameter indicate the dragged DOM element.

---

#### onDragOver

Parameters: `event,source`

Fires when the draggable element is dragged over. The source parameter indicate the dragged DOM element.

---

#### onDragLeave

Parameters: `event,source`

Fires when the draggable element is dragged leave. The source parameter indicate the dragged DOM element.

---

#### onDrop

Parameters: `event,source`

Fires when the draggable element is dropped. The source parameter indicate the dragged DOM element.


