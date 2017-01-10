import Tools from "./class/tools";
import Route from "./class/route";


let home=document.getElementsByTagName('li')[0];
let notes=document.getElementsByTagName('li')[1];
let daily=document.getElementsByTagName('li')[2];
let middle=document.getElementById('middle');




let tools=new Tools(middle);
let route=new Route();
tools.hover(notes,"notes");
tools.hover(daily,"daily");
tools.homeClick(home);
tools.changeClick(notes, "tags", "Tags/notes.html");
tools.changeClick(daily, "tags", "Tags/notes.html");


let hexagon=document.getElementsByClassName('hexagon');
let tags=document.getElementById("tags");


tags.addEventListener("click",function(event){
    let path=event.path;

    for(let element of path){
        if(element.className=="hexagon"){//事件捕获
            for(let j in hexagon){
                if(hexagon[j]==element){
                    let titles=document.getElementsByClassName("titles");
                    for(let k=0;k<titles.length;k++){
                        titles[k].style.display="none";
                    }
                    titles[j].style.display="block";
                }
            }
        }
    }

});


let visitor=function(url){
    let xmlHttp;
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
