---
layout: default
---

Welcome to Roadcrew.js
======================

Roadcrew.js is a small JavaScript component which lets you switch pages of an single file website.
This is very useful in combination with for example [Apache Cordova](http://cordova.apache.org).
While you are of course able to jump between different HTML files with Cordova, it is often more efficient
not to reload the whole view and just show the div elements you need. Doing so you'll keep the state of you
Application.

Roadcrew.dart is the same, just in [Dartlang](http://www.dartlang.org).

Please read [the Roadcrew.js docs](documentation.html) or the [Roadcrew.dart docs](documentation-dart.html) for more information.

Dependencies
------------

Roadcrew.js does make use of jQuery (tested with 1.7.2).

It's basically using selectors and the css() method to manipulate the elements. There is bind(), live() and proxy() in use too. Plans are to reduce relations to jQuery to a minimum so it can be used with Zepto.js one day. Patches welcome!

Roadcrew.dart just needs Dart. Batteries included.


Why not something else?
-----------------------

I found the idea first in jQuery Mobile. I am not a huge fan of it as it was sometimes slow and sometimes
way to complex. Even when I would miss the nice look of jQuery Mobile I decided to go away and created the
functionality on my own, just with focus on page switching. I want page switching to be easy to understand
and extend.

Why the name?
-------------

I listened to "We are the Roadcrew" from Motörhead when I started to the coding. I listen to a lot of
Motörhead and do have not named other Open Source projects after Motörhead songs, but "Roadcrew" seems
to be very matching when writing a framework which deals with mobile.

When I ported Roadcrew.js to Roadcrew.dart I listened a lot to Nine Inch Nails. I decided to stick with 
the Motörhead name to avoid confusion.

License
-------

Apache License 2.0


The Author
----------

Roadcrew.js and Roadcrew.dart has been developed by Christian Grobmeier. He is [on Github](https://github.com/grobmeier),
[writes on Twitter](http://twitter.com/grobmeier) and of course [maintains a blog](http://www.grobmeier.de).
