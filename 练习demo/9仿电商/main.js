/*javascript*/
window.onload=function(){
    mv.app.toTip();
    mv.app.toBanner();
    mv.app.toSe1();
    mv.app.toRun();
}

var mv={};//命名空间

mv.tools={};
//获取属性值
mv.tools.getStyle=function(obj,attr)
{
	if (obj.currentStyle)
		return(obj.currentStyle[attr]);
	else
	    return(getComputedStyle(obj,false)[attr]);
}
//获取同类元素
mv.tools.getByClass=function(oParent,sClass)
{
	var aEle=oParent.getElementsByTagName('*');
	var aResult=[];
	var i=0;

	for(i=0;i<aEle.length;i++)
    {
    	if(aEle[i].className==sClass)
        aResult.push(aEle[i]);
    }
    return aResult; 
}


mv.ui={};

//输入框文字提示
mv.ui.textChange=function(obj,str){
    obj.onfocus=function(){//输入框获得焦点时执行
    	if (this.value==str) {
    		this.value='';
    	}
    };
    obj.onblur=function(){
    	if (this.value=='') {//输入框失去焦点时实行
    		this.value=str;
    	}
    };   
};

//淡入
mv.ui.fadeIn=function(obj){
	var iCur=mv.tools.getStyle(obj,'opacity');
	if (iCur==1) {return false};

	var value=0;
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
        var iSpeed=5;
        if (value==100) {
        	clearInterval(obj.timer);
        }else{
        	value+=iSpeed;
        	obj.style.opacity=value/100;
        	obj.style.filter='alpha(opacity='+value+')';
        }
	},30);
};

//淡出
mv.ui.fadeOut=function(obj){
    var iCur=mv.tools.getStyle(obj,'opacity');
    if (iCur==0) {return false;}

    var value=100;
    clearInterval(obj.timer);
    obj.timer=setInterval(function(){
    	var iSpeed=-5;
        if (value==0) {
        	clearInterval(obj.timer);
        }else{
        	value+=iSpeed;
        	obj.style.opacity=value/100;
        	obj.style.filter='alpha(opacity='+value+')';
        }
    },30);
};

//向左移动，速度为正向右移动
mv.ui.moveLeft=function(obj,old,now){
    clearInterval(obj.timer);
    obj.timer=setInterval(function(){
    	var iSpeed=(now-old)/10;
    	iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);

    	if (now==old) {
    		clearInterval(obj.timer);
    	}else{
    		old+=iSpeed;
    		obj.style.left=old+'px';
    	}
    },30);
}

mv.app={};

//输入框文字提示
mv.app.toTip=function(){
	var oText1=document.getElementById('text1');
	var oText2=document.getElementById('text2');

	mv.ui.textChange(oText1,'Search website');
	mv.ui.textChange(oText2,'Search website');
};

//ad部分图片淡入淡出,自动轮播

mv.app.toBanner=function(){
    var oDd=document.getElementById('ad');
    var aLi=oDd.getElementsByTagName('li');

    var oPrev=mv.tools.getByClass(oDd,'prev')[0];
    var oNext=mv.tools.getByClass(oDd,'next')[0];

    var oPrevBg=mv.tools.getByClass(oDd,'prev_bg')[0];
    var oNextBg=mv.tools.getByClass(oDd,'next_bg')[0];
    
    var iNow=0;
    
    var timer=setInterval(auto,3000);
    //向后自动播放
    function auto(){
	    if (iNow==aLi.length-1) {
	    	iNow=0;
	    }
	    else{
	    	iNow++;
	    }
	    for(var i=0;i<aLi.length;i++){
	    	mv.ui.fadeOut(aLi[i]);
	    }
	    mv.ui.fadeIn(aLi[iNow]);
    }
    //向前自动播放
    function autoPrev(){   	
    	if(iNow==0){
    		iNow=aLi.length-1;
    	}
    	else{
    		iNow--;
    	}
    	for(var i=0;i<aLi.length;i++){
    		mv.ui.fadeOut(aLi[i]);
    	}
    	mv.ui.fadeIn(aLi[iNow]);
    }
    oPrevBg.onmouseover=oPrev.onmouseover=function(){
    	oPrev.style.display='block';
    	clearInterval(timer);
    };
    oNextBg.onmouseover=oNext.onmouseover=function(){
    	oNext.style.display='block';
    	clearInterval(timer);
    }
    oPrevBg.onmouseout=oPrev.onmouseout=function(){
    	oPrev.style.display='none';
    	timer=setInterval(auto,3000);
    };
    oNextBg.onmouseout=oNext.onmouseout=function(){
    	oNext.style.display='none';
    	timer=setInterval(auto,3000);
    };
    oPrev.onclick=function(){
    	autoPrev();
    };
    oNext.onclick=function(){
    	auto();
    };
};

