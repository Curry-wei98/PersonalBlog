/**
 * Created by HiGuaifan on 2017/1/2.
 */
export default class Tools {
    constructor(element) {
        this.middle = element;
    }

    //todo 考虑如何使用toggle优化
    removeClass(element, className) {
        let classList = element.classList;
        classList.remove(className);
    };

    addClass(element, className) {
        let classList = element.classList;
        if (!classList.contains(className))
            classList.add(className);
    };

    removeAndAddListener(event, element, fun) {
        element.removeEventListener(event, fun, false);
        element.addEventListener(event, fun, false);
    }

    ajaxGet(idName, url) {
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

        that.removeAndAddListener("mouseover", element, changeClass);
        that.removeAndAddListener("mouseout", element, turnBack);
    };

    animationEndFunctionForMiddle(element, idName, url) {
        var dataName = element.getAttribute("data-name");

        if(!this.middle.classList.contains("displayNone")){
            this.addClass(this.middle, "displayNone");
        }
        if(this.middle.getAttribute("data-barname") != dataName){
            this.ajaxGet(idName, url);
            this.middle.setAttribute("data-barname", dataName);
        }



        // if (this.middle.classList.contains("hide") &&
        //     (!this.middle.classList.contains("displayNone")) &&
        //     (this.middle.getAttribute("data-barname") != dataName)) {
        // }
    };

    changeClick(element, idName, url) {
        //bar标签点击修改load的工具函数
        var that = this;
        var clickFunction = function () {
            document.getElementById(idName).classList.remove("displayNone","hide");

            if(that.middle.classList.contains("displayNone")){//已经点了其他的了
                that.animationEndFunctionForMiddle(element, idName, url);
            }else{
                that.addClass(that.middle, "hide");
                that.removeAndAddListener("webkitAnimationEnd", that.middle, that.animationEndFunctionForMiddle(element, idName, url));
            }
        };

        that.removeAndAddListener("click", element, clickFunction);

    };

    animationEndFunction (tags) {
        if (tags.classList.contains("hide")) {
            tags.classList.add("displayNone");

            this.removeAllClass(this.middle);
            this.middle.classList.add("normal");
        }
    };

    homeClick(element) {
        var that = this;
        var clickFunction=function(){
            if (that.middle.classList.contains("hide")) {
                var tags = document.getElementById("tags");
                that.addClass(tags, "hide");
                that.removeAndAddListener("webkitAnimationEnd", tags, that.animationEndFunction(tags));
            }
        };
        this.removeAndAddListener("click",element,clickFunction);

    }

    removeAllClass(element){
        element.className="";
    }

};

//todo  整体变优雅一点。。。现在的代码是真的丑..作用域弄清楚！！