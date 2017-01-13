/**
 * Created by Jason on 2016/12/10.
 */
var localBgUrl = localStorage.getItem("background");
var nowBg = localBgUrl;

$(function(){
    //从localStorage中的到背景地址；
    if (localBgUrl == null || localBgUrl== "default"|| localBgUrl== undefined){
        $("body .wrapper").removeClass("has-bg");
    }else {
        setBackground(localBgUrl);
    }
    showsSideBar();
    scrollMore();
    mianContentTap();
    topFixed();
    selectSkin()
});

//内容切换
function mianContentTap(){
    var menuItem = $(".menu_bar .menu_item");//切换条目
    var tapItem = $(".content_tap .tap_item");//切换内容
    menuItem.on("click",function(e){
        var _this = $(this);
        var index = _this.index();
        menuItem.removeClass("menu_action");
        _this.addClass("menu_action");
        tapItem.eq(index).addClass("tap_action").siblings().removeClass("tap_action");
    })
}
//显示侧边栏
function showsSideBar(){
    var btnMore = $("#nav_move");
    var sideBar = $(".side_bar");
    btnMore.hover(function(){
        sideBar.css({display:"block","z-index":"1100"});
    },function(){
        sideBar.css({display:"none"});
    });
    sideBar.hover(function(){
        sideBar.css({display:"block"});
    },function(){
        sideBar.css({display:"none"});
    })
}

//滚动查看更多
function scrollMore(){
    var btnShowMore = $('.show_more_btn');
    var tabContent =$('.content_tap');
    btnShowMore.on('click',function(e){
        tabContent.css("height","auto");
        btnShowMore.css("visibility","hidden")
    });

    // jquery 兼容的滚轮事件
    $(window).on("mousewheel DOMMouseScroll", function (e) {
        var delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1)) || // chrome & ie
            (e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1)); // firefox
        if (delta > 0) {
            // 向上滚
            //console.log("wheelup");
        } else if (delta < 0) {
            // 向下滚
            //console.log("wheeldown");
            tabContent.css("height","auto");
            btnShowMore.css("visibility","hidden");
        }
    });
}

//搜索天浮动
function topFixed(){
    var searchHeight = $(".search_bar").offset().top;
    $(window).scroll(function(){
        //var docHeight = $(document).height();
        var sTop = $(window).scrollTop();
        if (sTop >= searchHeight-20){
            $(".head_container").addClass("logo_fixed");
        }else if(sTop < searchHeight-20){
            $(".head_container").removeClass("logo_fixed");
        }
    })
}

//换肤
function selectSkin(){
    var btnSkin = $('#btn-skin');//换肤按钮
    var themeWrap = $('.theme_container');//换肤面板
    var imgItem = $('.picture_item .img-item');//背景图列表
    var listItem = $('.theme_nav_left .list_item');//换肤导航条
    var picItem = $('.picture_wrap .picture_item');//导航内容
    var t;//延时
    //换肤导航条切换
    listItem.on('click',function(e){
        var _this = $(this);
        var index = _this.index();
        listItem.removeClass("action");
        _this.addClass("action");
        picItem.eq(index).addClass("action").siblings().removeClass("action");

    });
    //皮肤面板的滑出滑入
    btnSkin.on('click',function(e){
        themeWrap.slideDown(1000,function(){
            themeWrap.css({display:"block"})
        })
    });
    $('#theme_base').on('click',function(e){
        themeWrap.find(".theme_block").slideUp(800,function(){
            $(this).css({display:"block"});
            themeWrap.css({display:"none"})
        })
    });
    $('.theme_nav_right').on('click',function(e){
        themeWrap.find(".theme_block").slideUp(800,function(){
            $(this).css({display:"block"});
            themeWrap.css({display:"none"})
        })
    });
    //鼠标悬停预览
    imgItem.hover(function(e){
        clearTimeout(t);
        var _this = $(this);
        var imgSrc = _this.children('img').attr('src');//缩略图地址
        $('.show_bg_img img').attr('src', imgSrc);//设置预览图片
        $('.theme_show .show_frame').addClass("has_bg");//改变预览的框架内容
    },function(e){
        t = setTimeout(function(){
            if(nowBg  == "default"|| nowBg  == undefined){
                $('.show_bg_img img').attr('src', "");//设置预览图片
                $('.theme_show .show_frame').removeClass("has_bg");
            }else {
                $('.show_bg_img img').attr('src', nowBg );
            }
        },1300);
    });
    //鼠标点击修改背景
    imgItem.on('click',function(){
        var _this = $(this);
        var imgUrl = "img/theme/"+_this.attr("data-img");//img地址
        imgItem.removeClass("on");
        _this.addClass("on");//给点击的缩略图添加已选
        setBackground(imgUrl);
        localStorage.setItem("background",imgUrl);
        nowBg = imgUrl;
        //console.log(bgImg);
    });
    //不使用换肤按钮
    $('.bg_default').on('click',function(){
        var bgEle = $(".wrapper .background_skin");//背景图片的div
        bgEle.css({
            "background-color" : "#fff",
            "background-image" : ""

        });
        imgItem.removeClass("on");//去掉缩略图标记
        $('.show_bg_img img').attr('src', "");//设置预览图片
        $('.theme_show .show_frame').removeClass("has_bg");//改变预览的框架内容
        $("body .wrapper").removeClass("has-bg");
        localStorage.setItem("background","default");
        nowBg = "default";
    })
}
//设置背景图片
function setBackground(url){
    var imgUrl = url;//img地址
    var bgEle = $(".wrapper .background_skin");//背景图片的div
    $('.show_bg_img img').attr('src', imgUrl);//设置预览图片
    $('.theme_show .show_frame').addClass("has_bg");//改变预览的框架内容
    bgEle.css({
        'background-image' : "url('"+imgUrl+"')",
        'background-color' : '#fff',
        'haha':"111"

    });
    $("body .wrapper").addClass("has-bg");
}