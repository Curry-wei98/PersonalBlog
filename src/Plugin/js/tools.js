/**
 * Created by HiGuaifan on 2017/1/2.
 */
export default class Tools {
    constructor(element) {
        this.middle = element;
    }

    //todo 考虑如何使用toggle优化
    static removeClass(element, className) {
        let classList = element.classList;
        classList.remove(className);
    };

    static addClass(element, className) {
        let classList = element.classList;
        if (!classList.contains(className))
            classList.add(className);
    };

    static removeAndAddListener(event, element, fun) {
        element.removeEventListener(event, fun,false);
        element.addEventListener(event, fun, false);
    }

    static ajaxGet(idName,url){
        var xmlHttp;
        if (window.XMLHttpRequest) { // 兼容 IE7+, Firefox, Chrome, Opera, Safari
            xmlHttp = new XMLHttpRequest();
        }
        else { // 兼容IE6, IE5
            xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                document.getElementById(idName).innerHTML = xmlHttp.responseText;
            }
        };
        xmlHttp.open("GET", url, true);
        xmlHttp.send();
    };

    hover(element, className) {
        //bar标签的悬浮旋转工具函数
        var that = this;
        var changeClass = function () {
            if (!(that.middle.classList.contains("displayNone") ||
                that.middle.classList.contains("hide")))
                that.middle.className = className;
        };
        var turnBack = function () {
            if (!(that.middle.classList.contains("displayNone") || (that.middle.classList.contains("hide"))))
                that.middle.className = "normal";
        };

        Tools.removeAndAddListener("mouseover", element, changeClass);
        Tools.removeAndAddListener("mouseout", element, turnBack);
    };

    changeClick(element, idName, url) {
        //bar标签点击修改load的工具函数
        var that = this;

        var  animationEndFunction=function () {
            if (that.middle.classList.contains("hide")) {
                Tools.addClass(that.middle, "displayNone");
                Tools.ajaxGet(idName,url);
            }
        };

        var clickFunction=function(){
            document.getElementById(idName).classList.remove("displayNone");
            document.getElementById(idName).classList.remove("hide");
            Tools.removeClass(that.middle, "hide");
            Tools.removeClass(that.middle, "displayNone");

            Tools.addClass(that.middle, "hide");

            Tools.removeAndAddListener("webkitAnimationEnd",that.middle,animationEndFunction);
        };

        Tools.removeAndAddListener("click",element,clickFunction);

    };

    homeClick(element) {
        var that = this;
        element.onclick = function () {
            if (that.middle.classList.contains("hide")) {
                var tags = document.getElementById("tags");
                var animationEndFunction=function(){
                    if (tags.classList.contains("hide")) {
                        tags.classList.add("displayNone");
                        that.middle.classList.remove("displayNone");
                        that.middle.classList.remove("hide");
                    }
                };

                Tools.addClass(tags, "hide");

                Tools.removeAndAddListener("webkitAnimationEnd",tags,animationEndFunction);


            }
        }
    }

};

//todo  整体变优雅一点。。。现在的代码是真的丑