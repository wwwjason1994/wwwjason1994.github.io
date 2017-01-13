// curry 就是把需要传的参数进行合并，把第一个函数的参数合并成整体的，传递给统一的函数
//http://www.zhangxinxu.com/wordpress/2013/02/js-currying/
//柯里化（Currying），又称部分求值（Partial Evaluation）
//是把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，
//并且返回接受余下的参数而且返回结果的新函数的技术。

function currying(fn){
	var arg = Array.prototype.slice.call(arguments,1);
	console.log(arg);
	return function (){
		var innerArgs = [].slice.call(arguments);
		var finalArgs = arg.concat(innerArgs);
		return fn.apply(this,finalArgs);
	}
}

function add(){
	var len = arguments.length;
	var count = 0 ;
	for(i=0; i<len;i++){
		count +=arguments[i]; 
	}
	return count;
}

currying(add,50)(1,3);
// add = curry(add,50);
// add(1,2,3,4,5,18);