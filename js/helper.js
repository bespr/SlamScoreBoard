var app = app || {};
var ENTER_KEY = 13;

(function () {
	'use strict';

    app.slammerById = {};
    app.selected = {
        contest: false,
        rnd: false,
        group: false
    };


    app.updateSlammerById = function() {
        var s;
        app.slammerById = {};
        for (var i = 0, len = app.data.contests[app.selected.contest].slammer.length; i < len; i++) {
            s = app.data.contests[app.selected.contest].slammer[i];
            app.slammerById[s.id] = s;
        }
    }


    app.getGroup = function(id) {

        var r = app.data.contests[app.selected.contest].rounds;
        var groupFound = false;

        outOfLoop:
        for (var i = 0, len = r.length; i < len; i++) {
            var g = r[i].groups;

            for (var j = 0, lenj = g.length; j < lenj; j++) {
                if (g[j].id === id) {
                    groupFound = $.extend({}, g[j]);
                    groupFound.round = $.extend({}, r[i]);
                    groupFound.contest = $.extend({}, app.data.contests[app.selected.contest]);
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


    app.getContestNames = function() {
        var contestNames = [];
        for (var i = 0, len = app.data.contests.length; i < len; i++) {
            contestNames.push(app.data.contests[i].name);
        }
        return contestNames;
    }

    app.getGroupNames = function() {
        var rnd, gr;
        var groupNames = {};
        for (var i = 0, len = app.data.contests[app.selected.contest].rounds.length; i < len; i++) {
            rnd = app.data.contests[app.selected.contest].rounds[i];
            for (var j = 0, lenj = rnd.groups.length; j < lenj; j++) {
                gr = rnd.groups[j];
                groupNames[gr.id] = 'Round «' + rnd.name + '», Group «' + gr.name + '»';
            }
        }
        return groupNames;
    }



}());
