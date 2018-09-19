window.onload=function(){
	imgLocation("container","box");
	/*以json的格式模拟从服务器获取需要动态加载的图片*/
	var imgData={"data":[{"src":"1.jpg"},{"src":"2.jpg"},{"src":"3.jpg"},{"src":"4.jpg"},{"src":"5.jpg"}]};
	/*监听鼠标滚动事件*/
	window.onscroll=function(){
		if (checkFlag()) {
			var cparent=document.getElementById("container");
			for(var i=0;i<imgData.data.length;i++){
				/*动态创建加载子节点*/
				var ccontent=document.createElement("div");
				ccontent.className="box";
				cparent.appendChild(ccontent);
				var boximg=document.createElement("div");
				boximg.className="box_img";
				ccontent.appendChild(boximg);
				var img=document.createElement("img");
				img.src="images/"+imgData.data[i].src;
				boximg.appendChild(img);
			}	
			/*再次调用图片排序函数*/
			imgLocation("container","box");	
		}
	}
}

/*判断什么时候加载图片*/
function checkFlag(){
	var cparent=document.getElementById("container");
	var ccontent=getChildElement(cparent);
	var lastContentHeight=ccontent[ccontent.length-1].offsetTop;
	var scrollTop=document.body.scrollTop||document.documentElement.scrollTop;
	var pageHeight=document.body.clientHeight||document.documentElement.clientHeight;
	if (lastContentHeight<scrollTop+pageHeight) {
		return true;
	}
}

/*图片排序*/
function imgLocation(parent,content){
	var cparent=document.getElementById(parent);
	var ccontent=getChildElement(cparent);
    var imgWidth=ccontent[0].offsetWidth;
    var cols=Math.floor(document.body.clientWidth/imgWidth);
    /*设置装图片的盒子的container的宽度以及居中*/
    cparent.style.cssText="width:"+imgWidth*cols+"px;margin:0 auto;";

    var BoxHeightArr=[];
    for(var i=0;i<ccontent.length;i++)
    {
    	if (i<cols) 
    	{
    		BoxHeightArr[i]=ccontent[i].offsetHeight;
    	}
    	else
    	{   
    		var minHeight=Math.min.apply(null,BoxHeightArr);
            var minIndex=getMinIndex(BoxHeightArr,minHeight);
            /*通过绝对定位控制图片的位置*/
    		ccontent[i].style.position="absolute";
    		ccontent[i].style.top=minHeight+"px";
    		ccontent[i].style.left=ccontent[minIndex].offsetLeft+"px";
    		BoxHeightArr[minIndex]=BoxHeightArr[minIndex]+ccontent[i].offsetHeight;
    	}
    }

    /*获取最小高度的图片在第一行的下标*/
    function getMinIndex(BoxHeightArr,minHeight){
    for(var i in BoxHeightArr)
	{
		if (minHeight==BoxHeightArr[i]) 
		return i;
	}
}
}

/*获取container当中所有的box*/
function getChildElement(parent){
	var contentArr=[];
	var contentAll=parent.getElementsByClassName("box");
	for(var i=0;i<contentAll.length;i++)
	{
		contentArr.push(contentAll[i]);
	}
	return contentArr;
}