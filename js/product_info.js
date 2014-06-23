/**
 * 产品页面处理类
 * @charset utf-8
 */
function product_info(){
    /**
     * 更新产品浏览量、评论等信息
     * @param {String} url 目标url
     * @param {Num} _products_id 产品id
     */
    this.getViewedReviewPhotoQuestionNum = function (url, _products_id){
		if(_products_id!=""){
			url = G.url_rand(url);
			url+='&action=getViewedReviewPhotoQuestionNum&products_id='+_products_id+'&callback=?';
			$.getJSON(url, function(data){
				if(data){
					for(var x in data){
						$('#'+ x ).html(data[x]);
						$('.'+ x ).html(data[x]);
					}
				}
			});
		}
	};
	/* 生成产品大日历框信息 */
	this.createProductBigCalendarBox = function(url, _products_id){
		url = G.url_rand(url);
		url+='&action=getCalendarData&products_id='+_products_id+'&callback=?';
		$.getJSON(url, function(data){
			if(data){
				var data = data || {};
				new lwkCalendar('divCalendar','availabletourdate',data);
			}
		});
	};
	/* 加载更多用户点评 */
	this.getReviewList = function(topUrl, pId){
			if(!topUrl){ alert('请设置topUrl值'); return false; }
			if(!pId){ alert('请设置pId值'); return false; }
			
			function getReviewData(page){
				var url = G.url_rand(topUrl);
				url+='&action=getReviewList&rPage='+ page +'&products_id='+ pId +'&callback=?';
				$.getJSON(url, function(data){
					var tmpHtml = '';
					if(data){
						for(var x in data){
							tmpHtml += '<li class="review-item"><div class="sl"><span>满意度</span><br /><b>' + data[x]['ratingTotal'] + '%</b></div><div class="sr"><p class="si"><span class="r"><em>订购：'+ data[x]['booking_rating_text'] +'</em><em>行程：'+ data[x]['travel_rating_text'] +'</em></span><strong>'+ data[x]['customers_name'] +'</strong>('+ data[x]['dateAdded'] +')</p><p class="st">'+ data[x]['reviews_text'] +'</p></div></li>';
						}						
					}
					
					if(tmpHtml == ''){
						$('#J_reviewMoreButton > span').hide(0);
						if(page > 2){
							$('#J_reviewMoreButton > i').show(0);
						}
					}
					
					if(page == 1){	//取第1页时
						$('#J_reviewListUl').html(tmpHtml);
						if(tmpHtml==''){
							$('#J_reviewMoreButton > i').html('暂无用户点评！').show(0);
						}
						return ;
					}else if(page >= 2){ //取第2页及后面的页时
						appendHtml = tmpHtml;
					}
				});
			}
			
			var appendHtml = '';
			var _page = 1;
			//一、动态取得第1页评论数据并更新到页面
			getReviewData(_page);
			_page++;
			//二、预加载第2页数据到appendHtml
			getReviewData(_page);
			//三、点击“加载更多用户点评”时，要完成从appendHtml导数据到列表中，同时预加载下一步的数据到appendHtml
			$('#J_reviewMoreButton > span').click(function(){	//点击加载更多用户点评时的动作
				//将appendHtml的数据添加到列表中
				$('#J_reviewMoreButton > em').show(0);
				$('#J_reviewMoreButton > span').hide(0);
				if(appendHtml){
					$('#J_reviewListUl').append(appendHtml);
					$('#J_reviewMoreButton > em').hide(0);
					$('#J_reviewMoreButton > span').show(0);
				}
				//预加载下一页的数据保存到appendHtml中
				appendHtml = '';
				_page++;
				getReviewData(_page);
			});
	};
	/* 加载更多用户咨询 */
	this.getQuestionList = function(topUrl, pId){
		if(!topUrl){ alert('请设置topUrl值'); return false; }
		if(!pId){ alert('请设置pId值'); return false; }
			function getQuestionData(page){
				var url = G.url_rand(topUrl);
				url+='&action=getQuestionList&qPage='+ page +'&products_id='+ pId +'&callback=?';
				$.getJSON(url, function(data){
					var tmpHtml = '';
					var fun = function(){
						//以下元素结构取自product_info.html中咨询的模板内容
						tmpHtml += '<div class="tc-cmtbox">';
						//问题
						tmpHtml += '<div class="uifix tc-cmtask"><div class="tc-cmtavator"><span class="tc-cmtavatorPic"><img src="'+data[x]['imageSrc']+'" alt="" /></span><p>'+ data[x]['customers_name'] +'</p></div><div class="tc-cmtQuestion"><p class="tc-cmtQi"><strong>'+ data[x]['question'] +'</strong></p><p class="tc-cmtDater">'+ data[x]['date'] +'</p></div></div>';
						//回答
						if(data[x]['answers'].length){
							for(var n in data[x]['answers']){
								tmpHtml += '<div class="tc-cmtanswer"><i class="role">&nbsp;</i><div class="tc-cmtanswerUser"><span class="tc-cmtanswerPic"><img src="'+data[x]['answers'][n]['imageSrc'] +'" alt="走四方旅游资深顾问" /></span><p>走四方旅游资深顾问</p></div><div class="tc-cmtanswerCont"><p class="tc-cmtanswerThx">尊敬的'+ data[x]['customers_name'] +'，您好！感谢您对走四方网的支持。</p><div class="contText"><p>'+ data[x]['answers'][n]['ans'] +'</p></div><p class="tc-cmtanswerDater">'+ data[x]['answers'][n]['date'] +'</p></div></div>';
							}
						}
						tmpHtml += '</div>';
					}
					
					if(data && data instanceof Array){
						
						
						
						for(var x=0,len=data.length;x<len;x++){
							fun();
						}
					} else if(data){
						for(var x in data){
							fun();
						}
					}
						
					
					if(tmpHtml == ''){
						$('#J_questionMoreButton > span').hide(0);
						if(page > 2){
							$('#J_questionMoreButton > i').show(0);
						}
					}
					
					if(page == 1){	//取第1页时
						$('#J_questionsListDiv').html(tmpHtml);
						if(tmpHtml==''){
							$('#J_questionMoreButton > i').html('暂无用户咨询！').show(0);
						}
						return ;
					}else if(page >= 2){ //取第2页及后面的页时
						appendHtml = tmpHtml;
					}
				});
			}
			
			var appendHtml = '';
			var _page = 1;
			//一、动态取得第1页咨询数据并更新到页面
			getQuestionData(_page);
			_page++;
			//二、预加载第2页数据到appendHtml
			getQuestionData(_page);
			//三、点击“加载更多用户咨询”时，要完成从appendHtml导数据到列表中，同时预加载下一步的数据到appendHtml
			$('#J_questionMoreButton > span').click(function(){	//点击加载更多用户咨询时的动作
				//将appendHtml的数据添加到列表中
				$('#J_questionMoreButton > em').show(0);
				$('#J_questionMoreButton > span').hide(0);
				if(appendHtml){
					$('#J_questionsListDiv').append(appendHtml);
					$('#J_questionMoreButton > em').hide(0);
					$('#J_questionMoreButton > span').show(0);
				}
				//预加载下一页的数据保存到appendHtml中
				appendHtml = '';
				_page++;
				getQuestionData(_page);
			});
	};
};

