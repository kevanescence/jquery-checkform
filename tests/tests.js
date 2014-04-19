test("Check qunit", function() {
    ok(true, "Should always pass !");
});
/*************************************************************/
/******       Tests of the init method                 *******/
/*************************************************************/
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
    
    propEqual(form.data("jqchf-form-opt"), defaultOptions, 
                                "Defaut values set when no option is provided");
    //TODO : check jqchf-form-sel                             
                                
    var data = input.data("jqchf-reg");
    equal(data, defaultItems.name.pattern,"Default pattern is initialized");
    data = input.data("jqchf-role");
    equal(data, 'name',"Default role is initialized");
    
    data = input.data("jqchf-trim");
    equal(data, defaultItems.name.autoTrim,"Default trim is initialized");
    
    data = form.find('input[type="submit"]').data("jqchf-reg");
    equal(data,undefined,'input[type="submit"] not initialized');
    removeContext(context);
});
/************* Context 2 : overwritting options *************/
test("Default values are overwritten", function(){    
    var context = 2;
    bindContext(context);
    var form = $("form#context" + context);    
    var options = jqchf_getDefaultOptions();
    options.event = 'change';  
    options.type = 'flash';   
    form.checkform(options);    
    propEqual(form.data("jqchf-form-opt"),options,
                                "Default values ares overwritten");    
    removeContext(context);
});
/********** Context 3 : create a new item and overwritting an other *******/
test("Create a new item and overwritting an other", function(){ 
    var context = 3;
    bindContext(context);
    var options = jqchf_getDefaultOptions();
    options.event = 'change';  
    options.type = 'flash';
    var form = $("form#context" + context);
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
    var input = form.find(options.items.newField.selector);
    //TODO check jqchf-form-sel
    var data = input.data("jqchf-reg");       
    equal(data,options.items.newField.pattern,
                            "jqchf-pattern : Initialization for a custom item");
    data = input.data("jqchf-role");        
    equal(data,'newField',
                            "jqchf-role : Initialization for a custom item");
                        
    data = input.data("jqchf-trim");    
    equal(data,true,"jqchf-trim : Initialization for a custom item");
    
    input = form.find(defaultItems.password.selector);
    data = input.data("jqchf-reg");
    equal(data,options.items.password.pattern,
                                   "jqchf-reg: Overwritting of a default item");
    removeContext(context);
});
/********** Context 4 : autoCheck=false ...  *******/
test("Verify non initialization on default items when autoCheck=false", function(){     
    var defaultItems = jqchf_getDefaultItems();
    var context = 3;
    bindContext(context);
    var options = jqchf_getDefaultOptions();
    options.autoCheck = false;    
    var form = $("form#context" + context);
    options.items = {
        'newField':{
            selector:'[name="new"]',
            pattern:'.+'           
        }
    };    
    form.checkform(options);
    var input = form.find(options.items.newField.selector);
    
    var data = input.data("jqchf-reg");    
    equal(data,options.items.newField.pattern,
                            "jqchf-reg : Initialization for a custom item");
                        
    data = input.data("jqchf-trim");
    equal(data,true,"jqchf-trim : Initialization for a custom item");
    
    input = form.find(defaultItems.password.selector);    
    data = input.data("jqchf-reg");    
    notEqual(data,defaultItems.password.pattern,
                                   "jqchf-reg: A default item is not overwritten");
    removeContext(context);
});
/********** Context 5 : Keep linking ...  *******/
test("Verify if linking is kept", function(){ 
    var context = 3;
    var form = bindContext(context);
    form.checkform().addClass("fakeClass");
    ok(form.hasClass("fakeClass"), "Initialization keeps jQuery linking");
    removeContext(context);
});
/*************************************************************/
/******       Tests of the method check                *******/
/*************************************************************/
module("Method - check");
/************* Context 1 : call on the form      *************/
test("No paramater : check all the form",function(){
    var defaultItems = jqchf_getDefaultItems();
    var context = 3;
    bindContext(context);
    var form = $("form#context" + context);
    form.checkform({
        items : {
            comment :{
                  selector:'[name="new"]',
                  pattern:'.+'
            }
        }
    });
    var mail = form.find(defaultItems.mail.selector).eq(0);
    mail.val("firstname.name@domain.com");
    var name = form.find(defaultItems.name.selector).eq(0);
    name.val("O'Callagan");
    var comment = form.find('[name="new"]').eq(0);
    comment.val("");
    var pws = form.find(defaultItems.password.selector).eq(0);
    pws.val("_");
    
    //Part 1 : All fields are expected
    form.checkform("check");    
    equal(name.data("jqchf-ok"),true, 'name value is valid');    
    equal(comment.data("jqchf-ok"),false, 'comment value is wrong');
    equal(pws.data("jqchf-ok"),false, 'pwd value is wrong');
    equal(form.data("jqchf-form-ok"),false, 'Global result is wrong');
    
    //Part 2 : We change the comment and the password values to respect the form rules
    comment.val("a simple comment");
    pws.val("af4K3Pw3");    
    form.checkform("check");
    equal(name.data("jqchf-ok"),true, 
                                    'After changings, its status is ok');
    equal(form.data("jqchf-form-ok"),true, 'After changings, global result is ok');
    removeContext(context);
});
/************* Context 2 : call on a specific item  *************/
test("Parameter : check the given item", function(){
    var defaultItems = jqchf_getDefaultItems();
    var context = 2;
    bindContext(context);
    var form = $("form#context" + context);
    form.checkform({
        items:{
            name:{
                autoTrim:false
            }
        }
    });
    var val = "kevanesc";
    var item = form.find(defaultItems.mail.selector).eq(0);
    item.val(val);
    form.checkform("check",item);
    var data = item.data("jqchf-ok");
    equal(data,false,'Check sets jqchf-ok to false when email(=\'' + val +'\') is wrong');
    data = item.parent().data("jqchf-form-ok");
    equal(data,false,'Check sets jqchf-form-ok to false if at least one '+
                    'field is wrong');
    var val = '  nom.prenom@mail.fr';
    item.val(val);
    form.checkform("check",item);
    data = item.data("jqchf-ok");
    equal(data,true,'Autotrim : Check sets jsqch-ok to true when email(=\'' + val +'\') is ok');
    data = item.parent().data("jqchf-form-ok");
    equal(data, true, 'Check sets jqchf-form-ok to true if all fields are good');
    item = form.find(defaultItems.name.selector).eq(0);
    val = ' dupond ';
    item.val(val);
    form.checkform("check",item);
    data = item.data("jqchf-ok");
    equal(data, false, 'Check sets jqchf-ok considering autoTrim to false ');
    removeContext(context);
    
});

