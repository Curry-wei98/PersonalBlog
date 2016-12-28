

$("document").ready(function(){
    var articleDom=$("article#blog");
    var article=articleDom.html();
    var arr=article.match(/[^\n]*\n/g);//获取每行
    $.each(arr,function(index,element){
        arr[index]="<p>"+more(element)+"　</p>";//在网页中显示
    });
    articleDom.html(arr);
});

//添加一些额外的结构
//todo 要做//h1 显示的是/h1而不是 /<h1>这样的判断操作
//todo 以及调整结构

function more(row){
    var h1=new RegExp("/h1");
    var img=/\/img\(([^)]*)\)/;
    var a=/\/a\(([^)]*)\)/;
    if(h1.test(row)){//标题
        row=row.replace("/h1","");
        row="<h1>"+row+"</h1>";
    }
    if(img.test(row)){//图片
        var m=row.match(img);
        if(m!=null){
            var replace=m[0];
            var src=m[1];
            row=row.replace(replace,'<img src="/Image/Java/'+src+'" alt="image">');
        }
    }
    if(a.test(row)){//超链接
        var m=row.match(a);
        if(m!=null){
            var replace=m[0];
            var src=m[1];
            row=row.replace(replace,'<a target="view_window" href="'+src+'">'+src+'</a>');
        }
    }

    return row;
}