var PI = new product_info();

jQuery(document).ready(function($){
    //页面tab选项卡及悬浮条选项操作
    function ifscroll(){
		var _tabH = $('.xm_detail_box').offset().top;
		var wH = $(window).scrollTop();
		if(wH > _tabH){
			$('#J_proContab1').addClass('fixed_menu');	
		}else{
			$('#J_proContab1').removeClass('fixed_menu');	
		}
		$('.xm_detail_box .xm_dlist').each(function(){
			var num = $(this).index(),minH = $(this).offset().top,maxH = $(this).offset().top + $(this).height();	
			if(wH < maxH && wH > minH){
				$('#J_proContab1 li').eq(num).addClass('current').siblings().removeClass('current');
			}
		});
	}
	ifscroll();
	function tabshow(_tab){
		var _num = _tab.index();
		_tab.addClass('current').siblings().removeClass('current');
		var _con = $('.xm_detail_box').children('div');
		var _top = _con.eq(_num).offset().top;
		$('html,body').stop().scrollTop(_top);
	}	
	var _tab1 = $('#J_proContab1 li');
	_tab1.click(function(){
		tabshow($(this));					 
	});
	var parn = 0;
	$(window).scroll(function(){
		var _wh = $(window).scrollTop();
		if(Math.abs(_wh-parn) > 50){
			ifscroll();	
			parn = $(window).scrollTop();	
		}
	});
});
	

/**
 * product_detail.js by xiaoming
 * 产品详细页面JS
 *
 * date:2013-5-14
 * 
 */

jQuery(function($){
				
	//*  悬浮条 浮动在顶部 lwkaiRem *
	if(navigator.userAgent.toLowerCase().match(/iPad/i) != "ipad"){
		var pageTop = function() {
			//return document.documentElement.clientHeight + Math.max(document.documentElement.scrollTop, document.body.scrollTop);
			return Math.max(document.documentElement.scrollTop, document.body.scrollTop);
		};
		$(window).bind('scroll resize', function(){
			if ($("#anchor1").offset().top <= pageTop() && !Usitrip.isEmptyArray($('#Guid')) && $("#Guid").offset().top >= pageTop()) {
				$("#pro-fixed-bar").show();
			}else{
				$("#pro-fixed-bar").hide();
			}
		});
	};
	//关闭悬浮条和回到顶部
	var _toolbar = {
		_gotop : function(){
			$("html, body").animate({ scrollTop: 0 },200);	
		},
		_close : function(){
			$('#pro-fixed-bar').hide();	
		}
	};
	$('.bar-gotop').live('click',_toolbar._gotop);
	$('.bar-close').live('click',_toolbar._close);

    //产品幻灯片 start
	//fdp.fixedHeight = 238;
	$('#BigImage a').lightBox();
	$("#Scroll li:first").addClass("on");
	$("#Scroll li").hover(function(){
		$(this).addClass("on").siblings().removeClass('on');
		var tmpImg = $("#BigImage a:eq("+$("#Scroll li").index(this)+") img");
		$("#BigImage a:eq("+$("#Scroll li").index(this)+")").show().siblings("#BigImage a").hide(); 
	});
	//产品幻灯片 end

});

