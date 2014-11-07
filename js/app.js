var app = app || {};
var ENTER_KEY = 13;

(function () {
	'use strict';


    app.currentScreen = { name: 'group', id: '2' }

    var group = app.getGroup(app.currentScreen.id);
    var tmpl = '<h1>Runde ' + group.round.name + ', Gruppe ' + group.name + '</h1>';

    tmpl += '<ul>';
    var slammer = app.getSlammer(group.slammer);
    for (var i = 0, len = slammer.length; i < len; i++) {
        tmpl += '<li>' + slammer[i].name + '</li>';
    }
    tmpl += '</ul>';


    $('#appplace').html(tmpl);





}());
