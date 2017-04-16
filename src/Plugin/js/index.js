import Tools from "./class/tools";
import Route from "./class/route";


let home=document.getElementsByTagName('li')[0];
let notes=document.getElementsByTagName('li')[1];
let daily=document.getElementsByTagName('li')[2];
let edit=document.getElementsByTagName('li')[3];
let middle=document.getElementById('middle');
let others=document.getElementById('others');




let tools=new Tools(middle);
let route=new Route();
tools.hover(notes,"notes");
tools.hover(daily,"daily");
tools.hover(edit,"edit");
// tools.homeClick(home);
tools.load(notes, "others", "Tags/notes.html");
// tools.changeClick(daily, "tags", "Tags/notes.html");


let hexagon=document.getElementsByClassName('hexagon');


others.addEventListener("click",function(event){
    let path=event.path;
    for(let element of path){
        if(element.className=="hexagon"){//事件捕获
            for(let j in hexagon){
                if(hexagon[j]==element){
                    let name=element.getAttribute('data-name');
                    console.log(name);
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


notes.addEventListener("click",function(event){
    if(!others.classList.contains(('othersDown'))){
        tools.removeClass(others,"othersUp");
        tools.removeClass(middle,"middleUp");
        tools.addClass(others,"othersDown");
        tools.addClass(middle,"middleDown");
    }
});

home.addEventListener("click",function(event){
    if(!others.classList.contains(('othersUp'))) {
        tools.removeClass(others,"othersDown");
        tools.removeClass(middle,"middleDown");
        tools.addClass(others,"othersUp");
        tools.addClass(middle,"middleUp");
    }

});


document.addEventListener("webkitvisibilitychange", function(){
    let title=document.getElementsByTagName('title')[0];
    event.target.webkitHidden?title.innerHTML="嘿，就这么走了吗": title.innerHTML="你好怪凡";
});