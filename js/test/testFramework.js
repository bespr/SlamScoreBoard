var test = test || {};


(function() {

    var previousData;
    var assertionsOk;
    var assertionsFailed;
    var testStepCounter;
    var testStepIndex;

    function start() {
        assertionsOk = 0;
        assertionsFailed = 0;
        testStepCounter = test.testSteps.length;
        testStepIndex = 0;

        previousData = app.data;
        app.utils.clearAllData();
        app.updateScreen(true);

        console.log('Tests will start in some seconds. Don\'t forget to give focus to the browser rather than to this console (mouseclick on it now!)');
        setTimeout(function() {
            nextTest();
        }, 4000);
    }



    function nextTest() {
        if (testStepIndex >= testStepCounter) {
            summarizeTests();
        } else {

            var step = test.testSteps[testStepIndex];
            var sleep = step.sleep !== undefined ? step.sleep : 20;
            var stop = (step.stop !== undefined && step.stop) ? true : false;

            if (step.type == 'action') {
                console.log(testStepIndex, 'Action', step.name);
                step.action();
            }

            if (step.type == 'assertion') {
                if (step.assert == 'equal') {
                    var p1, p2;
                    if (typeof step.param1 == 'function') {
                        p1 = step.param1();
                    } else {
                        p1 = step.param1;
                    }
                    if (typeof step.param2 == 'function') {
                        p2 = step.param2();
                    } else {
                        p2 = step.param2;
                    }
                    if (p1 == p2) {
                        console.log(testStepIndex, 'Assertion ok', step.name);
                        assertionsOk++;
                    } else {
                        console.warn(testStepIndex, 'Assertion failed', step.name);
                        console.warn(p1, ' not equal to ', p2);
                        assertionsFailed++;
                    }
                }
            }

            if (!stop) {
                testStepIndex++;
                setTimeout(function() {
                    nextTest();
                }, sleep);
            }

        }
    }


    function summarizeTests() {
        var o = '';
        o += '====================' + "\n";
        o += ' TEST SUMMARY' + "\n";
        o += '====================' + "\n";
        o += ' Number of steps: ' + testStepCounter + "\n";
        o += ' Number of assertions: ' + (assertionsOk + assertionsFailed) + "\n";
        o += ' Assertions passed: ' + assertionsOk + ' (' + Math.floor((assertionsOk / (assertionsOk + assertionsFailed)) * 100) + '%)' + "\n";
        o += ' Assertions failed: ' + assertionsFailed + ' (' + Math.floor((assertionsFailed / (assertionsOk + assertionsFailed)) * 100) + '%)' + "\n";

        if (assertionsFailed == 0) {
            console.log(o);
        } else {
            console.warn(o);
        }

        app.utils.clearAllData();

        app.data = previousData;
        app.updateByIdValues();
        app.utils.persistData();
        app.updateScreen(true);
    }



    test.test = function() {
        var c = confirm('Do you want to start the test?')
        if (c) {
            start();
        }
    };

})();



