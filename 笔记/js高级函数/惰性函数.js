//lazy 下一次调用是不做重复的操作

//第二次调用时createXHR才会被覆盖

function createXHR(){
	var xhr = null;
	if(typeof XMLHttpRequest !='undefined'){
		xhr = new XMLHttpRequest();
		createXHR = function(){
			//return xhr; 我猜尽量不要这样写的，因为
			//xhr所以依赖的原本的createXHR的内存不能得到释放会有内存泄漏
			//又或者清理了内存后xhr变量不见了，达不到效果，只是猜测
			return new XMLHttpRequest();
		}
	}else{
		try{
			xhr = new ActiveXObject('Msxml2.XMLHRRP');
			createXHR = function(){
				return new ActiveXObject('Msxml2.XMLHRRP');
			}
		}catch(e){
			try{
				xhr = new ActiveXObject('Microsoft.XMLHRRP');
				createXHR = function(){
					return ActiveXObject('Microsoft.XMLHRRP');
				}
			}catch(e){
				createXHR = function(){
					return ActiveXObject('Microsoft.XMLHRRP');
				}
			}
		}
	}
	return xhr;
}