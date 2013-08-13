var app = app || {};
app.screens = app.screens || {};
app.collections = app.collections || {};
app.selectedContest = false;

var ENTER_KEY = 13;





app.SlammerModel = Backbone.Model.extend({
    defaults: {
        name: 'Ivo Engeler',
        grades: [],
        calcGrade: false,
        startPos: false,
        contestId: false
    }
});


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



app.ContestModel = Backbone.Model.extend({
    defaults: {
        name: 'Superslam 1983',
        nextDateTime: '20:45',
        numOfJudges: 7,
        qualificationLine: false,
        minGrade: 1,
        maxGrade: 10,
        gradeSteps: 1
    },
});

app.ContestCollection = Backbone.Collection.extend({
    model: app.ContestModel,
    localStorage: new Backbone.LocalStorage('ssbc'),
});
app.collections.contest = new app.ContestCollection();







app.SlammerItemView = Backbone.View.extend({
    tagName: 'li',

    events: {
        'click .delete': 'removeSlammer',
        'dblclick .modeNormal': 'editSlammer',
        'blur .modeEdit': 'closeEditSlammer',
        'keypress .modeEdit': 'updateOnEnter',
        'keyup .grade': 'changeGrade',
        'click .showBig': 'showSlammerBig'
    },

    initialize: function() {
		this.listenTo(this.model, 'change', this.render);
    },

    render: function() {
        var attributes = this.model.attributes;
        if (app.selectedContest) {
            attributes.numOfJudges = app.selectedContest.get('numOfJudges');
        }
        else {
            attributes.numOfJudges = 2;
        }
        var template = _.template( $("#tmpl-slammer-item").html(), attributes);
        this.$el.html(template);
        this.calculateGrade(false);
        return this;
    },

    removeSlammer: function() {
        this.model.destroy();
        this.remove();
    },

    editSlammer: function() {
        $('.modeNormal', this.el).hide();
        $('.modeEdit', this.el).show().find('input').focus();
    },

    closeEditSlammer: function() {
        var name = $('input[class="slammerName"]', this.el).val();
        if (name == '') {
            alert('insert a name');
        }
        else {
            this.model.set({ name: name });
            this.model.save();
            $('.modeEdit', this.el).hide();
            $('.modeNormal', this.el).show();
        }
    },

	updateOnEnter: function (ev) {
		if (ev.which === ENTER_KEY) {
			this.closeEditSlammer();
		}
	},

	changeGrade: function(ev) {
	    var $input = $(ev.target);
	    var value = parseFloat($input.val());
        if (isNaN(value)) {
            $input.val('');
        }
        else {
    	    $input.val(value);
	    }
        this.calculateGrade(true);
	},

	calculateGrade: function(doSave) {
	    var doSave = (doSave === true);

	    var inputs = $('input.slammerGrade', this.el);
	    var valueList = [];
	    for (var i = 0, len = inputs.length; i < len; i++) {
	        var value = parseFloat($(inputs[i]).val());
	        if (!isNaN(value)) {
                valueList.push(value);
	        }
	    }

	    if (valueList.length == inputs.length) {
	        var total = 0;
	        var minDropGrade = _.min(valueList);
	        var maxDropGrade = _.max(valueList);
	        var minDropGradeAccounted = false;
	        var maxDropGradeAccounted = false;
	        var minDropGradeIndex = false;
	        var maxDropGradeIndex = false;

	        for (var i = 0, len = valueList.length; i < len; i++) {
                if (!minDropGradeAccounted && valueList[i] == minDropGrade) {
                    minDropGradeAccounted = true;
                    minDropGradeIndex = i;
                }
                else if (!maxDropGradeAccounted && valueList[i] == maxDropGrade) {
                    maxDropGradeAccounted = true;
                    maxDropGradeIndex = i;
                }
                else {
                    total += valueList[i];
                }
	        }

	        $('input.slammerGrade[data-judgeIndex="' + minDropGradeIndex + '"]', this.el).addClass('minDropGrade');
	        $('input.slammerGrade[data-judgeIndex="' + maxDropGradeIndex + '"]', this.el).addClass('maxDropGrade');

            if (doSave) {
	            this.model.set({ calcGrade: total, grades: valueList});
	            this.model.save();
            }
	    }
	    else {
	        $('input.slammerGradeTotal', this.el).val('');
	    }
	},


	showSlammerBig: function() {
    	app.screens.slammerBig.model = this.model;
	    app.screens.slammerBig.render();
	}

});



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
