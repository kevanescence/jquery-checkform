/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var page = require('webpage').create();
page.viewportSize = { width: 1920, height: 1080 };
page.open('tests/test.html', function(status) {
  if(status === "success") {
    setTimeout(function() {
        var junitXML = page.evaluate(function() {
            return document.getElementById('tests-result').getAttribute('data-junit');
        });
        console.log(junitXML);
        page.render('tests-screenshot.png');
        phantom.exit();
    }, 2000);
  }
  else {
      console.log('Error on the query on test.html');
  }
});






