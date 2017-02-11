/* Everything global jquery events. */

var app = app || {};
var ENTER_KEY = 13;




(function () {
    'use strict';

    /**
     * Handle "Hidden" Buttons
     */
    app.showButtons = false;
    app.showButtonsTimeoutId = false;
    $(document).on('mousemove', function() {
        if (app.showButtons === false) {
            app.showButtons = true;
            $('.bh').addClass('visible');
        }
        window.clearTimeout(app.showButtonsTimeoutId);
        app.showButtonsTimeoutId = window.setTimeout(app.hideButtons, 1000);
    });
    app.hideButtons = function() {
        app.showButtons = false;
        $('.bh').removeClass('visible');
    };


    /**
     * Change Language
     */
    $(document).on('click', '.changeLanguage', function() {
        var index = app.availableLanguages.indexOf(app.data.designConf.language);
        if (index === -1) {
            index = 1;
        } else {
            index = parseInt(index, 10);
            index++;
            if (index >= app.availableLanguages.length) {
                index = 0;
            }
        }
        app.data.designConf.language = app.availableLanguages[index];
        app.utils.persistData();
        app.updateScreen(true);
    });

    /*
     * Change Screen
     */
    $(document).on('click', '.changeScreen', function() {
        if (!app.isDragging) {
            app.currentScreen = { name: $(this).attr('data-screen'), id: $(this).attr('data-screen-id') };
            app.updateScreen();
        }
    });

    /*
     * Save To File
     */
    $(document).on('click', '.saveToFile', function() {
        var blob = new Blob([JSON.stringify(app.data, null, 4)], {type: "text/plain;charset=utf-8"});
        var fileName = "slam-score-board-";
        fileName += app.utils.getTechTime(new Date()) + '.ssb';
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
     * On Key Up: contestConf / Configuration Inputs
     */
    $(document).on('keyup', '.contestConf', function(ev) {
        app.manip.changeContestConf($(this).attr('name'), $(this).val());
    });


    /*
     * On Blur: Rounds Config
     */
    $(document).on('blur', '.rndConfigList li input', function() {
        var newRndArray = [];
        var hasEmptySlot = false;
        $(this).parents('.rndConfigList').find('li').each(function() {
            var id = parseInt($(this).attr('data-rnd-id'), 10);
            var name = $.trim($(this).find('input').val());
            $(this).find('input').val(name);
            if (name !== '') {
                if (app.rndById[id] === undefined) {
                    app.rndById[id] = { 'id': id, 'name': name };
                }
                if (app.rndById[id].groups === undefined) {
                    app.rndById[id].groups = [];
                }
                var groups = app.rndById[id].groups;
                newRndArray.push({ 'id': id, 'name': name, 'groups': groups });
            } else {
                hasEmptySlot = true;
            }
        });
        if (!hasEmptySlot) {
            var nextRndId = parseInt($('.rndConfigList').attr('data-next-rnd-id'), 10) + 1;
            $('.rndConfigList').attr('data-next-rnd-id', nextRndId);
            $('.rndConfigList').append(app.screens.parts.rndInput(nextRndId, '', l('add_new_round')));
        }


        app.data.contests[app.selected.contest].rounds = newRndArray;
        app.updateByIdValues();
        app.utils.persistData();
    });


    /*
     * Delete Round
     */
    $(document).on('click', '.deleteRound', function() {
        var rndId = $(this).parent().attr('data-rnd-id');
        var confirm = window.confirm(l('confirm_delete_round', [app.rndById[rndId].name]));
        if (confirm) {
            app.manip.removeRound(rndId);
        }
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
        var o = '<input type="file" id="files" name="files" accept=".ssb" style="position: absolute; bottom: 0; right: 0; opacity: 0.01" />';
        $(this).after(o);
        $('#files').on('change', function(ev) {
            var files = ev.target.files; // FileList object

            var reader = new FileReader();
            reader.onload = function(theFile) {
                app.data = JSON.parse(theFile.target.result);
                app.utils.dataExtendDefaults();
                app.utils.persistData();
                app.updateScreen(true);
                app.utils.adaptDesign(true);
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
            app.utils.adaptDesign(true);
        }
    });


    /*
     * On Blur: Slammer Config
     */
    $(document).on('blur', '.slammerConfigList li input', function() {
        var newSlammerArray = [];
        var hasEmptySlot = false;
        $(this).parents('.slammerConfigList').find('li').each(function() {
            var id = $(this).attr('data-slammer-id');
            var name = $.trim($(this).find('input').val());
            $(this).find('input').val(name);
            if (name !== '') {
                newSlammerArray.push({ 'id': id, 'name': name });
                $(this).find('.deleteSlammer.invisible').removeClass('invisible');
            } else {
                hasEmptySlot = true;
            }
        });
        if (!hasEmptySlot) {
            var nextSlammerId = parseInt($('.slammerConfigList').attr('data-next-slammer-id'), 10) + 1;
            $('.slammerConfigList').attr('data-next-slammer-id', nextSlammerId);
            $('.slammerConfigList').append(app.screens.parts.slammerInput(nextSlammerId, '', l('add_new_slammer')));
            $('.slammerConfigList li:last-child input').focus();
        }

        app.data.contests[app.selected.contest].slammer = newSlammerArray;
        app.updateByIdValues();
        app.utils.persistData();
    });


    /*
     * Delete Slammer
     */
    $(document).on('click', '.deleteSlammer', function() {
        var slId = $(this).parent().attr('data-slammer-id');
        app.manip.removeSlammer(slId);
    });

    /*
     * On Blur: Grades input
     */
    $(document).on('blur', '.grades input:not(.total)', function() {
        var row = $(this).parent();
        var slammerIndex = parseInt(row.attr('data-slammerIndex'), 10);

        var allFilled = true;
        var sum = 0;
        var allValidGrades = [];
        var v;
        var numOfDecimalDigits = parseInt(app.data.contests[app.selected.contest].config.numOfDecimalDigits, 10);
        var numOfMaxDropGrades = parseInt(app.data.contests[app.selected.contest].config.numOfMaxDropGrades, 10);
        var numOfMinDropGrades = parseInt(app.data.contests[app.selected.contest].config.numOfMinDropGrades, 10);

        row.find('input:not(.total)').each(function(index) {
            if (numOfDecimalDigits === 0) {
                v = parseInt($(this).val(), 10);
            } else {
                v = parseFloat($(this).val());
                Math.pow(10, numOfDecimalDigits);
                v = Math.round(v * Math.pow(10, numOfDecimalDigits)) / Math.pow(10, numOfDecimalDigits);
            }
            $(this).removeClass('minDropGrade maxDropGrade');

            if (isNaN(v)) {
                $(this).val('');
                allFilled = false;
            } else {
                $(this).val(v);
                allValidGrades.push(v);
            }
        });


        if (allFilled) {


            var dropGradeIndizes = { 'max': [], 'min': [] };
            var dropGradeValues = { 'max': [], 'min': [] };

            var maxDropGrades = app.utils.getDropNoteInfosFromArray('max', numOfMaxDropGrades, allValidGrades, []);
            for (var i = 0, len = maxDropGrades.length; i < len; i++) {
                dropGradeIndizes.max.push(maxDropGrades[i].index);
            }

            var minDropGrades = app.utils.getDropNoteInfosFromArray('min', numOfMinDropGrades, allValidGrades, dropGradeIndizes.max);
            for (var i = 0, len = minDropGrades.length; i < len; i++) {
                dropGradeIndizes.min.push(minDropGrades[i].index);
            }

            for (var i = 0, len = allValidGrades.length; i < len; i++) {
                if (dropGradeIndizes.max.indexOf(i) === -1 && dropGradeIndizes.min.indexOf(i) === -1) {
                    sum += allValidGrades[i];
                }
            }
            sum = Math.round(sum * Math.pow(10, numOfDecimalDigits)) / Math.pow(10, numOfDecimalDigits);
            row.find('input.total').val(sum);

            for (var i = 0, len = dropGradeIndizes.min.length; i < len; i++) {
                row.find('input:nth-child(' + (dropGradeIndizes.min[i] + 1) + ')').addClass('minDropGrade');
            }
            for (var i = 0, len = dropGradeIndizes.max.length; i < len; i++) {
                row.find('input:nth-child(' + (dropGradeIndizes.max[i] + 1) + ')').addClass('maxDropGrade');
            }

            app.manip.saveGrades(slammerIndex, allValidGrades, sum, { 'min': dropGradeValues.min, 'max': dropGradeValues.max });
        } else {
            row.find('input.total').val('');
        }
    });

    /**
     * Click on Sort Slammer
     */
    $(document).on('click', '.sortSlammer', function() {
        app.manip.sortSlammer();
    });

    /**
     * Group: Click on Slammer Name
     */
    $(document).on('click', '.groupList li .name', function(ev) {
        var slammerId = $(this).attr('data-slammer-id');
        // Mark slammer with StyleA or StyleB
        if (ev.ctrlKey || ev.metaKey) {
            // StyleB
            if (ev.shiftKey) {
                app.manip.toggleSlammerMark(slammerId, 'b');
            }
            // StyleA
            else {
                app.manip.toggleSlammerMark(slammerId, 'a');
            }
        } else {
            // Switch to screen #slammer
            app.currentScreen = { name: 'slammer', id: slammerId };
            app.updateScreen();
        }
    });

    /**
     * Contest: Click on Slammer Name
     */
    $(document).on('click', '.contestContainer .group li', function(ev) {

        if (app.isDragging) {
            ev.stopPropagation();
        } else {

            var slammerId = $(this).attr('data-slammer-id');
            var groupId = $(this).parents('.group').attr('data-screen-id');

            // Mark slammer with StyleA or StyleB
            if (ev.ctrlKey || ev.metaKey) {
                // StyleB
                if (ev.shiftKey) {
                    app.manip.toggleSlammerMark(slammerId, 'b', groupId);
                }
                // StyleA
                else {
                    app.manip.toggleSlammerMark(slammerId, 'a', groupId);
                }
                ev.stopPropagation();
            } else {
                var xpos = (ev.offsetX === undefined ? ev.originalEvent.layerX : ev.offsetX);
                if (xpos < 50) {
                    ev.stopPropagation();
                    app.selected.group = groupId;
                    app.currentScreen = { name: 'slammer', id: slammerId };
                    app.updateScreen();
                }
            }
        }
    });

    $(document).on('click', '.addGroup', function() {
        app.manip.addGroup($(this).attr('data-rnd'));
    });

    $(document).on('click', '.removeGroup', function(ev) {
        app.manip.removeGroup($(this).attr('data-group'));
        ev.stopPropagation();
    });


    $(document).on('click', '.showSlammerDropdown', function() {
        $('.placeForSlammerDropdown').html(app.screens.parts.slammerDropdown());
        $('.unassignSlammerButton').show();
    });

    $(document).on('change', '.slammerDropdown', function() {
        var slId = parseInt($(this).val(), 10);
        if (slId > 0) {
            app.manip.assignSlammer(slId);
        } else {
            $('.slammerDropdown').hide();
            $('.unassignSlammerButton').hide();
        }
    });

    $(document).on('click', '.unassignSlammerButton', function(ev) {
        ev.stopPropagation();
        var slId = parseInt($(this).attr('data-slammer'), 10);
        app.manip.unassignSlammer(slId);

    });


    /* ColorChooser: Font */
    $(document).on('change', '.fontColorChooser', function() {
        app.data.designConf.fontColor = $(this).val();
        app.utils.persistData();
        app.utils.adaptDesign(true);
    });

    /* ColorChooser: Background */
    $(document).on('change', '.backgroundColorChooser', function() {
        app.data.designConf.backgroundColor = $(this).val();
        app.utils.persistData();
        app.utils.adaptDesign(true);
    });

    /* ColorChooser: Mark A */
    $(document).on('change', '.markAColorChooser', function() {
        app.data.designConf.markAColor = $(this).val();
        app.utils.persistData();
        app.utils.adaptDesign(true);
    });

    /* ColorChooser: Mark B */
    $(document).on('change', '.markBColorChooser', function() {
        app.data.designConf.markBColor = $(this).val();
        app.utils.persistData();
        app.utils.adaptDesign(true);
    });

    /* FontFamily */
    $(document).on('change', '.fontFamily', function() {
        app.data.designConf.fontFamily = $(this).val();
        app.utils.persistData();
        app.utils.adaptDesign(true);
    });

    /* Background-Image */
    $(document).on('blur', '.backgroundImage', function() {
        app.data.designConf.backgroundImage = $(this).val();
        app.utils.persistData();
        app.utils.adaptDesign();
    });

    /* Margins */
    $(document).on('blur', '.margin', function() {
        var attr = $(this).attr('data-margin-name');
        var keyName = 'margin' + attr.substr(0, 1).toUpperCase() + attr.substr(1);
        var val = $.trim($(this).val());
        var entity = '%';
        if (val.substr(val.length - 2) === 'px') {
            entity = 'px';
        }
        val = parseInt(val, 10);

        if (val < 0) {
            val = 0;
        }
        if (entity === '%' && val > 50) {
            val = 50;
        }
        if (isNaN(val)) {
            val = 0;
        }

        if ((val + entity) !== app.data.designConf[keyName]) {
            app.data.designConf[keyName] = val + entity;
            $('#appplace').addClass('visible');
            setTimeout(function() {
                $('#appplace').removeClass('visible');
            }, 10);
        }
        $(this).val(val + entity);



        app.utils.persistData();
        app.utils.adaptDesign();
    });


    /* Sponsors */
    $(document).on('blur', '.sponsors', function() {
        app.data.designConf.sponsors = $(this).val();
        app.utils.persistData();
        app.utils.adaptDesign();
    });

    /* Window Resize */
    $(window).on('resize', function() {
        app.updateResolutionHint();
    });
    app.updateResolutionHint = function() {
        var hintEl = $('#resolutionHint');
        if (hintEl.length > 0) {
            var w = $(window).width();
            var h = $(window).height();
            if (w < 1900 || h < 1060) {
                hintEl.html(l('screen_size') + ' ' + w + ' ✕ ' + h + '. ' + l('recommended') + ' 1920 ✕ 1080 (HD)');
            } else {
                hintEl.html('');
            }
        }
    };
   

    /* General Keys */
    $(document).on('keyup', function(ev) {
        switch (ev.which) {
            case 27: // Esc
                history.back();
                break;
        }
    });


}());