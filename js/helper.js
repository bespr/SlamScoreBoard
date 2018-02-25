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
                if (g[j].id == id) {
                    groupFound = $.extend({}, g[j]);
                    groupFound.round = $.extend({}, r[i]);
                    groupFound.contest = $.extend({}, app.data.contests[app.selected.contest]);
                    break outOfLoop;
                }
            }
        }

        return groupFound;
    };



    app.getSlammer = function(list) {
        var slammer = [];
        for (var i = 0, len = list.length; i < len; i++) {
            var s = $.extend({}, list[i]);
            if (app.slammerById[list[i].id] !== undefined) {
                s.name = app.slammerById[list[i].id].name;
            } else {
                s.name = '<i>Unknown (id = ' + list[i].id + ')</i>';
            }
            slammer.push(s);
        }
        return slammer;
    };


    app.getContestNames = function() {
        var contestNames = [];
        for (var i = 0, len = app.data.contests.length; i < len; i++) {
            contestNames.push(app.data.contests[i].name);
        }
        return contestNames;
    };

    app.getRndAndGroupIndex = function(groupId) {
        if (groupId === undefined) {
            groupId = app.selected.group;
        }

        var rnds = app.data.contests[app.selected.contest].rounds;
        var rndIndex = false;;
        var groupIndex = false;

        for (var i = 0, len = rnds.length; i < len; i++) {
            for (var j = 0, lenj = rnds[i].groups.length; j < lenj; j++) {
                if (rnds[i].groups[j].id == groupId) {
                    return { 'rnd': i, 'group': j };
                }
            }
        }
        console.warn('strange: getRndAndGroupIndex() could not return a rndIndex or a groupIndex');
        return false;
    };

