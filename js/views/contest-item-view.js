var app = app || {};

(function ($) {
	'use strict';


    app.ContestItemView = Backbone.View.extend({
        events: {
            'click .contestEdit': 'edit',
            'click .contestStart': 'start'
        },

        render: function() {
            var template = _.template($('#tmpl-contest-item').html(), this.model.attributes);
            this.$el.html(template);
            return this;
        },

        edit: function() {
            app.screens.contestEdit.model = this.model;
            app.screens.contestEdit.render();
        },

        start: function() {
            app.selectedContest = this.model;
            app.screens.slammerSetup.contestId = this.model.id;
            app.screens.slammerSetup.render();
        }
    });



})(jQuery);
