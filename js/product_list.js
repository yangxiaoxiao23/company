/**
 * @charset utf-8
 */
$(document).ready(function(){
	function prolistHide(n){
		var n;
		var plen = $('.pro-select-list li').length;
		//$('.pro-select-list li').hide();
		for(var i = n+1;i<plen;i++){
			$('.pro-select-list li:eq(' + i + ')').attr('status','toggle').hide();
		}
	}
	prolistHide(2);
	
	$('.pro-adjust-btn').click(function(){
		if($(this).attr('status') == 'down'){
			$('.pro-select-list li[status="toggle"]').slideDown(300);
			$(this).attr('status','up');
			$(this).removeClass('expand').addClass('collase');
			$(this).text('收起');
		} else {
			$('.pro-select-list li[status="toggle"]').slideUp(300);
			$(this).attr('status','down');
			$(this).removeClass('collase').addClass('expand');
			$(this).text('展开');
		}
	});
	
	
	
	$('div.pro-price-tips').hover(function(){
		$('div.pro-price-tipspanel').toggleClass('hide');									   
	});
	
	
	var url = window.location.href;
	if(url.indexOf('week') > -1 || url.indexOf('prices') > -1 || url.indexOf('preferential') > -1){		
		$('.pro-select-list li[status="toggle"]').slideDown(300);
		$('.pro-adjust-btn').attr('status','up').removeClass('expand').addClass('collase').text('收起');
	}
});

/* 排序 */
function sort_product_list(url){
	document.location = url;
}

/* 处理产品标题的宽度 */
$(function(){
	$('.pro-title').each(function(){
		$(this).find('div.offer-active');
		$(this).find('.pro-list-itemtit').css('width', $(this).outerWidth() - $(this).find('div.offer-active').outerWidth() - $(this).find('div.type-text').outerWidth() - $(this).find('div.type-arrow').outerWidth() - parseInt($(this).find('.pro-list-itemtit').css('padding-left')));
	});
});


//处理景区单选,多选
$(function(){
	var actionEl = $('.action-mode'),
		singBtn = actionEl.find('.single'),
		multipBtn = actionEl.find('.multipBtn'),
		expandBtn = actionEl.find('.expand');
		/*collBtn = actionEl.find('.coll')*/
	
	var selectModeEl = $('.select-mode');
		singleUl = selectModeEl.find('.pro-city-list.single'),
		scrollEl = selectModeEl.find('.scroll-sec'),
		proLabel = scrollEl.find('.label'),
		moreUl = scrollEl.find('.pro-city-list.more'),
		multipUl = scrollEl.find('.multip-wrap'),
		multipLis = multipUl.find('li'),
		okBtn = selectModeEl.find('.ok'),
		cancleBtn = selectModeEl.find('.cancle');
		
	var rightWidth = $('.play_filters').outerWidth() - $('.pro-city h4').outerWidth();
	
	//单选按钮被点击
	singBtn.click(function(){
		singBtn.hide();
		multipBtn.show();
		
		singleUl.show();
		proLabel.hide();
		multipUl.hide();
		moreUl.hide();
		
		//collBtn.hide();
		expandBtn.show();
		
		var width = rightWidth - $('.action-mode').outerWidth();
		selectModeEl.css('width', width);
	});
	
	//多选按钮被点击
	multipBtn.click(function(){
		multipBtn.hide();
		singBtn.hide();
		
		proLabel.show();
		multipUl.show();
		singleUl.hide();
		moreUl.hide();
		
		//collBtn.hide();
		expandBtn.hide();
		
		var width = rightWidth - $('.action-mode').outerWidth() - 40;
		selectModeEl.css('width', width);
	});
	
	//更多按钮被点击
	expandBtn.click(function(){
		multipBtn.show();
		singBtn.hide();
		
		multipUl.hide();
		singleUl.hide();
		proLabel.show();
		moreUl.show();
		
		//collBtn.hide();
		expandBtn.hide();
		
		var width = rightWidth - $('.action-mode').outerWidth() - 50;
		selectModeEl.css('width', width);
	});
	
	//收起按钮被点击
	/*
	collBtn.click(function(){
		singBtn.hide();
		multipBtn.show();
		
		singleUl.show();
		multipUl.hide();
		moreUl.hide();
		proLabel.hide();
		
		//collBtn.hide();
		expandBtn.show();
	});*/
	
	
	
	cancleBtn.click(function(){
		singBtn.hide();
		multipBtn.show();
		
		singleUl.show();
		multipUl.hide();
		moreUl.hide();
		proLabel.hide();
		
		//collBtn.hide();
		expandBtn.show();
		
		var width = rightWidth - $('.action-mode').outerWidth() - 40;
		selectModeEl.css('width', width);
	});
	
	
	multipUl.delegate('a', 'click', function(){
		multipLis.first().find('a').removeClass('active');
		if($(this).hasClass('active')){
			$(this).removeClass('active');
		} else {
			$(this).addClass('active');
		}
	});
	
	
	//单选
	singleUl.delegate('a', 'click', function(){
		if($(this).attr('data-id') == 0) {
			window.location.href = $(this).attr('url');
		} else {
			var url = WebSiteUrlTools.generateUrl($(this));
			window.location.href = url;
		}
	});
	
	//更多
	moreUl.delegate('a', 'click', function(){
		if($(this).attr('data-id') == 0) {
			window.location.href = $(this).attr('url');
		} else {
			var url = WebSiteUrlTools.generateUrl($(this));
			window.location.href = url;
		}
	});
	
	//点击OK按钮
	okBtn.live('click', function(){
		if(multipLis.first().find('a[data-id=0]').hasClass('active')) { //如果点击全部
			window.location.href = multipLis.first().find('a').attr('url');
		} else {
			var url = WebSiteUrlTools.generateUrl(multipUl.find('li a.active'));
			window.location.href = url;
		}	
	});
});


