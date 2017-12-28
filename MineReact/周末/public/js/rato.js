var ele ;
var tIndex ;

//自定义函数
$.fn.extend({
    rotate(){
        ele = this ;
        tIndex = setInterval('singleRotate()',20);
    },
    stopRotate(){
        clearInterval(tIndex)
    }
});

//初始角度
var degree = 0;

//单次旋转
function singleRotate() {
    //一次增加50度
    degree = degree + 50 * Math.PI / 180;
    ele.css("transform","rotate("+degree+"deg)");
}