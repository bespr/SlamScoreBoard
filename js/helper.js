var app = app || {};

(function () {
	'use strict';

    app.selected = {
        contest: false,
        rnd: false,
        group: false
    };


    app.slammerById = {};
    app.rndById = {};



    app.updateByIdValues = function() {
        var s;
        app.slammerById = {};
        if (app.selected.contest !== undefined) {
            for (var i = 0, len = app.data.contests[app.selected.contest].slammer.length; i < len; i++) {
                s = app.data.contests[app.selected.contest].slammer[i];
                app.slammerById[s.id] = s;
            }
        }

        app.rndById = {};
        if (app.selected.contest !== undefined) {
            for (var i = 0, len = app.data.contests[app.selected.contest].rounds.length; i < len; i++) {
                s = app.data.contests[app.selected.contest].rounds[i];
                app.rndById[s.id] = s;
            }
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



    /* == Utils == */
    app.utils = {};

    app.utils.persistData = function() {
        localStorage.setItem('ssb-last-loaded-data', JSON.stringify(app.data));
        localStorage.setItem('ssb-last-loaded-selected', JSON.stringify(app.selected));
    };

    app.utils.loadData = function() {
        var d = localStorage.getItem('ssb-last-loaded-data');
        if (d) {
            app.data = JSON.parse(d);
        } else {
            app.data = {
                "format": "ssb-1",
                "contests": []
            };
        }

        d = localStorage.getItem('ssb-last-loaded-selected');
        if (d) {
            app.selected = JSON.parse(d);
        } else {
            app.selected = {};
        }

        app.updateByIdValues();
    };

    app.utils.clearAllData = function() {
        localStorage.clear();
        app.utils.loadData();
    };



    app.utils.getTechTime = function(d) {
        var o = d.getFullYear() + '-';
        o += ('0' + (d.getMonth() + 1)).slice(-2) + '-';
        o += ('0' + d.getDay()).slice(-2) + '_';
        o += ('0' + d.getHours()).slice(-2) + '-';
        o += ('0' + d.getMinutes()).slice(-2) + '-';
        o += ('0' + d.getSeconds()).slice(-2);
        return o;
    };


    // Language Handler
    window.l = function(str, values) {
        var re = str + '°';

        if (lang.de[str] !== undefined) {
            re = lang.de[str];
        } else if (lang.en[str] !== undefined) {
            re = lang.en[str];
        }

        if (values !== undefined) {
            for (var i = 0, len = values.length; i < len; i++) {
                re = re.replace('%%', values[i]);
            }
        }
        return re;
    }



}());
