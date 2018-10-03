//绑定事件
function myAddEvent(obj,sEv,fn){
	if(obj.attachEvent){
		obj.attachEvent('on'+sEv,function(){
			if(fn.call(obj)==false){
				event.cancelBubble=true;
				return false;
			}
		});
	}else{
		obj.addEventListener(sEv,function(ev){
			if(fn.call(obj)==false){
				event.cancelBubble=true;
				return false;
			}			
		},false);
	}
}
//通过类名获取元素
function getByClass(oParent,sClass){
	var aEle=oParent.getElementsByTagName('*');
	var aResult=[];
	var i=0;
	for(i=0;i<aEle.length;i++){
		if(aEle[i].className==sClass){
			aResult.push(aEle[i]);
		}
	}
    return aResult;
}
//获取样式
function getStyle(obj,attr){
    return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj,false)[attr];
}
//核心函数
function VQuery(vArg){
	this.elements=[];

	switch(typeof vArg){
		case 'function':
			myAddEvent(window,'load',vArg);
			break;
		case 'string':
		    switch(vArg.charAt(0)){
		    	case '#':
		    	    var obj=document.getElementById(vArg.substring(1));
		    	    this.elements.push(obj);
		    	    break;
		    	case '.':
		    	    this.elements=getByClass(document,vArg.substring(1));
		    	    break;
		        default:
		            this.elements=document.getElementsByTagName(vArg);
		    }
		    break;
		case 'object':
		    this.elements.push(vArg);
	}
}
//点击函数
VQuery.prototype.click=function(fn){
    var i=0;
    for(i=0;i<this.elements.length;i++){
    	myAddEvent(this.elements[i],'click',fn);
    }
    return this;//为链式操作返回对象
};
//显示函数
VQuery.prototype.show=function(){
	var i=0;
	for(i=0;i<this.elements.length;i++){
		this.elements[i].style.display='block';
	}
	return this;
};
//隐藏函数
VQuery.prototype.hide=function(){
	var i=0;
	for(i=0;i<this.elements[i].length;i++){
		this.elements[i].style.display='none';
	}
};
//移入移出函数
VQuery.prototype.hover=function(fnOver,fnOut){
	var i=0;
	for(i=0;i<this.elements[i].length;i++){
		myAddEvent(this.elements[i],'mouseover',fnOver);
		myAddEvent(this.elements[i],'mouseout',fnOut);
	}
};
//获取或设置样式
VQuery.prototype.css=function(attr,value){
    if(arguments.length==2){
    	var i=0;
    	for(i=0;i<this.elements.length;i++){
    		this.elements[i].style[attr]=value;
    	}
    }else{
    	if(typeof attr=='string'){
    		return getStyle(this.elements[0],attr);
    	}else{//如果为json形式
    		for(i=0;i<this.elements.length;i++){
    			var k='';
    			for(k in attr){
    				this.elements[i].style[k]==attr[k];
    			}
    		}
    	}
    }
    return false;
};
//获取或设置属性
VQuery.prototype.attr=function(attr,value){
	if(arguments.length==2){
		var i=0;
		for(i=0;i<this.elements.length;i++){
			this.elements[i][attr]=value;
		}
	}else{
		return this.elements[0][attr];
	}
	return this;
};
//切换函数
VQuery.prototype.toggle=function(){
	var i=0;
	var _arguments=arguments;
	for(i=0;i<this.elements.length;i++){
		addToggle(this.elements[i]);
	}
	function addToggle(obj){
		var count=0;
		myAddEvent(obj,'click',function(){
			_arguments[count++%_arguments.length].call(obj);
		});
	}
	return this;
}
//选择器eq
VQuery.prototype.eq=function(n){
	return $(this.elements[n]);
};
//将类数组转化为数组
function appendArray(arr1,arr2){
	var i=0;
	for(i=0;i<arr2.length;i++){
        arr1.push(arr2[i]);
	}
}
//选择器find
VQuery.prototype.find=function(str){
	var i=0;
	var aResult=[];
	for(i=0;i<this.elements.length;i++){
		switch(str.charAt(0)){
			case '.'://类
			    var aEle=getByClass(this.elements[i],str.substring(1));
			    aResult=aResult.concat(aEle);
			    break;
			default://标签
			    var aEle=this.elements[i].getElementsByTagName('str');
			    appendArray(aResult,aEle);
			}
		}  
    var newVquery=$();
    newVquery.elements=aResult;
    return newVquery;
};
//取得索引
function getIndex(obj){
	var aBrother=obj.parentNode.children;
	var i=0;
	for(i=0;i<aBrother.length;i++){
		if(aBrother[i]==obj){
			return i;
		}
	}
}
VQuery.prototype.index=function(){
	return getIndex(this.elements[0]);
}
//绑定事件
VQuery.prototype.bind=function(sEv,fn){
    var i=0;
    for(i=0;i<this.elements.length;i++){
    	myAddEvent(this.elements[i],sEv,fn);
    }
}
//扩展插件函数
VQuery.prototype.extend=function(name,fn){
	VQuery.prototype[name]=fn;
};

function $(vArg){
	return new VQuery(vArg);
}