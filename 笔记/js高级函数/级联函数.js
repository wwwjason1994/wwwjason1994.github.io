//也叫链式函数 chain

function createPreson(){
	this.head="";
	this.body="";
	this.foot="";
}

createPreson.prototype = {
	constructor : createPreson,
	setHead:function(data){
		this.head=data;
		return this;
	},
	setBody:function(data){
		this.body=data;
		return this;
	},
	setfoot:function(data){
		this.foot=data;
	}
}

var p = new createPreson();
p.setHead("大头").setBody("瘦子").setfoot("大长腿");
console.log(p);
//$('#id').html().val().atrr();就像jQuery一样