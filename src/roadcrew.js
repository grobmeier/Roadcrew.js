/*
 *  Copyright 2012 Christian Grobmeier
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing,
 *  software distributed under the License is distributed
 *  on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
 *  either express or implied. See the License for the specific
 *  language governing permissions and limitations under the License.
 */
function RoadcrewError(message, code, rootCause) {
    this.name = "RoadcrewError";
    this.message = message || "An error has occured";
    this.code = code || "1";
    this.rootCause = rootCause || null;
}

RoadcrewError.prototype = new Error();
RoadcrewError.prototype.constructor = RoadcrewError;

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
   interceptor : {},
   globalErrorHandler : null,
   errorHandler : {}
};

Roadcrew.prototype.intercept = function (url, interceptor, errorHandler) {
    this.interceptor[url] = interceptor;
    if(errorHandler !== null && errorHandler !== undefined) {
        this.errorHandler[url] = errorHandler;
    }
};

Roadcrew.createDispatcher = function (target, url) {
   var rd = new RoadcrewDispatcher(target, url);
   return function() {
      rd.dispatch();
   };
};

Roadcrew.prototype.goto = function (event, data) {
   var url = null;
   if(typeof (event) === "string") {
        url = event;
   } else {
      event.preventDefault();
      if (event.target.nodeName == 'A') {
         url = event.target.getAttribute('data-target');
      }
   }
   this.path.push(url);

   var interceptor = this.interceptor[url];

   if(interceptor !== undefined) {
       try {
           var dispatcher = Roadcrew.createDispatcher(this, url);
           interceptor(dispatcher, data);
       } catch (error) {
           var errorHandler = this.errorHandler[url];
           if(errorHandler === undefined || errorHandler === null) {
               if(this.globalErrorHandler !== null) {
                   this.globalErrorHandler(error);
               }
           } else {
               errorHandler(error);
           }
       }
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
    this.dispatch = function() {
        target.flip(url);
    };
}
