$().extend('animate',function(json){
	var i=0;
	for(i=0;i<this.elements.length;i++){
		startMove(this.elements[i],json);
	}

	function getStyle(obj,attr){
        return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj,false)[attr];
	}

	function startMove(obj,json,fn){
		clearInterval(obj.timer);
		obj.timer=setInterval(function(){
            var bStop=true;
            for(var attr in json){
            	//取当前的值
            	var iCur=0;
            	if(attr=='opacity'){
            		iCur=parseInt(parseFloat(getStyle(obj,attr))*100);
            	}else{
            		iCur=parseInt(getStyle(obj,attr));
            	}
                //算速度
                var iSpeed=(json[attr]-iCur)/8;
                iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
                //检测停止
                if(iCur!=json[attr]){
                	bStop=false;
                }
                if(attr=='opacity'){
                	obj.style.filter='alpha(opacity:'+(iCur+iSpeed)+')';
                	obj.style.opacity=(iCur+iSpeed)/100;
                }else{
                	obj.style[attr]=iCur+iSpeed+'px';
                }
            }
            if(bStop){
            	clearInterval(obj.timer);
            	if(fn){fn();}
            }
		},30)
	}
})