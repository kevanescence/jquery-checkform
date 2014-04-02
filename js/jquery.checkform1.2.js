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
         * Initialization
         * @param {Object} options
         * @returns {undefined}
         */
        init: function(options) {
            console.log(this);
        },
        show: function( ) {
            console.log("show");
        }, // IS
        hide: function( ) {
        }, // GOOD
        update: function(content) {
            console.log("update : ", content);
        }// !!!
    };

    /*************************************************************/
    /******       List of default fields name, pattern     *******/
    /*************************************************************/
    var defaultItems = {
        'mail': {
            'selector': '[name=email]',
            'pattern': "^[a-z0-9._-]+@([a-z0-9]+[._-]?[a-z0-9]+)+\.[a-z]{2,4}$"
        },
        'name': {
            'selector': '[name=name]',
            'pattern': "^([a-zA-Zéèëïêàâùçîû][ \'-]?)+[a-zA-Zéèëïêàâùçîû]+$"
        },
        'firstname': {
            'selector': '[name=firstname]',
            'pattern': "^([a-zA-Zéèëïêàâùçîû][ \'-]?)+[a-za-zA-Zéèëïêàâùçîû]+$"
        },
        'pseudo': {
            'selector': '[name=pseudo]',
            'pattern': '^[a-zA-Zéèëïêàâùçîû0-9][a-zA-Zéèëïêàâùçîû0-9_ -]{0,13}[a-zA-Zéèëïêàâùçîû0-9]$'
        },
        'password': {
            'selector': '[name=password]',
            'pattern': '^.{4,25}$'
        },
        'birthday': {
            'selector': '[name=birthday]',
            'pattern': '^[0-9]{2}/[0-9]{2}/[0-9]{4}$'
        },
        'phonenumber': {
            'selector': '[name=phonenumber]',
            'pattern': '^0[1-8]([-. ]?[0-9]{2}){4}$'
        },
        'website': {
            'selector': '[name=website]',
            'pattern': '^[a-zA-Z0-9\-\.]+\.(com|org|net|mil|edu|COM|ORG|NET|MIL|EDU)$'
        }
    };

    /*************************************************************/
    /*****************    Plug in core  **************************/
    /*************************************************************/
    jQuery.fn.checkform = function(args) {
        //All matched element ... 
        this.each(function() {
            //Is it a method call ?
            if (methods[args]) {
                return methods[args].apply(this,
                        Array.prototype.slice.call(arguments, 1));
            } else if (typeof args === 'object' || !args) {
                // Default call to "init"
                return methods.init.apply(this, arguments);
            } else {
                //Unknown method
                $.error('Method ' + args + ' does not exist on jQuery.checkform');
            }
        });
        //Keep linking ...
        return this;
    };
})(jQuery);
