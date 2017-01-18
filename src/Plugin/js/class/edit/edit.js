/**
 * Created by HiGuaifan on 2017/1/19.
 */
import Image from "./image";


export default class Edit {
    constructor() {
        this.left = document.getElementById('left');//编辑器
        this.right = document.getElementById('right');//显示器
        this.id = 0;
    }

    //给编辑器绑定一个keydown事件来针对每个相应的textarea
    bind() {
        let that = this;
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
            //渲染
            that.render(textArea);


        });
        this.left.addEventListener('paste', function (element) {
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

        })
    }

    render(textArea) {

        let name = textArea.getAttribute('data-show');
        let showDiv = document.getElementById(name);

        showDiv.innerHTML = textArea.value;
    }
}