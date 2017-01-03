import Tools from "./tools";
import Route from "./route";


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


