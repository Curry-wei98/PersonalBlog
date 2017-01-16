/**
 * Created by HiGuaifan on 2017/1/8.
 */

export default class Edit {
    constructor() {
        this.input = document.getElementById('input0');
        this.img = document.getElementById('image0');
        this.show = document.getElementById('show0');
        this.left = document.getElementById('left');
        this.right = document.getElementById('right');
        this.imageIndex=1;
        this.rows = null;
        this.avoidIndex = null;
        this.pasteFlag=false;
    }

    bind() {
        let that = this;
        let lastShow=null;
        this.left.addEventListener('input', function (element) {//todo 最好每个Input都独立绑定好事件，不要这么复杂，而且这样对客户端压力也大
            const textarea=element.path[0];
            const showId="show"+textarea.id.replace(/input/g,"");
            textarea.style.height=textarea.value.split("\n").length*21+"px";
            if(this.pasteFlag==true){
                this.pasteFlag=false;
                lastShow=that.show;
                //设置换行后的Input
                let newInput=document.createElement('textarea');
                let newImg=document.createElement('img');
                let newShow=document.createElement('show');
                newInput.id='input'+that.imageIndex;
                newImg.id='image'+that.imageIndex;
                newShow.id='show'+that.imageIndex;
                that.left.appendChild(newInput);
                that.left.appendChild(newImg);
                that.right.appendChild(newShow);

                //事件绑定的迁移
                that.input = document.getElementById('input'+that.imageIndex);
                that.img = document.getElementById('image'+that.imageIndex);
                that.show=document.getElementById('show'+that.imageIndex);

                //标记修改
                that.imageIndex=that.imageIndex+1;

                //光标自动跳转
                that.input.focus();
                return;
            }





            that.show=document.getElementById(showId);
            that.input=document.getElementById(textarea.id);

            that.show.innerHTML = that.compiler(that.input.value);
            var codes = document.getElementsByTagName("code");
            for (var i = 0; i < codes.length; i++)
                hljs.highlightBlock(codes[i]);
        });

        this.left.addEventListener('keydown',function (event) {
            let input=that.input;
            if (event.keyCode == "8"&&input.value.length==0) {

                let id=input.id.replace(/input/g,"");
                if(id>0){
                    //移除显示图片，跳转到上一个textarea
                    //todo 做上一个是div的判断

                    document.getElementById(input.id).remove();
                    document.getElementById("show"+id).remove();
                    document.getElementById("showImage"+id).remove();
                    id=id-1;
                    document.getElementById("image"+id).remove();
                    that.input=document.getElementById("input"+id);
                    that.input.focus();
                }


            }
        });

        this.left.addEventListener('paste', function (element) {
            //复制事件
            this.pasteFlag=true;
            if (element.clipboardData.items[0].type.match("image")) {
                //如果拷贝了图片

                //显示图片
                let file = element.clipboardData.items[0].getAsFile();
                that.img.src = window.URL.createObjectURL(file);

                //设置换行后的Input
                let newInput=document.createElement('textarea');
                let newImg=document.createElement('img');
                newInput.id='input'+that.imageIndex;
                newImg.id='image'+that.imageIndex;
                that.left.appendChild(newInput);
                that.left.appendChild(newImg);

                //左边渲染到右边
                //todo 不要写这么反人类的add dom的代码！！
                that.right.innerHTML+='<img id="showImage'+that.imageIndex+'" src="'+that.img.src+'" alt=""><div id="show'+that.imageIndex+'"></div>';

                //事件绑定的迁移
                that.input = document.getElementById('input'+that.imageIndex);
                that.img = document.getElementById('image'+that.imageIndex);
                that.show=document.getElementById('show'+that.imageIndex);

                //标记修改
                that.imageIndex=that.imageIndex+1;

                //光标自动跳转
                that.input.focus();
            }

            if(element.clipboardData.items[1]!=undefined&&element.clipboardData.items[1].type.match("html")){
                // 如果是粘贴富文本内容
                element.clipboardData.items[1].getAsString(function (data) {
                    //粘贴富文本内容
                    //在冒泡事件结束后才触发
                    lastShow.innerHTML+=data;
                });

            }
        });
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
        } else if (i == this.avoidIndex) {//todo 业务逻辑没有很好地分离！！！！
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

};


//todo 使用selectionStart有没有办法减少渲染
//todo '''暂时无法显示