<?php 

	//接口声明
	interface test{
		function fun();
	}
	class work implements test{
		const mz = "hah";
		public function fun($value = ""){
			echo "do interface";
		}
	}
	$data = new work();
	$data->fun();
	/**
	* 声明父类叫做car
	*/
	class Car{
		public $color;
		public $price;
		public statuc $f = 0;
		function __construct($c,$p)
		{
			//构造函数 自行执行
			$this->color = $c;
			$this->price = $p;
		}
		public function p(){
			echo(++self::$f);
		}
		public function getCar(){
			echo "您汽车的颜色是".$this->color."价格是".$this->price;
		}
		public function testPrivate(){
			echo ('我是Private');
		}
		public function testProtected(){
			echo ('我是Protected');
		}
	}
	//实例化对象
	$k = new Car("red",1000);
	$k->p()

	/**
	*继承父类汽车
	*/

	class Cruze extends Car {
		function __consturct($color,$price){
			parent::__consturct($color,$price);
		}
		public function testPrivate(){
			//parent::testPrivate();
			echo("我是自己的Private")；
		}
		public function testProtected(){
			parent::testProtected();
		}
	}
//$this->拿到的是当前类的对象 或者 类的对象 $a = new Car();$a->
//$this-> 那的不是静态的属性和对象
//self::专门拿当前类的静态变量 static

?>


<script type="text/javascript">
//js里面模拟接口的功能
function testInterface(){
	this.go = function(){
		throw.new Error("");
	}
}

//js的构造函数 被自己隐藏起来 然后自己确定执行了
	function Car(color,price){
		// function construction(){
		// 	var go = "我是私有的"；
		// 	this.color = color;
		// 	this.pirce = price;
		// 	this.getGo = function(){
		// 		return go;
		// 	}
		// }//其实在后台已经隐性的执行了一个这样的构造函数
		var go = "我是私有的"；
		this.color = color;
		this.pirce = price;
		this.getGo = function(){
			return go;
		}
	}
//public getcar
	Car.prototype.getCar = function(){
		console.log("颜色"+this.color+",价格"+this.price);
	};
	function cruze(color,price){
		Car.call(this,color,price);
	};
	inherit(Car,cruze);
	cruze.prototype.test = function(){
		console.log("我是test");
	};
	//cruze.prototype = Object.create(Car.prototype);
	function inherit(father,son){
		var _prototype = Object.create(father.prototype);//创造父亲的副本
		_prototype.construction = son;//在更正自己的构造函数
		son.prototype = _prototype;//再给自己
	}
	//new car 拿了人家的属性和方法call的时候拿了人家的属性
	var _cruze = new cruze("white","red");
	console.log(_cruze);


</script>


