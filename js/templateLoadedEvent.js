var app = app || {};


(function () {
    'use strict';

    app.templateLoadedEvent = {};
    app.timeoutIds = {};
    
    
    app.templateLoadedEvent.start = function() {
        app.updateResolutionHint();
    };


    /**
     * Contest
     *
     * Drag-n-Drop Slammer in Next Round
     */
    app.templateLoadedEvent.contest = function() {
        $('.contestContainer .rnd .group ul li').draggable({
            helper: 'clone',
            revert: 'invalid',
            start: function() {
                app.isDragging = true;
            },
            stop: function(ev) {
                setTimeout(function() {
                    app.isDragging = false;
                }, 200);
            }
        });
        $('.contestContainer .rnd .group').droppable({
            drop: function(ev, ui) {
                var originalRnd = ui.draggable.parents('.rnd');
                var targetRnd = $(this).parents('.rnd');

                // Add to next round
                if (originalRnd.index() < targetRnd.index()) {
                    var slammerId = ui.draggable.attr('data-slammer-id');
                    var groupId = $(this).attr('data-screen-id');
                    if (slammerId !== undefined && groupId !== undefined) {
                        app.manip.assignSlammerToGroup(slammerId, groupId);
                    }
                }
                // Remove (dragging to the previous round)
                else if (originalRnd.index() > targetRnd.index()) {
                    var slammerId = ui.draggable.attr('data-slammer-id');
                    var groupId = ui.draggable.parents('.group').attr('data-screen-id');
                    if (slammerId !== undefined && groupId !== undefined) {
                        app.manip.unassignSlammer(slammerId, groupId);
                    }
                }
            }
        });
    };


    /**
     * Group:
     *
     * Sort order of slammers
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
        
        app.utils.updateDynamicGroupSize();

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