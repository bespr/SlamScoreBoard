/* Everything global jquery events. */

var app = app || {};
var ENTER_KEY = 13;


(function () {
	'use strict';


    /*
     * Change Screen
     */
    $(document).on('click', '.changeScreen', function() {
        app.currentScreen = { name: $(this).attr('data-screen'), id: $(this).attr('data-screen-id') };
        app.updateScreen();
    });

    /*
     * Save To File
     */
    $(document).on('click', '.saveToFile', function() {
        var blob = new Blob([JSON.stringify(app.data, null, 4)], {type: "text/plain;charset=utf-8"});
        var fileName = "slam-score-board-";
        fileName += app.utils.getTechTime(new Date());
        saveAs(blob, fileName);
    });

    /*
     * Insert Contest
     */
    $(document).on('keyup', '.insertContest', function(ev) {
        if (ev.which === ENTER_KEY) {
            app.manip.addContest($(this).val());
        }
    });

    /*
     * Insert Contest Submit
     */
    $(document).on('click', '.insertContestSubmit', function() {
        app.manip.addContest($('.insertContest').val());
    });


    /*
     * On Key Up: contestConf
     */
    $(document).on('keyup', '.contestConf', function(ev) {
        app.manip.changeContestConf($(this).attr('name'), $(this).val());
    });


    /*
     * Delete Contest
     */
    $(document).on('click', '.deleteContest', function() {
        var index = $(this).attr('data-contest-id');
        var confirm = window.confirm('Are you sure to delete «' + app.data.contests[index].name + '»?');
        if (confirm) {
            app.manip.removeContest(index);
        }
    });

    /*
     * Read from File
     */
    $(document).on('click', '.readFromFile', function() {
        var o = '<input type="file" id="files" name="files" style="opacity: 0.01" />';
        $(this).after(o);
        $('#files').on('change', function(ev) {
            var files = ev.target.files; // FileList object

            var reader = new FileReader();
            reader.onload = function(theFile) {
                app.data = JSON.parse(theFile.target.result);
                app.utils.persistData();
                app.updateScreen(true);
            };

            reader.readAsText(files[0]);

            $('#files').remove();
        }).trigger('click');
    });


    /*
     * Clear all data
     */
    $(document).on('click', '.clearAllData', function() {
        var confirm = window.confirm('Are you sure to delete all data?');
        if (confirm) {
            app.utils.clearAllData();
            app.updateScreen(true);
        }
    });


    /*
     * On Key Up: Slammer Config
     */
    $(document).on('keyup', '.slammerConfigList li input', function() {
        var newSlammerArray = [];
        var hasEmptySlot = false;
        $(this).parents('.slammerConfigList').find('li').each(function() {
            var id = $(this).attr('data-slammer-id');
            var name = $.trim($(this).find('input').val());
            $(this).find('input').val(name);
            if (name !== '') {
                newSlammerArray.push({ 'id': id, 'name': name });
            } else {
                hasEmptySlot = true;
            }
        });
        if (!hasEmptySlot) {
            var nextSlammerId = parseInt($('.slammerConfigList').attr('data-next-slammer-id'), 10) + 1;
            $('.slammerConfigList').attr('data-next-slammer-id', nextSlammerId);
            $('.slammerConfigList').append('<li data-slammer-id="' + nextSlammerId + '"><input type="text" placeholder="Neuen Slammer hinzufügen" /></li>');
        }

        app.data.contests[app.selected.contest].slammer = newSlammerArray;
        app.updateSlammerById();
        app.utils.persistData();
    });

    /*
     * On Key Up: Grades input
     */
    $(document).on('keyup', '.grades input', function() {
        var row = $(this).parent();
        // Calculate
        var allFilled = true;
        var minGrade = 999999999;
        var minGradeIndex = false;
        var maxGrade = -9999999;
        var maxGradeIndex = false;
        var sum = 0;
        var allValidGrades = [];
        var v;

        row.find('input:not(.total)').each(function(index) {
            v = parseInt($(this).val(), 10);
            $(this).removeClass('minDropGrade maxDropGrade');
            if (isNaN(v)) {
                $(this).val('');
                allFilled = false;
            } else {
                $(this).val(v);
                allValidGrades.push(v);
                if (v < minGrade) {
                    minGrade = v;
                    minGradeIndex = index;
                } else if (v > maxGrade) {
                    maxGrade = v;
                    maxGradeIndex = index;
                }
            }
        });



        if (allFilled) {
            for (var i = 0, len = allValidGrades.length; i < len; i++) {
                if (i != maxGradeIndex && i != minGradeIndex) {
                    sum += allValidGrades[i];
                }
            }
            row.find('input.total').val(sum);
            row.find('input:nth-child(' + (minGradeIndex + 1) + ')').addClass('minDropGrade');
            row.find('input:nth-child(' + (maxGradeIndex + 1) + ')').addClass('maxDropGrade');
        } else {
            row.find('input.total').val('');
        }


    });



}());