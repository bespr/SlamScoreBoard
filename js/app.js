var app = app || {};

(function () {
	'use strict';

    app.currentScreen = {
        name: false,
        id: false
    };


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
    };





    /* ======================== */

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
            $('#appplace').html('');
            setTimeout(function() {
                $('#appplace').html(tmpl);

            }, 300);
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