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
part of Roadcrew;

class RoadcrewController {
  List<DivElement> pages;
  List<Element> links;
  DivElement activePage;

  Map<String, RoadcrewInterceptor> interceptors;
  Map<String, Function> errorHandlers;
  Function globalErrorHandler;

  RoadcrewController() :
    interceptors = new HashMap<String, RoadcrewInterceptor>(),
    errorHandlers = new HashMap<String, Function>() {

    pages = queryAll('.page');
    links = queryAll('a');

    queryAll('a').forEach((el) {
      el.on.click.add((e) {
        goto(e);
      });
    });

    _showStart();
  }

  void goto(e) {
    String pageId = null;
    // EventTarget is a AnchorElement
    if(e is Event) {
       pageId = e.currentTarget.attributes['href'];
    } else {
      pageId = e;
    }

    if(pageId.startsWith('#')) {
      if(e is Event) {
        e.preventDefault();
      }

      var dispatcher = () {
        flip(query(pageId));
      };

      if(interceptors.containsKey(pageId)) {
        try {
          interceptors[pageId].execute(dispatcher);
        } on RoadcrewException catch(e) {
          if(errorHandlers.containsKey(pageId)) {
            errorHandlers[pageId](e);
          }

          if(globalErrorHandler != null) {
            globalErrorHandler(e);
          }
        }
      } else {
        dispatcher();
      }
    }
  }

  void intercept(String url, RoadcrewInterceptor interceptor, [Function errorHandler]) {
    interceptors[url] = interceptor;

    if(?errorHandler) {
      errorHandlers[url] = errorHandler;
    }
  }

  void flipToUrl(String url) {
    flip(query(url));
  }

  void flip(DivElement page) {
    activePage.style.display = 'none';
    activePage = page;
    activePage.style.display = 'block';
  }

  void _showStart() {
    for(DivElement page in pages) {
      if(page.classes.contains('start')) {
        page.style.display = 'block';
        activePage = page;
      } else {
        page.style.display = 'none';
      }
    }
  }
}