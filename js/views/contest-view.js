var app = app || {};

(function ($) {
	'use strict';


    app.ContestView = Backbone.View.extend({
        el: $('#appplace'),

        events: {
            'click .insertNewContest': 'switchToContestEditScreen'
        },

        initialize: function() {
            this.collection = app.collections.contest;
            this.listenTo(this.collection, 'add', this.appendContest);
            this.collection.fetch();

            app.screens.contest = this;
            app.screens.contestEdit = new app.ContestEditView();
            app.screens.slammerSetup = new app.SlammerSetupView();
            app.screens.slammerBig = new app.SlammerBigView();
        },

        render: function() {
            var self = this;

            var template = _.template($('#tmpl-contest').html(), {});
            this.$el.html(template);

            _(this.collection.models).each(function(item) {
                self.appendContest(item);
            });
        },

        switchToContestEditScreen: function() {
            app.screens.contestEdit.model = new app.ContestModel();
            app.screens.contestEdit.render();
        },

        appendContest: function(contest) {
            contest.save();

            var contestItemView = new app.ContestItemView({
                model: contest
            });
            $('ul.contests').append(contestItemView.render().el);
        },
    });



})(jQuery);