//处理景区多选,更多里面分组
$(function(){
	var groupLabelEl = $('.scroll-sec .label'),
		lis = groupLabelEl.find('li'),
		selectModeEl = $('.select-mode');
		moreUl = scrollEl.find('.pro-city-list.more'),
		moreLis = moreUl.find('li'),
		moreAs = moreLis.find('a'),
		multipUl = scrollEl.find('.multip-wrap'),
		multipLis = multipUl.find('li'),
		multipAs = multipLis.find('a');
	
	var tempText = '',
		targetLiType ;
		
	var moreObj = {}, multipObj = {};
	//遍历
	moreLis.each(function(){
		var code = $(this).attr('code') ;
		if(code){
			var label = code.substr(0, 1);
			if(moreObj[label]){
				moreObj[label].push($(this));
			} else {
				moreObj[label] = [$(this)];
			}
		}
	});	
	
	
	//遍历
	multipLis.each(function(){
		var code = $(this).attr('code') ;
		if(code){
			var label = code.substr(0, 1);
			if(multipObj[label]){
				multipObj[label].push($(this));
			} else {
				multipObj[label] = [$(this)];
			}
		}
	});	
	
	//将分组标签中没有景区的标签置为disable状态
	for(var i=65;i<91;i++){
		var c = String.fromCharCode(i);
		if(!multipObj[c]){
			lis.filter('[data=' + c + ']').addClass('disable');
		}
	}
		

	groupLabelEl.delegate('li', 'click', function(){
		
		if($(this).hasClass("disable")){
			return ;
		}
		
		groupLabelEl.find('li').removeClass('active');
		tempText = $(this).addClass('active').text();
		targetLiType = $(this).attr('type');
		
		
		if($(moreUl).is(':hidden')) { //更多是隐藏,则操作多选区域的列表
			
			multipLis.find('a').removeClass('active'); //先移除选择的状态
			
			if(targetLiType == 'all'){ //点击的是
				multipLis.show();
			} else if(targetLiType == 'hot'){
				multipLis.hide();
				multipLis.filter('[isHot=true]').each(function(){
					$(this).show();
				});
			} else {
				multipLis.hide();
				if(multipObj[tempText] && multipObj[tempText].length) {
					multipObj[tempText].every(function(el, index){
						el.show();
						return true;
					});
				}
			}
		} else {
			
			moreLis.find('a').removeClass('active'); //先移除选择的状态
			
			if(targetLiType == 'all'){ //点击的是
				moreLis.show();
			} else if(targetLiType == 'hot'){
				moreLis.hide();
				moreLis.filter('[isHot=true]').each(function(){
					$(this).show();
				});
			} else {
				moreLis.hide();
				if(moreObj[tempText] && moreObj[tempText].length) {
					moreObj[tempText].every(function(el, index){
						el.show();
						return true;
					});
				}
			}
		}
	});
	
	//全部被点击
	multipLis.first().click(function(event){
		if($(this).find('a').hasClass('active')) {
			multipAs.removeClass('active');
		} else {
			multipAs.addClass('active');
		}
		event.stopPropagation();
	});
	
});

