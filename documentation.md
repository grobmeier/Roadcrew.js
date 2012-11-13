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

{% highlight html %}
<script type="text/javascript" charset="utf-8" src="roadcrew.js"></script>
<script type="text/javascript" charset="utf-8" src="app.js"></script>
{% endhighlight %}

Now make up some divs which serve as pages in Roadcrew. Like:

{% highlight html %}
<div class="page start" id="login">
...
</div>
<div class="page" id="content">
...
</div>
{% endhighlight %}

All Roadcrew pages need the CSS class "page". You should not nest pages. The first page you want to show needs the CSS
class "start" in addition.

Finally you have to start Roadcrew.js:

{% highlight javascript %}
$(document).ready( function() {
   var roadcrew = new Roadcrew();
}
{% endhighlight %} 

The IDs are being used to identify your pages. These are also used to build an URL. For example, you can
switch pages from login to content with clicking this link:

{% highlight html %}
<a href="#content">Leads to content</a>
{% endhighlight %}


Intercepting Requests
---------------------

Much often one needs to intercept before a page changes. For example, one might want to show a loading page before the target page appears. This is done with creating an interceptor. Creating interceptors is pretty straightforward. Here is a simple example:

{% highlight javascript %}
var roadcrew = new Roadcrew();

roadcrew.intercept('#interceptingPage', function(dispatch) {
   console.log("Intercepting");
   dispatch();
});
{% endhighlight %}

This interceptor will be called right before the transition to the page with the id "interceptingPage" will happen. It does not do anything useful, just writing a message to the console.

After the actions has been done, it is important to execute the dispatch function which has been passed on as callback. It contains the actual dispatching function, which will finally switch your page.

If you would like to something AJAX like, you can do it like that:

{% highlight javascript %}
var roadcrew = new Roadcrew();

roadcrew.intercept('#interceptingPage', function(dispatch) {
   $.post('ajax/test.html', function(data) {
      dispatch();
   });
});
{% endhighlight %}


