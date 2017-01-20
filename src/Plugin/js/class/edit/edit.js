/**
 * Created by HiGuaifan on 2017/1/19.
 */
import Image from "./image";


export default class Edit {
    constructor() {
        this.left = document.getElementById('left');//编辑器
        this.right = document.getElementById('right');//显示器
        this.id = 0;
        this.pasteFlag=false;//todo 用flag不优雅
    }

    //给编辑器绑定一个keydown事件来针对每个相应的textarea
    bind() {
        let that = this;




        this.left.addEventListener('paste', function (element) {
            that.pasteFlag=true;
            let items = element.clipboardData.items;
            let textArea = element.path[0];//获取到对应的input

            if (items[0].type.match("image")) {//如果是图片
                //todo 最好封装一下
                let file = items[0].getAsFile();
                let nextImgLeft = document.createElement('img');
                let nextImgRight = document.createElement('img');
                let newTextArea = document.createElement('textarea');

                nextImgLeft.id = 'leftImage' + that.id;
                nextImgLeft.setAttribute('data-show', 'rightImage' + that.id);
                nextImgRight.id = 'rightImage' + that.id++;
                nextImgLeft.src = window.URL.createObjectURL(file);
                nextImgRight.src = window.URL.createObjectURL(file);

                that.left.insertBefore(nextImgLeft, textArea.nextElementSibling);

                //todo 可封装的append
                if (that.left.lastChild == nextImgLeft) {
                    that.left.appendChild(newTextArea);
                } else {
                    that.left.insertBefore(newTextArea, nextImgLeft.nextElementSibling);
                }
                newTextArea.focus();
                that.right.appendChild(nextImgRight);
                return;
            }

            if (items[1] != undefined && items[1].type.match("html")) {
                //富文本粘贴
                items[1].getAsString(function (data) {
                    let showDiv = document.getElementById(textArea.getAttribute('data-show'));
                    showDiv.innerHTML += data;
                    let newTextArea = document.createElement('textarea');

                    //todo 可封装的append
                    if (that.left.lastChild == textArea) {
                        that.left.appendChild(newTextArea);
                    } else {
                        that.left.insertBefore(newTextArea, textArea.nextElementSibling);
                    }
                    newTextArea.focus();

                })
            }

        });
        this.left.addEventListener('input',function(element){
            let textArea = element.path[0];//获取到对应的input
            //渲染

            textArea.style.height=textArea.value.split("\n").length*21+"px";

            if(true==that.pasteFlag){
                that.pasteFlag=false;
                return;
            }
            that.render(textArea);
        });
        this.left.addEventListener('keydown', function (element) {
            let textArea = element.path[0];//获取到对应的input

            if (element.keyCode == '8' && textArea.value.length == 0 && that.left.childNodes.length != 1) {//if key code is backspace
                let prevDom = textArea.previousElementSibling;
                let prevDomOnRight = document.getElementById(prevDom.getAttribute('data-show'));
                let prevDiv = prevDom.previousElementSibling;

                //出现多个input的时候，必然前面是图片或者代码段
                prevDom.remove();
                prevDomOnRight.remove();
                textArea.remove();
                prevDiv.focus();
                /* todo 两个连续代码段的判断
                 首个input是代码段的判断
                 考虑这里是否可以优化
                 */

                return;
            }

            if (textArea.id == "") {//如果没有绑定它的div
                //给它配个div
                let showDiv = document.createElement('div');

                showDiv.id = 'showDiv' + that.id;
                textArea.setAttribute('data-show', "showDiv" + that.id);
                textArea.id = 'textArea' + that.id++;

                that.right.appendChild(showDiv);


            } else {

            }
        });
    }

    render(textArea) {

        let name = textArea.getAttribute('data-show');
        let showDiv = document.getElementById(name);





        showDiv.innerHTML =this.compiler(textArea.value);
    }

    compiler(str) {
        let newStr = '';
        let rows = str.split('\n');
        const that = this;
        this.rows = rows;
        rows.forEach(function (row, i) {
            newStr += that.rowController(row.replace(/&/g,"&amp").replace(/</g,"&lt;").replace(/>/g,"&gt;"), i);
        });
        return newStr;
    }


    rowController(row, i) {
        if (this.avoidIndex != null && i < this.avoidIndex) {
            return row + "\n";
        } else if (i == this.avoidIndex) {//todo 业务逻辑没有分离！！！！
            this.avoidIndex = null;
            return "</code></pre>";
        }

        switch (row[0]) {
            case undefined:
                return '<br />';
            case '#':
                return this.poundSign(row);
                break;
            case "'":
                return this.dot(row, i);
            default:
                return row + '<br />';
        }
    }

    //首字母为#的情况下
    poundSign(row) {
        switch (row[1]) {
            case ' ':
                return '<h1>' + row.substring(2) + '</h1>';
            case '#':
                switch (row[2]) {
                    case ' ':
                        return '<h2>' + row.substring(3) + '</h2>';
                    case '#':
                        switch (row[3]) {
                            case ' ':
                                return '<h3>' + row.substring(4) + '</h3>';
                            default:
                                return row;
                        }
                        return row;
                    default:
                        return row;
                }
                return row;
            default:
                return row;
        }
    }


    //首字母为'的情况下
    dot(row, i) {
        if (row.substring(1, 3) == "''" && row.substring(4) < '{' && row.substring(4) > '@') {
            for (var j = i; j < this.rows.length; j++) {
                if ("'''" == this.rows[j]) {
                    this.avoidIndex = j;
                    break;
                }
            }
            return "<pre><code class='" + row.substring(4) + "'>";
        }
        return row;
    }


}

//todo 这里有首个input 粘贴代码块后第二个 backspace会出错的bug
//todo  因为Input框挺小的，所以考虑点击以后 focus的问题