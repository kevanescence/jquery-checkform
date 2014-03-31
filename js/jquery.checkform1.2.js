var checkform_message =[];
checkform_message['fr'] = 'Les champs suivants sont incorrects : ';
checkform_message['en'] = 'The follow fields are invalid : ' ;
checkform_message['sp'] = 'Los siguientes campos son incorrectas : ' ;
checkform_message['ge'] = 'Die folgenden Felder sind nicht korrekt : ';
(function($) {
jQuery.fn.checkform = function(params){
    /*We define some default selectors and patterns*/
    var defaultItems = {
        'mail':{
            'selector':'[name=email]',
            'pattern':"^[a-z0-9._-]+@([a-z0-9]+[._-]?[a-z0-9]+)+\.[a-z]{2,4}$"
        },
        'name':{
            'selector':'[name=name]',
            'pattern':"^([a-zA-Zéèëïêàâùçîû][ \'-]?)+[a-zA-Zéèëïêàâùçîû]+$"
        },
        'firstname':{
            'selector':'[name=firstname]',
            'pattern':"^([a-zA-Zéèëïêàâùçîû][ \'-]?)+[a-za-zA-Zéèëïêàâùçîû]+$"
        },
        'pseudo':{
            'selector':'[name=pseudo]',
            'pattern':'^[a-zA-Zéèëïêàâùçîû0-9][a-zA-Zéèëïêàâùçîû0-9_ -]{0,13}[a-zA-Zéèëïêàâùçîû0-9]$'
        },
        'password':{
            'selector':'[name=password]',
            'pattern':'^.{4,25}$'
        },
        'birthday':{
            'selector':'[name=birthday]',
            'pattern':'^[0-9]{2}/[0-9]{2}/[0-9]{4}$'
        },
        'phonenumber':{
            'selector':'[name=phonenumber]',
            'pattern':'^0[1-8]([-. ]?[0-9]{2}){4}$'
        },
        'website':{
            'selector':'[name=website]',
            'pattern':'^[a-zA-Z0-9\-\.]+\.(com|org|net|mil|edu|COM|ORG|NET|MIL|EDU)$'
        }
    };
    
return this;
};
})(jQuery);
