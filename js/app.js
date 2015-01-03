var app = app || {};
var ENTER_KEY = 13;

(function () {
	'use strict';


    app.screens = {};
    app.currentScreen = {
        name: false,
        id: false
    }


    app.updateScreen = function(forceUpdate) {
        forceUpdate = forceUpdate ? true : false;
        var suffix = '';
        if (forceUpdate) {
            suffix = '~~t' + Math.floor(new Date().getTime() / 1000);
        }

        if (app.currentScreen.id === undefined || !app.currentScreen.id) {
            location.hash = app.currentScreen.name + suffix;
        } else {
            location.hash = app.currentScreen.name + '/' + app.currentScreen.id + suffix;
        }
    }


    app.screens.group = function() {
        var group = app.getGroup(app.currentScreen.id);
        var tmpl = '<h1>Runde ' + group.round.name + ', Gruppe ' + group.name + '</h1>';

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
    }

    app.screens.slammer = function() {
        var slammer = app.slammerById[app.currentScreen.id];
        var tmpl = '<h1>' + slammer.name + '</h1>';
        tmpl += '<span class="changeScreen bl" data-screen="group" data-screen-id="1">GroupScreen</span>';
        return tmpl;
    }

    app.screens.pause = function() {
        var tmpl = '<h1>Pause</h1>';
        tmpl += '<span class="changeScreen bl" data-screen="contest" data-screen-id="0">ContestScreen</span>';
        tmpl += '<span class="changeScreen bl" data-screen="group" data-screen-id="1">GroupScreen</span>';
        return tmpl;
    }

    app.screens.contest = function(contestId) {
        app.selected.contest = contestId;
        app.updateSlammerById();

        var groups, gid;
        var tmpl = '<h1>Contest ' + app.data.contests[app.selected.contest].name + '</h1>';
        tmpl += '<span class="changeScreen bl" data-screen="configure">ConfigureScreen</span>';
        tmpl += '<span class="changeScreen bl" data-screen="slammerConf">SlammerConfigScreen</span>';
        groups = app.getGroupNames();
        for (gid in groups) {
            tmpl += '<span class="changeScreen bl" data-screen="group" data-screen-id="' + gid + '">' + groups[gid] + '</span>';
        }
        tmpl += '<span class="changeScreen bl" data-screen="pause" data-screen-id="">PauseScreen</span>';
        return tmpl;
    }

    app.screens.configure = function() {
        var contestNames = app.getContestNames();

        var tmpl = '<h1>Config</h1>';
        tmpl += '<span>Select contest</span>';
        if (contestNames.length > 0) {
            tmpl += '<ul class="contestSelect">';
            for (var i = 0, len = contestNames.length; i < len; i++) {
                tmpl += '<li data-contest="' + i + '">' + contestNames[i] + '</li>';
            }
            tmpl += '</ul>';
        } else {
            tmpl += '<p>No contest available. Load a file. Or create a new one</p>';
        }
        tmpl += '<div type="button" class="saveToFile bl">Save to file</div>';
        tmpl += '<div type="button" class="readFromFile bl">Read from file</div>';

        return tmpl;
    }

    app.screens.slammerConf = function() {
        var tmpl = '<h1>Slammer config</h1>';

        var nextSlammerId = 1;
        for (var slId in app.slammerById) {
            slId = parseInt(slId, 10);
            if (slId >= nextSlammerId) {
                nextSlammerId = slId + 1;
            }
        }

        tmpl = '<ul class="slammerConfigList" data-next-slammer-id="' + nextSlammerId + '">';
        for (var slId in app.slammerById) {
            tmpl += '<li><input type="text" data-slammer-id="' + slId + '" value="' + app.slammerById[slId].name + '" /></li>';
        }
        tmpl += '<li><input type="text" data-slammer-id="' + nextSlammerId + '" placeholder="Neuen Slammer hinzufügen" /></li>';
        tmpl += '</ul>';

        return tmpl;
    }



    // Events
    $(document).on('click', '.contestSelect li', function() {
        app.currentScreen = { name: 'contest', id: $(this).attr('data-contest') };
        app.updateScreen();
    });

    $(document).on('click', '.changeScreen', function() {
        app.currentScreen = { name: $(this).attr('data-screen'), id: $(this).attr('data-screen-id') };
        app.updateScreen();
    });

    $(document).on('click', '.saveToFile', function() {
        var blob = new Blob([JSON.stringify(app.data, null, 4)], {type: "text/plain;charset=utf-8"});
        var fileName = "slam-score-board-";
        fileName += app.utils.getTechTime(new Date());
        saveAs(blob, fileName);
    });

    $(document).on('click', '.readFromFile', function() {
        var o = '<input type="file" id="files" name="files" style="opacity: 0.01" />';
        $(this).after(o);
        $('#files').on('change', function(ev) {
            var files = ev.target.files; // FileList object

            var reader = new FileReader();
            reader.onload = function(theFile) {
                app.data = JSON.parse(theFile.target.result);
                app.utils.persistData();
                app.updateScreen(true);
            };

            reader.readAsText(files[0]);

            $('#files').remove();
        }).trigger('click');

    });


    $(document).on('keyup', '.slammerConfigList li input', function() {
        var newSlammerArray = [];
        var hasEmptySlot = false;
        $(this).parents('.slammerConfigList').find('li input').each(function() {
            var id = $(this).attr('data-slammer-id');
            var name = $.trim($(this).val());
            if (name !== '') {
                newSlammerArray.push({ 'id': id, 'name': name });
            } else {
                hasEmptySlot = true;
            }
        });
        if (!hasEmptySlot) {
            var nextSlammerId = parseInt($('.slammerConfigList').attr('data-next-slammer-id'), 10) + 1;
            $('.slammerConfigList').attr('data-next-slammer-id', nextSlammerId);
            $('.slammerConfigList').append('<li><input type="text" data-slammer-id="' + nextSlammerId + '" placeholder="Neuen Slammer hinzufügen" /></li>');
        }

        app.data.contests[app.selected.contest].slammer = newSlammerArray;
        app.updateSlammerById();
    });


    $(document).on('keyup', '.grades input', function() {
        var row = $(this).parent();
        // Calculate
        var allFilled = true;
        var minGrade = 999999999;
        var minGradeIndex = false;
        var maxGrade = -9999999;
        var maxGradeIndex = false;
        var sum = 0;
        var allValidGrades = [];
        var v;

        row.find('input:not(.total)').each(function(index) {
            v = parseInt($(this).val(), 10);
            $(this).removeClass('minDropGrade maxDropGrade');
            if (isNaN(v)) {
                $(this).val('');
                allFilled = false;
            } else {
                $(this).val(v);
                allValidGrades.push(v);
                if (v < minGrade) {
                    minGrade = v;
                    minGradeIndex = index;
                } else if (v > maxGrade) {
                    maxGrade = v;
                    maxGradeIndex = index;
                }
            }
        });



        if (allFilled) {
            for (var i = 0, len = allValidGrades.length; i < len; i++) {
                if (i != maxGradeIndex && i != minGradeIndex) {
                    sum += allValidGrades[i];
                }
            }
            row.find('input.total').val(sum);
            row.find('input:nth-child(' + (minGradeIndex + 1) + ')').addClass('minDropGrade');
            row.find('input:nth-child(' + (maxGradeIndex + 1) + ')').addClass('maxDropGrade');
        } else {
            row.find('input.total').val('');
        }


    });

    $(window).on('hashchange', function(a, b, c) {
        app.doWhatHashSays();
    });


    app.doWhatHashSays = function() {
        var n, id, parts, posForcePart;
        var h = location.hash.substr(1);

        posForcePart = h.indexOf('~~');
        if (posForcePart !== -1) {
            h = h.substr(0, posForcePart);
            location.hash = '#' + h;
            return;
        }

        if (h.indexOf('/') === -1) {
            n = h;
            id = false;
        } else {
            parts = h.split('/');
            n = parts[0];
            id = parts[1];
        }

        app.currentScreen.name = n;
        app.currentScreen.id = id;

        if (typeof app.screens[app.currentScreen.name] === 'function') {
            var tmpl;
            if (app.currentScreen.id) {
                tmpl = app.screens[app.currentScreen.name](app.currentScreen.id);
            } else {
                tmpl = app.screens[app.currentScreen.name]();
            }
            $('#appplace').html(tmpl);
        } else {
            console.warn('Function for screen ' + app.currentScreen.name + ' does not exists');
        }
    }


    // Start
    app.utils.loadData();
    if (location.hash === '') {
        app.currentScreen = { name: 'configure' }
        app.updateScreen();
    } else {
        app.doWhatHashSays();
    }











}());
