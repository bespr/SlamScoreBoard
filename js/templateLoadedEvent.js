var app = app || {};


(function () {
	'use strict';

    app.templateLoadedEvent = {};
    app.timeoutIds = {};


    /**
     *
     */
    app.templateLoadedEvent.group = function() {
        $('ul.grades').each(function() {
            $(this).find('input').first().trigger('blur');
        });
    };

    /**
     *
     */
    app.templateLoadedEvent.pause = function() {
        var w = $(window).width();
        $('.sponsors').width(w * SPONSORS.length);
        $('.sponsors li').width(w);

        var left = 0;
        app.timeoutIds.sponsors = setInterval(function() {
            left += w;
            if (left >= (w * SPONSORS.length)) {
                left = 0;
            }
            $('.sponsors').animate({ 'left': -left });
        }, 8000);
    };

    /**
     *
     */
    app.templateLoadedEvent.clearAllTimeouts = function() {
        window.clearInterval(app.timeoutIds.sponsors);
    };

}());