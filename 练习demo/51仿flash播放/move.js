//封装函数
//给元素添加类
function addClass(elem,value){
	if (!elem.className) {
		elem.className=value;
	}else{
		var newClassName=elem.className;
		newClassName+=' ';
		newClassName+=value;
		elem.className=newClassName;
	}
}
//给元素删除类
function deleteClass(elem,value){
	var newClassName=elem.className;
	if (newClassName.indexOf(value)) {
		elem.className=newClassName.replace(value,"");
	}
}
//抖动函数（结合getStyle用）
function shake(obj,attr,endFn){
    if ( obj.onOff ) return; // 修复抖的bug,如果obj.onOff为真(num小于length)，执行return，后面的语句不执行
    obj.onOff = true;

    var pos=parseInt(getStyle(obj,attr));
    var arr=[];
    var num=0;
    var shakeTimer=null;

    for(var i=20;i>0;i-=2){
        arr.push(i,-i);
    }
    arr.push(0);
    
    clearInterval(obj.shakeTimer);

    obj.shakeTimer=setInterval(function(){
        obj.style[attr]=pos+arr[num]+'px';
        num++;
        if(num===arr.length){
            clearInterval(obj.shakeTimer);
            obj.onOff=false;//设置开关为假，当抖动停止时，在endFn之前
            endFn&&endFn();
        }
    },50);
}
//获取样式属性值
function getStyle(obj,attr){
    if(obj.currentStyle)
    	{return(obj.currentStyle[attr]);}
    else
    	{return(getComputedStyle(obj,false)[attr]);}
    /*return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj)[attr];*/
}
//获取某类元素
function getByClass(oParent,sClass){
    var aEle=oParent.getElementsByTagName("*");
    var aResult=[];
    var i=0;

    for(i=0;i<aEle.length;i++)
    {
    	if(aEle[i].className==sClass)
    		aResult.push(aEle[i]);
    }
    return aResult;
}
/* var re=/'\\b'+name+'\\b'/i;  re=new RegExp('\\b'+name+'\\b','i');   if(re.test(aObj[i].className));*/
//可从包含多个类名的对象中获取
function getElementsByClassName(obj,tagname,name){
    var aObj=obj.getElementsByTagName(tagname);
    var arr=[];
    for(var i=0;i<aObj.length;i++){
        var aClassNames=aObj[i].className.split(' ');
        for(var j=0;j<aClassNames.length;j++){
            if(aClassNames[j]==name){
                arr.push(aObj[i]);
                break;
            }            
        }
    }
    return arr;
}

//运动上下左右
function doMove(obj,attr,dir,target,endFn){
    dir=parseInt(getStyle(obj,attr))<target?dir:-dir;
    clearInterval(obj.timer);
    obj.timer=setInterval(function(){
        var speed=parseInt(getStyle(obj,attr))+dir; 
        if(speed>target&&dir>0||speed<target&&dir<0){
        	speed=target;
        }
        obj.style[attr]=speed+'px';
        if(speed==target){
            setInterval(obj.timer);
            endFn&&endFn(); 
        }
    },30)
}
//运动框架(包含透明度)
function startMove(obj,attr,iTarget,endFn){
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		var iCur=0;
		if(attr=='opacity')
			{iCur=parseInt(parseFloat(getStyle(obj,attr))*100);}
		else
			{iCur=parseInt(getStyle(obj, attr));}
		var iSpeed=(iTarget-iCur)/5;
		iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
		if (iCur==iTarget) 
		{
			clearInterval(obj.timer);
            endFn&&endFn();
		}
		else
		{
			if (attr=='opacity') 
			{
                obj.style.filter='alpha(opacity:'+(iCur+iSpeed)+')';
                obj.style.opacity=(iCur+iSpeed)/100;
			}
            else
            {
            	obj.style[attr]=iSpeed+iCur+'px';
            }
		}
	},30)
}
//匀速运动
function doMove(obj,attr,dir,target,endFn){
    dir=parseInt(getStyle(obj,attr))>target?-dir:dir;
    clearInterval(obj.timer);
    obj.timer=setInterval(function(){
        var speed=parseInt(getStyle(obj,attr))+dir;
        if(speed>target&&dir>0||speed<target&&dir<0){
            speed=target;
        }
        obj.style[attr]=speed+'px';
        if(speed==target){
            clearInterval(obj.timer);
            endFn&&endFn();
        }
    },50)
}
//完美运动框架 可同时改变多个值,缓冲运动
function startMove(obj, json, fn)
{
    clearInterval(obj.timer);
    obj.timer=setInterval(function (){
        var bStop=true; 
        for(var attr in json)
        {
            var iCur=0;
            
            if(attr=='opacity')
            {
                iCur=parseInt(parseFloat(getStyle(obj, attr))*100);
            }
            else
            {
                iCur=parseInt(getStyle(obj, attr));
            }
            
            var iSpeed=(json[attr]-iCur)/8;
            iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
            
            if(iCur!=json[attr])
            {
                bStop=false;
            }
            
            if(attr=='opacity')
            {
                obj.style.filter='alpha(opacity:'+(iCur+iSpeed)+')';
                obj.style.opacity=(iCur+iSpeed)/100;
            }
            else
            {
                obj.style[attr]=iCur+iSpeed+'px';
            }
        }
        
        if(bStop)
        {
            clearInterval(obj.timer);
            
            if(fn)
            {
                fn();
            }
        }
    }, 30)
}