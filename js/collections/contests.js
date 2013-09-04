var app = app || {};
app.collections = app.collections || {};

(function ($) {
	'use strict';


    app.ContestCollection = Backbone.Collection.extend({
        model: app.ContestModel,
        localStorage: new Backbone.LocalStorage('ssbc')
    });
    app.collections.contest = new app.ContestCollection();



})(jQuery);
