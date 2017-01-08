/**
 * Created by HiGuaifan on 2017/1/8.
 */

export default class Edit {
    constructor() {
        this.input = document.getElementById('input');
        this.show = document.getElementById('show');
        this.rows = null;
        this.avoidIndex = null;
    }

    bind() {
        let that = this;
        this.input.addEventListener('input', function () {
            that.show.innerHTML = that.compiler(that.input.value);

            var codes=document.getElementsByTagName("code");

            for(var i=0;i<codes.length;i++){
                hljs.highlightBlock(codes[i]);
            }


            //
        })
    }


    compiler(str) {
        let newStr = '';
        let rows = str.split('\n');
        const that = this;
        this.rows = rows;
        rows.forEach(function (row, i) {
            newStr += that.rowController(row, i);
        });


        return newStr;
    }


    rowController(row, i) {
        let returnStr = '';

        if(this.avoidIndex!=null&&i<this.avoidIndex){
            return row+"\n";
        }else if(i==this.avoidIndex){//todo 业务逻辑没有很好地分离！！！！
            this.avoidIndex=null;
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
        return returnStr;
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
        return;
    }


    //首字母为'的情况下
    dot(row, i) {
        if (row.substring(1, 3) == "''" && row.substring(4) < '{' && row.substring(4) > '@') {
            for (var j = i; j < this.rows.length; j++) {
                if ("'''" == this.rows[j]) {
                    this.avoidIndex=j;
                    break;
                }
            }
            return "<pre><code class='"+row.substring(4)+"'>";
        }

        return row;
    }

};


//todo 使用selectionStart有没有办法减少渲染
//todo '''暂时无法显示