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
            var form = $(this);
            var defItems = jqchf_getDefaultItems();
            var defOpt = jqchf_getDefaultOptions();
            var args = {};
            $.extend(args,defOpt,options);            
            //User did not overwritte item
            if(args.items === undefined) {args.items = {};}
            //Check is based on the default selectors ?
            var items;
            if(args.autoCheck){
                $.extend(args.items,defItems);                
            }
            items = args.items;  
            console.log(items);
            for(var i in items){
                console.log(i);
                if(defaultItems[i] === undefined){
                    items[i] = $.extend(items[i],jqchf_getTemplateNewItem());
                }
                //args.items[i] = $.extend(args.items[i],defItems[i]);
            }                      
            delete args.items;            
            form.data("jqchf-form-opt",args);
            var filter = 'input[type="text"],input[type="password"],textarea';
            var target = form.find(filter);           
            for(var i in items){                              
                target.filter(items[i].selector)
                    .data('jqchf-reg', items[i].pattern)
                    .data('jqchf-trim', items[i].autoTrim);            
            }

                      
        },       
        check:function(item){
            console.warn("destroy : TO BE Done");
        },
        validate:function(item){
            
        }, 
        uiAction:function(item){
            console.warn("destroy : TO BE Done");
        },
        destroy:function(){
            console.warn("destroy : TO BE Done");
        }
    };
    var defaultItems = jqchf_getDefaultItems();    

    /*************************************************************/
    /*****************    Plug in core  **************************/
    /*************************************************************/
    jQuery.fn.checkform = function(args) {
        //All matched element ... 
        this.each(function() {
            //Is it a method call ?
            if (methods[args]) {
                return methods[args].apply(this,
                        Array.prototype.slice.call(args, 1));
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
