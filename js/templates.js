var app = app || {};

(function () {
	'use strict';

    app.screens = {};


    /*
     * group
     */
    app.screens.group = function() {
        var group = app.getGroup(app.currentScreen.id);

        var tmpl = '<h1>' + group.round.name + '</h1>';

        tmpl += '<ul>';
        var slammer = app.getSlammer(group.slammer);
        for (var i = 0, len = slammer.length; i < len; i++) {
            tmpl += '<li>';
                tmpl += '<span class="name">' + slammer[i].name + '</span>';
                tmpl += '<ul class="grades">';
                for (var j = 0; j < app.data.contests[0].config.numOfGrades; j++) {
                    tmpl += '<input type="text" />';
                }
                tmpl += '<input type="text" class="total" readonly="readonly" />';
                tmpl += '</ul>';
            tmpl += '</li>';
            tmpl += '<span class="changeScreen bl" data-screen="slammer" data-screen-id="' + slammer[i].id + '">SlammerScreen</span>';
        }
        tmpl += '</ul>';
        tmpl += '<span class="changeScreen bl" data-screen="contest" data-screen-id="0">ContestScreen</span>';
        tmpl += '<span class="changeScreen bl" data-screen="pause" data-screen-id="">PauseScreen</span>';
        tmpl += '<span class="bl" onclick="window.open(\'' + location.href + '\', \'popUpWin\', \'height=400,width=500\')">Test Popup</span>';
        return tmpl;
    };


    /*
     * slammer
     */
    app.screens.slammer = function() {
        var slammer = app.slammerById[app.currentScreen.id];
        var tmpl = '<h1>' + slammer.name + '</h1>';
        tmpl += '<span class="changeScreen bl" data-screen="group" data-screen-id="1">GroupScreen</span>';
        return tmpl;
    };


    /*
     * pause
     */
    app.screens.pause = function() {
        var tmpl = '<h1>Pause</h1>';
        tmpl += '<span class="changeScreen bl" data-screen="contest" data-screen-id="0">ContestScreen</span>';
        tmpl += '<span class="changeScreen bl" data-screen="group" data-screen-id="1">GroupScreen</span>';
        return tmpl;
    };

    /*
     * contest
     */
    app.screens.contest = function(contestId) {
        app.selected.contest = contestId;
        app.utils.persistData();
        app.updateByIdValues();

        var dataContest = app.data.contests[app.selected.contest];

        var groups, gid;
        var tmpl = '<h1>Contest ' + dataContest.name + '</h1>';
        tmpl += '<span class="changeScreen bl" data-screen="contestConf" data-screen-id="' + app.selected.contest + '">ContestConfigureScreen</span>';
        tmpl += '<span class="changeScreen bl" data-screen="configure">MainConfigureScreen</span>';
        tmpl += '<span class="changeScreen bl" data-screen="slammerConf">SlammerConfigScreen</span>';
        /*
        groups = app.getGroupNames();
        for (gid in groups) {
            tmpl += '<span class="changeScreen bl" data-screen="group" data-screen-id="' + gid + '">' + groups[gid] + '</span>';
        }
        tmpl += '<span class="changeScreen bl" data-screen="pause" data-screen-id="">PauseScreen</span>';
        */

        var numOfRnds = dataContest.rounds.length;
        tmpl += '<div class="contestContainer numOfRnds-' + numOfRnds + '">';
        for (var i = 0; i < numOfRnds; i++) {
            var rnd = dataContest.rounds[i];
            tmpl += '<div class="rnd"><div class="inner">';
                tmpl += '<h3>' + rnd.name + '</h3>';
                for (var j = 0, lenj = rnd.groups.length; j < lenj; j++) {
                    var g = rnd.groups[j];
                    tmpl += '<div class="group changeScreen" data-screen="group" data-screen-id="' + g.id + '">';
                        if (g.slammer.length === 0) {
                            tmpl += '<i>' + l('slammer_list_undefined') + '</i>';
                            tmpl += '<span class="bl removeGroup" data-group="' + g.id + '">' + l('remove_group') + '</span>';
                        } else {
                            tmpl += '<ul>';
                            for (var k = 0, lenk = g.slammer.length; k < lenk; k++) {
                                if (app.slammerById[g.slammer[k].id] !== undefined) {
                                    tmpl += '<li>' + app.slammerById[g.slammer[k].id].name + '</li>';
                                } else {
                                    tmpl += '<li><i>Unknown (id  = ' + g.slammer[k].id + ')</i></li>';
                                }
                            }
                            tmpl += '</ul>';
                        }

                    tmpl += '</div>';
                }

                tmpl += '<span class="bl addGroup" style="margin-left: 0" data-rnd="' + rnd.id + '">' + l('add_group') + '</span>';

            tmpl += '</div></div>';
        }
        tmpl += '</div>';

        return tmpl;
    };


    /*
     * configure
     */
    app.screens.configure = function() {
        var contestNames = app.getContestNames();

        var tmpl = '<h1>' + l('config_title') + '</h1>';
        tmpl += '<span>Select contest</span>';
        if (contestNames.length > 0) {
            tmpl += '<ul class="contestSelect">';
            for (var i = 0, len = contestNames.length; i < len; i++) {
                tmpl += '<li>';
                    tmpl += '<span class="changeScreen" data-screen="contest" data-screen-id="' + i + '">' + contestNames[i] + '</span>';
                    tmpl += '<span class="changeScreen bl" data-screen="contestConf" data-screen-id="' + i + '">Config</span>';
                    tmpl += '<span class="deleteContest bl" data-contest-id="' + i + '">Delete</span>';
                tmpl += '</li>';
            }
            tmpl += '</ul>';
        } else {
            tmpl += '<p>No contest available. Load a file. Or create a new one</p>';
        }
        tmpl += '<div>';
            tmpl += '<label>New contest</label>';
            tmpl += '<input type="text" class="insertContest" placeholder="insert new contest name" />';
            tmpl += '<div class="bl insertContestSubmit">OK</div>';
        tmpl += '</div>';

        tmpl += '<div type="button" class="saveToFile bl">Save to file</div>';
        tmpl += '<div type="button" class="readFromFile bl">Read from file</div>';
        tmpl += '<div type="button" class="clearAllData bl">Clear all data</div>';


        return tmpl;
    };


    /*
     * contestConf
     */
    app.screens.contestConf = function(contestId) {
        app.selected.contest = contestId;
        app.updateByIdValues();

        var contestData = app.data.contests[app.selected.contest];
        if (contestData.config.numOfGrades === undefined) {
            contestData.config.numOfGrades = 5;
        }
        if (contestData.config.numOfDecimalDigits === undefined) {
            contestData.config.numOfDecimalDigits = 0;
        }
        if (contestData.config.numOfMaxDropGrades === undefined) {
            contestData.config.numOfMaxDropGrades = 1;
        }
        if (contestData.config.numOfMinDropGrades === undefined) {
            contestData.config.numOfMinDropGrades = 1;
        }

        var nextRndId = 1;
        for (var rndId in app.rndById) {
            rndId = parseInt(rndId, 10);
            if (rndId >= nextRndId) {
                nextRndId = rndId + 1;
            }
        }

        var tmpl = '<h1>Config Contest «' + contestData.name + '»</h1>';
        tmpl += '<ul>';
            tmpl += '<li>';
                tmpl += '<label>Jurymitglieder</label>';
                tmpl += '<input class="contestConf" name="numOfGrades" type="text" value="' + contestData.config.numOfGrades + '" />';
            tmpl += '</li>';
            tmpl += '<li>';
                tmpl += '<label>Mögliche Stellen nach dem Komma</label>';
                tmpl += '<input class="contestConf" name="numOfDecimalDigits" type="text" value="' + contestData.config.numOfDecimalDigits + '"  />';
            tmpl += '</li>';
            tmpl += '<li>';
                tmpl += '<label>Anzahl Streichnoten gegen oben</label>';
                tmpl += '<input class="contestConf" name="numOfMaxDropGrades" type="text" value="' + contestData.config.numOfMaxDropGrades + '"  />';
            tmpl += '</li>';
            tmpl += '<li>';
                tmpl += '<label>Anzahl Streichnoten gegen unten</label>';
                tmpl += '<input class="contestConf" name="numOfMinDropGrades" type="text" value="' + contestData.config.numOfMinDropGrades + '"  />';
            tmpl += '</li>';
            tmpl += '<li>';
                tmpl += '<label>' + l('rounds') + '</label>';

                tmpl += '<ul class="rndConfigList" data-next-rnd-id="' + nextRndId + '">';
                for (var rndId in app.rndById) {
                    tmpl += app.screens.parts.rndInput(rndId, app.rndById[rndId].name, '');
                }
                tmpl += app.screens.parts.rndInput(nextRndId, '', l('add_new_round'));
                tmpl += '</ul>';

            tmpl += '</li>';
        tmpl += '</ul>';

        tmpl += '<span class="changeScreen bl" data-screen="configure">ConfigScreen</span>';
        tmpl += '<span class="changeScreen bl" data-screen="contest" data-screen-id="0">ContestScreen</span>';
        return tmpl;
    };


    /*
     * slammerConf
     */
    app.screens.slammerConf = function() {
        // Check, if a contest is selected
        if (app.selected.contest === undefined) {
            alert('selectedContest is undefined. Redirect to #configure');
            location.hash = 'configure';
            return;
        }

        var nextSlammerId = 1;
        for (var slId in app.slammerById) {
            slId = parseInt(slId, 10);
            if (slId >= nextSlammerId) {
                nextSlammerId = slId + 1;
            }
        }

        var tmpl = '<h1>Slammer config</h1>';
        tmpl += '<ul class="slammerConfigList" data-next-slammer-id="' + nextSlammerId + '">';
        for (var slId in app.slammerById) {
            tmpl += app.screens.parts.slammerInput(slId, app.slammerById[slId].name, '');
        }
        tmpl += app.screens.parts.slammerInput(nextSlammerId, '', l('add_new_slammer'));
        tmpl += '</ul>';

        tmpl += '<span class="changeScreen bl" data-screen="contest" data-screen-id="' + app.selected.contest + '">ContestScreen</span>';

        return tmpl;
    };



    /*
     *
     * ===========================
     * Parts
     */

    app.screens.parts = {};


    /*
     * SlammerInput
     */
    app.screens.parts.slammerInput = function(slammerId, name, placeholder) {
        var tmpl = '';
        tmpl += '<li data-slammer-id="' + slammerId + '">';
            tmpl += '<input type="text" value="' + name + '" placeholder="' + placeholder + '" />';
            if (name !== '') {
                tmpl += '<span class="deleteSlammer bl">Delete</span>';
            }
        tmpl += '</li>';
        return tmpl;
    };


    /*
     * RoundInput
     */
    app.screens.parts.rndInput = function(rndId, name, placeholder) {
        var tmpl = '';
        tmpl += '<li data-rnd-id="' + rndId + '">';
            tmpl += '<input type="text" value="' + name + '" placeholder="' + placeholder + '" />';
            if (name !== '') {
                tmpl += '<span class="deleteRound bl">Delete</span>';
            }
        tmpl += '</li>';
        return tmpl;
    };



}());