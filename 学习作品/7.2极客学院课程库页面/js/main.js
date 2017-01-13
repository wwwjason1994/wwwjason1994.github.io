/**
 * Created by Jason on 2016/12/13.
 */
$(function(){
    showSchBox();
    changeLessonList();
    itemHover();
    goTop();
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

//课程类别显示方式
function changeLessonList(){
    var lessonList = $(".lesson-list");
    var blockModeBtn = $(".previewMode .kuai-icon");
    var listModeBtn = $(".previewMode .list-icon");
    listModeBtn.on('click',function(e){
        if (!lessonList.hasClass("list2")){
            lessonList.addClass("list2");
            listModeBtn.addClass("curr");
            blockModeBtn.removeClass("curr");
            $(".lesson-infor").stop().css({height:"100%"});
            $(".lesson-infor p").stop().css({
                "display":"block",
                "opacity":"1"
            });
        }
    });
    blockModeBtn.on('click',function(e){
        if (lessonList.hasClass("list2")){
            lessonList.removeClass("list2");
            blockModeBtn.addClass("curr");
            listModeBtn.removeClass("curr");
            $(".lesson-infor").stop().css({height:"88px"});
            $(".lesson-infor p").stop().css({
                "display":"none",
                "opacity":"1"
            });
        }
    });
}

//课程项鼠标悬停
function itemHover(){
    var lessonList = $(".lesson-list");//整个课程列表
    var lessonLi = $(".lesson-list>ul>li");//课程列表项
    lessonLi.hover(function(e){
        //在显示模式1时才发动
        if (!$(".lesson-list").hasClass("list2")){
            var _this = $(this);
            var lesssonInfor = _this.find(".lesson-infor");
            _this.addClass("hover");
            //p描述淡入
            lesssonInfor.children("p").stop().fadeIn(500);
            //信息框滑下
            lesssonInfor.stop().animate({height: "175px"},300);
        }
    },function(e){
        //在显示模式1时才发动
        if (!$(".lesson-list").hasClass("list2")){
            var _this = $(this);
            var lesssonInfor = _this.find(".lesson-infor");
            //p描述淡出
            lesssonInfor.children("p").stop().fadeOut(500);
            //信息框滑上
            lesssonInfor.stop().animate({height: "88px"},300
                ,function(){
                _this.removeClass("hover");
            });
        }
    });
}

//回到顶部按钮
function goTop(){
    var _window = $(window);
    var goTopBtn = $("#gototop").children(".top");//回到顶部按钮
    var t = null; //延时
    _window.scroll(function(){
        var winTop = _window.scrollTop();
        if (winTop<50){
            goTopBtn.hide();
        }else{
            goTopBtn.show();
        }
    });
    //点击事件
    goTopBtn.on("click",function(e){
        var speedTop;//返回顶部的速度
        t = setInterval(function(){
            var winTop = _window.scrollTop();
            if (winTop<=10){
                $(window).scrollTop(0);
                clearInterval(t);
            }else{
                speedTop = winTop/2;
                $(window).scrollTop(winTop-speedTop);
            }
        },20);
    });
}