---
layout: docs
cate: API
title: Resizable
---

---

### Properties

#### disabled

Type: `boolean`<br/>
Default: `false`

boolean	True to disable resizing.

---

#### handles

Type: `string`<br/>
Default: `n, e, s, w, ne, se, sw, nw, all`

Indicate the direction of resizable,'n' is the north,'e' is the east,etc.

---

#### minWidth

Type: `number`<br/>
Default: `10`

The minimum width when resizing.

---

#### minHeight

Type: `number`<br/>
Default: `10`

The minimum height when resizing.

---

#### maxWidth

Type: `number`<br/>
Default: `10000`

The maximum width when resizing.

---

#### maxHeight

Type: `number`<br/>
Default: `10000`

The maximum height when resizing.

---

#### edge

Type: `number`<br/>
Default: `5`

The edge of border to be resized.

---

### events

#### onStartResize

Parameters: `event`

Fires when start resizing.

---

#### onResize

Parameters: `event`

Fires during resizing. When return false, the DOM element will not acts actual resize action.

---

#### onStopResize

Parameters: `event`

Firest when stop resizing.
