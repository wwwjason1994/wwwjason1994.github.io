$(document).ready(function() {
	refreshNews();
	insertNews();
	deleteNews();
	updateNews()

});
//添加新闻
function insertNews(){
	var insertbtn = $('#insertbtn');//添加按钮
	var insertModal=$('#insertModal');//模态框
	insertbtn.click(function(event) {
		event.preventDefault();
		insertModal.modal('show');
	});
	insertModal.find('#confirminsert').click(function(event) {
		//表单内容
		var titleVal = $('#newstitle').val();
		var typeVal = $('#newstype').val();
		var imgVal = $('#newsimg').val();
		var timeVal = $('#newstime').val();
		var srcVal = $('#newssrc').val();
		
		//输入验证
		if(titleVal==="" ||typeVal==="" || imgVal==="" 
			||srcVal==="" ||timeVal===""){
			if (titleVal==="") {
				$('#newstitle').parent().addClass('has-error');
			}else{
				$('#newstitle').parent().removeClass('has-error')
			}
			if (typeVal==="") {
				$('#newstype').parent().addClass('has-error');
			}else{
				$('#newstype').parent().removeClass('has-error')
			}
			if (imgVal==="") {
				$('#newsimg').parent().addClass('has-error');
			}else{
				$('#newsimg').parent().removeClass('has-error')
			}
			if (timeVal==="") {
				$('#newstime').parent().addClass('has-error');
			}else{
				$('#newstime').parent().removeClass('has-error')
			}
			if (srcVal==="") {
				$('#newssrc').parent().addClass('has-error');
			}else{
				$('#newssrc').parent().removeClass('has-error')
			}
		}else{
			var obj = {
				newtitle : titleVal,
				newtype : typeVal,
				newimg : imgVal,
				newsrc : srcVal,
				newtime : timeVal
			}
			//将输入的内容过滤html标签
			for(var item in obj){
				obj[item] = HTMLEncode(obj[item]);
			}
			//提交添加内容
			$.ajax({
				url: './admin/insert',
				type: 'post',
				dataType: 'json',
				data: obj,
				success:function(data){
					//console.log(data);
					insertModal.modal('hide');
					$('#insertModal .form-group').removeClass('has-error');
					$('#insertModal form')[0].reset();//提交完重置表单
					refreshNews();
				}
			});
		}
	});
}

//删除新闻
function deleteNews(){
	var tbody = $('#newstable').find('tbody');
	var deleteModal=$('#deleteModal');//删除模态框
	var deleteid = null; //id
	tbody.on('click', '.btn-danger', function(event) {
		event.preventDefault();
		deleteModal.modal('show');
		deleteid = $(this).parent().prevAll().eq(6).html();
	});

	$('#deleteModal #confirmDelete').click(function(event) {
		if(deleteid){
			$.ajax({
				url: './admin/delete',
				type: 'post',
				dataType: 'json',
				data: {newid: deleteid},
				success:function(data){
					console.log(data);
					deleteModal.modal('hide');
					refreshNews();
				}
			});
		}
	});
}
//编辑新闻
function updateNews(){
	var tbody = $('#newstable').find('tbody');
	var updateModal=$('#updateModal')//模态框
	var updateid = null; //id
	tbody.on('click', '.btn-primary', function(event) {
		event.preventDefault();
		updateModal.modal('show');
		updateid = $(this).parent().prevAll().eq(5).html();
		$.ajax({
			url: './admin/curnews',
			type: 'post',
			dataType: 'json',
			data: {newid: updateid},
			success:function(data){
				for(var item in data[0]){
					data[0][item] = HTMLDecode(data[0][item]);
					//console.log(data[0][item]);
				}
				$('#unewstitle').val(data[0].newstitle);
				$('#unewstype').val(data[0].newstype);
				$('#unewsimg').val(data[0].newsimg);
				$('#unewssrc').val(data[0].newssrc);
				var utime = data[0].newstime.replace(/ /,"T")
				$('#unewstime').val(utime);
			}
		});
	});
	//点击修改按钮
	$('#updateModal #confirmUpdate').click(function(event) {
		var newsObj = {
			newtitle : $('#unewstitle').val(),
			newtype : $('#unewstype').val(),
			newimg : $('#unewsimg').val(),
			newsrc : $('#unewssrc').val(),
			newtime : $('#unewstime').val(),
			newid : updateid
			};
		//将输入的内容过滤html标签
		for(var item in newsObj){
			newsObj[item] = HTMLEncode(newsObj[item]);
		}
		$.ajax({
			url: './admin/update',
			type: 'POST',
			dataType: 'json',
			data: newsObj,
			success:function(data){
				updateModal.modal('hide');
				refreshNews();
			}
		});
	});
}
//刷新新闻条目
function refreshNews(){
	var tbody = $('#newstable').find('tbody');
	tbody.empty();//清空table内容
	$.ajax({
		url: './admin/all',
		type: 'get',
		dataType: 'json',
		success:function(data){
			$(data).each(function(index,item){
				var $tdid = $('<td>').html(item.id);
				var $tdtype = $('<td>').html(item.newstype);
				var $tdtitle = $('<td>').html(item.newstitle);
				var $tdimg = $('<td>').html(item.newsimg);
				var $tdsrc = $('<td>').html(item.newssrc);
				var $tdtime = $('<td>').html(item.newstime);
				var $tdctrl1 = $('<td>');
				var $tdctrl2 = $('<td>');
				var $btnupdate = $('<a>').addClass('btn btn-primary btn-xs').html('编辑');
				var $btndelete = $('<a>').addClass('btn btn-danger btn-xs').html('删除');
				$tdctrl1.append($btnupdate);
				$tdctrl2.append($btndelete);
				var $tRow = $('<tr>');
				$tRow.append($tdid,$tdtype,$tdtitle,$tdimg,$tdsrc,$tdtime,$tdctrl1,$tdctrl2);
				tbody.append($tRow);
			});
		}
	})
	
}
//html标签转义
function HTMLEncode(html) {
    var temp = document.createElement("div");
    (temp.textContent != null) ? (temp.textContent = html) : (temp.innerText = html);
    var output = temp.innerHTML;
    temp = null;
    return output;
}
//逆转义
function HTMLDecode(text) { 
    var temp = document.createElement("div"); 
    temp.innerHTML = text; 
    var output = temp.innerText || temp.textContent; 
    temp = null; 
    return output; 
} 