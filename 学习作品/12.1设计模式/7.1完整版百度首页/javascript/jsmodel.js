
var localBgUrl = localStorage.getItem("background");
var nowBg = localBgUrl;

$(function(){
	selectSkin();
    mainContentTap();
    allEffect();
});


/**
*原型模式+单例模式
*外部复写内部函数时只会改变当前实例对象的方法，
*原本的函数不会被改变，不会影响到其他实例对象，
*单例方面，外部只调用一个接口就可以实现多个方法和得到想要的数据
**/
//内容切换
var mainContentTap = function(){
	//这样即使不写new也不会有问题了
	if (!(this instanceof mainContentTap)){
		return new mainContentTap();
	}
	this.init.apply(this,arguments);
}
mainContentTap.prototype = {
	constructor:mainContentTap,
	init:function(){
		var me = this;
		me.render();
		me.bind();
	},
	render:function(){
		var me = this;
		me.menuItem = $(".menu_bar .menu_item");//切换条目
    	me.tapItem = $(".content_tap .tap_item");//切换内容
	},
	bind:function(){
		var me = this;
		me.menuItem.on('click',function(e){
			me.switching(e,$(this));
		});
	},
	switching:function(e,target){
		var me = this;
		var $this = target;
        var index = $this.index();
        me.menuItem.removeClass("menu_action");
        $this.addClass("menu_action");
        me.tapItem.eq(index).addClass("tap_action").siblings().removeClass("tap_action");
	},
}

//页面的所有特效 放在一起
var allEffect = function (){
	if (!(this instanceof allEffect)){
		return new allEffect();
	}
	this.init.apply(this,arguments);
}
allEffect.prototype = {
	constructor : allEffect,
	init:function(){
		var me = this;
		me.showsSideBar();
		me.scrollMore();
		me.topFixed();
	},
	//显示侧边栏
	showsSideBar:function(){
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
	},
	//滚动查看更多
	scrollMore: function (){
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
	},
	//搜索框浮动
	topFixed: function(){
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
}

//换肤
var selectSkin = function(){
    //调用时，不写new也可以
	if (!(this instanceof selectSkin)){
		return new selectSkin();
	}
	//打开网页时设置背景，从localStorage中的到背景地址；
    if (localBgUrl == null || localBgUrl== "default"|| localBgUrl== undefined){
        $("body .wrapper").removeClass("has-bg");
    }else {
        this.setBackground(localBgUrl);
    }
	this.init.apply(this,arguments);
}
selectSkin.prototype={
	constructor:selectSkin,
	init:function(){
		var me = this;
		me.render();
		me.runnning();
	},
	render:function(){
		var me = this;
		me.btnSkin = $('#btn-skin');//换肤按钮
	    me.themeWrap = $('.theme_container');//换肤面板
	    me.imgItem = $('.picture_item .img-item');//背景图列表
	    me.listItem = $('.theme_nav_left .list_item');//换肤导航条
	    me.picItem = $('.picture_wrap .picture_item');//导航内容
	    me.t = null;//延时
	},
	runnning:function(){
		var me = this ;
		me.selectSkinNav();
  		me.SkinPanelSlideDown();
  		me.mouseHoverSkin();
  		me.mousedownChangeSkin();
  		me.clickNoSkin();
	},
	selectSkinNav:function(){
		var me = this;
		//换肤导航条切换
	    me.listItem.on('click',function(e){
	        var _this = $(this);
	        var index = _this.index();
	        me.listItem.removeClass("action");
	        _this.addClass("action");
	        me.picItem.eq(index).addClass("action").siblings().removeClass("action");

	    });
	},
	SkinPanelSlideDown:function(){
		var me = this;
		//皮肤面板的滑出滑入
	    me.btnSkin.on('click',function(e){
	        me.themeWrap.slideDown(1000,function(){
	            me.themeWrap.css({display:"block"})
	        })
	    });
	    $('#theme_base').on('click',function(e){
	        me.themeWrap.find(".theme_block").slideUp(800,function(){
	            $(this).css({display:"block"});
	            me.themeWrap.css({display:"none"})
	        })
	    });
	    $('.theme_nav_right').on('click',function(e){
	        me.themeWrap.find(".theme_block").slideUp(800,function(){
	            $(this).css({display:"block"});
	            me.themeWrap.css({display:"none"})
	        })
	    });
	},
	mouseHoverSkin:function(){
		var me = this;
		//鼠标悬停预览
	    me.imgItem.hover(function(e){
	        clearTimeout(me.t);
	        var _this = $(this);
	        var imgSrc = _this.children('img').attr('src');//缩略图地址
	        $('.show_bg_img img').attr('src', imgSrc);//设置预览图片
	        $('.theme_show .show_frame').addClass("has_bg");//改变预览的框架内容
	    },function(e){
	        me.t = setTimeout(function(){
	            if(nowBg  == "default"|| nowBg  == undefined){
	                $('.show_bg_img img').attr('src', "");//设置预览图片
	                $('.theme_show .show_frame').removeClass("has_bg");
	            }else {
	                $('.show_bg_img img').attr('src', nowBg );
	            }
	        },1000);
	    });
	},
	mousedownChangeSkin:function(){
		var me = this;
		 //鼠标点击修改背景
	    me.imgItem.on('click',function(){
	        var _this = $(this);
	        var imgUrl = "img/theme/"+_this.attr("data-img");//img地址
	        me.imgItem.removeClass("on");
	        _this.addClass("on");//给点击的缩略图添加已选
	        me.setBackground(imgUrl);
	        localStorage.setItem("background",imgUrl);
	        nowBg = imgUrl;
	        //console.log(bgImg);
	    });
	},
	clickNoSkin:function(){
		var me = this;
		//不使用换肤的按钮
	    $('.bg_default').on('click',function(){
	        var bgEle = $(".wrapper .background_skin");//背景图片的div
	        bgEle.css({
	            "background-color" : "#fff",
	            "background-image" : ""

	        });
	        me.imgItem.removeClass("on");//去掉缩略图标记
	        $('.show_bg_img img').attr('src', "");//设置预览图片
	        $('.theme_show .show_frame').removeClass("has_bg");//改变预览的框架内容
	        $("body .wrapper").removeClass("has-bg");
	        localStorage.setItem("background","default");
	        nowBg = "default";
	    })
	},
	//设置背景图片
	setBackground: function (url){
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
};


