defer = "true";
   
$.getScript("uedit/scripts/src-noconflict/ace.js", function(){

 //alert("Script loaded and executed.");
 ace.require("ace/ext/language_tools");
editor = ace.edit("editor-container");
    editor.setTheme("ace/theme/eclipse");
    editor.setShowPrintMargin(false);
    editor.getSession().setMode("ace/mode/php");
    editor.setOptions({
    enableBasicAutocompletion: true,
    spellcheck: true
    
});
   // Use anything defined in the loaded script...
});



var tagStart="",tagEnd="";
sLnk="";
var tagarrHTML=[
["","","",""],
["<b>","</b>","",""],
["<i>","</i>","",""],
["<u>","</u>","",""],
["<ol>","</ol>","",""],
["<ul>","</ul>","",""],
["<li>","</li>","",""],
["<quote>","</quote>","",""],
["<blockquote>","</blockquote>","",""],
["<a"+sLnk+">","</a>","",""],
["<pre>","</pre>","",""],
["<code>","</code>","",""],
["<pre><code>","</code></pre>","",""],
["<p>","</p>"]
];

var json = '{"html":[' +
'{"id":"","start":"<b>","end":"</b>","title":"Bold","class":"editor-button","innerhtml":"<b>B</b>"},' +
'{"id":"","start":"<i>","end":"</i>","title":"Italic","class":"editor-button","innerhtml":"<i>I</i>"  },' +
'{"id":"","start":"<u>","end":"</u>","title":"Unerline","class":"editor-button","innerhtml":"<u>U</u>"  },' +
'{"id":"","start":"<p>","end":"</p>","title":"Paragraph","class":"editor-button","innerhtml":"P"  },' +
'{"id":"","start":"<a ","end":"</a>","title":"Hyperlink","class":"editor-button","innerhtml":"a href","href":""  },' +
'{"id":"","start":"<ol>","end":"</ol>","title":"Ordered List","class":"editor-button","innerhtml":"ol"  },' +
'{"id":"","start":"<ul>","end":"</ul>","title":"Unordered List","class":"editor-button","innerhtml":"ul"  },' +
'{"id":"","start":"<li>","end":"</li>","title":"List Item","class":"editor-button","innerhtml":"li"  },' +
'{"id":"","start":"<dl>","end":"</dl>","title":"Description List","class":"editor-button","innerhtml":"dl"  },' +
'{"id":"","start":"<dt>","end":"</dt>","title":"Description Term","class":"editor-button","innerhtml":"dt"  },' +
'{"id":"","start":"<dd>","end":"</dd>","title":"Description value","class":"editor-button","innerhtml":"dd"  },' +
'{"id":"","start":"<quote>","end":"</quote>","title":"Quote","class":"editor-button","innerhtml":"q"  },' +
'{"id":"","start":"<blockquote>","end":"</blockquote>","title":"Block Quote","class":"editor-button","innerhtml":"bq"  },' +
'{"id":"","start":"<pre>","end":"</pre>","title":"pre","class":"editor-button","innerhtml":"pre"  },' +
'{"id":"","start":"<code>","end":"</code>","title":"Inline Code","class":"editor-button","innerhtml":"code"  },' +
'{"id":"","start":"<pre><code>","end":"</code></pre>","title":"Pre-formatted Code","class":"editor-button","innerhtml":"pre/code"  },' +
'{"id":"","start":"<em>","end":"</em>","title":"em","class":"editor-button","innerhtml":"em"  },' +
'{"id":"","start":"<img ","end":" />","title":"Image","class":"editor-button","innerhtml":"img","src":""  },' +
'{"id":"","start":"<span>","end":"</span>","title":"Span","class":"editor-button","innerhtml":"span"  },' +
'{"id":"","start":"<div>","end":"</div>","title":"Div","class":"editor-button","innerhtml":"div"  },' +
'{"id":"","start":"<nav>","end":"</nav>","title":"Navigation","class":"editor-button","innerhtml":"nav"  },' +
'{"id":"","start":"<sup>","end":"</sup>","title":"Superscript","class":"editor-button","innerhtml":"sup"  },' +
'{"id":"","start":"<sub>","end":"</sub>","title":"Subscript","class":"editor-button","innerhtml":"sub"  },' +
'{"id":"","start":"<kbd>","end":"</kbd>","title":"Keboad key","class":"editor-button","innerhtml":"kbd"  },' +
'{"id":"","start":"","end":"<hr>","title":"Horizontal Rule","class":"editor-button","innerhtml":"hr"  },' +
'{"id":"","start":"","end":"<br>","title":"New Line","class":"editor-button","innerhtml":"br"  },' +
'{"id":"","start":"<var>","end":"</var>","title":"Variable","class":"editor-button","innerhtml":"var"  },' +
'{"id":"","start":"<del>","end":"</del>","title":"Deleted text","class":"editor-button","innerhtml":"del"  },' +
'{"id":"","start":"<table>","end":"</table>","title":"Table","class":"editor-button","innerhtml":"table"  },' +
'{"id":"","start":"<tr>","end":"</tr>","title":"Table Row","class":"editor-button","innerhtml":"tr"  },' +
'{"id":"","start":"<td>","end":"</td>","title":"Table Cell","class":"editor-button","innerhtml":"td"  },' +
'{"id":"","start":"<th>","end":"</th>","title":"Table Header Cell","class":"editor-button","innerhtml":"th"  },' +
'{"id":"","start":"<thead>","end":"</thead>","title":"Table Header","class":"editor-button","innerhtml":"thead"  },' +
'{"id":"","start":"<tbody>","end":"</tbody>","title":"Table Body","class":"editor-button","innerhtml":"tbody"  },' +
'{"id":"","start":"<tfoot>","end":"</tfoot>","title":"Table Footer","class":"editor-button","innerhtml":"tfoot"  },' +
'{"id":"","start":"<form>","end":"</form>","title":"Form","class":"editor-button","innerhtml":"form"  },' +
'{"id":"","start":"<h1>","end":"</h1>","title":"Header 1","class":"editor-button","innerhtml":"h1"  },' +
'{"id":"","start":"<h2>","end":"</h2>","title":"Header 2","class":"editor-button","innerhtml":"h2"  },' +
'{"id":"","start":"<h3>","end":"</h3>","title":"Header 3","class":"editor-button","innerhtml":"h3"  },' +
'{"id":"","start":"<h4>","end":"</h4>","title":"Header 4","class":"editor-button","innerhtml":"h4"  },' +
'{"id":"","start":"<h5>","end":"</h5>","title":"Header 5","class":"editor-button","innerhtml":"h5"  },' +
'{"id":"","start":"<h6>","end":"</h6>","title":"Header 6","class":"editor-button","innerhtml":"h6"  },' +
'{"id":"","start":"<!-- ","end":" -->","title":"Comment","class":"editor-button","innerhtml":"<sup>**</sup>comment<sup>**</sup>"  },' +
'{"id":"","start":"<article>","end":"</article>","title":"Article","class":"editor-button","innerhtml":"article"  }]}';


