---
layout: default
title: Documentation
---

Documentation JavaScript
========================

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
switch pages from login to content with clicking this link and a defined data-target attribute. In previous versions
the href="" attribute has been used to identify the target, but it could be shown that some jQuery plugins might depend
to this attribute too.

{% highlight html %}
<a data-target="#content" href="#">Leads to content</a>
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

If you would like to something AJAX like, you can do it that way:

{% highlight javascript %}
var roadcrew = new Roadcrew();

roadcrew.intercept('#interceptingPage', function(dispatch) {
   $.post('ajax/test.html', function(data) {
      dispatch();
   });
});
{% endhighlight %}


Loading Partials
----------------

Partials are HTML snippets for your application which should be loaded at runtime.
In other terms, it is possible to keep your index.html short with using a lot of partials.

Partials are defined like this:

{% highlight html %}
<div class="page" id="notDefined" data-rc-partial="partial1.html"></div>
{% endhighlight %}

They are basically defined like a standard page in Roadcrew. Just that they
have an additional data-tag called data-rc-partial which defines the location of your
partial. The content of this file will be put inside the div tag.

Error Handling
--------------

While you are intercepting pages you might run into trouble. To catch them accordingly you can create an error handler for each interceptor. Just pass the error handler function as second argument.

{% highlight javascript %}
roadcrew.intercept('#troublePage', function(dispatch) {
   throw new RoadcrewError("I made trouble");
}, function(error) {
   $('#errorPage').find('.error').html(error.message);
   roadcrew.flip('#errorPage');
});
{% endhighlight %}

In the case above you would intercept the troublePage. But an error occurs. To simulate it, I am just throwing an RoadcrewError. You can utilize this Error if you like or throw another exception to your taste.

The second callback is the error callback. When an error is catched it will executed. The argument is the instance we have thrown as RoadcrewError. That way you are able to pass some more information to the error handler.

Global Error Handling
---------------------

Sometimes things are not working in such a coordinated way. Maybe a pretty unexpected problem occurs and you want to deal with them. This is the time when a global error handler comes in play.

A simple version might look like this:

{% highlight javascript %}
roadcrew.globalErrorHandler = function (error) {
   $('#errorPage').find('.error').html("uncatched error");
   roadcrew.flip('#errorPage');
}
{% endhighlight %}

This error handler would be called if no specific error handler can be found. A page which might run into this error handler will most likely not have an own error handler.

{% highlight javascript %}
roadcrew.intercept('#evenMoreTroublePage', function (dispatch) {
   throw new RoadcrewError("Even more trouble");
});
{% endhighlight %}

Once set, the global error handler is responsible for all occuring errors from the dispatchers. So be prepared. 

The example implementation itself does open the errorPage and updates a little bit text. 

