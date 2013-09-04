var app = app || {};
app.screens = app.screens || {};
app.collections = app.collections || {};
app.selectedContest = false;

var ENTER_KEY = 13;


$(function () {
	'use strict';

    new app.ContestView().render();

});