function findIndexByIdFromJSON(id){
		    obj = JSON.parse(json);
    array=obj.html;
    for(i=0;i<array.length;i++){
    if(array[i].id==id){return i;}
    
    }

}




/*var myEvent = window.attachEvent || window.addEventListener;
var chkevent = window.attachEvent ? 'onbeforeunload' : 'beforeunload'; /// make IE7, IE8 compitable

            myEvent(chkevent, function(e) { // For >=IE7, Chrome, Firefox

         var confirmationMessage = 'Are you sure to leave the page?';  // a space
                (e || window.event).returnValue = confirmationMessage;
                return confirmationMessage;
            });*/


function getFromStorage() { 


	if (!!localStorage.getItem("neurobin-uedit-html-div")) {
    document.getElementById("html-div").value=localStorage.getItem("neurobin-uedit-html-div");}
    if (!!localStorage.getItem("neurobin-uedit-html-p")) {
    document.getElementById("html-p").value=localStorage.getItem("neurobin-uedit-html-p");}
    if (!!localStorage.getItem("neurobin-uedit-html-h1")) {
    document.getElementById("html-h1").value=localStorage.getItem("neurobin-uedit-html-h1");}
    if (!!localStorage.getItem("neurobin-uedit-html-h2")) {
    document.getElementById("html-h2").value=localStorage.getItem("neurobin-uedit-html-h2");}
    if (!!localStorage.getItem("neurobin-uedit-html-h3")) {
    document.getElementById("html-h3").value=localStorage.getItem("neurobin-uedit-html-h3");}
    if (!!localStorage.getItem("neurobin-uedit-html-h4")) {
    document.getElementById("html-h4").value=localStorage.getItem("neurobin-uedit-html-h4");}
    if (!!localStorage.getItem("neurobin-uedit-html-h5")) {
    document.getElementById("html-h5").value=localStorage.getItem("neurobin-uedit-html-h5");}
    if (!!localStorage.getItem("neurobin-uedit-html-span")) {
    document.getElementById("html-span").value=localStorage.getItem("neurobin-uedit-html-span");}
    if (!!localStorage.getItem("neurobin-uedit-html-ul")) {
    document.getElementById("html-ul").value=localStorage.getItem("neurobin-uedit-html-ul");}
}

