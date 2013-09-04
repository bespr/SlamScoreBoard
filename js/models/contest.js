var app = app || {};

(function ($) {
	'use strict';


    app.ContestModel = Backbone.RelationalModel.extend({
        defaults: {
            name: 'Superslam 1983',
            nextDateTime: '20:45',
            numOfJudges: 7,
            qualificationLine: false,
            minGrade: 1,
            maxGrade: 10,
            gradeSteps: 1
        },
    });



})(jQuery);
