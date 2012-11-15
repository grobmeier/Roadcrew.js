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
$(document).ready(function () {
    var roadcrew = new Roadcrew();

    roadcrew.intercept('#tablePage', function (dispatch) {
        roadcrew.flip('#loadingPage');
        setTimeout(dispatch, 1500);
    });

    var submit = $('#myform').find('[name="submit"]');
    submit.click(function (event) {
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
        $('#errorPage').find('.error').html(error.message);
        roadcrew.flip('#errorPage');
    });

    roadcrew.intercept('#evenMoreTroublePage', function (dispatch) {
        throw new RoadcrewError("Even more trouble");
    });

    roadcrew.globalErrorHandler = function (error) {
        $('#errorPage').find('.error').html("uncatched error");
        roadcrew.flip('#errorPage');
    }
});