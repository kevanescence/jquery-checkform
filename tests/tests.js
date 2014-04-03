test("Check qunit", function() {
    ok(true, "Should always pass !")
})
module("Method - init ");
var defaultOptions = jqchf_getDefaultOptions();
var defaultItems = jqchf_getDefaultItems();
/************* Context 1 : no option *************/
test("No option", function() {    
    var context = 1;
    bindContext(context);
    var form = $("form#context" + context);
    form.checkform();
    var input = form.find("input" + defaultItems.name.selector);
    
    propEqual(jQuery.data(form, "jqchf-form-opt"), defaultOptions, 
                                "Defaut values set when no option is provided");
                                
    var data = jQuery.data(input,"jqchf-reg");
    equal(data, defaultItems.name.pattern,"Default pattern is initialized");
    
    data = jQuery.data(input,"jqchf-trim");
    equal(data, defaultItems.name.autoTrim,"Default trim is initialized");
    
    data = jQuery.data(input,"jqchf-reg");
    equal(data,undefined,'input[type="submit"] not initialized');
    removeContext(context);
});
/************* Context 2 : overwritting options *************/
test("Default values are overwritten", function(){    
    bindContext(++context);
    form = $("form#context" + context);    
    var options = jqchf_getDefaultOptions();
    options.event = 'change';  
    options.type = 'flash';
    form.checkform(options);
    
    propEqual(jQuery.data(form, "jqchf-form-opt"),options,
                                "Default values ares overwritten");
    removeContext(context);
});
/********** Context 3 : create a new item and overwritting an other *******/
test("Create a new item and overwritting an other", function(){    
    bindContext(++context);
    form = $("form#context" + context);
    options.items = {
        'newField':{
            selector:'[name="new"]',
            pattern:'.+'           
        },
        'password':{
            pattern:'.{8,20}'
        }
    };
    form.checkform(options);
    input = form.find(options.items.newField.selector);
    
    data = jQuery.data(input,"jqchf-reg");
    equal(data,options.items.newField.pattern,
                            "jqchf-pattern : Initialization for a custom item");
                        
    data = jQuery.data(input,"jqchf-trim");
    equal(data,true,"jqchf-trim : Initialization for a custom item");
    
    input = form.find(defaultItems.password.selector);
    data = jQuery.data(input,"jqchf-reg");
    equal(data,options.items.password.pattern,
                                   "jqchf-reg: Overwritting of a default item");
    removeContext(context);
});

module("Method - destroy ");
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
        case 3:
            html += '<label for="' + context + '-new">new</label>' +
                    '<textarea id="' + context + '-new" name="new"></textarea>' +
                    '<label for="' + context + '-pwd">password</label>' +
                    '<input type="password" id="' + context + '-pwd" name="password"/>';
            //break; no break 3 input introduced
        case 2:
            html += '<label for="' + context + '-email">email</label>' +
                    '<input id="' + context + '-email" name="email" type="text"/>';
            //break; no break 2 input introduced
        case 1:
            html += '<label for="' + context + '-name">name</label>' +
                    '<input id="' + context + '-name" name="name" type="text"/>';
            break;
        default:
            break;
    }    
    html += '<input type="submit" value="valider"/></form>';
    $('body').append(html);
}
function removeContext(ind) {
    $("form#context" + ind).remove();
}