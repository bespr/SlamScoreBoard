var app = app || {};

(function () {
	'use strict';

	app.manip = {};

    /**
     *
     */
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

    /**
     *
     */
	app.manip.changeContestConf = function(name, value) {
	    app.data.contests[app.selected.contest].config[name] = value;
        app.utils.persistData();
	};

    /**
     *
     */
	app.manip.removeContest = function(index) {
        if (index == app.selected.contest) {
            app.selected.contest = false;
        }
	    app.data.contests.splice(index, 1);
        app.utils.persistData();
        app.updateScreen(true);
	}

    /**
     *
     */
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

    /**
     *
     */
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

    /**
     *
     */
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

    /**
     *
     */
    app.manip.removeGroup = function(groupId) {
        var rnds = app.data.contests[app.selected.contest].rounds;

        // TODO: Use app.getRndAndGroupIndex();
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


    /**
     *
     */
    app.manip.assignSlammer = function(slId) {
        var rnds = app.data.contests[app.selected.contest].rounds;

        // TODO: Use app.getRndAndGroupIndex();
        outOfLoop:
        for (var i = 0, len = rnds.length; i < len; i++) {
            for (var j = 0, lenj = rnds[i].groups.length; j < lenj; j++) {
                if (rnds[i].groups[j].id == app.selected.group) {
                    app.data.contests[app.selected.contest].rounds[i].groups[j].slammer.push({ 'id': slId });
                    break outOfLoop;
                }
            }
        }

        app.updateByIdValues();
        app.utils.persistData();
        app.updateScreen(true);
    };

    /**
     *
     */
    app.manip.unassignSlammer = function(slId) {
        var rnds = app.data.contests[app.selected.contest].rounds;

        // TODO: Use app.getRndAndGroupIndex();
        outOfLoop:
        for (var i = 0, len = rnds.length; i < len; i++) {
            for (var j = 0, lenj = rnds[i].groups.length; j < lenj; j++) {
                if (rnds[i].groups[j].id == app.selected.group) {
                    for (var k = 0, lenk = rnds[i].groups[j].slammer.length; k < lenk; k++) {
                        if (rnds[i].groups[j].slammer[k].id == slId) {
                            app.data.contests[app.selected.contest].rounds[i].groups[j].slammer.splice(k, 1);
                            break outOfLoop;
                        }
                    }
                }
            }
        }

        app.updateByIdValues();
        app.utils.persistData();
        app.updateScreen(true);
    };


    /**
     *
     */
    app.manip.saveGrades = function(slammerIndex, grades, total, dropGrades) {
        // TODO: Use app.getRndAndGroupIndex();
        var rnds = app.data.contests[app.selected.contest].rounds;

        outOfLoop:
        for (var i = 0, len = rnds.length; i < len; i++) {
            for (var j = 0, lenj = rnds[i].groups.length; j < lenj; j++) {
                if (rnds[i].groups[j].id == app.selected.group) {
                    app.data.contests[app.selected.contest].rounds[i].groups[j].slammer[slammerIndex].grades = grades;
                    app.data.contests[app.selected.contest].rounds[i].groups[j].slammer[slammerIndex].total = total;
                    app.data.contests[app.selected.contest].rounds[i].groups[j].slammer[slammerIndex].dropGrades = dropGrades;
                    break outOfLoop;
                }
            }
        }

        app.utils.persistData();
    };


    /**
     * Sort Slammers by points (not manually)
     */
    app.manip.sortSlammer = function() {
        var index = app.getRndAndGroupIndex();

        var rows = app.data.contests[app.selected.contest].rounds[index.rnd].groups[index.group].slammer;

        for (var i = 0, len = rows.length; i < len; i++) {
            rows[i].originalIndex = i;
            if (rows[i].total === undefined) {
                rows[i].total = 0;
                rows[i].totalWasOriginallyUndefined = true;
            }
        }

        rows.sort(function(a, b) {
            if (a.total === b.total) {
                if (a.originalIndex === b.originalIndex) {
                    return 0;
                }
                return a.originalIndex > b.originalIndex ? 1 : -1;
            }
            return a.total > b.total ? -1 : 1;
        });

        for (var i = 0, len = rows.length; i < len; i++) {
            delete rows[i].originalIndex;
            if (rows[i].totalWasOriginallyUndefined !== undefined) {
                delete rows[i].total;
                delete rows[i].totalWasOriginallyUndefined;
            }
        }

        app.data.contests[app.selected.contest].rounds[index.rnd].groups[index.group].slammer = rows;

        app.utils.persistData();
        app.updateScreen(true);
    };


    /**
     * Saves the rearranged slammer order (by drag and drop)
     * @param array slammerIds
     */
    app.manip.saveRearrangedSlammer = function(slammerIds) {
        var index = app.getRndAndGroupIndex();
        var rows = app.data.contests[app.selected.contest].rounds[index.rnd].groups[index.group].slammer;

        var newRows = [];
        for (var i = 0, len = slammerIds.length; i < len; i++) {
            var nextSlammerId = slammerIds[i];
            for (var j = 0, lenj = rows.length; j < lenj; j++) {
                if (nextSlammerId == rows[j].id) {
                    newRows.push(rows[j]);
                    break;
                }
            }
        }

        app.data.contests[app.selected.contest].rounds[index.rnd].groups[index.group].slammer = newRows;

        app.utils.persistData();
        app.updateScreen(true);
    }


    /**
     * Marks or unmarks the slammer with style "a" or style "b"
     */
    app.manip.toggleSlammerMark = function(slammerId, style) {
        if (style !== 'b') {
            style = 'a';
        }

        var index = app.getRndAndGroupIndex();
        var slammer = app.data.contests[app.selected.contest].rounds[index.rnd].groups[index.group].slammer;
        for (var i = 0, len = slammer.length; i < len; i++) {
            if (slammer[i].id == slammerId) {
                if (slammer[i].marks === undefined) {
                    slammer[i].marks = [];
                }
                var pos = slammer[i].marks.indexOf(style);
                if (pos === -1) {
                    slammer[i].marks.push(style);
                } else {
                    slammer[i].marks.splice(pos, 1);
                }
                break;
            }
        }

        app.utils.persistData();
        app.updateScreen(true);
    }



}());