document.addEventListener('DOMContentLoaded', function () {
var fun=getFromStorage();
$("body").css("overflow", "hidden");
    }, false);


function fillStorage() {
// Check browser support
if (typeof(Storage) != "undefined") {
    // Store
    
    if (!!document.getElementById("html-div")) {
    localStorage.setItem("neurobin-uedit-html-div",document.getElementById("html-div").value);}
     if (!!document.getElementById("html-p")) {
    localStorage.setItem("neurobin-uedit-html-p",document.getElementById("html-p").value);}
    if (!!document.getElementById("html-h1")) {
    localStorage.setItem("neurobin-uedit-html-h1",document.getElementById("html-h1").value);}
    if (!!document.getElementById("html-h2")) {
    localStorage.setItem("neurobin-uedit-html-h2",document.getElementById("html-h2").value);}
    if (!!document.getElementById("html-h3")) {
    localStorage.setItem("neurobin-uedit-html-h3",document.getElementById("html-h3").value);}
    if (!!document.getElementById("html-h4")) {
    localStorage.setItem("neurobin-uedit-html-h4",document.getElementById("html-h4").value);}
    if (!!document.getElementById("html-h5")) {
    localStorage.setItem("neurobin-uedit-html-h5",document.getElementById("html-h5").value);}
    if (!!document.getElementById("html-span")) {
    localStorage.setItem("neurobin-uedit-html-span",document.getElementById("html-span").value);}
    if (!!document.getElementById("html-ul")) {
    localStorage.setItem("neurobin-uedit-html-ul",document.getElementById("html-ul").value);}
    // Retrieve
    //document.getElementById("result").innerHTML = localStorage.getItem("lastname");
} else {
    alert("Warning: Local Storage isn't supported..");
}



}




function getIFrameDocument(aID){
  // if contentDocument exists, W3C compliant (Mozilla)
  if (document.getElementById(aID).contentDocument){
    return document.getElementById(aID).contentDocument;
  } else {
    // IE
    return document.frames[aID].document;
  }
}


function setDesignModeOn(id){
 getIFrameDocument(id).designMode = "On";
}




/*function tagParse(lang,tagIndex) {
	//if (tagIndex==1) {tagStart="<b>";tagEnd="</b>";}
	if (lang=="html") {
	tagStart=tagarrHTML[tagIndex][0];
	tagEnd=tagarrHTML[tagIndex][1];
	}
	
}*/

/*function htmlHyperLink(lang,elementId,tagIndex,link) {
		    obj = JSON.parse(json);
    array=obj.html;
	sLnk='<a href=\"'+link+'\">';
var replacementText=sLnk+editor.getSelectedText()+"</a>";
editor.session.replace(editor.selection.getRange(), replacementText);
	
}*/
function getSelectedText(){var text="";
if (window.getSelection) {text=window.getSelection();}
else{text=document.selection.createRange().text;}
return text;
}

function getSelectionHtml() {
    var html = "";
    if (typeof window.getSelection != "undefined") {
        var sel = window.getSelection();
        if (sel.rangeCount) {
            var container = document.createElement("div");
            for (var i = 0, len = sel.rangeCount; i < len; ++i) {
                container.appendChild(sel.getRangeAt(i).cloneContents());
            }
            html = container.innerHTML;
        }
    } else if (typeof document.selection != "undefined") {
        if (document.selection.type == "Text") {
            html = document.selection.createRange().htmlText;
        }
    }
    return html;
}


