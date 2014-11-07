var app = app || {};
var ENTER_KEY = 13;

(function () {
	'use strict';

    app.slammerById = {};
    var s;
    for (var i = 0, len = app.data.contests[0].slammer.length; i < len; i++) {
        s = app.data.contests[0].slammer[i];
        app.slammerById[s.id] = s;
    }


    app.getGroup = function(id) {

        var r = app.data.contests[0].rounds;
        var groupFound = false;

        outOfLoop:
        for (var i = 0, len = r.length; i < len; i++) {
            var g = r[i].groups;

            for (var j = 0, lenj = g.length; j < lenj; j++) {
                if (g[j].id === id) {
                    groupFound = $.extend({}, g[j]);
                    groupFound.round = $.extend({}, r[i]);
                    groupFound.contest = $.extend({}, app.data.contests[0]);
                    break outOfLoop;
                }
            }
        }

        return groupFound;
    }



    app.getSlammer = function(list) {
        var slammer = [];
        for (var i = 0, len = list.length; i < len; i++) {
            var id = list[i].id;
            slammer.push(app.slammerById[id]);
        }
        return slammer;
    }



}());
