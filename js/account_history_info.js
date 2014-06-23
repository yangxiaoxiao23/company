/* 用户中心订单编辑页面 */
$().ready(function(e) {
	if(typeof(ajaxCurrentUrl)=='undefined'){
		artDialog.alert('当前页缺少ajaxCurrentUrl变量！');
		return false;
	}
	//游客信息确认更新
	$('form[id^="J_guests_edit_form_"]').submit(function(){
		var url = ajaxCurrentUrl;
		var data = G.get_form_data(this.id);
		$.post(url, data, function(json){
			if(json['OK']=='1'){
				artDialog.alert('游客信息更新成功！');
				window.location.reload();
			}else{
				artDialog.alert(json['errorMsg']);
			}
		}, 'json');
		return false;
	});
	//航班信息添加
	$('form[id^="J_addFlightsForm_"]').submit(function(){
		var url = ajaxCurrentUrl;
		var data = G.get_form_data(this.id);
		$.post(url, data, function(json){
			if(json['OK']=='1'){
				artDialog.alert('添加成功！');
				window.location.reload();
			}else{
				artDialog.alert(json['errorMsg']);
			}
		}, 'json');
		return false;
	});
	//航班信息编辑
	$('button[name="editFlight"]').click(function(){
		var flightid = $(this).attr('flightid');
		var url = ajaxCurrentUrl;
		$.get(url, { 'action' : 'flightUpdate', 'orders_flight_id': flightid, 'opid': $(this).attr('opid'), 'checkcode':$(this).attr('checkcode') }, function(html){
			html = '<form id="J_updateFlightConfirm_'+ flightid +'" onsubmit="return updateFlightConfirm('+ flightid +');" ><input type="hidden" name="action" value="flightUpdateConfirm" /><input type="hidden" name="orders_flight_id" value="'+ flightid +'" />'+html+'<div class="action-save"><button class="save" type="submit">保存</button><button class="cancel" type="button" onclick="updateFlightCancel('+ flightid +')">取消</button></div></form>';
			$('#ulFlight_' + flightid ).html(html).addClass('odd-flights-list-edit');
		}, 'html');
	});
	
	
	
	
	/* 以下是游客信息编辑和更新  */
	var proInfoNode = $('.odd-proinfo-useritems'),
		actionModifyNodes = proInfoNode.find('.action-modify'),
		actionSaveNodes = proInfoNode.find('.action-save'),
		ediBtns = actionModifyNodes.find('.edit'),
		saveBts = actionSaveNodes.find('.save'),
		cancelBts = actionSaveNodes.find('.cancel');
	
	ediBtns.live('click', function(){
		$(this).hide();
		var detailNode = $(this).parents('li.useritem').find('div.detail');
		detailNode.find('button').show();
		detailNode.find('.view').removeClass('view').addClass('edit').attr('readOnly',false);
		detailNode.find('.view-gender').hide();
		detailNode.find('.editor-gender').show();
		detailNode.find('.single').show();
		detailNode.find('.empty').show();
		detailNode.find('.insurance').show();
		
		detailNode.find('div.mobile-phone input').attr("readOnly", false);
		detailNode.find('div.mobile-phone input.phone, div.mobile-phone .areas').css({
			'border':'1px solid #bbb'
		});
		
	});	
	
	cancelBts.live('click', function(){
		$(this).hide().prev().hide();
		var detailNode = $(this).parents('div.detail');
		detailNode.find('.edit').removeClass('edit').addClass('view').attr('readOnly',true);
		detailNode.find('.view-gender').show();
		detailNode.find('.editor-gender').hide();
		detailNode.find('.single').hide();
		detailNode.find('.insurance').hide();
		detailNode.find('.empty').hide();
		detailNode.parent().prev().find('button').show();
		
		detailNode.find('div.mobile-phone input').attr("readOnly", true);
		detailNode.find('div.mobile-phone input.phone, div.mobile-phone .areas').css({
			'border':'none'
		});
	});

	
});

//确认更新航班信息
function updateFlightConfirm(flightid){
	var url = ajaxCurrentUrl;
	var data = G.get_form_data('J_updateFlightConfirm_' + flightid);
	$.post(url, data, function(json){
		if(json['OK']=='1'){
			alert('更新成功！');
			window.location.reload();
		}else{
			alert(json['errorMsg']);
		}
	}, 'json');
	return false;
};
//取消航班信息修改
function updateFlightCancel(flightid){
	window.location.reload();
};


