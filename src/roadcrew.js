function Roadcrew() {
   this.pages = $('.page');
   this.active = $($('.start')[0]);
   this.start = "#" + this.active.attr('id');
   this.active.css('display', 'block');

   $(window).bind('popstate', $.proxy(this, 'back'));
   $("a").live('click', $.proxy(this, 'goto'));
}

Roadcrew.prototype = {
   pages : null,
   active : null,
   path : [],
   start: null,
   interceptor : {}  
};

Roadcrew.prototype.intercept = function (url, interceptor) {
   this.interceptor[url] = interceptor;
};

Roadcrew.createDispatcher = function (target, url) {
   var rd = new RoadcrewDispatcher(target, url);
   var dispatcher = function() {
      rd.dispatch();
   }
   return dispatcher;
};

Roadcrew.prototype.goto = function (event) {
   var url = null;
   if(typeof (event) === "string") {
        url = event;
   } else {
      event.preventDefault();
      if (event.target.nodeName == 'A') {
         url = event.target.getAttribute('href'); 
      }
   }
   this.path.push(url);
   
   var interceptor = this.interceptor[url];

   if(interceptor !== undefined) {
      var dispatcher = Roadcrew.createDispatcher(this, url);
      interceptor(dispatcher);
   } else {
      this.flip(url);  
   }
};

Roadcrew.prototype.flip = function (page) {
   this.active.css('display','none');
   this.active = $(page);
   this.active.css('display','block');
};

Roadcrew.prototype.fadeIn = function (page) {
   this.active.css('display','none');
   this.active = $(page);
   this.active.fadeIn();
};

Roadcrew.prototype.back = function(event) {
   if(this.path.length == 0) {
      return;         
   } else if(this.path.length == 1) {
      this.flip(this.start);
   } else {
      var url = this.path[this.path.length - 2];
      this.flip(url);   
   } 
   this.path.pop();
};

function RoadcrewDispatcher(target, url) {
    this.target = target;
    this.url = url;
}

RoadcrewDispatcher.prototype = {
    target : null,
    url : null

};

RoadcrewDispatcher.prototype.dispatch = function() {
    this.target.flip(this.url);
};