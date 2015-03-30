var app = app || {};

(function () {
    'use strict';

    app.screens = {};


    /*
     * group
     */
    app.screens.group = function (groupId) {
        var group = app.getGroup(groupId);
        app.selected.group = groupId;
        app.selected.rnd = group.round.id;

        var tmpl = '<h1>' + group.round.name + '</h1>';

        tmpl += '<ul class="groupList">';
        var slammer = app.getSlammer(group.slammer);
        for (var i = 0, len = slammer.length; i < len; i++) {
            tmpl += '<li>';
                tmpl += '<span class="name changeScreen" data-screen="slammer" data-screen-id="' + slammer[i].id + '">';
                    tmpl += slammer[i].name;
                    tmpl += '<span class="unassignSlammerButton bs" data-slammer="' + slammer[i].id + '">' + l('unassign_slammer') + '</span>';
                tmpl += '</span>';

                tmpl += '<ul class="grades" data-slammerIndex="' + i + '">';
                    for (var j = 0; j < app.data.contests[0].config.numOfGrades; j++) {
                        if (slammer[i].grades !== undefined && slammer[i].grades[j] !== undefined) {
                            tmpl += '<input type="text" value="' + slammer[i].grades[j] + '" />';
                        } else {
                            tmpl += '<input type="text" />';
                        }
                    }
                    tmpl += '<input type="text" class="total" readonly="readonly" />';
                tmpl += '</ul>';

            tmpl += '</li>';
        }
        tmpl += '</ul>';

        tmpl += '<div class="placeForSlammerDropdown"></div>';

        tmpl += '<div class="buttonBox">';
            tmpl += '<div class="bl bh bi sortSlammer">' + l('sort_slammer') + '</div>';
            tmpl += '<div class="bl bh bi showSlammerDropdown">' + l('assign_slammer') + '</div>';

            tmpl += '<div class="changeScreen bl bh bi" data-screen="contest" data-screen-id="' + app.selected.contest + '">' + l('contest_screen') + '</div>';
            tmpl += '<div class="changeScreen bl bh bi" data-screen="pause" data-screen-id="">' + l('pause') + '</div>';
        tmpl += '</div>';

//        tmpl += '<span class="bl" onclick="window.open(\'' + location.href + '\', \'popUpWin\', \'height=400,width=500\')">Test Popup</span>';
        return tmpl;
    };


    /*
     * slammer
     */
    app.screens.slammer = function () {
        var slammer = app.slammerById[app.currentScreen.id];

        var tmpl = '<p>' + app.data.contests[app.selected.contest].name + '</p>';
        tmpl += '<h1>' + slammer.name + '</h1>';
        tmpl += '<span class="changeScreen bl bh bi" data-screen="group" data-screen-id="' + app.selected.group + '">' + l('back_to_group') + '</span>';
        return tmpl;
    };


    /*
     * pause
     */
    app.screens.pause = function () {
        var sponsors = [];
        if ($.trim(app.data.designConf.sponsors) !== '') {
            sponsors = app.data.designConf.sponsors.split("\n");
        }
        sponsors = app.utils.shuffle(sponsors);


        var tmpl = '<h1>' + app.data.contests[app.selected.contest].name + '</h1>';

        tmpl += '<div class="sponsor-container">';
            tmpl += '<ul class="sponsors">';
            for (var i = 0, len = sponsors.length; i < len; i++) {
                tmpl += '<li><img src="_YOUR_FILES_/sponsor/' + sponsors[i] + '" /></li>';
            }
            tmpl += '</ul>';
        tmpl += '</div>';

        tmpl += '<div class="buttonBox">';
            tmpl += '<div class="changeScreen bl bh bi" data-screen="contest" data-screen-id="' + app.selected.contest + '">' + l('back_to_contest') + '</div>';
            tmpl += '<div class="changeScreen bl bh bi" data-screen="group" data-screen-id="' + app.selected.group + '">' + l('back_to_group') + '</div>';
        tmpl += '</div>';

        return tmpl;
    };

    /*
     * contest
     */
    app.screens.contest = function (contestId) {
        app.selected.contest = contestId;
        app.utils.persistData();
        app.updateByIdValues();

        var dataContest = app.data.contests[app.selected.contest];

        var groups, gid;
        var tmpl = '<h1>' + dataContest.name + '</h1>';

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
                    tmpl += '<span class="bl bh removeGroup" data-group="' + g.id + '">' + l('remove_group') + '</span>';
                } else {
                    tmpl += '<ul>';
                    for (var k = 0, lenk = g.slammer.length; k < lenk; k++) {
                        tmpl += '<li>';
                        if (app.slammerById[g.slammer[k].id] !== undefined) {
                            tmpl += '<span>' + app.slammerById[g.slammer[k].id].name + '</span>';
                            tmpl += '<span>';
                            if (g.slammer[k].total !== undefined) {
                                tmpl += g.slammer[k].total;
                            }
                            tmpl += '</span>';
                        } else {
                            tmpl += '<i>Unknown (id  = ' + g.slammer[k].id + ')</i>';
                        }
                        tmpl += '</li>';
                    }
                    tmpl += '</ul>';
                }

                tmpl += '</div>';
            }

            tmpl += '<span class="bl bh addGroup" style="margin-left: 0" data-rnd="' + rnd.id + '">' + l('add_group') + '</span>';

            tmpl += '</div></div>';
        }
        tmpl += '</div>';

        tmpl += '<div class="buttonBox">';
            tmpl += '<div class="changeScreen bl bh bi" data-screen="contestConf" data-screen-id="' + app.selected.contest + '">' + l('contest_config') + '</div>';
            tmpl += '<div class="changeScreen bl bh bi" data-screen="slammerConf">' + l('slammer_config') + '</div>';
            tmpl += '<div class="changeScreen bl bh bi" data-screen="pause">' + l('pause') + '</div>';
            tmpl += '<div class="changeScreen bl bh bi" data-screen="start">' + l('start_screen') + '</div>';
        tmpl += '</div>';

        return tmpl;
    };


    /*
     * start
     */
    app.screens.start = function () {
        var contestNames = app.getContestNames();

        var tmpl = app.screens.parts.ssbLogo();
        tmpl += '<h1><span class="icon icon-home"></span>' + l('start_title') + '</h1>';
        tmpl += '<h2>' + l('select_contest') + '</h2>';
        if (contestNames.length > 0) {
            tmpl += '<ul class="contestSelect">';
            for (var i = 0, len = contestNames.length; i < len; i++) {
                tmpl += '<li>';
                tmpl += '<p>' + contestNames[i] + '</p>';
                tmpl += '<span class="changeScreen bl bi" data-screen="contest" data-screen-id="' + i + '">' + l('contest_select') + '</span>';
                tmpl += '<span class="changeScreen bl bi" data-screen="contestConf" data-screen-id="' + i + '">' + l('contest_config') + '</span>';
                tmpl += '<span class="changeScreen bl bi" data-screen="slammerConf" data-screen-id="' + i + '">' + l('slammer_config') + '</span>';
                tmpl += '<span class="deleteContest bl bi" data-contest-id="' + i + '">' + l('contest_delete') + '</span>';
                tmpl += '</li>';
            }
            tmpl += '</ul>';
        } else {
            tmpl += '<p>' + l('no_contest_available') + '</p>';
        }
        tmpl += '<div>';
        tmpl += '<h3>' + l('insert_new_contest') + '</h3>';
        tmpl += '<input type="text" class="insertContest" placeholder="' + l('placeholder_contest_name') + '" />';
        tmpl += '<div class="bl insertContestSubmit">OK</div>';
        tmpl += '</div>';

        tmpl += '<div class="buttonBox">';
        tmpl += '<div type="button" class="saveToFile bl bi">' + l('save_to_file') + '</div>';
        tmpl += '<div type="button" class="readFromFile bl bi">' + l('read_from_file') + '</div>';
        tmpl += '<div type="button" class="changeScreen bl bi" data-screen="designConf">' + l('design_configuration') + '</div>';
        tmpl += '<div type="button" class="clearAllData bl bi">' + l('clear_all_data') + '</div>';
        tmpl += '</div>';

        return tmpl;
    };


    /*
     * designConf
     */
    app.screens.designConf = function () {
        var tmpl = app.screens.parts.ssbLogo();
        tmpl += '<h1><span class="icon icon-designConf"></span>' + l('design_conf_title') + '</h1>';
        tmpl += '<ul class="inputlist">';
            tmpl += '<li>';
                tmpl += '<label>' + l('font_family') + '</label>';
                tmpl += '<select class="fontFamily">';
                    tmpl += '<option value="droid-sans"' + ((app.data.designConf.fontFamily === 'droid-sans') ? ' selected' : '') + '>Droid Sans</option>';
                    tmpl += '<option value="droid-serif"' + ((app.data.designConf.fontFamily === 'droid-serif') ? ' selected' : '') + '>Droid Serif</option>';
                    tmpl += '<option value="open-sans"' + ((app.data.designConf.fontFamily === 'open-sans') ? ' selected' : '') + '>Open Sans</option>';
                    tmpl += '<option value="oswald"' + ((app.data.designConf.fontFamily === 'oswald') ? ' selected' : '') + '>Oswald</option>';
                    tmpl += '<option value="raleway"' + ((app.data.designConf.fontFamily === 'raleway') ? ' selected' : '') + '>Raleway</option>';
                    tmpl += '<option value="montserrat"' + ((app.data.designConf.fontFamily === 'montserrat') ? ' selected' : '') + '>Montserrat</option>';
                tmpl += '</select>';
            tmpl += '</li>';
            tmpl += '<li>';
                tmpl += '<label>' + l('font_color') + '</label>';
                tmpl += '<input type="text" class="colorChooser fontColorChooser" value="' + app.data.designConf.fontColor + '" />';
            tmpl += '</li>';
            tmpl += '<li>';
                tmpl += '<label>' + l('background_color') + '</label>';
                tmpl += '<input type="text" class="colorChooser backgroundColorChooser" value="' + app.data.designConf.backgroundColor + '" />';
            tmpl += '</li>';
            tmpl += '<li>';
                tmpl += '<label>' + l('background_image') + '</label>';
                tmpl += '<input type="text" class="backgroundImage" placeholder="' + l('placeholder_background_image') + '" value="' + app.data.designConf.backgroundImage + '" />';
                tmpl += '<p class="desc">' + l('desc_background_image') + '</p>';
            tmpl += '</li>';
            tmpl += '<li>';
                tmpl += '<label>' + l('margins') + '</label>';
                tmpl += '<div class="marginBox">';
                    tmpl += '<input type="text" class="margin" data-margin-name="left" value="' + app.data.designConf.marginLeft + '" />';
                    tmpl += '<input type="text" class="margin" data-margin-name="top" value="' + app.data.designConf.marginTop + '" />';
                    tmpl += '<input type="text" class="margin" data-margin-name="right" value="' + app.data.designConf.marginRight + '" />';
                    tmpl += '<input type="text" class="margin" data-margin-name="bottom" value="' + app.data.designConf.marginBottom + '" />';
                    tmpl += '</div>';
                tmpl += '<p class="desc">' + l('desc_margins') + '</p>';
                tmpl += '</li>';

            tmpl += '<li>';
                tmpl += '<label>' + l('logo') + '</label>';
                tmpl += '<input type="text" class="logo" placeholder="' + l('placeholder_logo') + '" value="' + app.data.designConf.logo + '" />';
                tmpl += '<p class="desc">' + l('desc_logo') + '</p>';
            tmpl += '</li>';
            tmpl += '<li>';
                tmpl += '<label>' + l('sponsors') + '</label>';
                tmpl += '<textarea class="sponsors" placeholder="' + l('placeholder_sponsors') + '">' + app.data.designConf.sponsors + '</textarea>';
                tmpl += '<p class="desc">' + l('desc_sponsors') + '</p>';
            tmpl += '</li>';
            /*
            tmpl += '<li>';
                tmpl += '<label>' + l('beamer_size') + '</label>';
                tmpl += '<select class="beamerSize">';
                    tmpl += '<option value="fullhd">FullHD (1920 x 1080)</option>';
                    tmpl += '<option value="wxga">WXGA (1280 x 800)</option>';
                    tmpl += '<option value="xga">FullHD (1024 x 768)</option>';
                tmpl += '</select>';
            tmpl += '</li>';
            */
        tmpl += '</ul>';

        tmpl += '<div class="buttonBox">';
            tmpl += '<div type="button" class="changeScreen bl bi" data-screen="start">' + l('start_screen') + '</div>';
        tmpl += '</div>';
        return tmpl;
    };



    /*
     * contestConf
     */
    app.screens.contestConf = function (contestId) {
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

        var tmpl = app.screens.parts.ssbLogo();
        tmpl += '<h1><span class="icon icon-contestConf"></span>' + l('config_contest_title') + '</h1>';
        tmpl += '<p>' + contestData.name + '</p>';
        tmpl += '<ul class="form">';
        tmpl += '<li>';
        tmpl += '<input class="contestConf" name="numOfGrades" type="text" value="' + contestData.config.numOfGrades + '" />';
        tmpl += '<label>Jurymitglieder</label>';
        tmpl += '</li>';
        tmpl += '<li>';
        tmpl += '<input class="contestConf" name="numOfDecimalDigits" type="text" value="' + contestData.config.numOfDecimalDigits + '"  />';
        tmpl += '<label>Mögliche Stellen nach dem Komma</label>';
        tmpl += '</li>';
        tmpl += '<li>';
        tmpl += '<input class="contestConf" name="numOfMaxDropGrades" type="text" value="' + contestData.config.numOfMaxDropGrades + '"  />';
        tmpl += '<label>Anzahl Streichnoten gegen oben</label>';
        tmpl += '</li>';
        tmpl += '<li>';
        tmpl += '<input class="contestConf" name="numOfMinDropGrades" type="text" value="' + contestData.config.numOfMinDropGrades + '"  />';
        tmpl += '<label>Anzahl Streichnoten gegen unten</label>';
        tmpl += '</li>';
        tmpl += '</ul>';

        tmpl += '<h2>' + l('rounds') + '</h2>';
        tmpl += '<ul class="rndConfigList" data-next-rnd-id="' + nextRndId + '">';
        for (var rndId in app.rndById) {
            tmpl += app.screens.parts.rndInput(rndId, app.rndById[rndId].name, '');
        }
        tmpl += app.screens.parts.rndInput(nextRndId, '', l('add_new_round'));
        tmpl += '</ul>';

        tmpl += '<div class="buttonBox">';
        tmpl += '<div class="changeScreen bl bi" data-screen="start">' + l('start_screen') + '</div>';
        tmpl += '<div class="changeScreen bl bi" data-screen="slammerConf">' + l('slammer_conf') + '</div>';
        tmpl += '<div class="changeScreen bl bi" data-screen="contest" data-screen-id="' + app.selected.contest + '">' + l('contest_screen') + '</div>';
        tmpl += '</div>';
        return tmpl;
    };


    /*
     * slammerConf
     */
    app.screens.slammerConf = function (contestId) {
        if (contestId !== undefined) {
            app.selected.contest = contestId;
            app.updateByIdValues();
        }

        // Check, if a contest is selected
        if (app.selected.contest === undefined) {
            alert('selectedContest is undefined. Redirect to #start');
            location.hash = 'start';
            return;
        }

        var nextSlammerId = 1;
        for (var slId in app.slammerById) {
            slId = parseInt(slId, 10);
            if (slId >= nextSlammerId) {
                nextSlammerId = slId + 1;
            }
        }

        var tmpl = '';
        tmpl += app.screens.parts.ssbLogo();
        tmpl += '<h1><span class="icon icon-slammerConf"></span>' + l('slammer_config') + '</h1>';
        tmpl += '<p>' + app.data.contests[app.selected.contest].name + '</p>';

        tmpl += '<p>' + l('slammer_config_text') + '</p>';
        tmpl += '<ul class="slammerConfigList" data-next-slammer-id="' + nextSlammerId + '">';
        for (var slId in app.slammerById) {
            tmpl += app.screens.parts.slammerInput(slId, app.slammerById[slId].name, '');
        }
        tmpl += app.screens.parts.slammerInput(nextSlammerId, '', l('add_new_slammer'));
        tmpl += '</ul>';

        tmpl += '<div class="buttonBox">';
            tmpl += '<div class="changeScreen bl bi" data-screen="start">' + l('start_screen') + '</div>';
            tmpl += '<div class="changeScreen bl bi" data-screen="contestConf" data-screen-id="' + app.selected.contest + '">' + l('contest_config') + '</div>';
            tmpl += '<button class="changeScreen bl bi" data-screen="contest" data-screen-id="' + app.selected.contest + '">' + l('contest_screen') + '</button>';
        tmpl += '</div>';

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
    app.screens.parts.slammerInput = function (slammerId, name, placeholder) {
        var tmpl = '';
        tmpl += '<li data-slammer-id="' + slammerId + '">';
        tmpl += '<input type="text" value="' + name + '" placeholder="' + placeholder + '" />';
        if (name !== '') {
            tmpl += '<span class="deleteSlammer bl">Delete</span>';
        } else {
            tmpl += '<span class="deleteSlammer bl invisible">Delete</span>';
        }
        tmpl += '</li>';
        return tmpl;
    };


    /*
     * RoundInput
     */
    app.screens.parts.rndInput = function (rndId, name, placeholder) {
        var tmpl = '';
        tmpl += '<li data-rnd-id="' + rndId + '">';
        tmpl += '<input type="text" value="' + name + '" placeholder="' + placeholder + '" />';
        if (name !== '') {
            tmpl += '<span class="deleteRound bl">Delete</span>';
        }
        tmpl += '</li>';
        return tmpl;
    };


    /**
     * SlammerDropdown
     */
    app.screens.parts.slammerDropdown = function () {
        var slammersAlreadyTaken = [];

        var group = app.getGroup(app.selected.group);
        for (var i = 0, len = group.slammer.length; i < len; i++) {
            slammersAlreadyTaken.push(parseInt(group.slammer[i].id, 10));
        }

        var tmpl = '<select class="slammerDropdown">';
        tmpl += '<option value="0"> == ' + l('choose_slammer') + ' == </option>';
        for (var slId in app.slammerById) {
            if (slammersAlreadyTaken.indexOf(parseInt(slId, 10)) === -1) {
                tmpl += '<option value="' + slId + '">' + app.slammerById[slId].name + '</option>';
            }
        }
        tmpl += '<option value="0"> [' + l('dont_assign_slammer') + ']</option>';
        tmpl += '</select>';
        return tmpl;
    }


    /**
     * SSB Logo
     */
    app.screens.parts.ssbLogo = function () {
        var tmpl = '<div id="ssbLogo">';
        tmpl += '<svg xmlns="http://www.w3.org/2000/svg" version="1.0" viewbox="0 0 447.28 74.61">';
        tmpl += '<rect style="fill: #806682;" width="223.823" height="75" x="0" y="0" />';
        tmpl += '<rect style="fill: #ffffff;" width="223.457" height="75" x="223.823" y="0" />';
        tmpl += '<path d="m 141.71153,37.813208 -24.96289,24.51717 14.46875,0 19.125,-19.15625 5.625,0 0,19.15625 11.40625,0 0,-19.15625 24.1875,0 -19.46875,19.15625 14.4375,0 24.875,-24.875 -24.875,-24.84375 -14.4375,0 19.46875,19.15625 -24.1875,0 0,-19.15625 -11.40625,0 0,19.15625 -5.59375,0 -19.15625,-19.15625 -14.46875,0 z" style="fill: #ffffff;" />';
        tmpl += '<path d="m 246.92244,47.31943 c -0.14474,12.87543 10.67798,18.57957 22.23099,18.57957 14.19126,0 21.7244,-7.16471 21.7244,-16.75056 0,-11.84249 -11.70433,-14.257044 -15.50709,-15.204443 -13.09254,-3.368532 -15.57288,-3.881707 -15.57288,-7.901576 0,-4.388302 4.23698,-5.921246 7.895,-5.921246 5.48702,0 9.94769,1.605315 10.30954,7.894995 l 11.11879,0 c 0,-12.066185 -10.02007,-16.816341 -20.91516,-16.816341 -9.43452,0 -19.52696,5.118589 -19.52696,15.796571 0,9.79637 7.82263,12.79647 15.57946,14.84259 7.67789,2.04612 15.50051,3.0001 15.50051,8.62528 0,5.34229 -6.14494,6.51338 -10.16481,6.51338 -6.14493,0 -11.55301,-2.71062 -11.55301,-9.65822" style="fill: #231f20;" />';
        tmpl += '<path d="m 296.93751,47.383224 c -0.14474,12.875422 10.67799,18.579557 22.231,18.579557 14.19125,0 21.72439,-7.164709 21.72439,-16.75055 0,-11.842494 -11.70433,-14.257047 -15.50708,-15.204446 -13.09254,-3.368532 -15.57288,-3.881707 -15.57288,-7.901576 0,-4.388302 4.23698,-5.921247 7.89499,-5.921247 5.48702,0 9.9477,1.605316 10.30955,7.894996 l 11.11879,0 c 0,-12.066185 -10.02007,-16.816341 -20.91516,-16.816341 -9.43452,0 -19.52696,5.118589 -19.52696,15.796571 0,9.796374 7.82262,12.796473 15.57946,14.842592 7.67788,2.04612 15.50051,3.000099 15.50051,8.625284 0,5.34228 -6.14494,6.513371 -10.16481,6.513371 -6.14494,0 -11.55301,-2.710615 -11.55301,-9.658211" style="fill: #231f20;" />';
        tmpl += '<path d="m 360.83422,21.365109 10.75035,0 c 4.09224,0 7.895,1.01977 7.895,5.993617 0,4.388302 -3.0001,6.217314 -7.01997,6.217314 l -11.62538,0 0,-12.210931 z M 349.347,64.656 l 25.30346,0 c 9.43452,0 18.42824,-4.53304 18.42824,-15.13865 0,-6.50679 -3.21721,-11.40827 -9.57926,-13.23728 4.53304,-2.19086 7.09234,-5.776504 7.09234,-10.895093 0,-9.724003 -6.72391,-12.941214 -16.6716,-12.941214 l -24.57318,0 0,52.212237 z m 11.48722,-23.25734 12.50041,0 c 4.90148,0 8.26343,2.12507 8.26343,7.46077 0,5.40807 -3.9475,6.87523 -8.48054,6.87523 l -12.2833,0" style="fill: #231f20;" />';
        tmpl += '</svg>';
        tmpl += '</div>';
        return tmpl;
    }



}());