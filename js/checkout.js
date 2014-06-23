/* 结账过程的JS代码*/
var selected;

function selectRowEffect(object, buttonSelect) {
	if (!selected) {
		if (document.getElementById) {
			selected = document.getElementById('defaultSelected');
		} else {
			selected = document.all['defaultSelected'];
		}
	}

	if (selected) selected.className = 'moduleRow';
	object.className = 'moduleRowSelected';
	selected = object;

	// one button is not an array
	if (document.checkout_address.shipping[0]) {
		document.checkout_address.shipping[buttonSelect].checked=true;
	} else {
		document.checkout_address.shipping.checked=true;
	}
}

function rowOverEffect(object) {
	if (object.className == 'moduleRow') object.className = 'moduleRowOver';
}

function rowOutEffect(object) {
	if (object.className == 'moduleRowOver') object.className = 'moduleRow';
}
/*以上代码考虑优化或去掉=========================================================================================================*/

/* 打开编辑购物车产品界面 */
function editCartProducts(url, products_id_str, BookingBoxId, needHideID){
	var BookingBox = document.getElementById(BookingBoxId);
	$(BookingBox).hide(0);
	G.getBookingBox(url, products_id_str, BookingBoxId);
	var hideObj = document.getElementById(needHideID);
	$(hideObj).fadeOut(300, function(){
		$(BookingBox).fadeIn(100);
	});
}

/**
 * 载入checkout页面的相关模块信息
 * @param url 目标网址
 * @param _action 动作
 * @param _to_id 接收输出html内容的容器ID
 */
function getCheckoutModule(url, _action, _to_id){
	if (url.indexOf("?") > 0){ url += "&randnumforajaxaction=" + Math.random(); }else{ url += "?randnumforajaxaction=" + Math.random(); }
	jQuery.post(url,{action : _action },function(htmlData){
					jQuery("#"+_to_id).html(htmlData);	
					//自动执行输入框简繁体转换
					autoDoIconv();
				},"html");
}

/**
 * 参团日自行入住酒店按钮功能
 * @param reach_tag 被控制的标签
 * @param _this 参团日自行入住酒店对象
 */
function self_define_reach(reach_tag, _this){
	var obj = 'input[reach_tag="'+reach_tag+'"]';
	if(_this.checked === true){
		$(obj).val('');
		$(obj).attr('readonly', true);
	}else{
		$(obj).attr('readonly', false);
	}
}
/**
 * 行程结束自行离团按钮功能
 */
function self_define_departure(depa_tag, _this){
	var obj = 'input[depa_tag="'+depa_tag+'"]';
	if(_this.checked === true){
		$(obj).val('');
		$(obj).attr('readonly', true);
	}else{
		$(obj).attr('readonly', false);
	}
}
/**
 * 添加更多不同航班按钮功能
 * @param url 模块网址
 * @param parent_box_id 父级ID
 */
function add_more_flights(url, parent_box_id){
	var _num = $('#'+parent_box_id+' li.edit-flight:last-child').attr('num_tag');
	var array = _num.split('_');
	if(array.length != 2){
		alert('num_tag标签格式有误！');
		return false;
	}
	var i = array[0];
	i = (parseInt(i,10));
	var J = array[1];
	J = (parseInt(J,10) +1);
	var _parent_id = parseInt(parent_box_id.replace('flightBox_',''),10);
	if(i!=_parent_id){ alert('i:'+i+'必须等于_parent_id:'+_parent_id); return false; }
	if(!isNaN(_parent_id) && !isNaN(J)){
		$.post(url, { action: 'add_a_flight', J: J, parent_id : _parent_id }, function(html){
			$('#'+parent_box_id).append(html);
			//自动执行输入框简繁体转换
			autoDoIconv();
		}, 'html');
	}
}
/**
 * 添加一个航班信息输入框（用于用户中心的订单修改页面）
 * @param url 模块网址
 * @param parent_box_id 父级ID
 * @param callback 回调方法
 * @param orders_products_id 订单产品快照id（在已有订单才需要）
 */
