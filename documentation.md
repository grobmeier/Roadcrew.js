---
layout: default
title: Documentation
---

Documentation
=============

Getting started
---------------

[Download a stable version](https://github.com/grobmeier/Roadcrew.js/downloads) or get the latest source balls on
top right. Include Roadcrew.js in your HTML file, like with:

```html
<script type="text/javascript" charset="utf-8" src="roadcrew.js"></script>
<script type="text/javascript" charset="utf-8" src="app.js"></script>
```

Now make up some divs which serve as pages in Roadcrew. Like:

```html
<div class="page start" id="login">
...
</div>
<div class="page" id="content">
...
</div>
```

All Roadcrew pages need the CSS class "page". You should not nest pages. The first page you want to show needs the CSS
class "start" in addition.

Finally you have to start Roadcrew.js:

```javascript
$(document).ready( function() {
   var roadcrew = new Roadcrew();
}
```

The IDs are being used to identify your pages. These are also used to build an URL. For example, you can
switch pages from login to content with clicking this link:

```html
<a href="#content">Leads to content</a>
```
