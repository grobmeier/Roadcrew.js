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
document.addEventListener('DOMContentLoaded', function () {
    installFileSystemPartialFallbacks();

    var roadcrew = new Roadcrew();

    roadcrew.intercept('#tablePage', function (dispatch) {
        updateResultPage();
        roadcrew.flip('#loadingPage');
        setTimeout(dispatch, 1500);
    });

    var submit = document.querySelector('#myform [name="submit"]');
    submit.addEventListener('click', function (event) {
        event.preventDefault();
        roadcrew.goto("#tablePage");
    });

    roadcrew.intercept('#interceptingPage', function (dispatch) {
        console.log("Intercepting");
        dispatch();
    });

    roadcrew.intercept('#troublePage', function (dispatch) {
        throw new RoadcrewError("I made trouble");
    }, function (error) {
        document.querySelector('#errorPage .error').textContent = error.message;
        roadcrew.flip('#errorPage');
    });

    roadcrew.intercept('#evenMoreTroublePage', function (dispatch) {
        throw new RoadcrewError("Even more trouble");
    });

    roadcrew.globalErrorHandler = function (error) {
        if (error.name === "RoadcrewError" && error.message === "Could not load partial") {
            document.querySelector('#errorPage .error').textContent = "The partial could not be loaded. Serve the demo over HTTP so fetch can read the partial files.";
        } else {
            document.querySelector('#errorPage .error').textContent = "An unexpected demo error was caught.";
        }
        roadcrew.flip('#errorPage');
    }
});

function installFileSystemPartialFallbacks() {
    if (window.location.protocol !== "file:") {
        return;
    }

    installPartialFallback("sunnyPartialPage", "sunnyPartialFallback");
}

function updateResultPage() {
    document.getElementById("resultProjectName").textContent = valueOrFallback("field1", "Unnamed project");
    document.getElementById("resultContactPerson").textContent = valueOrFallback("field2", "No contact entered");
    document.getElementById("resultFriendlyDemo").textContent = document.getElementById("yesorno").checked ? "Yes" : "No";
}

function valueOrFallback(fieldId, fallback) {
    var value = document.getElementById(fieldId).value.trim();
    return value === "" ? fallback : value;
}

function installPartialFallback(pageId, templateId) {
    var page = document.getElementById(pageId);
    var template = document.getElementById(templateId);

    if (page === null || template === null) {
        return;
    }

    page.innerHTML = template.innerHTML;
    page.removeAttribute("data-rc-partial");
}
