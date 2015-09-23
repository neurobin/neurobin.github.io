(function() {

// Localize jQuery variable
var jQuery;

/******** Load jQuery if not present *********/
if (window.jQuery === undefined || window.jQuery.fn.jquery !== '1.4.2') {
    var script_tag = document.createElement('script');
    script_tag.setAttribute("type","text/javascript");
    script_tag.setAttribute("src",
        "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
    if (script_tag.readyState) {
      script_tag.onreadystatechange = function () { // For old versions of IE
          if (this.readyState == 'complete' || this.readyState == 'loaded') {
              scriptLoadHandler();
          }
      };
    } else { // Other browsers
      script_tag.onload = scriptLoadHandler;
    }
    // Try to find the head, otherwise default to the documentElement
    (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);
} else {
    // The jQuery version on the window is the one we want to use
    jQuery = window.jQuery;
    main();
}

/******** Called once jQuery has loaded ******/
function scriptLoadHandler() {
    // Restore $ and window.jQuery to their previous values and store the
    // new jQuery in our local jQuery variable
    jQuery = window.jQuery.noConflict(true);
    // Call our main function
    main(); 
}

/******** Our main function ********/
function main() { 
    jQuery(document).ready(function($) {
        // We can use jQuery 1.4.2 here
    var css_link = $("<link>", { 
    rel: "stylesheet", 
    type: "text/css", 
    href: "http://neurobin.github.io/Demo/widget1/calc.css" 
});
css_link.appendTo('head');

var div_html='<div>'+
'<h3>Calculator</h3>'+
'$<input type="text" placeholder="Enter amount">'+
'<button>Calculate</button><br>'+
'$<input type="text" readonly="readonly" placeholder="Halved amount">'+
'</div>';

$("#neurobin-com-widget-calc").html(div_html);

document.getElementById('neurobin-com-widget-calc').getElementsByTagName('button')[0].onclick=function () {
	var div_id="neurobin-com-widget-calc";
	var obj=document.getElementById(div_id).getElementsByTagName('input');
var val=obj[0].value;
if (!!isNaN(val)) {
alert('Must be a number');
console.log("dfsa");
return;
}
else if (val==null||val=="") {alert('Can not be empty');}
else {
obj[1].value=val/2;
}


}



        
    });
}



})(); // We call our anonymous function immediately