function add_one_flight(url, parent_box_id, callback, orders_products_id){
	var _parent_id = parseInt(parent_box_id.replace('J_addFlightsUl_',''),10);
	var _num = $('#'+parent_box_id+' li.edit-flight:last-child').attr('num_tag');
	if(typeof(_num)=='undefined'){ 
		_num = _parent_id + '_-1';
	} else {
		artDialog.alert('请您先完成航班信息后再新增.');
		return;
	}
	var array = _num.split('_');
	if(array.length != 2){
		alert('num_tag标签格式有误！');
		return false;
	}
	var i = array[0];
	i = (parseInt(i,10));
	var J = array[1];
	J = (parseInt(J,10) +1);
	if(i!=_parent_id){ alert('i:'+i+'必须等于_parent_id:'+_parent_id); return false; }
	if(!isNaN(_parent_id) && !isNaN(J)){
		$.post(url, { action: 'add_a_flight', J: J, parent_id : _parent_id, orders_products_id: orders_products_id }, function(html){
			$('#'+parent_box_id).append(html);
			$('#J_addFlightsForm_'+i).show();
			$('#flightsContent_'+i).show().addClass('flight-info-wrap');
			
			//自动执行输入框简繁体转换
			autoDoIconv();
            
            callback && callback.apply(this);
		}, 'html');
	}
}
/**
 * 将客户英文名字传到航班信息选择框
 * @param shopcart_pro_list_id客户姓名那个表格ID号
 * @param i_num 第i个产品。i_num>=0
 */
function get_flights_guest(shopcart_pro_list_id, i_num ){
	var action = false;
	var CBT = '*[checkboxtarget^="flightsGuest['+ i_num +']"], *[checkboxtarget^="flightsGuestDep[' + i_num + ']"]';
	$(CBT).each(function(){
		var box_name = $(this).attr('checkboxtarget');
		var re = /flightsGuest\[\d+\]/ig;
		var j_num =parseInt( box_name.replace(re,'').replace(/\[|\]/ig,''), 10);
		
		var html_str = '';
		var lastNames = ($('#'+shopcart_pro_list_id).find('input[source^="last_name_"]'));
		var Names = ($('#'+shopcart_pro_list_id).find('input[source^="name_"]'));
		if($(lastNames).length === $(Names).length){
			var _last_names = new Array();
			var _names = new Array();
			
			$(lastNames).each(function(key){
				_last_names[_last_names.length] = $(this).val();
				if($(this).attr('oldval') != $(this).val()){
					action = true;
					$(this).attr('oldval', $(this).val());
				};
			});
			$(Names).each(function(key){
				_names[_names.length] = $(this).val();
				if($(this).attr('oldval') != $(this).val()){
					action = true;
					$(this).attr('oldval', $(this).val());
				};
			});
			for(var i=0; i<_last_names.length; i++){
				var fullName = G.htmlspecialchars(_last_names[i] + ' ' + _names[i]);
				if(fullName.length>2){
					html_str+= '<li><label><input name="'+ box_name +'[]" type="checkbox" value="'+ fullName +'" /> '+ fullName +'</label></li>';
				};
			};
		};
		
		if(action === true){
			$(this).html(html_str);
			//$('*[id^="J_flights_guest_result_'+ i_num +'_"]').html('');		//清空“乘坐此航班的游客”的显示消息
		};
	});
};

function initFlightPassenger(index){
	var shopcart_pro_list_id = 'J_shopcart_pro_list_' + index;
	var CBT = '*[checkboxtarget^="flightsGuest[' + index + ']"], *[checkboxtarget^="flightsGuestDep[' + index + ']"]';
	$(CBT).each(function(){
		var box_name = $(this).attr('checkboxtarget');
		var re = /flightsGuest\[\d+\]/ig;
		var j_num =parseInt( box_name.replace(re,'').replace(/\[|\]/ig,''), 10);
		
		var html_str = '';
		var lastNames = ($('#'+shopcart_pro_list_id).find('input[source^="last_name_"]'));
		var Names = ($('#'+shopcart_pro_list_id).find('input[source^="name_"]'));
		if($(lastNames).length === $(Names).length){
			var _last_names = new Array();
			var _names = new Array();
			
			$(lastNames).each(function(key){
				_last_names[_last_names.length] = $(this).val();
				$(this).attr('oldval', $(this).val());
			});
			$(Names).each(function(key){
				_names[_names.length] = $(this).val();
				$(this).attr('oldval', $(this).val());
			});
			for(var i=0; i<_last_names.length; i++){
				var fullName = G.htmlspecialchars(_last_names[i] + ' ' + _names[i]);
				if(fullName.length>2){
					html_str+= '<li><label><input name="'+ box_name +'[]" type="checkbox" value="'+ fullName +'" /> '+ fullName +'</label></li>';
				};
			};
		};
		$(this).html(html_str);
	});
}


/* 全选航班游客 */
function select_all_checkbox(obj){
	var parentDiv = $(obj).parents('div.select-all');
	parentDiv.next('.passenger-option').find('input').attr('checked', $(obj).attr('checked'));
};