function replaceSelectedText(replacementText) {
    var sel, range;
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.rangeCount) {
            range = sel.getRangeAt(0);
            range.deleteContents();
            range.insertNode(document.createTextNode(replacementText));
        }
    } else if (document.selection && document.selection.createRange) {
        range = document.selection.createRange();
        range.text = replacementText;
    }
}



function wrapSelectedText(lang,elementId,id) {
	//tagParse(lang,tagIndex);
	var fun=fillStorage();
	obj = JSON.parse(json);
    array=obj.html;
	//alert(id+array[0].id);
	tagIndex=findIndexByIdFromJSON(id);

//var replacementText=tagStart+getSelectedText()+tagEnd;
//replaceSelectedText(replacementText);
//alert(array[tagIndex].start);

var classname="",tagname="",lastchar="",tag="";
tagname=array[tagIndex].start;
lastchar=tagname.slice(-1);
tag=tagname.substring(1,tagname.length-1);
tagname="html-"+tag;
//alert(tagname);
if (!!document.getElementById(tagname)) {
classname=document.getElementById(tagname).value;}
if (classname!=null&&classname!="") {
classname=" class=\""+classname+"\"";
tagStart="<"+tag+classname+lastchar;
}
else {classname="";tagStart=array[tagIndex].start;}


var href,src;
href=array[tagIndex].hasOwnProperty("href");
src=array[tagIndex].hasOwnProperty("src");
if (href&&!src) {
var sLnk=prompt('Put the URL here','http:\/\/');
if(sLnk&&sLnk!=''&&sLnk!='http://'){
	link=" href=\""+sLnk+"\">";
var replacementText=tagStart+link+editor.getSelectedText()+array[tagIndex].end;
editor.session.replace(editor.selection.getRange(), replacementText);
}
}
else if(src&&!href){
var lnk=prompt('Put the image URL here','http:\/\/');
var alt="image";
alt=lnk.split("/");
alt=alt[alt.length-1].substring(0,50);
if (editor.getSelectedText()!="") {alt=editor.getSelectedText();}
if(lnk&&lnk!=''){
	link=" src=\""+lnk+"\"";
var replacementText=tagStart+" alt=\""+alt+"\""+link+array[tagIndex].end;
editor.session.replace(editor.selection.getRange(), replacementText);
}

}

else {



var replacementText=tagStart+editor.getSelectedText()+array[tagIndex].end;
editor.session.replace(editor.selection.getRange(), replacementText);
}

}

function wrapSelectedTextInTextArea(lang,elementId,tagIndex) {
	tagParse(lang,tagIndex);
var textarea = document.getElementById(elementId);
if (textarea.selectionStart === undefined) {	// Internet Explorer
// create a range from the current selection
var textRange = document.selection.createRange ();
// check whether the selection is inside the textarea element
var rangeParent = textRange.parentElement ();
if (rangeParent && rangeParent.id == elementId) {
textRange.text = tagStart + textRange.text + tagEnd;
}
}
else {
// check whether some text is selected inside the textarea element
//if (textarea.selectionStart != textarea.selectionEnd) {
var newText = textarea.value.substring (0, textarea.selectionStart) +
tagStart + textarea.value.substring (textarea.selectionStart, textarea.selectionEnd) + tagEnd +
textarea.value.substring (textarea.selectionEnd);
textarea.value = newText;
//}
}


}


function createButtonFromJSON(parentId,lang,classname){
    //Create an input type dynamically.   
    obj = JSON.parse(json);
    array=obj.html;
    i=0;
    for(i=0;i<array.length;i++){
    var element = document.createElement("BUTTON");
    var brElement = document.createElement("BR");
    //Assign different attributes to the element. 
    element.innerHTML=array[i].innerhtml;
    element.id=lang+"-btn"+i;
    element.title=array[i].title;
    array[i].id=element.id;
    json=JSON.stringify(obj);
    element.class=array[i].class+" "+classname;
    //alert('fds');
    element.onclick=function(){wrapSelectedText("html","editor-container",this.id);};
    var foo = document.getElementById(parentId);
    //Append the element in page (in span).  
    foo.appendChild(element);
    foo.appendChild(brElement);
}

}



