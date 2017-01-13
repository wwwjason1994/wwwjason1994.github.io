/**
 * Created by Jason on 2017/1/4.
 */
$(function(){
    showSchBox();
    slideShow();
    studentStory();
});
//显示隐藏搜索条
function showSchBox(){
    var schBox = $("#searchbox");
    var schBtn = $("#search-btn");
    var closeBtn = $("#close-btn");
    schBtn.on("click",function(e){
        schBox.show();
        schBox.animate({
            opacity: 1,
            width: "850px"
        },700);
    });
    closeBtn.on("click",function(e){
        schBox.animate({
            opacity: 0,
            width: "0"
        },700,function(){
            schBox.hide();
        });
    });
}

//轮播器
function slideShow(){
    var conWidth=750;
    var i=0;
    var clone=$(".banner .img li").first().clone();
    $(".banner .img").append(clone);
    var size=$(".banner .img li").length;
    for(var j=0;j<size-1;j++){
        $(".banner .num").append("<li></li>");
    }
    $(".banner .num li").first().addClass("on");
    /*鼠标划入圆点*/
    $(".banner .num li").click(function(){
        var index=$(this).index();
        i=index;
        $(".banner .img").stop().animate({left:-index*conWidth},800);
        $(this).addClass("on").siblings().removeClass("on");
    });
    /*自动轮播*/
    var t=setInterval(function(){
        i++;
        move()
    },5000);
    /*对banner定时器的操作*/
    $(".banner").hover(function(){
        clearInterval(t);
    },function(){
        t=setInterval(function(){
            i++;
            move();
        },5000)
    });
    /*向左的按钮*/
    $(".banner .btn_l").click(function(){
        i--;
        move();
    });
    /*向右的按钮*/
    $(".banner .btn_r").click(function(){
        i++;
        move();
    });
    function move(){
        if(i==size){
            $(".banner  .img").css({left:0});
            i=1;
        }
        if(i==-1){
            $(".banner .img").css({left:-(size-1)*conWidth});
            i=size-2;
        }
        $(".banner .img").stop().animate({left:-i*conWidth},800);
        if(i==size-1){
            $(".banner .num li").eq(0).addClass("on").siblings().removeClass("on")
        }else{
            $(".banner .num li").eq(i).addClass("on").siblings().removeClass("on")
        }
    }
}
//学员故事
function studentStory(){
    var conWidth=1000;
    var i=0;
    var clone=$(".story-container .banner .story-sliding").first().clone();
    $(".story-container .banner").append(clone);
    var size=$(".story-container .banner .story-sliding").length;
    for(var j=0;j<size-1;j++){
        $(".click-dot .num").append("<li></li>");
    }
    $(".click-dot .num li").first().addClass("on");
    /*鼠标点击圆点*/
    $(".click-dot .num li").click(function(){
        var index=$(this).index();
        i=index;
        $(".story-container .banner").stop().animate({left:-index*conWidth},800);
        $(this).addClass("on").siblings().removeClass("on");
    });
    /*自动轮播*/
    var t=setInterval(function(){
        i++;
        move()
    },3000);
    /*对banner定时器的操作*/
    $(".story-container").hover(function(){
        clearInterval(t);
    },function(){
        t=setInterval(function(){
            i++;
            move();
        },3000)
    });
    function move(){
        if(i==size){
            $(".story-container .banner").css({left:0});
            i=1;
        }
        if(i==-1){
            $(".story-container .banner").css({left:-(size-1)*conWidth});
            i=size-2;
        }
        $(".story-container .banner").stop().animate({left:-i*conWidth},800);
        if(i==size-1){
            $(".click-dot .num li").eq(0).addClass("on").siblings().removeClass("on")
        }else{
            $(".click-dot .num li").eq(i).addClass("on").siblings().removeClass("on")
        }
    }
}