/* 选择游客到航班游客列 */
function get_guest_from_checkbox_to_result(i,j){
	var fromObj = $('#J_flights_guest_checkbox_'+i+'_'+j).find('input[type="checkbox"][name^="flightsGuest"]');
	var toObj = $('#J_flights_guest_result_'+i+'_'+j);
	var _text = '乘坐此航班的游客：';
	$(fromObj).each(function(key){
		if($(this).attr('checked')==true){
			var t = $(this).val();
			t = t.replace(/[^a-z0-9\s]/ig, '');/*.toUpperCase();*/
			_text += '<span>【' + t + '】</span>';
		};
	});
	$(toObj).html(_text);
};

/**
 * 航班日期选择器(此函数需要日历控件类的支持@see calendar.js)
 * @outer 显示日历
 * @param {string} inputId 为日期输入框id
 * @param {string} inputParentId 日期输入框的父id（主要是用来放日历框）
 * @param {string} mindate 最小允许日期:1980-01-01
 * @param {string} maxdate 最大允许日期:2015-12-01
 */
/*
var G_cal = '';
function flightsCalendar(inputId, inputParentId, mindate, maxdate ){
	if(G_cal == '') G_cal = new Calendar();
	G_cal.appendTo(document.getElementById(inputParentId));
	var _mind = mindate, _maxd = maxdate;
	if(typeof(mindate)=='undefined'){
		var myDate = new Date();
		_mind = myDate.getFullYear() + '-'+ (myDate.getMonth()+1) +'-'+ myDate.getDate();
	}
	if(typeof(maxdate)=='undefined'){ _maxd = '2100-12-31';}
	G_cal.open(document.getElementById(inputId), {
		//acceptDate : ["2013-11-18", "2013-11-19", "2014-7-20", "2014-7-21", "2014-7-22", "2014-7-23", "2015-7-25", "2015-7-29"],
		minDate: _mind,
		maxDate: _maxd,
		selectedDate: $("#"+inputId).val()
		//dataNum: 1
	}); 
	//G_cal.wrapper.style.left = 0;
	//G_cal.wrapper.style.top = 25 + "px";
	G_cal.notClickClose();
};
*/

/**
 * 航班日期选择器(此函数需要日历控件类的支持@see calendar.js)
 * @outer 显示日历
 * @param {string} inputId 为日期输入框id
 * @param {string} mindate 最小允许日期:1980-01-01
 * @param {string} maxdate 最大允许日期:2015-12-01
 */
function flightsCalendarYhb(inputId, mindate, maxdate ){
	var range = '2013-12-31:2099-12-31';
	if(mindate && maxdate){
		range = mindate + ':' + maxdate
	}
	var defaultCon = {
			dispalyMonths:2,
			readout: true,
			range: range
		};
	$('#' + inputId ).calendar(defaultCon || {});
}

// 出生日期选择器
function birthDateCalendar(inputId, inputParentId, mindate, maxdate){
	return flightsCalendar(inputId, inputParentId, mindate, maxdate );
}

function seeProtocol(){
	$('#protocol').fadeIn(500);
}

function closeProtocol(){
	$('#protocol').fadeOut(500);
}

function renderFlightView(index, url){
	$('#js-add-flight' + index).click(function(event){
		 /*var fun = function(){
			passengerflight.renderView();
		 }*/
         
         if(event.currentTarget.tagName.toUpperCase() == 'BUTTON'){
			var fun = function(){
				initFlightPassenger(index);
			 };
			 $(this).parent().hide().next().show();
			 
			 add_one_flight(url, 'J_addFlightsUl_' + index, fun);
		 }
	});	
}

//收起,展开
$(function(){
	var expandCollapse = $('#PassengerFlightInfo .expand-collapse');
	expandCollapse.live('click', function(){
		var contentWrap = $(this).parent().next();
		if(contentWrap.is(':hidden')){
			contentWrap.slideDown('slow');
			//contentWrap.show();
			$(this).html('收起').css({
				'background-position': '30px -0'
			});
			
		} else {
			contentWrap.slideUp('slow');
			//contentWrap.hide();
			$(this).html('展开').css({
				'background-position': '30px -29px'
			});
		}
	});
});

/**
 * 点击确定订单按钮前面先判断协议是否勾选
 */
var validateConfirmation = function(){
	var label = $('#js-agree-label'),
		agreeCheck = label.find('#agree-check');
	agreeCheck.change(function(){
		if($(this).attr("checked")){
			label.removeClass("agree-label");
		}
	});
	var checked = agreeCheck.attr('checked');
	if(checked){
		label.removeClass("agree-label");
		return true;
	}
	label.addClass("agree-label");
	return false;
}