/*************************************************************/
/******       Tests of the  uiAction method            *******/
/*************************************************************/
module("Method - uiAction");
/************* Context 1 : Verify uiAction with style=text  ************/
test("style = text", function(){
    var defaultItems = jqchf_getDefaultItems();
    var defaultOptions = jqchf_getDefaultOptions();
    var context = 2;
    bindContext(context);
    var form = $('form#context' + context);    
    form.checkform();
    
    form.find(defaultItems.name.selector).val("wr0ng");
    
    form.checkform("check");    
    form.checkform("uiAction");
    
    var nbElem = form.find("." + defaultOptions.CSSClass).size();    
    equal(nbElem, 1, 'Adding an html element in the form when item is wrong');
    
    var text = form.find("." + defaultOptions.CSSClass).text();    
    notEqual(text.indexOf("name"), -1,'The error message contains the field\'s label');
    
    form.find(defaultItems.name.selector).val("goodname");
    form.find(defaultItems.mail.selector).val("goodmail@domain.com");
    form.checkform("check");
    form.checkform("uiAction");
    nbElem = form.find("." + defaultOptions.CSSClass).size(); 
    equal(nbElem, 0, 'Removing the html element when the form is ok');
    
    removeContext(context);
});
/************* Context 2 : Verify uiAction with style=label  ************/
test("style = label", function(){
    var defaultItems = jqchf_getDefaultItems();
    var defaultOptions = jqchf_getDefaultOptions();
    var context = 1;
    var form = bindContext(context);
    form.checkform({type:'label'});
    var name = form.find(defaultItems.name.selector).eq(0).val("b4d Value");   
    form.checkform("check",name);
    form.checkform("uiAction",name);
    ok(name.prev('label').hasClass(defaultOptions.CSSClass),
                        'Previous label has the css class when the field is wrong');
    name.val("Aragorn"); 
    form.checkform("check");
    form.checkform("uiAction",name);
    ok(!name.prev('label').hasClass(defaultOptions.CSSClass),
                         'Previous label class is removed when the field is ok');
    removeContext(context);
});
/************* Context 3 : Verify uiAction with style=input  ************/
test("style = input", function(){
    var defaultItems = jqchf_getDefaultItems();
    var defaultOptions = jqchf_getDefaultOptions();
    var context = 1;
    var form = bindContext(context);
    form.checkform({type:'input'});
    var name = form.find(defaultItems.name.selector).eq(0).val("b4d Value");    
    form.checkform("check",name);
    form.checkform("uiAction",name);
    ok(name.hasClass(defaultOptions.CSSClass),
                        'The field has the css class when the field is wrong');
    name.val("Aragorn"); 
    form.checkform("check");
    form.checkform("uiAction",name);
    ok(!name.hasClass(defaultOptions.CSSClass),
                         'The field class is removed when the field is ok');
    removeContext(context);
});
/************* Context 4 : Verify uiAction with style=flash  ************/
test("style = flash", function(){
    var defaultItems = jqchf_getDefaultItems();
    var defaultOptions = jqchf_getDefaultOptions();
    var context = 2;
    var form = bindContext(context);    
    form.checkform({type:'flash'});
    form.find(defaultItems.name.selector).val("wr0ng");
    form.checkform("check").checkform("uiAction");    
    
    var nbElem = form.find("." + defaultOptions.CSSClass).size();
    equal(nbElem, 1, 'Adding an html element in the form when item is wrong');
    var link = form.find("." + defaultOptions.CSSClass).find('a');    
    notEqual(link.size(),0, 'Flash element contain a link to remove it');

    var text = form.find("." + defaultOptions.CSSClass).text();
    notEqual(text.indexOf("name"), -1,'The error message contains the field\'s label');
    
    link.click();    
    nbElem = form.find("." + defaultOptions.CSSClass).size();
    equal(nbElem, 0, 'A click on the link removes the flash');
    
    form.checkform("check").checkform("uiAction");
    form.find(defaultItems.name.selector).val("goodname");
    form.find(defaultItems.mail.selector).val("goodmail@domain.com");
    form.checkform("check");
    form.checkform("uiAction");
    nbElem = form.find("." + defaultOptions.CSSClass).size();
    equal(nbElem, 0, 'Removing the html element when the form is ok');
    
    removeContext(context);
});
/************* Context 5 : HTML how to verify it ? ************/

