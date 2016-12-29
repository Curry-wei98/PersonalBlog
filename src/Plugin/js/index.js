var notes=document.getElementsByTagName('li')[1];
var daily=document.getElementsByTagName('li')[2];
var middle=document.getElementById('middle');
var hover=function(element,className){
    //悬浮旋转
    element.onmouseover=function () {
        middle.className=className;
    };
    element.onmouseout=function () {
        middle.className="normal";
    };
};

hover(notes,"notes");
hover(daily,"daily");