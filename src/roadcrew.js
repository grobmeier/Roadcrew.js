/*
 *  Copyright 2012-2013 Christian Grobmeier
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

function roadcrewAll(selector, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(selector));
}

function roadcrewOne(selector, root) {
    return (root || document).querySelector(selector);
}

function Roadcrew() {
   roadcrewAll('[data-rc-partial]').forEach(function (element) {
       element.classList.add("rc-unloaded-partial");
   });

   this.active = roadcrewOne('.start');
   this.start = "#" + this.active.getAttribute('id');
   this.active.style.display = 'block';

   window.addEventListener('popstate', this.back.bind(this));
   document.addEventListener('click', this.goto.bind(this));

    // In page templates
    roadcrewAll('.template-ref').forEach(function (element) {
        var target = element.getAttribute("data-target");
        if (target !== null) {
            var template = document.getElementById(target);
            if (template !== null) {
                element.innerHTML = template.innerHTML;
            }
        }
    });
}

Roadcrew.prototype = {
   path : [],
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
      if (event.target.closest === undefined) {
          return;
      }

      var target = event.target.closest('a, button[data-target]');
      if (target === null) {
          return;
      }

      event.preventDefault();
      url = target.getAttribute('data-target');
   }

   if (url === undefined || url === null) {
       return;
   }

   var page = this.verifyPage(url);
   if (page === null) {
       return;
   }

   this.path.push(url);

   this.loadPartial(page, function () {
       this.dispatch(url, page, data);
   }.bind(this));
};

Roadcrew.prototype.loadPartial = function (page, callback) {
   if (!page.classList.contains("rc-unloaded-partial")) {
       callback();
       return;
   }

   var partialUrl = page.getAttribute("data-rc-partial");
   if (partialUrl === null) {
       callback();
       return;
   }

   fetch(partialUrl)
       .then(function (response) {
           if (!response.ok) {
               throw new RoadcrewError("Could not load partial", response.status, response);
           }
           return response.text();
       })
       .then(function (html) {
           page.innerHTML = html;
           page.classList.remove("rc-unloaded-partial");
           callback();
       })
       .catch(function (error) {
           if (this.globalErrorHandler !== null) {
               this.globalErrorHandler(error);
           }
       }.bind(this));
};

Roadcrew.prototype.dispatch = function (url, page, data) {
   var interceptor = this.interceptor[url];
   if(interceptor !== undefined) {
       try {
           var dispatcher = Roadcrew.createDispatcher(this, page);
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
      this.flip(page);
   }
};

Roadcrew.prototype.flip = function (page) {
   this.active.style.display = 'none';
   this.active = this.verifyPage(page);
   this.active.style.display = 'block';
};

Roadcrew.prototype.fadeIn = function (page) {
   this.active.style.display = 'none';
   this.active = this.verifyPage(page);
   this.active.style.opacity = 0;
   this.active.style.display = 'block';

   var opacity = 0;
   var step = function () {
       opacity += 0.1;
       this.active.style.opacity = opacity;
       if (opacity < 1) {
           window.requestAnimationFrame(step);
       }
   }.bind(this);
   window.requestAnimationFrame(step);
};

Roadcrew.prototype.verifyPage = function(page) {
    if( typeof (page) === "string") {
        return roadcrewOne(page);
    }
    return page;
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

function RoadcrewDispatcher(target, page) {
    this.dispatch = function() {
        target.flip(page);
    };
}