/*************************************************************/
/******       Tests of the method validate             *******/
/*************************************************************/
module("Method - validate");
/************* Context 1 : called on the form   ************/
test("No argument - Method is called on the form", function(){
    var defaultItems = jqchf_getDefaultItems();
    var defaultOptions = jqchf_getDefaultOptions();
    var context = 2;
    var before = 0; var after = 0;
    var form = bindContext(context);
    form.checkform({
        event:'submit',
        style:'text',
        beforeValidate:function(){before++;},
        afterValidate:function(){after++;}
    });
    //Validate with wrong values
    form.checkform("validate");
    var mail = form.find(defaultItems.mail.selector);
    var name = form.find(defaultItems.name.selector);
    mail.val("@bad!email@dress");
    equal(before, 1, 'beforeValidate is executed');
    equal(after,0, 'afterValidate is not executed if form is wrong');    
    var messageBloc = form.find("." + defaultOptions.CSSClass);
    equal(messageBloc.size(), 1, "A message is displayed when form is wrong");
    
    //Validate with good value
    mail.val("a.good@email.com");
    name.val("myname");
    form.checkform("validate");
    equal(before, 2, 'beforeValidate is still executed');
    equal(after,1,'afterValidate is executed');    
    messageBloc = form.find("." + defaultOptions.CSSClass);
    equal(messageBloc.size(), 0, "The message bloc is removed when form is ok");
    removeContext(context);
});
/************* Context 2 : called on a given item   ************/
test("Argument - Method is called on a specific item",function(){
    var defaultOptions = jqchf_getDefaultOptions();
    var defaultItems = jqchf_getDefaultItems();
    var context = 2;
    var form = bindContext(context);
    var beforeValidate = 0; var afterValidate = 0;
    var name = form.find(defaultItems.name.selector);
    form.checkform({
        type:'input',
        event:'lostfocus',
        beforeValidate:function($item){
            beforeValidate++;
            $item.addClass('fakeClass');            
        },
        afterValidate:function($item){
            afterValidate++;
            $item.addClass('fakeClass2');            
        }
    });
    name.val("b4dNAm3");    
    var mail = form.find(defaultItems.mail.selector);
    mail.val("mail@@mail.com");
    form.checkform("validate",name);
    ok(name.hasClass(defaultOptions.CSSClass), 
                                 'A wrong field has the css class');
    ok(!mail.hasClass(defaultOptions.CSSClass), 
                                 'An other wrong field has not the css class');
    equal(beforeValidate, 1, 'beforeValidate is always executed');
    ok(name.hasClass('fakeClass'),
            'beforeValidate : the item to be validated is given in argument ');
    equal(afterValidate, 0, 'afterValidate is not executed if field is wrong');
    name.val("validename");
    form.checkform("validate",name);
    ok(!name.hasClass(defaultItems.name.CSSClass),
                                       'CSS class is removed when field is OK');    
    equal(beforeValidate, 2, 'beforeValidate is still executed');                               
    equal(afterValidate, 1, 'afterValidate is executed if the field is ok');
    ok(name.hasClass('fakeClass2'),
            'afterValidate : the item to be validated is given in argument ');
    removeContext(context);
});
/*************************************************************/
/******       Tests of the method destroy              *******/
/*************************************************************/
module("Method - destroy ");
test("destroy", function() {
    var context = 2;
    var form = bindContext(context);
    var defOptions = jqchf_getDefaultOptions();
    var defItems = jqchf_getDefaultItems();
    form.checkform({type:"input",event:"lostfocus"});
    var size = form.find('.jqchf-flag').size();    
    notEqual(size,0, 'Initialization done');
    
    form.checkform("destroy");
    var size = form.find('.jqchf-flag').size();
    equal(size,0, 'Destruction done');
    
    var name = form.find(defItems.name.selector);
    name.val("B4dNam3");
    name.focusout();//Simulate a lost focus event
    ok(!name.hasClass(defOptions.CSSClass),'Events built on the fields are removed');
    removeContext(context);
});
/*************************************************************/
/******     Tests default regular expressions          *******/
/*************************************************************/
module("Pattern checks");
/**
 * 
 * @param {Array} values a list of values to test
 * @param {type} pattern the regex pattern to match
 * @param {type} validity true if values have to match the pattern
 *                        false otherwise
 * @returns {undefined}
 */
