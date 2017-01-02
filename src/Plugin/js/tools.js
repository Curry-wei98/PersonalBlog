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

    hover(element, className) {
        //bar标签的悬浮旋转工具函数
        var that = this;
        element.onmouseover = function () {
            if (!(that.middle.classList.contains("displayNone") || (that.middle.classList.contains("hide"))))
                that.middle.className = className;
        };
        element.onmouseout = function () {
            if (!(that.middle.classList.contains("displayNone") || (that.middle.classList.contains("hide"))))
                that.middle.className = "normal";
        };
    };

    changeClick(element, idName, url) {
        //bar标签点击修改load的工具函数
        var that = this;
        element.onclick = function () {
            if (!that.middle.classList.contains("displayNone")) {
                document.getElementById(idName).classList.remove("displayNone");
                that.removeClass(that.middle, "hide");
                that.removeClass(that.middle, "displayNone");

                that.addClass(that.middle, "hide");
                that.middle.addEventListener("webkitAnimationEnd", function () {
                    if (that.middle.classList.contains("hide")) {
                        that.addClass(that.middle, "displayNone");
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
                    }
                });
            }
        }
    };

    homeClick(element) {
        var that = this;
        element.onclick = function () {
            if (that.middle.classList.contains("displayNone")) {
                that.middle.classList.remove("displayNone");
                that.middle.classList.remove("hide");
                document.getElementById("tags").classList.add("displayNone");
            }
        }
    }

};

//todo  整体变优雅一点。。。现在的代码是真的丑