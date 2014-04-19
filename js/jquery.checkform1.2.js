/***********************  The MIT License (MIT) ******************************
********************** jQuery checkform plugin v1.2 **************************
*********************Copyright (c) <2014> <Kevin REMY> ***********************
*
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
 */
/*************************************************************/
/******             List of default error messages     *******/
/******             Feel free to add a new one         *******/
/******           and add it to the availableOptions   *******/
/*************************************************************/
var checkform_message =[];
checkform_message['fr'] = 'Les champs suivants sont incorrects : ';
checkform_message['en'] = 'The follow fields are invalid : ' ;
checkform_message['sp'] = 'Los siguientes campos son incorrectas : ' ;
checkform_message['ge'] = 'Die folgenden Felder sind nicht korrekt : ';
/*************************************************************/
/******             List of default options            *******/
/*************************************************************/
function jqchf_getDefaultOptions() {
    return {
        type: 'text',
        event: 'submit',
        autoCheck: true,
        language: 'en',
        CSSClass: 'checkform-wrong',
        target: null, //? really needed
        ajaxCheck: null,
        afterValidate: null,
        beforeValidate: null
    };
}

/*************************************************************/
/******       List of default fields name, pattern     *******/
/*************************************************************/
function jqchf_getDefaultItems(){
    return {
        'mail': {
            'selector': '[name=email]',
            'pattern': "^[a-z0-9][a-z0-9._-]*@([a-z0-9]+[._-]?[a-z0-9]+)+\.[a-z]{2,4}$",
            'autoTrim':true
        },
        'name': {
            'selector': '[name=name]',
            'pattern': "^([a-zA-Zéèëïêàâùçîû][ \'-]?)+[a-zA-Zéèëïêàâùçîû]+$",
            'autoTrim':true
        },
        'firstname': {
            'selector': '[name=firstname]',
            'pattern': "^([a-zA-Zéèëïêàâùçîû][ \'-]?)+[a-za-zA-Zéèëïêàâùçîû]+$",
            'autoTrim':true
        },
        'pseudo': {
            'selector': '[name=pseudo]',
            'pattern': '^[a-zA-Zéèëïêàâùçîû0-9][a-zA-Zéèëïêàâùçîû0-9_ -]{0,13}[a-zA-Zéèëïêàâùçîû0-9]$',
            'autoTrim':true
        },
        'password': {
            'selector': '[name=password]',
            'pattern': '^.{4,25}$',
            'autoTrim':false
        },
        'birthday': {
            'selector': '[name=birthday]',
            'pattern': '^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$',
            'autoTrim':true
        },
        'phonenumber': {
            'selector': '[name=phonenumber]',
            'pattern': '^0[1-9]([-. ]?[0-9]{2}){4}$',
            'autoTrim':true,
        },
        'website': {
            'selector': '[name=website]',
            'pattern': '^[a-zA-Z0-9\-\.]+\.(com|org|net|mil|edu|COM|ORG|NET|MIL|EDU)$',
            'autoTrim':true
        }
    };
}
function jqchf_getTemplateNewItem(){
    return {
        autoTrim:true
    };
}
(function($) {

    var defaultOptions = jqchf_getDefaultOptions();

    /*************************************************************/
    /******             List of available options          *******/
    /*************************************************************/
    var availableOptions = {
        type: ['text', 'html5', 'label', 'flash', 'input'],
        event: ['submit', 'change', 'lostfocus'],
        autoCheck: [true, false],
        language: ['en', 'fr', 'sp', 'ge'],
        CSSClass: null,
        target: null, //? really needed
        ajaxCheck: null,
        afterValidate: null,
        beforeValidate: null
    };

    /*************************************************************/
    /******   List of available checkform plugin methods   *******/
    /*************************************************************/
    var methods = {
        /**
         * Initialization of the form.         
         * @param {Object} options
         * @returns {undefined}         
         * @see destroy
         */
        init: function(options) {
            var eventMap =  []; 
            eventMap["lostfocus"] = "lostfocus";
            eventMap["change"] = "keyup";
            var form = $(this);
            var defItems = jqchf_getDefaultItems();
            var defOpt = jqchf_getDefaultOptions();
            var args = {};
            $.extend(args,defOpt,options);              
            //User did not overwritte item
            if(args.items === undefined) {}
            //Check is based on the default selectors ?
            var items;            
            if(args.autoCheck === true){                    
                $.extend(true,defItems,args.items);                
                items = defItems;
            }                        
            else {
                items = args.items;
            }            
            var filter = 'input[type="text"],input[type="password"],textarea';
            var target = form.find(filter); 
            /*For items, define default options */
            filter = "";
            for(var i in items){//console.log(i);
                filter += items[i].selector + ",";
                //If this is a custom item, define default values
                if(defaultItems[i] === undefined){
                    $.extend(items[i],jqchf_getTemplateNewItem());
                }
                //Initialize data 
                target.filter(items[i].selector)
                      .data('jqchf-reg', items[i].pattern)
                      .data('jqchf-role', i)
                      .data('jqchf-trim', items[i].autoTrim)
                      .addClass('jqchf-flag'); //Allows to retrieve items easily
            }
            filter = filter.substr(0, filter.length - 1);            
            if(eventMap[args.event]){                
                form.find(filter).on(eventMap[args.event], function(e){
                    form.checkform("validate", $(this));                    
                });
            }
            delete args.items;            
            form.data("jqchf-form-opt",args);
            //In all case the form submit event is built
            form.on("submit", function(){
                //beforeValidate()
                $(this).checkform("validate");                
                var res = form.data("jqchf-ok");                
                return res === true /*&& afterValidate() */;
            });
            
        },       
        check:function($item){               
            if($item) {
                var form = $(this);
                var input = $($item);                
                var rule = input.data("jqchf-reg");
                var reg = new RegExp(rule);                                
                if(input.data("jqchf-trim") === true){
                    input.data("jqchf-ok",reg.test(input.val().trim()));
                }
                else {
                    input.data("jqchf-ok",reg.test(input.val()));
                }
                var fields = form.find('.jqchf-flag');
                var wrongItems = fields.filter(function() {                     
                     return $(this).data("jqchf-ok") === false;
                });
                //At least one field is wrong ?
                if(wrongItems.size() === 0){
                    form.data('jqchf-form-ok', true);
                }
                else {
                    form.data('jqchf-form-ok', false);
                }                
            }
            else {
                var form =$(this);
                //Verifies all fields that have to be checked
                var fields = form.find('.jqchf-flag');                
                fields.each(function(){                    
                   form.checkform("check",$(this));
                });
            }
        },
        validate:function(item){          
            console.warn("validate : TO BE Done");
        }, 
        uiAction:function($item){
            var form = $(this);            
            if($item){
                $item = $($item);
                var uiType = form.data("jqchf-form-opt").type;
                var formIsWrong = form.data("jqchf-form-ok") === false;
                var fieldIsWrong = $item.data("jqchf-ok") === false;                
                var cssClass = form.data("jqchf-form-opt").CSSClass;
                var closeLink = "";
                switch(uiType){
                    case 'flash':
                        closeLink = '<a href="#" title="Close flash">X</a>';
                        form.on( "click", "a", function() {                            
                            $(this).parentsUntil('form')
                                   .filter('span.' + cssClass).remove();
                        });
                    //break; NO BREAK, continue on case text
                    case 'text':                        
                        var fieldName = $item.attr("name");
                        var fieldLabel = $item.prev('label');
                        var lblCSSClass = "lbl-err-" + fieldName;
                        var lblSelector = "label." + lblCSSClass;                        
                        var msgBloc = form.find("span." + cssClass);
                        if(fieldIsWrong && msgBloc.size() === 0){
                            form.append('<span class="'+cssClass + '"></span>');
                            //closeLink contain "" on case text, html for flash
                            msgBloc = $("span." + cssClass).prepend(closeLink);                            
                        }
                        if(fieldIsWrong){
                            if(msgBloc.find(lblSelector).size()===0){                                
                                var lblLink = "";
                                if($item.attr("id") !== undefined)
                                    lblLink = 'for="' + $item.attr("id") + '"';
                                msgBloc.append('<label ' + lblLink 
                                                + ' class="' + lblCSSClass + '">'
                                                + fieldLabel.text() 
                                                + ', </label>');                                        
                            }
                        }
                        else {                            
                            msgBloc.children(lblSelector).remove();                            
                            if(!formIsWrong){                                
                                form.find("span." + cssClass).remove();
                            }
                        }                        
                        break;                    
                    case 'label':{  
                        //$item contains now the previous label
                        $item = $item.prev('label');
                        //break; NO BREAK, continue on case input
                    }
                    case 'input': {
                        if(fieldIsWrong)
                           $item.addClass(cssClass);
                        else
                           $item.removeClass(cssClass);
                        break;   
                    }
                    default:
                        //thwon unknown ui type. See documentation
                }
            }
            else {               
                var form =$(this);
                //Verifies all fields that have to be checked
                var fields = form.find('.jqchf-flag');                 
                fields.each(function(){                    
                   form.checkform("uiAction",$(this));
                });
            }
        },
        destroy:function(){
            console.warn("destroy : TO BE Done");
        }
    };
    var defaultItems = jqchf_getDefaultItems();    

    /*************************************************************/
    /*****************    Plug in core  **************************/
    /*************************************************************/
    jQuery.fn.checkform = function(args, item) {
        //All matched element ... 
        this.each(function() {
            //Is it a method call ?
            if (methods[args]) {
                return methods[args].apply(this,item);
                       // Array.prototype.slice.call(arguments, 1));
            } else if (typeof args === 'object' || !args) {                
                // Default call to "init"                   
                return methods.init.apply(this,[args]);
            } else {
                //Unknown method
                $.error('Method ' + args + ' does not exist on jQuery.checkform');
            }
        });
        //Keep linking ...
        return this;
    };
})(jQuery);
