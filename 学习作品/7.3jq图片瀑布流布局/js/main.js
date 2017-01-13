/**
 * Created by Jason on 2016/12/15.
 */

$(function(){
    imgPosition();
    $(window).resize(imgPosition);
    $(window).scroll(imgLoad);
});

//模拟图片源
var dataImg = {"data":[
    {"src":"1.jpg"},{"src":"2.jpg"},
    {"src":"3.jpg"},{"src":"4.jpg"},
    {"src":"5.jpg"},{"src":"6.jpg"},
    {"src":"7.jpg"},{"src":"8.jpg"},
    {"src":"9.jpg"},{"src":"10.jpg"}]
};
//加载图片；
function imgLoad(){
    var winHeight = $(window).height();//窗口高度
    var docHeight = $(document).height();//文档的高度
    var winTop = $(window).scrollTop();//滑动高度
    var lastImgHeight= imgBox =$(".img-box").last().height();//最后一个元素的高度
    if (winHeight+winTop>docHeight-lastImgHeight){
        $.each(dataImg.data,function(index,value){
            //console.log("value:"+$(value).attr("src")+"  index:"+index);
            createImgBox($(value).attr("src"));
            imgPosition();
        });
    }
}
//创建图片盒子
function createImgBox(date){
    var cloneBox = $(".img-box").first().clone();//克隆一个imgBox副本
    var container =$(".container");
    container.append(cloneBox);
    cloneBox.find("img").attr("src","img/"+date);
    cloneBox.find("a").attr("href","img/"+date);
}
//图片定位
function imgPosition(){
    var imgBox =$(".img-box");
    var boxWidth =imgBox.eq(0).width();
    var contentWidth = $(".container").width();
    var num = Math.floor(contentWidth/boxWidth);//列的个数, Math.floor取整数
    //var num = 5;
    var boxArr = [];
    imgBox.each(function(index,value){
        var boxHeight = imgBox.eq(index).height();
        if(index<num){
            boxArr[index] = boxHeight;
            $(value).css({
                "position": "absolute",
                "top" : 0,
                "left" :boxWidth*index
            });
        }else{
            var minboxHeight = Math.min.apply(null,boxArr);//获得第一行中最小的高度
            var minboxIndex = $.inArray(minboxHeight,boxArr);//最小位置，相对于indexOf()
            var minboxLeft = imgBox.eq(minboxIndex).position().left;
            $(value).css({
                "position": "absolute",
                "top" : minboxHeight,
                "left" :minboxLeft
            });
            boxArr[minboxIndex] += boxHeight;//最小高度的列的高度改变为新的高度
        }
    });
}
