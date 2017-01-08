import Tools from "./class/tools";
import Route from "./class/route";


var home=document.getElementsByTagName('li')[0];
var notes=document.getElementsByTagName('li')[1];
var daily=document.getElementsByTagName('li')[2];
var middle=document.getElementById('middle');




let tools=new Tools(middle);
let route=new Route();
tools.hover(notes,"notes");
tools.hover(daily,"daily");
tools.homeClick(home);
tools.changeClick(notes, "tags", "Tags/notes.html");
tools.changeClick(daily, "tags", "Tags/notes.html");


var hexagon=document.getElementsByClassName('hexagon');
var tags=document.getElementById("tags");


tags.addEventListener("click",function(event){
    var element=event.toElement;
    var path=event.path;
    for(var i in path){
        if(path[i].className=="hexagon"){//事件捕获
            for(var j in hexagon){
                if(hexagon[j]==path[i]){
                    var titles=document.getElementsByClassName("titles");
                    for(var k=0;k<titles.length;k++){
                        titles[k].style.display="none";
                    }
                    titles[j].style.display="block";
                }
            }
        }
    }
});


var visitor=function(url){
    var xmlHttp;
    if (window.XMLHttpRequest) { // 兼容 IE7+, Firefox, Chrome, Opera, Safari
        xmlHttp = new XMLHttpRequest();
    }
    else { // 兼容IE6, IE5
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            console.log(xmlHttp.responseText);
        }
    };
    xmlHttp.open("GET", url, true);
    xmlHttp.send();
};
// visitor("/php/controller/visitorAdd.php");
