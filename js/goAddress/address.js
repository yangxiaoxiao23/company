/*
	上车地址获取、编辑插件
	by xiaoming 2013-11-06
*/

alert('address.js文件已经不再使用,请使用product.Address.js');

/*
;
(function($){
	$.fn.creatAddr = function(opt){
		var defaultVal = {
			data:{},
			func:$.noop
		};	
		var opt = $.extend(defaultVal, opt);
		this.each(function(){


			var $this = $(this), _ot = $this.offset().top, _ol = $this.offset().left,_pl = $this.parent().offset().left, _h = $this.height();
			$this.click(function(e){

                var target = e.target.tagName;
                if(target.toUpperCase() === 'LABEL'){
                    return;
                }

                var start = new Date();
				$this.parent().css({"position":"relative"});
                if($this.find('.addr_common_flow').length != 0){
                    $this.find('.addr_common_flow').show();
				}else{


					//					$this.after('<div class="addr_common_flow" style="left:'+ _ol +'px;top:'+ (_h+2+_ot) +'px;display: block;"><dt class="bc_title">所在区域<a href="javascript:;" class="bc_cancel">×</a></dt><div class="bc_list"><dl class="abso"></dl></div><div class="bc_detail"></div><p class="h_list_btns"><a class="rbtn_ok" href="javascript:;">确定</a><a class="rbtn_cancel" href="javascript:;">取消</a></p></div>');

					var k = $this.append('<div class="addr_common_flow" style="left:'+ (_ol-_pl) +'px;top:'+ (_h+2) +'px;display: block;z-index:10;"><dt class="bc_title">所在区域<a href="javascript:;" class="bc_cancel">×</a></dt><div class="bc_list"><dl class="abso"></dl></div><div class="bc_detail"></div><p class="h_list_btns"><a class="rbtn_ok" href="javascript:;">确定</a><a class="rbtn_cancel" href="javascript:;">取消</a></p></div>');
                    var addrCommonFlowEl = $this.find('.addr_common_flow');
					for(var i=0; i<opt.data.list.length; i++){
						addrCommonFlowEl.find('.bc_list dl').append('<dd class=""><label for="radio_index' + opt.data.list[i].regionId + '"><input type="radio" id="radio_index' + opt.data.list[i].regionId + '" value="'+ opt.data.list[i].regionId +'" name="'+ opt.data.regionName +'"><span>'+ opt.data.list[i].regionText +'</span></label></dd>');
						addrCommonFlowEl.find('.bc_detail').append('<div class="bc_dlist"><dt class="bc_de_title"><label>'+ opt.data.list[i].regionText +'</label>的上车时间和地点</dt><dl></dl></div>');
						for(var j=0; j<opt.data.list[i].addressConten.length; j++){
							addrCommonFlowEl.find('.bc_detail .bc_dlist:eq('+ i +') dl').append('<dd><label for="radio_detail_index' + opt.data.list[i].addressConten[j].id + '"><input type="radio" id="radio_detail_index' + opt.data.list[i].addressConten[j].id + '" value="'+ opt.data.list[i].addressConten[j].id +'" name="'+ opt.data.addressName +'"><span class="addr_time">'+ opt.data.list[i].addressConten[j].time +'</span><span class="addr_dd">'+ opt.data.list[i].addressConten[j].address +'</span></label></dd>');
						}
					}

					if(opt.data.list.length < 2){
						addrCommonFlowEl.find('.bc_detail .bc_dlist').show();
					}


					$('.addr_common_flow .bc_list dl dd label').click(function(e){
						var inx = $(this).parents('dd').index();
						$(this).parents('.bc_list').next('.bc_detail').find('.bc_dlist:eq('+ inx +')').show().siblings().hide();
						//$(this).parents('.bc_list').next('.bc_detail').find('input').removeAttr('checked');

                        $('.bc_detail .bc_dlist').eq(inx).find('dl dd:eq(0)').addClass('oncur').find('label').click();
					});




					$('.addr_common_flow dl dd').hover(function(){
						$(this).toggleClass('hover');											 
					}).click(function(){
						$(this).addClass('oncur').siblings().removeClass('oncur');	
					});
					$('.addr_common_flow .bc_title a.bc_cancel,.addr_common_flow .h_list_btns a.rbtn_cancel').click(function(){
						$(this).parents('.addr_common_flow').hide();
					});
					
					$('.bc_detail .bc_dlist').each(function(){
						if($('dl dd',this).length > 10){
							$('dl',this).css({"height":"240px","overflow-y":"scroll"});	
						}										
					});

					$('.addr_common_flow .h_list_btns a.rbtn_ok').click(function(){

						var _thisPr = $(this).parents('.addr_common_flow');
						var _selipt = _thisPr.find('.bc_list input:checked');
						var _num = _selipt.parents('dd').index();
						var _area = _thisPr.find('.bc_list input:checked').next('span').text();
						var _time = _thisPr.find('.bc_detail .bc_dlist:eq('+ _num +') input:checked').next('span.addr_time').text();
						var _addr = _thisPr.find('.bc_detail .bc_dlist:eq('+ _num +') input:checked').next().next('span.addr_dd').text();

						if(!_time || !_addr){
							//alert('请选择上车地点！')
						}else{
							$this.attr({"area":_area,"time":_time,"addr":_addr});
							_thisPr.hide(0,opt.func);
						}
					});


                    var dRegion = opt.data['dRegion'];
                    if(dRegion){
                        $('.addr_common_flow .bc_list dl dd label input').each(function(){
                            if($(this).val() == dRegion){
                                $(this).parent().click();
                            }
                        });
                    }
                    var id = opt.data['departure_address_id'];

                    if(id){
                        $('.addr_common_flow .bc_detail dl dd label input').each(function(){
                            if($(this).val() == id){
                                var lists = $('.bc_detail .bc_dlist');
                                lists.hide();
                                $(this).parents('.bc_detail .bc_dlist').show();
                                $(this).parent().click();
                            }
                        });
                    }

                    if(opt.data.defaultVal && opt.data.defaultVal != ''){
                        addrCommonFlowEl.find('.bc_detail .bc_dlist dd').each(function(){
                            if($(this).find('input').val() == opt.data.defaultVal){
                                $(this).find('label').click();
                                $(this).parents('.bc_dlist').show();
                                var num = $(this).parents('.bc_dlist').index();
                                $(this).parents('.bc_detail').prev('.bc_list').find('dl dd:eq('+ num +') label').click();
                            }
                        });
                    }else{
                        var firstDd = addrCommonFlowEl.find('.bc_list dl dd:eq(0)');
                        //firstDd.find('label').click();

                        firstDd.find('label input').attr("checked","checked");
                        firstDd.addClass('oncur');

                        var firstListDd = $('.bc_detail .bc_dlist').eq(0);
                        firstListDd.show();

                        var firstListDlDd = firstListDd.find('dl dd:eq(0)');
                        //firstListDlDd.find('label').click();
                        firstListDlDd.find('label input').attr("checked","checked");
                        firstListDlDd.addClass('oncur');
                    }
				}
                var end = new Date();

                var t = $('.dep_add p.sel_title');

                t.html(t.html() + (end - start) + "  ")
			});
			
		});
	};
})(jQuery);*/