function testRegex(values, pattern, validity){
    var reg = new RegExp(pattern);
    for(var v in values){       
        if(validity){
            ok(reg.test(values[v]), '\'' + values[v] + '\' is a valid value');
        }
        else {
            ok(!reg.test(values[v]), '\'' + values[v] + '\' is not a valid value');
        }
    }
}
test("email", function() {
    var pattern = jqchf_getDefaultItems().mail.pattern;
    testRegex(['kevin', 'mail@', '-mail@mail.fr', 
               'mail@mail@.fr', 'mail@mail.', 'mail@mail',
               'mail.fisrtname@dom.verylongend', ''], pattern, false);
    testRegex(['firstname.name@mail.com','mail@dom-subdom.com'], pattern, true);
});
test("name", function() {
    var pattern = jqchf_getDefaultItems().name.pattern;
    testRegex(['kevin65', 'a', '_firstname', 
               'jean--philippe', 'jean-', ''], pattern, false);
    testRegex(['jean-philippe','O\'Callagan','Le',
               'Kevin','Mc Callen'], pattern, true);
});
test("firstname", function() {
    var pattern = jqchf_getDefaultItems().firstname.pattern;
    testRegex(['kevin65', 'a', '_firstname', 
               'jean--philippe', 'jean-', ''], pattern, false);
    testRegex(['jean-philippe','Le', 'Kevin'], pattern, true);
});
test("pseudo", function() {
    var pattern = jqchf_getDefaultItems().pseudo.pattern;
    testRegex(['_kevin65', 'a', ''], pattern, false);
    testRegex(['kevin65','Le','two parts', 'K_evin'], pattern, true);
});
test("password", function() {
    var pattern = jqchf_getDefaultItems().password.pattern;
    testRegex(['ab', ''], pattern, false);
    testRegex(['kevin65','The_42-number','two parts','letters'], pattern, true);
});
test("birthday", function() {
    var pattern = jqchf_getDefaultItems().birthday.pattern;
    testRegex(['21/08/199', '21/08//1992', '21/08','//2108'], pattern, false);
    testRegex(['21/08/1992','01/12/2014'], pattern, true);
});
test("phonenumber", function() {
    var pattern = jqchf_getDefaultItems().phonenumber.pattern;
    testRegex(['letters', '01', '0134560909091355'], pattern, false);
    testRegex(['0142424242','01 42 42 42 42', '01-42-42-42-42',
              ['06.42.42.42.42']], pattern, true);
});
test("website", function() {
    var pattern = jqchf_getDefaultItems().website.pattern;
    testRegex(['www.my', 'www.myweb.atoolongdomain', 'www.unk/site.com'], pattern, false);
    testRegex(['www.mywebsite.com','www.my-website.org'], pattern, true);
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
        $("form#test").checkform({event: 'fakeValue'});
    }, /value (.*)not allowed for event/i,
            "event : Exception thrown when option exist but value does not exist");
    throws(function() {
        $("form#test").checkform({type: 'fakeValue'});
    }, /value (.*)not allowed for type/i,
            "type : Exception thrown when option exist but value does not exist");
    throws(function() {
        $("form#test").checkform({autoCheck: 'fakeValue'});
    }, /value (.*)not allowed for autoCheck/i,
            "autoCheck : Exception thrown when option exist but value does not exist");
    throws(function() {
        $("form#test").checkform({afterValidate: 'fakeValue'});
    }, /value (.*)not allowed for afterValidate/i,
            "afterValidate : Exception thrown when a function was expected");
    throws(function() {
        $("form#test").checkform({beforeValidate: 'fakeValue'});
    }, /value (.*)not allowed for beforeValidate/i,
            "beforeValidate : Exception thrown when a function was expected");
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
    return $('form#'+ context);
}
function removeContext(ind) {
    $("form#context" + ind).remove();
}