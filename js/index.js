var scrollMax=3;
var scrollCount=1;
document.body.onmousewheel=function (ev) {
    if(ev.wheelDelta<0){
        if(scrollCount<scrollMax){
            switch (scrollCount){
                case 1:
                    scrollCount++;
                    document.getElementById('screen').className="screen";
                    document.getElementById('screen').classList.add("topX1");
                    break;
                case 2:
                    scrollCount++;
                    document.getElementById('screen').className="screen";
                    document.getElementById('screen').classList.add("topX2");
                    break;
                default:
                    break;
            }
        }
    }else{
        if(scrollCount>1){
            switch (scrollCount){
                case 2:
                    scrollCount--;
                    document.getElementById('screen').className="screen";
                    document.getElementById('screen').classList.add("topX0R");
                    break;
                case 3:
                    scrollCount--;
                    document.getElementById('screen').className="screen";
                    document.getElementById('screen').classList.add("topX1R");
                    break;
                default:
                    console.log("default");
                    break;
            }
        }
    }
};
