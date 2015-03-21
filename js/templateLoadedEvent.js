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
        var numOfSponsors = app.data.designConf.sponsors.length;
        var marginLeft = parseInt($('#appplace').css('margin-left'), 10);
        $('.sponsors').width(w * numOfSponsors);
        $('.sponsors li').width(w);

        var left = marginLeft;
        $('.sponsors').css({ 'left': w });
        $('.sponsors').animate({ 'left': -left });

        app.timeoutIds.sponsors = setInterval(function() {
            left += w;
            if (left >= (w * numOfSponsors)) {
                left = marginLeft;
            }
            $('.sponsors').animate({ 'left': -left });

        }, 8000);
    };

    app.templateLoadedEvent.designConf = function() {
        $('.colorChooser').spectrum({
            /* color: "#f00" */
            showInput: true,
            preferredFormat: "hex",
            cancelText: 'abbrechen',
            chooseText: 'übernehmen'
        });
    };

    /**
     *
     */
    app.templateLoadedEvent.clearAllTimeouts = function() {
        window.clearInterval(app.timeoutIds.sponsors);
    };

}());