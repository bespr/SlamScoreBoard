var app = app || {};

(function ($) {
	'use strict';



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



})(jQuery);
