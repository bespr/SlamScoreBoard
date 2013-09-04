var app = app || {};
app.collections = app.collections || {};

(function ($) {
	'use strict';


    app.SlammerCollection = Backbone.Collection.extend({
        model: app.SlammerModel,
        localStorage: new Backbone.LocalStorage('ssbs'),

        getSlammersByContest: function(contestId) {
            return this.filter(function(slammer) {
                return (slammer.get('contestId') == contestId);
            });
        }
    });
    app.collections.slammer = new app.SlammerCollection();




})(jQuery);
