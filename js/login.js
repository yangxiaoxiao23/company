/* 邮箱账号提示菜单展示与关闭效果 */
;(function($){

/* 初始化 */
var emailInput = document.getElementById('email_address'),
	list = document.getElementById('email_suggest'),
	items = list.getElementsByTagName('li'),
	item1 = items[1],
	len = items.length,
	suffix = [],
	newSuffix, indexA, indexB,
	highlight = 'current',
	isIE = navigator.userAgent.toLowerCase().indexOf('msie') != -1,
	clearClassname = function(){
		for(var i = 1,el;i < len && (el = items[i]);i++){
			el.className = '';
		}
	};

items.onmouseover = function(){ $(this).addClass('current').siblings().removeClass('current');};
items.onclick = function(){ emailInput.value = this.innerHTML;};

/* 将邮箱后缀存放到一个新数组中 */
for(var j = 1,el;j < len && (el = items[j]);j++){
	suffix[suffix.length++] = el.innerHTML;
}

/* 邮箱输入框绑定keyup事件 */
emailInput.onkeyup = suggest;
emailInput.onkeydown = function(event){
		event = event || window.event;
		if(event.keyCode == 13)	{
			return false;	
		}						 
	};
/* suggest核心部分 */
function suggest(event){
	var e = event || window.event,
		eCode = e.keyCode,
		val = this.value,
		index = val.indexOf('@'),
		isIndex = index !== -1;

	clearClassname();
	//输入框不为空
	if(val){
		item1.className = highlight;
		list.style.display = 'block';
		for(var i = 1,el;i < len && (el = items[i]);i++){
			el.onmouseover = function(){
				clearClassname();
				item1.className = '';
				this.className = highlight;
				indexA = 1;
				indexB = 0;
			}
			el.onmouseout = function(){
				this.className = '';
				item1.className = highlight;
			}
			el.onclick = function(){
				emailInput.value = this.innerHTML;
			}
		}
	}
	//输入框为空
	else{
		item1.className = '';
		for(var i = 1,el;i < len && (el = items[i]);i++){
			el.onmouseout = el.onmouseover = el.onclick = null;
		}
		if(eCode === 38 || eCode === 40 || eCode === 13) return;
	}

	item1.innerHTML = val;
	newSuffix = [];  //初始化空数组
	for(var i = 1, el ;i < len && (el = items[i]);i++){
		/* 以邮箱后缀和输入框中@标志符后是否
		   有相同的字符串来显示或隐藏该元素 */
		el.style.display = isIndex && el.innerHTML.indexOf(val.substring(index)) === -1 ? 'none' : 'block';
		if( i > 1 ) el.innerHTML = (isIndex ? val.substring(0,index) : val) + suffix[i-1];
		/* 出现@标志符时将新的元素的排列顺序
		   存放到空数组newSuffix中 */
		if((!isIE && window.getComputedStyle(el,null).display === 'block') || (isIE && el.currentStyle.display === 'block')){
			newSuffix[newSuffix.length++] = i;
		}
	}

	/* 判断按键 */
	switch (eCode){
		case 38 :  //上方向键
			keyMove(-1);
			break;
		case 40 : //下方向键
			keyMove(1);
			break;
		case 13 : //回车键
			getVal();
			break;
		default:
			indexA = 1;
			indexB = 0;
			return;
	}
}

/* 方向键控制元素的高亮效果 */
function keyMove(n){
	var newLen = newSuffix.length;
	if(newLen > 0 && newLen < 8 ){
		items[newSuffix[indexB]].className = item1.className = '';
		indexB += n;
		if (indexB === newLen) indexB -= newLen;
		else if (indexB < 0) indexB += newLen;
		items[newSuffix[indexB]].className = highlight;
	}
	else{
		items[indexA].className = item1.className = '';
		indexA += n;
		if (indexA === len) indexA -= len - 1;
		else if (indexA === 0) indexA += len - 1;
		items[indexA].className = highlight;
	}
}

/* 获取当前高亮元素的值 */
function getVal(){
	var newLen = newSuffix.length;
	emailInput.value = newLen > 0 && newLen < 8 ? items[newSuffix[indexB]].innerHTML : items[indexA].innerHTML;
	list.style.display = 'none';
}

/* 关闭提示层 */
document.onclick = function(e){
	e = e || window.event;
	var eNode = e.target ? e.target : e.srcElement;
	if(eNode !== emailInput && eNode !== list){
		list.style.display = 'none';
	}
};
document.getElementById('password').onfocus = function(){
	list.style.display = 'none';	
};

})(jQuery);