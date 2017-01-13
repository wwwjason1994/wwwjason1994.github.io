$(document).ready(function() {
	refreshLists('精选');

	//点击切换
	$('nav a').on('click',function(event) {
		$('nav a').removeClass('action')
		$(this).addClass('action');
		event.preventDefault();
		var newtype = $(this).text();
		refreshLists(newtype);
	});
});

//内容刷新
function refreshLists($type){
	var Lists = $('ul.news-lists');//ul列表
	Lists.empty();
	//显示加载动画
	$('.loading-img').css('display','block');
	$.ajax({
		url: './news',
		type: 'get',
		dataType: 'json',
		data: {newtype: $type},
		success:function(data){
			//console.log(data);
			//隐藏加载动画
			$('.loading-img').css('display','none');
			$(data).each(function(index, item) {
				var $list = $('<li>').addClass('news-list').appendTo(Lists);
				var $newsImg = $('<div>').addClass('newsimg').appendTo($list);
				var $img = $('<img>').attr('src', item.newsimg).appendTo($newsImg);
				var $newsContent = $('<div>').addClass('newscontent').appendTo($list);
				var $h1 = $('<h1>').html(item.newstitle).appendTo($newsContent);
				var $p = $('<p>').appendTo($newsContent);
				//var $time = item.newstime.replace("T"," ");
				//$time = $time.replace("Z","");
				var $newsTime = $('<span>').addClass('newstime').html(item.newstime).appendTo($p);
				var $newsSrc = $('<span>').addClass('newssrc').html(item.newssrc).appendTo($p);
			});
		}
	});

}

//html标签转义
function HTMLEncode(html) {
    var temp = document.createElement("div");
    (temp.textContent != null) ? (temp.textContent = html) : (temp.innerText = html);
    var output = temp.innerHTML;
    temp = null;
    return output;
}
function HTMLDecode(text) { 
    var temp = document.createElement("div"); 
    temp.innerHTML = text; 
    var output = temp.innerText || temp.textContent; 
    temp = null; 
    return output; 
}