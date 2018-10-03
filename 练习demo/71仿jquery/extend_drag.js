$().extend('drag',function(){
	var i=0;
	for(i=0;i<this.elements.length;i++){
		drag(this.elements[i]);
	}
	function drag(oDiv){
		oDiv.onmousedown=function(ev){
			var oEv=ev||event;
			var disX=oEv.clientX-oDiv.offsetLeft;
			var disY=oEv.clientY-oDiv.offsetTop;

			document.onmousemove=function(ev){
				var oEv=ev||event;
				oDiv.style.left=oEv.clientX-disX+'px';
				oDiv.style.top=oEv.clientY-disY+'px';
			};

			document.onmouseup=function(){
				document.onmousemove=document.onmouseup=null;
			};
		};
	}
});