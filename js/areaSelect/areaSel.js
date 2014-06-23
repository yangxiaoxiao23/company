/*
	区域选择选项卡插件
	by xiaoming 2013-11-14
*/
(function($){
	$.fn.creatTabs = function(opt){
		var defaultVal = {
			data:{},
			func:$.noop
		};					  
		var opt = $.extend(defaultVal,opt);
		var $this = $(this), _ot = $this.offset().top, _ol = $this.offset().left,_pl = $this.parent().offset().left, _h = $this.height();
		if(opt.data.tag.length != 0){
			$this.click(function(){
				$this.parent().css({"position":"relative","z-index":"10"});
				$('.ucPlaceDialog').remove();
				$this.after('<div class="ucPlaceDialog J_Country" title="'+ opt.data.title +'"><div class="d_hd"><a href="javascript:;" class="close J_CloseCountry">x</a><h4>'+ opt.data.title +'<span style="display:none;">(按名称开头字母查看，支持方向键"← →"切换字母，"↑ ↓"选择国家，首字母搜索)</span></h4></div><div class="d_cont uifix"><ul class="dCountryTab"><li class="dSearch" style="display:none;"><input type="text" class="dSearchIpt" placeholder="快速搜索" /></li></ul></div><div class="place_cont"></div><div class="d_foot"><a href="javascript:;" class="d_btn J_okCountry">确定</a><a href="javascript:;" class="d_btn J_CloseCountry">取消</a></div></div>');
				for(var i=0; i<opt.data.tag.length; i++){
					$this.next('.ucPlaceDialog').find('.place_cont').append('<div class="dCountryLabel"></div>');
					$this.next('.ucPlaceDialog').find('.dCountryTab').append('<li>'+ opt.data.tag[i].text +'</li>');
					for(var j=0; j<opt.data.tag[i].list.length; j++){
						$this.next('.ucPlaceDialog').find('.place_cont .dCountryLabel:eq('+ i +')').append('<label for="'+ opt.data.radioName+[i]+'_'+ [j] +'"><input type="radio" id="'+ opt.data.radioName+[i]+'_'+ [j] +'" name="'+ opt.data.radioName +'_opt" value="'+ opt.data.tag[i].list[j].id +'" /><span>'+ opt.data.tag[i].list[j].text +'</span></label>');	
					}
				}
				var _isval = $this.find('input[name="'+ opt.data.radioName +'"]').val();
				if(typeof(_isval) == 'undefined'){
					$this.append('<input type="hidden" name="'+ opt.data.radioName +'" value="'+ opt.data.defaultId +'" />');
				}
				$('.ucPlaceDialog').find('.dCountryTab li').not('.dSearch').click(function(){
					var inx = $(this).index();
					$(this).addClass('current').siblings().removeClass('current');	
					$(this).parents('.ucPlaceDialog').find('.place_cont div').eq(inx-1).show().siblings().hide();
				});
				$('.ucPlaceDialog').find('.J_CloseCountry').click(function(){
					$(this).parents('.ucPlaceDialog').hide();														   
				});
				if(opt.data.defaultId && opt.data.defaultId != '' ){
					var _selipt = $('.ucPlaceDialog .place_cont .dCountryLabel label input[value="'+ opt.data.defaultId +'"]:eq(0)');
					_selipt.click();	
					_selipt.parents('.dCountryLabel').show();
					var num = _selipt.parents('.dCountryLabel').index();
					_selipt.parents('.place_cont').prev('.d_cont').find('.dCountryTab li').eq(num+1).addClass('current').siblings().removeClass('current');																	
				}else{
					$this.next('.ucPlaceDialog').find('.dCountryTab li').eq(1).addClass('current').siblings().removeClass('current');	
					$this.next('.ucPlaceDialog').find('.place_cont .dCountryLabel').eq(0).show();
					$this.next('.ucPlaceDialog').find('.place_cont .dCountryLabel:eq(0) label:eq(0)').click();
				}
				$this.next('.ucPlaceDialog').find('.place_cont .dCountryLabel label').click(function(){
					$(this).addClass('hover').siblings().removeClass('hover');	
					var _val = $(this).find('input').val();
					$(this).parents('.ucPlaceDialog').prev('span').find('input[name="'+ opt.data.radioName +'"]').val(_val);
				});
				$('.ucPlaceDialog').find('.J_okCountry').click(function(){
					var _thisPr = $(this).parents('.ucPlaceDialog');
					var _countryTxt = _thisPr.find('.place_cont input:checked').next('span').text();
					var sid = _thisPr.find('.place_cont input:checked').val();
					$(this).parents('.ucPlaceDialog').prev('span').find('input[name="'+ opt.data.radioName +'"]').val(sid);
					$this.attr({'countryTxt':_countryTxt,'sid':sid}).siblings('span').attr({"countryTxt":"","sid":""});
					_thisPr.hide(0,opt.func,setTimeout(function(){_thisPr.remove();},0));
					 
				});
			});
		}
	};
})(jQuery);


