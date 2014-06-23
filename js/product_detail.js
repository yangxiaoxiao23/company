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
			if ($("#anchor1").offset().top <= pageTop() && $("#Guid").offset().top >= pageTop()) {
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
	new Scroll("Scroll");
	//fdp.fixedHeight = 238;
	$('#BigImage a').lightBox();
	$("#Scroll li:first").addClass("on");
	$("#Scroll li").hover(function(){
		$("#Scroll li").remove("on");
		$(this).addClass("on");
		var tmpImg = $("#BigImage a:eq("+$("#Scroll li").index(this)+") img");
		$("#BigImage a:eq("+$("#Scroll li").index(this)+")").show().siblings("#BigImage a").hide(); 
	});
	//产品幻灯片 end
	
	//页面tab选项卡及悬浮条选项操作
	function tabshow(_tab){
		var _num = _tab.index();
		_tab.addClass('current').siblings().removeClass('current');
		var _con = (_tab.parent('ul.pro-cont-infotab').next('.pro-cont-infobox')).children('div');
		_con.eq(_num).removeClass('hide').siblings().addClass('hide');
	}
	$('.pro-cont-infotab li').live('click',function(){
		var _this = $(this);
		tabshow(_this);
	});
	$('.fixed-bar-menu dd a').live('click',function(){
		var _len = $('#J_proContab1 li').length;
		var _n = $(this).index(); if(_n+1 > _len) _n -= _len;
		
		var _href = $(this).attr('href');
		$(_href).children('li:eq('+ _n +')').click();
	});

});
//customer waitlist end
