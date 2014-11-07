var app = app || {};
var ENTER_KEY = 13;

(function () {
	'use strict';


    app.screens = {};


    app.updateScreen = function() {
        if (typeof app.screens[app.currentScreen.name] === 'function') {
            var tmpl = app.screens[app.currentScreen.name]();
            $('#appplace').html(tmpl);
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
                for (var j = 0; j < 5; j++) {
                    tmpl += '<input type="text" />';
                }
                tmpl += '</ul>';
            tmpl += '</li>';
            tmpl += '<span class="changeScreen bl" data-screen="slammer" data-screen-id="' + slammer[i].id + '">SlammerScreen</span>';
        }
        tmpl += '</ul>';
        return tmpl;
    }

    app.screens.slammer = function() {
        var slammer = app.slammerById[app.currentScreen.id];
        var tmpl = '<h1>' + slammer.name + '</h1>';
        tmpl += '<span class="changeScreen bl" data-screen="group" data-screen-id="1">GroupScreen</span>';
        return tmpl;
    }


    app.currentScreen = { name: 'group', id: '1' }
    app.updateScreen();


    // Events
    $(document).on('click', '.changeScreen', function() {
        app.currentScreen = { name: $(this).attr('data-screen'), id: $(this).attr('data-screen-id') };
        app.updateScreen();
    });









}());