//以下是支付方式的切换
$(initPlayWay);
function initPlayWay(){
	var content = $('#J_PaymentModuleList .play-way-content');
	var selectWay = content.find('.select-way');
	var wayMarkWrap = content.find('.way-mark-wrap');
	var selectWayDD = selectWay.find('dl dd');
	var wayMarkWrapDD = wayMarkWrap.find('dl.desc dd.desc-dd');
	
	selectWay.find('dl dd[currency*=CNY]').show();
	selectWayDD.first().addClass('selected').find('input').attr('checked',true);
	wayMarkWrapDD.first().show();
	
	
	selectWay.find('dl dd').delegate('input', 'click', function(event){
		selectWay.find('dl dd').removeClass('selected');
		var index = $(this).parent().parent().addClass('selected').attr('index');
		wayMarkWrapDD.hide();
		wayMarkWrapDD.eq(index).show();
	});
	
	selectWay.find('dl dd').click(function(event){
		if(event.currentTarget.tagName.toUpperCase() === 'DD'){
			selectWay.find('dl dd').removeClass('selected');
			var index = $(this).attr('index');
			$(this).addClass('selected').find('input').attr('checked',true);
			wayMarkWrapDD.hide();
			wayMarkWrapDD.eq(index).show();
		}
	});
	
	$('#rmb-currency').click(function(){
		$(this).addClass('selected-currency');
		$(this).next().removeClass('selected-currency');
		selectWayDD.hide();
		selectWay.find('dl dd[currency*=CNY]').show();
		selectWayDD.removeClass('selected').find('label:visible').first().click().addClass('selected');
	});
	
	$('#dollar-currency').click(function(){
		$(this).addClass('selected-currency');
		$(this).prev().removeClass('selected-currency');
		selectWayDD.show();
		selectWay.find('dl dd[currency=CNY]').hide();
		selectWayDD.removeClass('selected').find('label:visible').first().click().addClass('selected');
	});
	
	var expandCollapse = $('#J_PaymentModuleList .expand-collapse');

	//点击收起和展开
	expandCollapse.live('click', function(){
		var contentWrap = $(this).parent().next();
		if(contentWrap.is(':hidden')){
			//contentWrap.slideDown('slow');
			contentWrap.show();
			$(this).html('收起').css({
				'background-position': '30px -0'
			});
			
		} else {
			//contentWrap.slideUp('slow');
			contentWrap.hide();
			$(this).html('展开').css({
				'background-position': '30px -29px'
			});
		}
	});
}

//以下是结伴同游信息更新
$(function(){
	var travelingWrap = $('.traveling-wrap');
	var table = travelingWrap.find('table');
	table.find('tr:odd').css('background', '#f7f7f7').find('input').css('background', '#f7f7f7');
	table.find('tr:even').css('background', '#ffffff').find('input').css('background', '#ffffff');
	
	var modifyBtn = travelingWrap.find('button.modify-btn');
	var okBtn = travelingWrap.find('button.ok-btn');
	var cancelBtn = travelingWrap.find('button.cancel-btn');
	
	modifyBtn.click(function(){
		var parentEl = $(this).hide().parent();
		parentEl.find('button.ok-btn,button.cancel-btn').show();
		parentEl.prev().find('input.view').addClass('editor').removeClass('view').attr('readOnly', false);
		parentEl.prev().prev().find('input.view').addClass('editor').removeClass('view').attr('readOnly', false).first().focus();
	});
	
	cancelBtn.click(function(){
		$(this).hide().prev().hide();
		$(this).next().show();
		$(this).parent().prev().find('input.editor').addClass('view').removeClass('editor').attr('readOnly', true);
		$(this).parent().prev().prev().find('input.editor').addClass('view').removeClass('editor').attr('readOnly', true);
		
		
	});
	
	//结伴同游游客信息确认更新
	$('form[id=travel_companion_pay_form]').submit(function(){
		var url = ajaxCurrentUrl;
		var data = G.get_form_data(this.id);
		$.post(url, data, function(json){
			if(json['OK']=='1'){
				artDialog.alert('游客信息更新成功！');
				window.location.reload();
			}else{
				artDialog.alert(json['errorMsg']);
			}
		}, 'json');
		return false;
	});
});

var updateGuestsLi = function(){
	var ul = $('.flight-con .passenger ul'),
		ulWidth = ul.width();
	ul.find('li').each(function(li){
		var liWidth = $(this).find('label').width();
		if(liWidth > ulWidth/2){
			$(this).width(ulWidth);
		}
	});
}

$(function(){
	updateGuestsLi();
});