//下拉菜单栏显示
mv.app.toSe1=function(){
	var oSe1=document.getElementById('se1');
	var aDds=oSe1.getElementsByTagName('dd');
    var aUls=oSe1.getElementsByTagName('ul');
    var aH2s=oSe1.getElementsByTagName('h2');
    
    //展示菜单栏
    for(var i=0;i<aDds.length;i++){
    	aDds[i].index=i;
    	aDds[i].onclick=function(ev){
    		var oEv=ev||window.event;
    		var iI=this.index;
    		for(var i=0;i<aUls.length;i++){
    			aUls[i].style.display='none';
    		}
    		aUls[this.index].style.display='block';

    		document.onclick=function(){
    			aUls[iI].style.display='none';    				
    		};
    		oEv.cancelBubble=true;//取消document的点击事件冒泡到dd上
    	};
    }

    //选择菜单项
    for(var i=0;i<aUls.length;i++){
    	aUls[i].index=i;
    	(function(ul){
            var aLis=ul.getElementsByTagName('li');
            for(var i=0;i<aLis.length;i++){
            	//鼠标移入移出
            	aLis[i].onmouseover=function(){
                    this.className='active';
            	};
            	aLis[i].onmouseout=function(){
            		this.className='';
            	}
                //点击菜单项
                aLis[i].onclick=function(ev){
                	var oEv=ev||window.event;
                	aH2s[this.parentNode.index].innerHTML=this.innerHTML;
                	oEv.cancelBubble=true;
                	this.parentNode.style.display='none';
                }
            }
    	})(aUls[i]);//封装函数，闭包
    }
};

//滚动图无缝切换
mv.app.toRun=function(){
    var oRun=document.getElementById('run1');
    var oUl=oRun.getElementsByTagName('ul')[0];
    var aLis=oUl.getElementsByTagName('li');

    var oPrev=mv.tools.getByClass(oRun,'pre')[0];
    var oNext=mv.tools.getByClass(oRun,'next')[0];

    var iNow=0;

    oUl.innerHTML+=oUl.innerHTML;
    oUl.style.width=aLis.length*aLis[0].offsetWidth+'px';

    oPrev.onclick=function(){
	    if (iNow==0) {
	    	iNow=aLis.length/2;
	    	oUl.style.left=-oUl.offsetWidth/2+'px';
	    }
	    mv.ui.moveLeft(oUl,-iNow*aLis[0].offsetWidth,-(iNow-1)*aLis[0].offsetWidth);
	    iNow--;   
    };

    oNext.onclick=function(){
    	if (iNow==aLis.length/2) {
    		iNow=0;
    		oUl.style.left=0;
    	}
    	mv.ui.moveLeft(oUl,-iNow*aLis[0].offsetWidth,-(iNow+1)*aLis[0].offsetWidth);
        iNow++;
    };
    
};



/*ad部分图片淡入淡出，点击按钮（利用封装的函数move.js写)
mv.app.toBanner=function(){
    var oDiv=document.getElementById('ad');
    var oUl=oDiv.getElementsByTagName('ul')[0];
    var aLis=oUl.getElementsByTagName('li');

    var oPrev=getByClass(oDiv,'prev')[0];
    var oNext=getByClass(oDiv,'next')[0];

    var oPbg=getByClass(oDiv,'prev_bg')[0];
    var oNbg=getByClass(oDiv,'next_bg')[0];

    mv.ui.showBanner(oPbg,oPrev,oNbg,oNext);
    mv.ui.adPicChange(oPrev,oNext,aLis);
}
//ad部分图片淡入淡出
mv.ui.adPicChange=function(obj1,obj2,abj){
   for(var i=0;i<abj.length;i++)//找到当前显示的图片的index,或iNow=0
    {
   	if (getStyle(abj[i],'opacity')==1)
   		iNow=i;
    }
    obj1.onclick=function(){//显示前一张图片
    	startMove(abj[iNow],'opacity','0');
    	if (iNow==0) iNow=abj.length-1;
    	else iNow--;
    	startMove(abj[iNow],'opacity','100');
    }
    obj2.onclick=function(){//显示后一张图片
    	startMove(abj[iNow],'opacity','0');
    	if (iNow==abj.length-1) iNow=0;
    	else iNow++;
    	startMove(abj[iNow],'opacity','100');
    }
};

//显示左右切换图标
mv.ui.showBanner=function(obj1,obj2,obj3,obj4){
	obj1.onmouseover=obj2.onmouseover=function(){
		obj2.style.display='block';
	};
	obj3.onmouseover=obj4.onmouseover=function(){
		obj4.style.display='block';
	};
	obj1.onmouseout=obj2.onmouseout=function(){
		obj2.style.display='none';
	};
	obj3.onmouseout=obj4.onmouseout=function(){
		obj4.style.display='none';
	};	
};*/
