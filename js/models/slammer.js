var app = app || {};

(function ($) {
	'use strict';


    app.SlammerModel = Backbone.RelationalModel.extend({
        defaults: {
            name: 'Ivo Engeler',
            grades: [],
            calcGrade: false,
            startPos: false,
            contestId: false
        }
    });



})(jQuery);
