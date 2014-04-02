test("Check qunit", function() {
    ok(true, "Should always pass !")
})
module("Methods call");
var defaultOptions = jqchf_getDefaultOptions();
test("init", function() {
    var context = 1;
    bindContext(context);
    var form = $("form#context" + context);
    form.checkform();
    propEqual(jQuery.data(form, "jqchf-opt"), defaultOptions, 
                                "Defaut values set when no option is provided");
    removeContext(context);
});
test("destroy", function() {
    ok(1 == "1", "Passed!");
});
/*************************************************************/
/******     Tests default regular expressions          *******/
/*************************************************************/
module("Pattern checks");
test("email", function() {
    ok(1 == "1", "Passed!");
});
/*************************************************************/
/******     Tests that user errors are thrown          *******/
/*************************************************************/
module("User errors");
test("Exception thrown", function() {
    throws(function() {
        $("form#test").checkform("dummyMethod");
    }, /method .*does not exist/i, "Exception thrown when method does not exist");
    throws(function() {
        $("p").checkform();
    }, /tag (.*)not allowed/i,
            "Exception thrown when plugin is used on a tag which is not 'FORM'");
    throws(function() {
        $("form#test").checkform({fakeOption: 'fakeValue'});
    }, /option (.*)unknown/i,
            "Exception thrown when option specified does not exist");
    throws(function() {
        $("form#test").checkform({event: 'fakeValue'});
    }, /value (.*)not allowed/i,
            "event : Exception thrown when option exist but value does not exist");
    throws(function() {
        $("form#test").checkform({type: 'fakeValue'});
    }, /value (.*)not allowed/i,
            "type : Exception thrown when option exist but value does not exist");
    throws(function() {
        $("form#test").checkform({autoCheck: 'fakeValue'});
    }, /value (.*)not allowed/i,
            "autoCheck : Exception thrown when option exist but value does not exist");
    throws(function() {
        $("form#test").checkform({afterValidate: 'fakeValue'});
    }, /value (.*)not allowed/i,
            "afterValidate : Exception thrown when a function was expected");
    throws(function() {
        $("form#test").checkform({afterValidate: 'fakeValue'});
    }, /value (.*)not allowed/i,
            "beforeValidate : Exception thrown when a function was expected");
});
$(function() {
//    $("form#test").checkform();
    bindContext(2);
    removeContext(2);
});

function bindContext(ind) {
    var context = "context" + ind;
    var html = '<form method="POST" action="#" id="' + context +
            '" class="test-context">';

    switch (ind) {
        case 2:
            html += '<label for="' + context + '-name">name</label>' +
                    '<input id="' + context + '-name" name="name" type="text"/>';
            //break; no break 2 input introduced
        case 1:
            html += '<label for="' + context + '-email">email</label>' +
                    '<input id="' + context + '-email" name="email" type="text"/>';
            break;
        default:
            break;
    }
    html += '</form>';
    $('body').append(html);
}
function removeContext(ind) {
    $("form#context" + ind).remove();
}