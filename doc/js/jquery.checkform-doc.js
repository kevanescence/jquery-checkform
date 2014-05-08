$('body').scrollspy({target: '.navbar-header', offset: 250});
$(function() {
    function scrollToDiv(element, navheight) {
        var offset = element.offset();
        var offsetTop = offset.top;
        var totalScroll = offsetTop - navheight;
        $('body,html').animate({
            scrollTop: totalScroll
        }, 250);
    }
    $("ul.nav.navbar-nav li a").click(function() {
        var el = $(this).attr("href");
        var elWrapped = $(el);

        scrollToDiv(elWrapped, 50);

        return false;
    });
});
$('ul.nav.nav-tabs a').click(function(e) {
    e.preventDefault();
    $(this).tab('show');
});
$('.tab-pane').each(function() {
    var htmlCode = $(this).find('.language-markup');
    var form = htmlCode.parents(".col-md-9").siblings(".col-md-3")
            .find('.example-wrapper');

    htmlCode.text(form.html());
});
$("form#default-conf").checkform();
$("form#example2").checkform({
    CSSClass: "alert alert-danger",
    event: "lostfocus"
});
$('form#example3').checkform({
    autoCheck: false,
    items: {
        placeofbirth: {
            selector: '[name=birth-city]',
            pattern: '[a-zA-Z]+'
        }
    }
});
$('form#example4').checkform({
    ajaxURL: 'ajax.php',
    ajaxEvent: 'lostfocus',
    items: {
        firstname: {
            selector:'[name=ex4-firstname]',
            ajaxCheck: true
        }
    }
});