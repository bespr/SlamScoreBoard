var app = app || {};


(function () {
	'use strict';

    app.templateLoadedEvent = {};
    app.timeoutIds = {};


    /**
     * Group
     */
    app.templateLoadedEvent.group = function() {
        $('ul.grades').each(function() {
            $(this).find('input').first().trigger('blur');
        });

        $('.groupList').sortable({
            'axis': 'y',
            'update': function(ev) {
                var slammerIds = [];
                $('.groupList li').each(function() {
                    slammerIds.push($(this).find('.name').attr('data-slammer-id'));
                });
                app.manip.saveRearrangedSlammer(slammerIds);
            }
        });

    };

    /**
     * Pause
     */
    app.templateLoadedEvent.pause = function() {
        var w = $(window).width();
        var sponsors = app.data.designConf.sponsors.split("\n");
        var numOfSponsors = sponsors.length;
        if (numOfSponsors > 0) {
            var marginLeft = parseInt($('#appplace').css('margin-left'), 10);
            $('.sponsors').width(w * numOfSponsors);
            $('.sponsors li').width(w);

            var left = marginLeft;
            $('.sponsors').css({ 'left': w });
            $('.sponsors').animate({ 'left': -left });

            if (numOfSponsors > 1) {
                app.timeoutIds.sponsors = setInterval(function() {
                    left += w;
                    if (left >= (w * numOfSponsors)) {
                        left = marginLeft;
                    }
                    $('.sponsors').animate({ 'left': -left });

                }, 8000);
            }
        }
    };

    /*
     * designConf
     */
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
        window.clearInterval(app.timeoutIds.overlay);
    };

}());