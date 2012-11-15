---
layout: default
title: Documentation Dart
---

Documentation (Dart)
====================

Getting started
---------------

[Download a stable version](https://github.com/grobmeier/Roadcrew.js/downloads) or get the latest source balls on
top right. Include your Dart-App in your HTML file. In your app, import the Roadcrew library:

{% highlight dart %}
import 'Roadcrew.dart';
{% endhighlight %}

At the moment Roadcrew is not in the Pub (package manager system). Therefore the files need to be correctly referenced.
In this docs I assume they are in the same directory as your app.

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

Finally you have to start Roadcrew in your App:

{% highlight dart %}
void main() {
  RoadcrewController Roadcrew = new RoadcrewController();
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

{% highlight dart %}
RoadcrewController roadcrew = new RoadcrewController();

roadcrew.intercept('#interceptingPage', new RoadcrewInterceptor(_(dispatcher) {
    print("INTECEPTING");
    dispatcher();
  }));
{% endhighlight %}

This interceptor will be called right before the transition to the page with the id "interceptingPage" will happen. It does not do anything useful, just writing a message to the console.

After the actions has been done, it is important to execute the dispatch function which has been passed on as callback. It contains the actual dispatching function, which will finally switch your page.

Error Handling
--------------

While you are intercepting pages you might run into trouble. To catch them accordingly you can create an error handler for each interceptor. Just pass the error handler function as second argument.

{% highlight dart %}
roadcrew.intercept('#troublePage', new RoadcrewInterceptor(_(dispatcher) {
   throw new RoadcrewException("I made trouble");
}), (e) {
   DivElement errorPage = query('#errorPage');
   errorPage.query('.error').text = e.message;
   roadcrew.flip(errorPage);
});
{% endhighlight %}

In the case above you would intercept the troublePage. But an error occurs. To simulate it, I am just throwing an RoadcrewError. You can utilize this Error if you like or throw another exception to your taste.

The second callback is the error callback. When an error is catched it will executed. The argument is the instance we have thrown as RoadcrewError. That way you are able to pass some more information to the error handler.

Global Error Handling
---------------------

Sometimes things are not working in such a coordinated way. Maybe a pretty unexpected problem occurs and you want to deal with them. This is the time when a global error handler comes in play.

A simple version might look like this:

{% highlight dart %}
roadcrew.globalErrorHandler = (e) {
   DivElement errorPage = query('#errorPage');
   errorPage.query('.error').text = e.message;
   roadcrew.flip(errorPage);
};
{% endhighlight %}

This error handler would be called if no specific error handler can be found. A page which might run into this error handler will most likely not have an own error handler.

{% highlight dart %}
roadcrew.intercept('#evenMoreTroublePage', new RoadcrewInterceptor(_(dispatcher) {
   throw new RoadcrewException("Even more trouble");
}));
{% endhighlight %}

Once set, the global error handler is responsible for all occuring errors from the dispatchers. So be prepared. 

The example implementation itself does open the errorPage and updates a little bit text. 

