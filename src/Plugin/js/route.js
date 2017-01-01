/**
 * Created by HiGuaifan on 17/1/1.
 */

var xmlHttp;
if (window.XMLHttpRequest) { // 兼容 IE7+, Firefox, Chrome, Opera, Safari
    xmlHttp = new XMLHttpRequest();
}
else { // 兼容IE6, IE5
    xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
}
xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
        document.getElementById("tags").innerHTML = xmlHttp.responseText;
    }
};
xmlHttp.open("GET", "Tags/blog.html", true);
xmlHttp.send();