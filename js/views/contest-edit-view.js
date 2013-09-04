var app = app || {};

(function ($) {
	'use strict';


    app.ContestEditView = Backbone.View.extend({
        el: $('#appplace'),

        events: {
            'click .submit': 'submit'
        },

        initialize: function() {
            this.collection = app.collections.contest;
        },

        render: function() {
            var template = _.template($('#tmpl-contest-edit').html(), this.model.attributes);
            this.$el.html(template);
        },

        submit: function() {
            this.model.set({
                name: $('.contestName').val(),
                nextDateTime: $('.contestNextDateTime').val(),
                numOfJudges: $('.contestNumOfJudges').val(),
                minGrade: $('.contestMinGrade').val(),
                maxGrade: $('.contestMaxGrade').val(),
                gradeSteps: $('.contestGradeSteps').val()
            });
            this.collection.add(this.model);

            app.screens.contest.render();
        }

    });



})(jQuery);
