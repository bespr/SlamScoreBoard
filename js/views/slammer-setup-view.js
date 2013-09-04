var app = app || {};

(function ($) {
	'use strict';


    app.SlammerSetupView = Backbone.View.extend({
        el: $('#appplace'),

        events: {
            'click input[type="button"]': 'addSlammer',
            'click .contestScreen': 'switchToContestScreen'
        },

        initialize: function() {
            this.collection = app.collections.slammer;
            this.listenTo(this.collection, 'add', this.appendSlammer)
            this.collection.fetch();
        },

        render: function() {
            var self = this;

            var template = _.template( $("#tmpl-slammer-list").html(), {});
            this.$el.html(template);

            _(this.collection.models).each(function(slammerItem) {
                if (slammerItem.get('contestId') == self.contestId) {
                    self.appendSlammer(slammerItem);
                }
            }, this);

        },

        addSlammer: function() {
            var name = $('input[name="slammerName"]').val();
            if (name == '') {
                alert('insert a name');
            }
            else {
                var slammer = new app.SlammerModel();
                slammer.set({ name: name, contestId: this.contestId });
                this.collection.add(slammer);
            }
        },

        appendSlammer: function(slammer) {
            slammer.save();

            var slammerItemView = new app.SlammerItemView({
                model: slammer
            });
            $('ul').append(slammerItemView.render().el);
        },

        switchToContestScreen: function() {
            app.screens.contest.render();
        }
    });



})(jQuery);
