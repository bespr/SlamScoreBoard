var app = app || {};

(function ($) {
	'use strict';


    app.SlammerBigView = Backbone.View.extend({
        el: $('#appplace'),

        initialize: function() {},

        events: {
            'click .retour': 'backToSlammerSetup'
        },

        render: function() {
            var template = _.template($('#tmpl-slammer-big').html(), this.model.attributes);
            this.$el.html(template);
        },

        backToSlammerSetup: function() {
	        app.screens.slammerSetup.render();
        }
    });



})(jQuery);
