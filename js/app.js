var app = app || {};

(function () {
	'use strict';

    // Panic hash
    if (location.hash === '#panic-hash') {
        var confirm = window.confirm('Are you sure to delete all data?');
        if (confirm) {
            app.utils.clearAllData();
        }
        location.href = location.protocol + '//' + location.pathname;
    }

    app.currentScreen = {
        name: false,
        id: false
    };

    app.availableLanguages = ['de', 'en', 'fr', 'tg'];

    app.updateScreen = function(forceUpdate) {
        forceUpdate = forceUpdate ? true : false;
        var suffix = '';
        if (forceUpdate) {
            suffix = '~~t' + Math.floor(new Date().getTime() / 1000);
        }

        app.showButtons = false;
        if (app.currentScreen.id === undefined || !app.currentScreen.id) {
            location.hash = app.currentScreen.name + suffix;
        } else {
            location.hash = app.currentScreen.name + '/' + app.currentScreen.id + suffix;
        }
    };


    app.sheet = (function() {
        var style = document.createElement('style');
        style.appendChild(document.createTextNode(""));  // WebKit hack :(
        document.head.appendChild(style);
        return style.sheet;
    })();


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

        if (h === '') {
            location.hash = '#start';
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
            $('#appplace').html(tmpl).removeClass(function (index, css) {
                return (css.match (/(^|\s)template-\S+/g) || []).join(' ');
            }).addClass('template-' + app.currentScreen.name);

            app.templateLoadedEvent.clearAllTimeouts();
            if (typeof app.templateLoadedEvent[app.currentScreen.name] === 'function') {
                setTimeout(function() {
                    app.templateLoadedEvent[app.currentScreen.name]();
                }, 20); // 20 millisecons should be ok for the browser to render the new template
            }
        } else {
            console.warn('Function for screen ' + app.currentScreen.name + ' does not exists');
        }
    };


    // Start
    app.utils.loadData();
    if (location.hash === '') {
        location.hash = '#start';
    } else {
        app.doWhatHashSays();
    }

}());


