var app = app || {};
var ENTER_KEY = 13;

(function () {
	'use strict';


    app.screens = {};


    app.updateScreen = function() {
        if (typeof app.screens[app.currentScreen.name] === 'function') {
            var tmpl = app.screens[app.currentScreen.name]();
            $('#appplace').html(tmpl);
            location.hash = app.currentScreen.name + '/' + app.currentScreen.id;
        } else {
            console.warn('Function for screen ' + app.currentScreen.name + ' does not exists');
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

    app.screens.contest = function() {
        var tmpl = '<h1>Contest</h1>';
        tmpl += '<span class="changeScreen bl" data-screen="group" data-screen-id="1">GroupScreen</span>';
        tmpl += '<span class="changeScreen bl" data-screen="pause" data-screen-id="">PauseScreen</span>';
        return tmpl;
    }

    app.screens.configure = function() {
    }



    app.currentScreen = { name: 'group', id: '2' }
    app.updateScreen();


    // Events
    $(document).on('click', '.changeScreen', function() {
        app.currentScreen = { name: $(this).attr('data-screen'), id: $(this).attr('data-screen-id') };
        app.updateScreen();
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

        row.find('input:not(.total)').each(function() {
            v = parseInt($(this).val(), 10);
            if (isNaN(v)) {
                $(this).val('');
                allFilled = false;
            } else {
                allValidGrades.push(v);
            }
        });

        if (allFilled) {
            for (var i = 0, len = allValidGrades.length; i < len; i++) {
                sum += allValidGrades[i];
            }
            row.find('input.total').val(sum);
        } else {
            row.find('input.total').val('');
        }


    });

    $(window).on('hashchange', function(a, b, c) {
        console.log('Todo Hash change: ' + location.hash);
    });









}());