/*
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
*/


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
                "contests": [],
            };
        }
        app.utils.dataExtendDefaults();

        d = localStorage.getItem('ssb-last-loaded-selected');
        if (d) {
            app.selected = JSON.parse(d);
        } else {
            app.selected = {};
        }

        app.updateByIdValues();
        app.utils.adaptDesign();
    };

    app.utils.clearAllData = function() {
        app.currentScreen = { name: 'start', id: false };
        app.updateScreen();
        localStorage.clear();
        app.utils.loadData();
    };

    app.utils.dataExtendDefaults = function() {
        app.data.designConf = app.data.designConf || {};
        app.data.designConf.language = app.data.designConf.language || "de";
        app.data.designConf.fontFamily = app.data.designConf.fontFamily || 'open-sans';
        app.data.designConf.fontColor = app.data.designConf.fontColor || '#ff8844';
        app.data.designConf.backgroundColor = app.data.designConf.backgroundColor || '#000000';
        app.data.designConf.markAColor = app.data.designConf.markAColor || '#88ff88';
        app.data.designConf.markBColor = app.data.designConf.markBColor || '#ff8888';
        app.data.designConf.backgroundImage = app.data.designConf.backgroundImage || '';
        app.data.designConf.hideTitle = app.data.designConf.hideTitle || 'block';
        app.data.designConf.logo = app.data.designConf.logo || '';
        app.data.designConf.sponsors = app.data.designConf.sponsors || "";
        app.data.designConf.marginLeft = app.data.designConf.marginLeft || "1%";
        app.data.designConf.marginTop = app.data.designConf.marginTop || "1%";
        app.data.designConf.marginRight = app.data.designConf.marginRight || "1%";
        app.data.designConf.marginBottom = app.data.designConf.marginBottom || "1%";
    }



    app.utils.adaptDesign = function(doReload) {
        doReload = doReload || false;

        // Set Foreground Color
        app.sheet.insertRule('body, input, button, textarea, select { color: ' + app.data.designConf.fontColor + '; }', 0);
        var borderStyleSelectors = [
            '.template-start .contestSelect li',
            '.template-contest .contestContainer .rnd .group',
            '.template-contest .contestContainer .rnd .group ul li .slammerScreenLinkHelper',
            '.template-group ul.groupList li .grades input.total'
        ];
        app.sheet.insertRule(borderStyleSelectors.join(', ') + ' { border-color: ' + app.data.designConf.fontColor + '; }', 0);

        var borderTransparentStyleSelectors = [
            '.template-group ul.groupList',
            '.template-group ul.groupList li',
            '.template-contest .contestContainer .rnd .inner'
        ];

        var rgba = app.utils.getRgba(app.data.designConf.fontColor, 0.3);
        app.sheet.insertRule(borderTransparentStyleSelectors.join(', ') + ' { border-color: ' + rgba + '; }', 0);

        // Make Input Placeholder Color half transparent
        rgba = app.utils.getRgba(app.data.designConf.fontColor, 0.5);
        try {
            app.sheet.insertRule('::-webkit-input-placeholder { color: ' + rgba + '; }', 0);
        } catch (e) { }
        try {
            app.sheet.insertRule('::-moz-placeholder { color: ' + rgba + '; }', 0);
        } catch (e) { }
        try {
            app.sheet.insertRule(':-ms-input-placeholder { color:: ' + rgba + '; }', 0);
        } catch (e) { }

        app.sheet.insertRule('html { background-color: ' + app.data.designConf.backgroundColor + '; }', 0);

        $('body').removeClass().addClass(app.data.designConf.fontFamily);
        if (app.data.designConf.backgroundImage != '') {
            $('html').css('background-image', 'url(_YOUR_FILES_/background/' + app.data.designConf.backgroundImage + ')');
        } else {
            $('html').css('background-image', 'none');
        }
        app.sheet.insertRule('.template-group h1, .template-pause h1, .template-slammer > p { display: ' + app.data.designConf.hideTitle + ' }',0);

        $('#appplace').css({
            'margin-left': app.data.designConf.marginLeft,
            'margin-top': app.data.designConf.marginTop,
            'margin-right': app.data.designConf.marginRight,
            'margin-bottom': app.data.designConf.marginBottom
        });

        // Set MarkA Color
        app.sheet.insertRule('.template-group ul.groupList li.markA, .template-contest li.markA { color:  ' + app.data.designConf.markAColor + '; }', 0);
        app.sheet.insertRule('.template-group ul.groupList li.markA .grades .total { border-color:  ' + app.data.designConf.markAColor + '; }', 0);

        // Set MarkB Color
        app.sheet.insertRule('.template-group ul.groupList li.markB, .template-contest li.markB { color:  ' + app.data.designConf.markBColor + '; }', 0);
        app.sheet.insertRule('.template-group ul.groupList li.markB .grades .total { border-color:  ' + app.data.designConf.markBColor + '; }', 0);
        app.sheet.insertRule('.template-group ul.groupList li.markA .markB, .template-contest li.markA .markB { color:  ' + app.data.designConf.markBColor + '; }', 0);

        if (doReload) {
            location.reload();
        }
    };

    /**
     * Set Styles on Group Screen According to number of Slammers and Number of Judges
     */
    app.utils.updateDynamicGroupSize = function() {
        var numOfRows = $('.groupList li').length;
        var numOfInputs = parseInt(app.data.contests[app.selected.contest].config.numOfGrades) + 1;

        var groupFontSize = '1.4em';

        if (numOfRows <= 10) {
            if (numOfRows > 6) {
                groupFontSize = '1.8em';
            } else {
                groupFontSize = '2.2em';
            }
        }
        $('.template-group ul.groupList').css('font-size', groupFontSize);

        var totalInputsWidth = $('.template-group ul.groupList li .grades').width();
        var totalInputsWidthWithoutMargins = totalInputsWidth - (numOfInputs * 20) - 4;
        $('.template-group ul.groupList li .grades input').width(totalInputsWidthWithoutMargins / numOfInputs);
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


    app.utils.getRgba = function(rgb, alpha) {
        if (rgb.substr(0, 1) === '#') {
            rgb = rgb.substr(1);
        }
        var dr = parseInt(rgb.substr(0, 2), 16);
        var dg = parseInt(rgb.substr(2, 2), 16);
        var db = parseInt(rgb.substr(4, 2), 16);
        return 'rgba(' + dr + ', ' + dg + ', ' + db + ', ' + alpha + ')';
    }


    /**
    * from http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array/2450976#2450976
    */
    app.utils.shuffle = function(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
        return array;
    };

    /**
     * Returns Drop Notes (max or min) from an array with numbers
     * @param String type ['min'|'max']
     * @param Integer howMany
     * @param Array array - an array with numbers
     * @param Array alreadyUsedIndizes - array with "blocked" indizes (e.g. already used for maxDropGrades when in minDropGrades)
     * @returns Array with Drop notes (index and value)
     */
    app.utils.getDropNoteInfosFromArray = function(type, howMany, array, alreadyUsedIndizes) {
        var sortedArray = array.slice(); // copy by value
        if (type === 'max') {
            sortedArray.sort(app.utils.sortNumberDesc);
        } else {
            sortedArray.sort(app.utils.sortNumberAsc);
        }

        var re = [];
        for (var i = 0; i < howMany; i++) {
            re.push({ 'index': false, 'value': sortedArray[i] });
        }

        var usedIndizes = alreadyUsedIndizes.slice();
        for (var i = 0, len = re.length; i < len; i++) {
            for (var j = 0, lenj = array.length; j < lenj; j++) {
                if (re[i].value == array[j] && usedIndizes.indexOf(j) === -1) {
                    re[i].index = j;
                    usedIndizes.push(j);
                    break;
                }
            }
        }

        return re;
    }

    /**
     * Sort function ASC
     */
    app.utils.sortNumberAsc = function(a, b) {
        return a - b;
    }

    /**
     * Sort function ASC
     */
    app.utils.sortNumberDesc = function(a, b) {
        return b - a;
    }


    // Language Handler
    window.l = function(str, values) {
        var re = str + '°';

        if (app.data.designConf.language !== undefined && lang[app.data.designConf.language][str] !== undefined) {
            re = lang[app.data.designConf.language][str];
        } else if (lang.de[str] !== undefined) {
            re = lang.de[str];
        }

        if (values !== undefined) {
            for (var i = 0, len = values.length; i < len; i++) {
                re = re.replace('%%', values[i]);
            }
        }
        return re;
    };

    // Console helper: Show data of current contest
    window.d = function() {
        console.log('==== Data of current contest (' + app.selected.contest + ') ====');
        console.log(app.data.contests[app.selected.contest]);
    };

    // Delete all entered grades
    window.removeAllGrades = function() {
        for (var i = 0, len = app.data.contests.length; i < len; i++) {
            for (var j = 0, lenj = app.data.contests[i].rounds.length; j < lenj; j++) {
                for (var k = 0, lenk = app.data.contests[i].rounds[j].groups.length; k < lenk; k++) {
                    for (var l = 0, lenl = app.data.contests[i].rounds[j].groups[k].slammer.length; l < lenl; l++) {
                        if (app.data.contests[i].rounds[j].groups[k].slammer[l].grades !== undefined) {
                            delete app.data.contests[i].rounds[j].groups[k].slammer[l].grades;
                        }
                        if (app.data.contests[i].rounds[j].groups[k].slammer[l].total !== undefined) {
                            delete app.data.contests[i].rounds[j].groups[k].slammer[l].total;
                        }
                        if (app.data.contests[i].rounds[j].groups[k].slammer[l].dropGrades !== undefined) {
                            delete app.data.contests[i].rounds[j].groups[k].slammer[l].dropGrades;
                        }
                    }
                }
            }
        }

        app.utils.persistData();
        app.updateScreen(true);
    }





}());
