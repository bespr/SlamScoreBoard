var test = test || {};


test.testSteps = [

    {
        type: 'action',
        name: 'Add a contest',
        action: function() {
            $('.insertContest').val('Slam ABC');
            $('.insertContestSubmit').trigger('click');
        },
        sleep: 100
    },

    {
        type: 'assertion',
        name: 'Check First Contest Name',
        assert: 'equal',
        param1: function() { return app.data.contests[0].name },
        param2: 'Slam ABC'
    },

    {
        type: 'action',
        name: 'Add another contest',
        action: function() {
            $('.insertContest').val('Slam Two');
            $('.insertContestSubmit').trigger('click');
        },
    },

    {
        type: 'assertion',
        name: 'Check Second Contest Name',
        assert: 'equal',
        param1: function() { return app.data.contests[1].name },
        param2: 'Slam Two'
    },

    {
        type: 'action',
        name: 'Click on slammer adding on second contest',
        action: function() {
            $('.contestSelect li:nth-child(2) span[data-screen="slammerConf"]').trigger('click');
        },
    },

    {
        type: 'assertion',
        name: 'Check Screen',
        assert: 'equal',
        param1: function() { return app.currentScreen.name },
        param2: 'slammerConf',
    },

    {
        type: 'action',
        name: 'Add ten slammers',
        action: function() {
            $('.slammerConfigList li:last-child input').val('Slammer One').focus().blur();
            $('.slammerConfigList li:last-child input').val('Slammer Two').focus().blur();
            $('.slammerConfigList li:last-child input').val('Slammer Three').focus().blur();
            $('.slammerConfigList li:last-child input').val('Slammer Four').focus().blur();
            $('.slammerConfigList li:last-child input').val('Slammer Five').focus().blur();
            $('.slammerConfigList li:last-child input').val('Slammer Six').focus().blur();
            $('.slammerConfigList li:last-child input').val('Slammer Seven').focus().blur();
            $('.slammerConfigList li:last-child input').val('Slammer Eight').focus().blur();
            $('.slammerConfigList li:last-child input').val('Slammer Nine').focus().blur();
            $('.slammerConfigList li:last-child input').val('Slammer Ten').focus().blur();
            $('div.changeScreen[data-screen="start"]').trigger('click');
        },
    },

    {
        type: 'assertion',
        name: 'Check Name of second Slammer',
        assert: 'equal',
        param1: function() { return app.data.contests[app.selected.contest].slammer[1].name; },
        param2: 'Slammer Two',
    },

];


