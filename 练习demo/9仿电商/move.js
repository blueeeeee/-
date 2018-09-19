//封装函数
//获取样式属性值
function getStyle(obj,attr){
    if(obj.currentStyle)
    	{return(obj.currentStyle[attr]);}
    else
    	{return(getComputedStyle(obj,false)[attr]);}
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

//运动框架
function startMove(obj,attr,iTarget){
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
