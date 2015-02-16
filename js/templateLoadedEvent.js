var app = app || {};


(function () {
	'use strict';

    app.templateLoadedEvent = {};

    app.templateLoadedEvent.group = function() {
        $('ul.grades').each(function() {
            $(this).find('input').first().trigger('blur');
        });
    }


}());