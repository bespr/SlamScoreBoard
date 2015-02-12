var app = app || {};

(function () {
	'use strict';

	app.manip = {};

	app.manip.addContest = function(contestName) {
	    app.data.contests.push({
	        'name': contestName,
	        'config': {},
	        'slammer': [],
	        'rounds': []
        });
        app.utils.persistData();
        app.updateScreen(true);
	};

	app.manip.changeContestConf = function(name, value) {
	    app.data.contests[app.selected.contest].config[name] = value;
        app.utils.persistData();
	};

	app.manip.removeContest = function(index) {
        if (index == app.selected.contest) {
            app.selected.contest = false;
        }
	    app.data.contests.splice(index, 1);
        app.utils.persistData();
        app.updateScreen(true);
	}

    app.manip.removeSlammer = function(slId) {
        var newSlammerArray = [];
        for (var i = 0, len = app.data.contests[app.selected.contest].slammer.length; i < len; i++) {
            var s = app.data.contests[app.selected.contest].slammer[i];
            if (s.id != slId) {
                newSlammerArray.push(s);
            }
        }
        app.data.contests[app.selected.contest].slammer = newSlammerArray;
        app.updateByIdValues();
        app.utils.persistData();
        app.updateScreen(true);
    }


    app.manip.removeRound = function(rndId) {
        var newRndArray = [];
        for (var i = 0, len = app.data.contests[app.selected.contest].rounds.length; i < len; i++) {
            var r = app.data.contests[app.selected.contest].rounds[i];
            if (r.id != rndId) {
                newRndArray.push(r);
            }
        }
        app.data.contests[app.selected.contest].rounds = newRndArray;
        app.updateByIdValues();
        app.utils.persistData();
        app.updateScreen(true);
    };

    app.manip.addGroup = function(rndId) {
        var rnds = app.data.contests[app.selected.contest].rounds;

        var rndIndex = false;
        var newGroupId = 1;
        for (var i = 0, len = rnds.length; i < len; i++) {
            if (rnds[i].id == rndId) {
                rndIndex = i;
            }

            for (var j = 0, lenj = rnds[i].groups.length; j < lenj; j++) {
                var currentGroupId = parseInt(rnds[i].groups[j].id, 10);
                if (currentGroupId >= newGroupId) {
                    newGroupId = currentGroupId + 1;
                }
            }
        }

        if (rndIndex !== false) {
            app.data.contests[app.selected.contest].rounds[rndIndex].groups.push({
                'id': newGroupId,
                'slammer': []
            });
        }

        app.updateByIdValues();
        app.utils.persistData();
        app.updateScreen(true);
    };


    app.manip.removeGroup = function(groupId) {
        var rnds = app.data.contests[app.selected.contest].rounds;

        outOfLoop:
        for (var i = 0, len = rnds.length; i < len; i++) {
            for (var j = 0, lenj = rnds[i].groups.length; j < lenj; j++) {
                if (rnds[i].groups[j].id == groupId) {
                    app.data.contests[app.selected.contest].rounds[i].groups.splice(j, 1);
                    break outOfLoop;
                }
            }
        }

        app.updateByIdValues();
        app.utils.persistData();
        app.updateScreen(true);


    };

}());