//处理已选项目,点击删除时候的操作
$(function(){
	$('.play_filters .selected-sec .select-bd').delegate('span', 'click', function(){
		var tempUrl = WebSiteUrlTools.cutUrl();
		var obj = WebSiteUrlTools.urlToObj(tempUrl);
		$(this).hide();
		var type = $(this).attr('class'),
			dataId = $(this).attr('data-id');
		
		var values = obj[type],
			array = values.split(',');
		var tempArr = [];
		for(var i=0,size=array.length;i<size;i++){
			if(array[i] != dataId){
				tempArr.push(array[i]);
			}
		}
		obj[type] = tempArr.join(',');
		window.location.href = WebSiteUrlTools.joinUrl(obj, tempUrl);
	});
});

//URL解析工类
WebSiteUrlTools = {
	SEPARATOR : SEO_EXTENSION_SEPARATOR,//URL分隔符
	ATTRACTIONS : 'attractions', //景区
	DEPARTURE : 'departure', //出发城市
	DESTINATION : 'destination', //结束城市
	DAYS : 'days', //行程天数
	WEEK : 'week', //出团日期
	PRICES : 'prices', //价格预算
	PREFERENTIAL : 'preferential', //优惠活动
	
	// 替换地址栏的参数
	generateAttraction : function(el, obj){
		var attractions = [];
		el.each(function(){
			var dataId = $(this).attr('data-id');
			attractions.push(dataId);
		});
		obj[WebSiteUrlTools.ATTRACTIONS] = attractions.join(',');
		return obj;
	},
	
	/*将对象按照URL规则,拼接起来 */
	joinUrl: function(obj, tempUrl){
		var url = window.location.href;
		var result = '', u= '';
		
		for(var p in obj){
			if(obj[p]){
				result += WebSiteUrlTools.SEPARATOR + p + WebSiteUrlTools.SEPARATOR + obj[p];
			}
		}
		
		if(tempUrl){
			u = url.replace(tempUrl, result);
		} else {
			if(url.substr(url.length - 1) === '/'){
				u = url + result;
			} else {
				u = url + '/' + result;
			}
		}
		return u;
	},
	
	//先将地址栏附带的参数切割
	cutUrl: function(){
		var url = window.location.href;
		//截取URL 先判断-- 后面是否有 /
		var tempUrl = url.substr(url.indexOf(WebSiteUrlTools.SEPARATOR));
		if(tempUrl.indexOf('/') > -1 ){ //存在
			tempUrl = tempUrl.substr(0, tempUrl.indexOf('/'));
		}
		return tempUrl;
	},
	
	//将截取下来的URL变为object
	urlToObj: function(tempUrl){
		var arr = tempUrl.split(WebSiteUrlTools.SEPARATOR),
			obj = {};
		for(var i=1;i<arr.length;++i){
			obj[arr[i]] = arr[i+1];
			++i;
		}
		return obj;
	},
	
	//生成url
	generateUrl: function(el){
		var tempUrl = WebSiteUrlTools.cutUrl();
		var obj = WebSiteUrlTools.urlToObj(tempUrl);
		var attractionsObj = WebSiteUrlTools.generateAttraction(el, obj);
		return WebSiteUrlTools.joinUrl(attractionsObj, tempUrl);
	}
}