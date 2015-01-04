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
	    app.data.contests.splice(index, 1);
        app.utils.persistData();
        app.updateScreen(true);
	}

}());
