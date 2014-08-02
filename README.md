===========================================================================================================================
       _                                    _               _     __                             _             _       
      | |                                  | |             | |   / _|                           | |           (_)      
      | | __ _ _   _  ___ _ __ _   _    ___| |__   ___  ___| | _| |_ ___  _ __ _ __ ___    _ __ | |_   _  __ _ _ _ __  
  _   | |/ _` | | | |/ _ \ '__| | | |  / __| '_ \ / _ \/ __| |/ /  _/ _ \| '__| '_ ` _ \  | '_ \| | | | |/ _` | | '_ \ 
 | |__| | (_| | |_| |  __/ |  | |_| | | (__| | | |  __/ (__|   <| || (_) | |  | | | | | | | |_) | | |_| | (_| | | | | |
  \____/ \__, |\__,_|\___|_|   \__, |  \___|_| |_|\___|\___|_|\_\_| \___/|_|  |_| |_| |_| | .__/|_|\__,_|\__, |_|_| |_|
            | |                 __/ |                                                     | |             __/ |        
            |_|                |___/                                                      |_|            |___/        
===========================================================================================================================

Tired of javascript form validation ? 
This Jquery plug-in provides various HTML form validation styles (events, ui styles, ajax...). 
It includes also a set of default patterns for the most common fields to be checked. 

---------------- How to use it ? -------------------------

Jquery checkform plugin is based on conventional naming rules for input's name attribute.
If you respect these rules, you will only have to add the following javascript line

  $("#myForm").checkform()
  
For more complicated cases or to custom the default patterns, have a look at the documentation page

---------------- Description of files -------------------------

css/
  contains the bootstrap css and the demonstration page css
doc/
  documentation and demonstration pages. To run all examples, specially the ajax one, plugin directory must by placed
  at a web server root.
  
  $ ls /var/www/html/jquery-checkform/
    css  doc  images  js  tests

images/
  some basic pictures and icons for the demo page
js/
  javascript file : jquery, bootstrap and the plugin
tests/
  a set of unit tests using qunit and the code coverage (using blanket).
  To run all the tests the archive must be place at a web server root. Otherwise, ajax issues can happen.
