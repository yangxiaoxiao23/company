/**
 * @charset=utf-8
 */

/**
 * json是初始化时购买面板所需要的数据及默认值数据
 * @param json 初始传入的json数组
 */
var jsons ,
    minDateCalendar,
    maxDateCalendar;

/**
 * 产品详细页面购买面板处理类
 * @param json 初始化时传入的数据资料，json格式。
 */
function booking_box(json){
	jsons = json;
	var Top = this;

    /**
     * 创建酒店产品的退房日期
     * @param [array] json_checkout 退房日期相关数据
     */
    function c_checkout(json_checkout){
        var html='<div class="div">';
        html+= '<p class="sel_title">退房日期：</p>';
        html+= '<div id="J_hotel_check_out_date" >'+Forms.cNumberEnglishIuput('check_out_date', GET['check_out_date'], 'id="J_hotel_check_out_date_input" readonly="readonly" class="date_bg" mindate="'+json_checkout.checkOutMinDate+'" maxdate="'+json_checkout.checkOutMaxDate+'"')+'</div>';
        html+= '</div>';
        return html;
    }

    /**
	 * 创建产品属性
	 * @param Array json_attributes json格式的属性
	 */
	function c_attributes(json_attributes){
		var html='';
		html+= '';
		for(var i=0, n=json_attributes.length; i<n; i++){
			var _options_name = '';
			var selects = '';
			var _products_options_id = json_attributes[i]['products_options_id'];
			var _selected = json_attributes[i]['selected'].toString();  //'287,289,290';
            //console.log(_selected);
            //_selected = '287,289,290';
			var _options_array = [];
			var _isTitle = true;
            for(var j in json_attributes[i]){
				//alert(i+':'+j);
				if(_isTitle === true){
					_options_array = json_attributes[i][j];
					_options_name = j;
                    _isTitle = false;
				}
			}
            //复选框
            if(json_attributes[i]['products_options_type']=='checkbox'){
                var _min = 0;
                var _max = 0;
                if(json_attributes[i]['checkbox_min_max']){
                    var tmp = json_attributes[i]['checkbox_min_max'].split(':');
                    _min = tmp[0];
                    _max = tmp[1];
                }
                html+='<div class="slel_box"><p class="sel_title">'+ _options_name +'：'+'</p>'+ Forms.cSelectM('id['+_products_options_id+'][]', _options_array , _selected, {'aClass':'selectspan','ulClass':''}, _min, _max ) +'</div>';
                onclick_array[onclick_array.length]='id['+_products_options_id+'][]';
            }else{
                //单选下拉框
			    html+='<div class="slel_box"><p class="sel_title">'+ _options_name +'：'+'</p>'+ Forms.cSelect('id['+_products_options_id+']', _options_array , _selected, {'aClass':'selectspan','ulClass':''} ) +'</div>';
                onchange_array[onchange_array.length]='id['+_products_options_id+']';
            }
		}
		return html;
	}
	/**
	 * 创建房间人数信息
	 * @param Array json_room 已选择的房间人数信息
	 */
	function c_room_info(json_room){
		var html = '';
		var _options = [];
		for(var i=1; i<=json_room['max_room']; i++){
			_options[_options.length]={'id':i,'text':i};
		}
		
		html+='<div id="J_Room"><span class="selectspan sel_rooms_num">选择房间人数</span>';
		onchange_array[onchange_array.length]='room_num';
		//结伴同游
		html+= '<div class="room_list_box">房间：'+ Forms.cSelect('room_num', _options, json_room['selected_room_num'],'','class="sel_rooms"'); 
		if(json['productProjectName']['titleTravelCompanions']){
			html+= '<label class="tra_com tooltip" tooltip="结伴同游仅支持1个房间">'+Forms.cCheckBox('is_travel_companion','1',(json['is_travel_companion']=='1' ? true : false),'class="check_tra"')+' '+ json['productProjectName']['titleTravelCompanions'] +'</label>';
			onclick_array[onclick_array.length] = 'is_travel_companion';
		}
		html+='<ul id="'+ Top.RoomListId +'" tip="具体房间人数信息"></ul><p class="room_btns"><a href="javascript:;" class="rbtn_ok r_ok">确定</a><a href="javascript:;" class="rbtn_cancel r_cancel">取消</a></p></div></div></div>';
		
		return html;
	}

    /**
     * 创建上车地址信息框
     * @param string json_str 上车地址数据信息字符串，注意是json字符串，不是对象。用时要处理成对象
     */
    function c_departure_address(json_str){
        //alert(j.list.length);
        var html = '';
        html += '<div class="slel_box dep_add"><p class="sel_title">上车地址：</p><div id="J_dAddressBoxParent"><input name="J_dAddressBox" class="train_line shadow_box" value="点击选择上车路线" /></div></div>';
        onclick_array[onclick_array.length] = 'J_dAddressBox';
        return html;
    }
	
	//选择房间人数
	$('#J_Room .sel_rooms_num').live('click',function(){
		$(this).next('.room_list_box').show();										   
	});
	
	//数据初始化区域 start {
	var Forms = new forms({seletc_simulation_tags:{Div:'div',Ul:'ul',Li:'li',A:'div'} });	//载入表单类forms.js，并定义下拉菜单标相关标签

    if(typeof(Forms)!='object'){
		alert('表单类没有载入，请检查表单类文件forms.js是否被正确载入！');
		return false;
	}
	if(typeof(json)!='object'){
		alert('初始参数类型必须是：object');
		return false;
	}
	var GET = json['get'];	//GET参数
	if(json['roomInfo']){	//房间信息预定义
		this.have_room = json['roomInfo']['have_room'];		//是否有房间
		this.RoomListId = 'J_RoomList';						//房间信息列表的ul的id
		this.max_adult = json['roomInfo']['max_adult'];		//房间最大成人数
		this.max_child = json['roomInfo']['max_child'];		//房间内最大小孩数
		this.max_room_guest = json['roomInfo']['max_room_guest'];	//每间房最多住几人
	}
	//数据初始化区域 end }
	
	var TopDivId = json['top_div_id'];
	var FormsId = json['form']['id'];
	var FormsName = json['form']['name'];
	$('#'+TopDivId).html(Forms.cForm(FormsId, FormsName, json['form']['action']));	//创建表单

    var producetProjectName = json['productProjectName'];

	if(!producetProjectName){ alert('缺少' + producetProjectName); }else{//创建相关输入框
		var html = '';
		var onchange_array = [], onclick_array = [];				//收集表单各项数据完成后要赋予的各个动作
		html+= Forms.cHidden('products_id', json['products_id']);	//创建产品id隐藏域
		if(producetProjectName['titleDepartureDate']){		//创建出发日期
			html+= '<div class="slel_box"><p class="sel_title">'+producetProjectName['titleDepartureDate']+"："+'</p>'+Forms.cSelect('products_departure_date', json['allDepartureDate'], GET['products_departure_date'], {'aClass':'selectspan'} )+'</div>';
			onchange_array[onchange_array.length]='products_departure_date';

		}
        if(producetProjectName['titleCheckoutDate']){
            html += c_checkout(json['checkOutDate']);   //酒店的退房日期
            onclick_array[onclick_array.length] = 'check_out_date';
        }
		if(json['attributes']){	//创建产品属性
			html += c_attributes(json['attributes']);
		}

		//上车地址信息
		if(json['departureAddress']){
		    html += c_departure_address(json['departureAddress']);
		}
		//房间人数信息
		if(producetProjectName['titleRoomPeopleNum']){
			html+= '<div class="slel_box rooms_info"><p class="sel_title">'+ json['productProjectName']['titleRoomPeopleNum'] +"："+'</p>';
			html+= c_room_info(json['roomInfo']);
		}

		//加订酒店
		//判断是否有酒店
		if(json['haveHotel']){
			html+='<div class="book_hotel"><span class="book_btn">加订酒店</span>';	
		}
		
		///插入参团前酒店
		if(json['beforeHotel']){
			html+='<div class="b_hotel b_before"><p class="book_title">参团前加订酒店<label class="no_book">不预订</label></p><ul class="book_options"><li style="z-index:3;"><label class="b_title">选择酒店：</label><span showbox="1" class="shadow_box show_bookbox"></span><div class="book_common_flow bc_flow1"><dt class="bc_title">推荐酒店<a class="bc_cancel" href="javascript:;">×</a></dt><div class="bc_list"><dl class="abso"></dl></div><div class="bc_detail"></div><p class="h_list_pages cfix"><a class="t_prev" href="javascript:;">上一页</a><a class="t_next" href="javascript:;">下一页</a></p><p class="h_list_btns"><a href="javascript:;" class="rbtn_ok">确定</a><a href="javascript:;" class="rbtn_cancel">取消</a></p></div></li><li id="book_in_box"><label class="b_title">入住日期：</label><input id="book_in" name="before_hotel[checkin_date]" type="text" value="" class="shadow_box date_bg"></li><li><label class="b_title">退房日期：</label><span class="book_set_date"></span></li></ul></div>';
		}
		
		///插入参团后酒店
		if(json['afterHotel']){
			html+='<div class="b_hotel b_after"><p class="book_title">参团后加订酒店<label class="no_book">不预订</label></p><ul class="book_options"><li style="z-index:2;"><label class="b_title">选择酒店：</label><span showbox="1" class="shadow_box show_bookbox"></span><div class="book_common_flow bc_flow2"><dt class="bc_title">推荐酒店<a class="bc_cancel" href="javascript:;">×</a></dt><div class="bc_list"><dl class="abso"></dl></div><div class="bc_detail"></div><p class="h_list_pages cfix"><a class="t_prev" href="javascript:;">上一页</a><a class="t_next" href="javascript:;">下一页</a></p><p class="h_list_btns"><a href="javascript:;" class="rbtn_ok">确定</a><a href="javascript:;" class="rbtn_cancel">取消</a></p></div></li><li><label class="b_title">入住日期：</label><span class="book_set_date"></span></li><li id="book_out_box"><label class="b_title">退房日期：</label><input id="book_out" name="after_hotel[checkout_date]" type="text" value="" class="shadow_box date_bg"></li></ul></div>';
		}
		if(json['haveHotel']){
			html+='</div>';	
		}
        var fast_buy_button = '';
        if(json['fastBuyButton'] && json['fastBuyButton']!=''){
            fast_buy_button = Forms.cButton(json['fastBuyButton'], 'button', 'onclick="checkBuy(0)" class="go_recharge"');
        }
		html+= '<div class="recharge_btn">'+ fast_buy_button + Forms.cButton('<span>'+json['submitButtonName']+'</span>','button','onclick="checkBuy(1)" class="go_recharge"') +'</div>';

		//html+= '<div>下拉菜单：'+ Forms.cSelect('test11',[{"id":1,"text":"文字1"},{"id":2,"text":"文字2"}],'2','0','onchange="alert(\'测试\')"') +'</div>';
		//html+= '<div>单行文本框：'+ Forms.cInput('test11','12y') +'</div>';
		//html+= '<div>单选框：'+ Forms.cRadio('cradio','1',true) + Forms.cRadio('cradio','0',false) +'</div>';
		//html+= '<div>复选框：'+ Forms.cCheckBox('checkbox[]','1',true) + Forms.cCheckBox('checkbox111[]','0',false) +'</div>';
		//onclick_array[onclick_array.length] = 'checkbox[]';
		//onclick_array[onclick_array.length] = 'checkbox111[]';
		//html+= '<div>密码框：'+ Forms.cPassword('test11','12y') +'</div>';
		//html+= '<div>多行文本框：'+ Forms.cTextarea('tttt','','','virtual','中华人民共和国') +'</div>';
		$('#J_BookingBoxForm').html(html);


        var bookInJq = $('#book_in'),
            validateBookInDate = function(){
                if(!bookInJq.attr('mindate')){
                    art.dialog.alert('请先选择酒店，然后再选择入住日期！');
                    return false;
                }
            };

        minDateCalendar = bookInJq.calendar({
            readout: true,
            dispalyMonths: 2,
            showBefore: validateBookInDate
        });

        var bookOutJq = $('#book_out'),
            validateBookOutDate = function(){
                if(!bookInJq.attr('mindate')){
                    art.dialog.alert('请先选择酒店，然后再选择入住日期！');
                    return false;
                }
            };

        maxDateCalendar = bookOutJq.calendar({
            readout: true,
            dispalyMonths: 2
        });


		//触发出发日期等下拉列表动作
		for(var i=0, n=onchange_array.length; i<n; i++){
			Forms.selectOnchage(onchange_array[i]);
			this._change(FormsId, onchange_array[i]);
		}
		//触发结伴同游等复选框动作
		for(var i=0, n=onclick_array.length; i<n; i++){
			this._click(FormsId, onclick_array[i]);
		}
		//数据载入完毕后要触发一次房间信息动作
		$('#'+FormsId+' select[name="room_num"]').change();
	}
	//插入参团前加订酒店列表
    if (json['beforeHotel']) {
        for (var i = 0; i < json['beforeHotel'].length; i++) {
            $('.book_hotel .b_before .book_common_flow .bc_list dl.abso').append('<dd><label><input mindate="' + json['beforeHotel'][i].checkInMinDate + '" maxdate="' + json['beforeHotel'][i].checkInMaxDate + '" type="radio" name="before_hotel[p_id]" value="' + json['beforeHotel'][i].id + '" /><span>' + json['beforeHotel'][i].name + '</span></label></dd>');
            $('.book_hotel .b_before .book_common_flow .bc_detail').append('<div class="bc_dlist"><dt class="bc_de_title">' + json['beforeHotel'][i].name + ' <a target="_blank" href="' + json['beforeHotel'][i].href + '">查看酒店详情>></a></dt><dl><dd><label>酒店星级：</label>' + json['beforeHotel'][i].star + '星</dd><dd><label>地址：</label>' + json['beforeHotel'][i].address + '</dd><dd><label>电话：</label>' + json['beforeHotel'][i].contactPhone + '</dd></dl></div>');
        }
        if (json['beforeHotelDefaultId']) {
            $('.book_hotel .b_before .book_common_flow .bc_list dl.abso dd').each(function () {
                var vid = $(this).find('input').val();
                if (vid == json['beforeHotelDefaultId']) {
                    $(this).addClass('oncur');
                    $(this).find('input').attr('checked', 'checked');
                    var num = $(this).index();
                    $('.book_hotel .b_before .book_common_flow .bc_detail .bc_dlist:eq(' + num + ')').show();
                }
            });
        }
    }
	//插入参团后加订酒店列表
	if(json['afterHotel']){
        for(var i=0; i<json['afterHotel'].length; i++){
            $('.book_hotel .b_after .book_common_flow .bc_list dl.abso').append('<dd><label><input mindate="'+ json['afterHotel'][i].checkOutMinDate +'" maxdate="'+ json['afterHotel'][i].checkOutMaxDate +'" type="radio" name="after_hotel[p_id]" value="'+ json['afterHotel'][i].id +'" /><span>'+ json['afterHotel'][i].name +'</span></label></dd>');
            $('.book_hotel .b_after .book_common_flow .bc_detail').append('<div class="bc_dlist"><dt class="bc_de_title">'+ json['afterHotel'][i].name +' <a target="_blank" href="'+ json['afterHotel'][i].href +'">查看酒店详情>></a></dt><dl><dd><label>酒店星级：</label>'+ json['afterHotel'][i].star +'星</dd><dd><label>地址：</label>'+ json['afterHotel'][i].address +'</dd><dd><label>电话：</label>'+ json['afterHotel'][i].contactPhone +'</dd></dl></div>');
        }
        if(json['afterHotelDefaultId']){
            $('.book_hotel .b_after .book_common_flow .bc_list dl.abso dd').each(function(){
                var vid = $(this).find('input').val();
                if(vid == json['afterHotelDefaultId'])	{
                    $(this).addClass('oncur');
                    $(this).find('input').attr('checked','checked');
                    var num = $(this).index();
                    $('.book_hotel .b_after .book_common_flow .bc_detail .bc_dlist:eq('+ num +')').show();
                }
            });
        }
    }
};

var _dd = $('.train_list dl dd');
var _pdd = $('.train_list dl.train_l_parent dd');
_dd.live('hover',function(){ $(this).toggleClass('hover'); });
_dd.live('click',function(){ $(this).addClass('oncur').siblings().removeClass('oncur'); });
$('.train_list a.t_cancel,.train_list a.rbtn_cancel').live('click',function(){
	$('.train_list').hide();
});
if(_pdd.length > 5){
	$('.train_pages a.t_next').show();
	$('.train_l_box').addClass('ctrl_h');
	$('.train_l_parent').addClass('abso');
}
var par = $('.train_list dl.train_l_parent');
var ph = 0;
var bu = 5;
$('.train_pages a').live('click',function(){
	var inx = $(this).index();
	if(inx == 1){
		ph += 125; bu += 5;
		if(_pdd.length-bu < 1){ $(this).hide(); }
	}else{
		ph -= 125; bu -= 5;	
		if(bu < 6){ $(this).hide(); }
	}
	$(this).siblings().show();
	par.css("top",-ph);
});


//预订酒店弹出层 操作js
$('.book_options .show_bookbox').live('click',function(){
	$('.book_common_flow').hide();												   
	$(this).next('.book_common_flow').show();
});
function bc_flow(hotel){
	var _pd = $('.bc_list dl dd',hotel);
	_pd.live('hover',function(){ $(this).toggleClass('hover'); });
	_pd.live('click',function(){ 
		var num = $(this).index();
		$('.bc_detail .bc_dlist',hotel).stop(true,true).filter(":visible").hide();
		$('.bc_detail .bc_dlist:eq('+ num +')',hotel).fadeIn(300);
		$(this).addClass('oncur').siblings().removeClass('oncur'); 
	});
	$('.bc_title a.bc_cancel,.h_list_btns a.rbtn_cancel',hotel).live('click',function(){
		$(this).parents('.book_common_flow').hide();
	});
	$('.h_list_btns a.rbtn_ok',hotel).live('click',function(){
		var _t = $('.bc_list dl dd input[checked]',hotel).next('span').text();	
		var _min = $('.bc_list dl dd input[checked]',hotel).attr('mindate'),_max = $('.bc_list dl dd input[checked]',hotel).attr('maxdate');
		$(this).parents('li').nextAll('li').find('input:visible').attr({'mindate':_min,'maxdate':_max});

        var currentProductId = $('.bc_list dl dd input[checked]',hotel).val();
        minDateCalendar[0].cfg.range = getRangeDate(_min, _max, getProductLimitTime(currentProductId));

		$(hotel).prev('.show_bookbox').text(_t);
		$(hotel).hide();
	});

	if(_pd.length > 5){
		$('.h_list_pages a.t_next',hotel).show();
		$('.bc_list',hotel).addClass('ctrl_h');
	}
	var par = $('.bc_list .abso',hotel);
	var ph = 0;
	var bu = 5;
	$('.h_list_pages a',hotel).live('click',function(){
		var inx = $(this).index();
		if(inx == 1){
			ph += 125; bu += 5;
			if(_pd.length-bu < 1){ $(this).hide(); }
		}else{
			ph -= 125; bu -= 5;	
			if(bu < 6){ $(this).hide(); }
		}
		$(this).siblings().show();
		par.css("top",-ph);
	});
}
bc_flow('.bc_flow1');bc_flow('.bc_flow2');

//订或不订酒店的展示操作
$('.book_hotel span.book_btn').live('click',function(){
	$('.book_hotel .b_hotel').show();
	$(this).hide();
});

//不预订时要把当前选择的酒店和日期信息清除！
$('.b_hotel .no_book').live('click',function(){
	var parent = $(this).parents('.b_hotel');
    $(parent).hide();
    $(parent).find(':text').val('');
    $(parent).find(':radio').attr('checked',false);
    $(parent).find('span[showbox="1"]').html('');

	if($('.b_hotel:visible').length < 1){
		$('.book_hotel span.book_btn').show();
	}
});

//实例化入驻酒店日期
//进驻酒店日期选择
jQuery(document).ready(function ($) {



    /*var bin = new Calendar();
    setTimeout(function(){ bin.appendTo(document.getElementById('book_in_box')); },1000);
	$("#book_in").live('click',function() {
        if($(this).attr('mindate') == undefined){
            art.dialog.alert('请先选择酒店，然后再选择入住日期！');
            return false;
        }
		var _mind = $(this).attr('mindate'),
            _maxd = $(this).attr('maxdate'),
            _oh = $(this).offset().top,
            _ol = $(this).offset().left;

		bin.open(this, {
			//acceptDate : ["2012-11-18", "2012-11-19", "2013-5-20", "2013-5-21", "2013-5-22", "2013-5-23", "2013-6-20", "2013-6-21"],
			minDate: _mind,
			maxDate: _maxd,
			selectedDate: this.value
			//dataNum: select.value
		}); 
		bin.wrapper.style.left = _ol + 'px';
		bin.wrapper.style.top = (_oh+25)+ 'px';
	});

	$("#book_in").live('keyup',function(){ $(this).val(''); });

    //bin.notClickClose();*/

    /*
	//离开酒店日期选择
	var cal = new Calendar();

	setTimeout(function(){ cal.appendTo(document.getElementById('book_out_box')); },1000);
	$("#book_out").live('click',function () {
        if($(this).attr('maxdate') == undefined){ art.dialog.alert('请先选择酒店，然后再选择退房日期！'); return false; }
        var _mind = $(this).attr('mindate'),_maxd = $(this).attr('maxdate'),_oh = $(this).offset().top,_ol = $(this).offset().left;
		cal.open(this, {
			//acceptDate : ["2012-11-18", "2012-11-19", "2013-7-20", "2013-7-21", "2013-7-22", "2013-7-23", "2013-7-25", "2013-7-29"],
			minDate: _mind,
			maxDate: _maxd,
			selectedDate: this.value
			//dataNum: select.value
		}); 
		cal.wrapper.style.left = _ol + 'px';
		cal.wrapper.style.top = (_oh+25)+ 'px';
	});
	$("#book_out").live('keyup',function(){ $(this).val(''); });
	cal.notClickClose();
	*/
});

/**
 * 返回酒店的提前预定天数
 * @param productId 酒店的ID
 * @return {*|int}
 */
function getProductLimitTime(productId){
    var hotels = jsons['beforeHotel'];
    for(var i= 0,len = hotels.length;i<len;i++){
            var hotel = hotels[i];
        if(hotel['id'] == productId){
            return hotel['bookLimitTime'] || 2;
        }
    }
}

/**
 * 返回range参数
 * @param startDate 从数据库中读取出来的最小时间,即开始时间
 * @param endDatebo  从数据库中读取出来的最大时间,即结束时间
 * @param limit 提前预定天数
 * @return {String} 然会range参数
 */
function getRangeDate(startDate, endDate, limit){
    var today = new Date(),
        sd = new Date(startDate);

    startDate = today > sd  ? today : sd;
    if(limit.indexOf('hours') > -1){
        limit = Math.ceil(parseInt(limit)/24);
    } else {
        limit = Math.ceil(parseInt(limit));
    }
    return DateAdd(startDate, limit) + ':' + endDate;
}

//补0
function addZero(x){
	return x < 10 ? '0'+x : x ;
}

/**
 * 日期加、减天数得出新日期
 * @param sdate 原始日期 YYYY-MM-DD
 * @param days 要加的天数，如果是负数则为减
 * @returns {string} 返回新日期
 * @constructor
 */
function DateAdd(sdate, days) {
    var a = new Date(sdate);
	a.setDate(a.getDate()+days);
    return a.getFullYear() + '-' + addZero(a.getMonth()+1) + '-' + addZero(a.getDate());
}

//选择或改变出团日期后重置酒店日期
$('div[virtual_id="products_departure_date"] ul li').live('click',function(){
    //alert('点击了出发日期！');
    if($(this).attr('vtitle')){
        var _gdate = $(this).attr('vtitle');
        var _g = new Date($(this).attr('vtitle'));
        _g.setDate(_g.getDate() - 1);
        var _maxdate = _g.getFullYear() + '-' + addZero(_g.getMonth()+1) + '-' + addZero(_g.getDate());
		var _adate = DateAdd(_gdate, jsons['TravelDays']-1);
        var _mindate = DateAdd(_adate, +1);
		$('#J_BookingBoxForm input[name="before_hotel[p_id]"]').attr("maxdate",_maxdate);
		$('#J_BookingBoxForm input[name="after_hotel[p_id]"]').attr('mindate',_mindate);
		$('#J_BookingBoxForm .b_before ul li span.book_set_date').html(_gdate);
		$('#J_BookingBoxForm .b_after ul li span.book_set_date').html(_adate);
		$('#J_BookingBoxForm #book_in').val('').attr('maxdate',_maxdate);
		$('#J_BookingBoxForm #book_out').val('').attr('mindate',_mindate);
        //alert('要在出发日期的下行一添加结束日期：'+_adate);
	}
	$('.book_common_flow .bc_list dl dd').each(function(){
		var _inpt = $(this).find('input[type="radio"]');
		if(_inpt.attr('maxdate') < _inpt.attr('mindate')){
			_inpt.attr('disabled','disabled');
			_inpt.parent('label').addClass('disabled');
		}else{
			_inpt.removeAttr('disabled');
			_inpt.parent('label').removeClass('disabled');	
		}
	});
});

$('.sel_box ul li').live('click',function(){
    getPrice();
});


var ClickBody = function(){
    this.nodes = [];
};

ClickBody.prototype.addNodeClassId = function(nodeClassId){
    this.nodes.push(nodeClassId);
}

var clickBodyInfo = new ClickBody();
//将选择六大主题项目的信息加入 规则: 点击展开的class名 展开层的父节点CLASS或者ID  展开层的Class
clickBodyInfo.addNodeClassId(['cont_text', '.sel_box_m', '.sel_box_m ul']);

clickBodyInfo.addNodeClassId(['train_line', '#J_dAddressBoxParent', '.addr_common_flow']);
//将选择房间人数信息加入 规则: 点击展开的class名 展开层的父节点CLASS或者ID  展开层的Class
clickBodyInfo.addNodeClassId(['sel_rooms_num', '#J_Room', '.room_list_box']);

//在点击页面的时候(不包含点击当前展开的层),将其展开的层隐藏
$('body').live('click', function(event){
    var targetJq = $(event.target); //获得鼠标点击的元素
    var nodes = clickBodyInfo.nodes, temp;
    for(var i=0,len=nodes.length;i<len;i++){
        temp = nodes[i];
        $(temp[2]).css('display', 'none');
        var parentLen = targetJq.parents(temp[1]).length;
        if(targetJq.hasClass('rbtn_ok') || targetJq.hasClass('rbtn_cancel')){
            continue;
        }

        if((targetJq.hasClass(temp[0]) && parentLen) || parentLen){
            $(temp[2]).css('display', 'block');
        }
    }
});


/**
 * 获取最小的必选的选项个数
 * @param {Object} json_attributes
 * @return {Number}
 */
var getMinChecked = function(json_attributes){
    var min = 0;
    for(var i=0, n=json_attributes.length; i<n; i++){
        //复选框
        if(json_attributes[i]['products_options_type'] === 'checkbox'){
            if(json_attributes[i]['checkbox_min_max']){
                var tmp = json_attributes[i]['checkbox_min_max'].split(':');
                min = tmp[0];
            }
        }
    }
    return min;
}

var rbtnOkCallBack = function(event){
    $('.sel_box_m').next('.sel_info_m').remove(); //如果存在,则先移除该节点
    var content = '<div class="sel_info_m"><ul>',
        checkedBox = $('.sel_box_m input[type="checkbox"]:checked');
    if(checkedBox.length < getMinChecked(jsons['attributes']) && checkedBox.length !== 0){
        return;
    }
    checkedBox.each(function(){
        var checkBox = $(this);
        var nextNode = checkBox[0].nextSibling;
        content += '<li>' + (nextNode && nextNode.nodeValue) || '' + '</li>';
    });
    content += '</ul></div>';
    $('.sel_box_m ul').hide();
    $('.sel_box_m').after(content);
    getPrice();
};

//确认选择六大主项目
$('.slel_box .sel_box_m a.rbtn_ok').live('click', rbtnOkCallBack);

//取消选择六大主项目
$('.slel_box .sel_box_m a.rbtn_cancel').live('click',function(event){
	$('.sel_box_m ul').hide();
});

//大日历框日期点击事件
$('#divCalendar .calendarContent ul li:not(".disable")').live('click',function(){
	$(this).css('background-color','#cae2f8').siblings().css('background-color','');																		   
	var _d = addZero($(this).attr('d'));
	var _m = addZero($(this).parents('#divCalendar').find('.calendarTool .yearTitle').attr('m'));
	var _y = $(this).parents('#divCalendar').find('.calendarTool .yearTitle').attr('y');
	var _date = _y + '-' + _m + '-' + _d;
	$('#J_BookingBox .slel_box .sel_box ul[name="products_departure_date"] li[vtitle='+ _date +']')	.click();
});

//确认和取消房间人数信息
$('.room_list_box p.room_btns a.r_ok').live('click',function(event){
	$('.room_list_box').next('.room_info_box').remove();
	var roomInfo = $('.room_list_box #J_RoomList li:visible');
	$('#J_RoomList li:hidden').remove();
	var _html='<div class="room_info_box"><ul>';
	for(var i=0; i<roomInfo.length; i++){
		if(roomInfo.eq(i).find('input[type="checkbox"]').attr('checked')){
			var _t = roomInfo.eq(i).find('input[type="checkbox"]').next('span').text();
			_html+='<li><span>成人：'+ roomInfo.eq(i).find('select').eq(0).val() +'</span><span>小孩：'+ roomInfo.eq(i).find('select').eq(1).val() +'</span><span>'+ _t +'</span></li>';	
		}else{
			_html+='<li><span>成人：'+ roomInfo.eq(i).find('select').eq(0).val() +'</span><span>小孩：'+ roomInfo.eq(i).find('select').eq(1).val() +'</span></li>';	
		}
	}
	_html+='</ul></div>'
	$('.room_list_box').after(_html);
	$('.room_list_box').hide();
	getPrice();
});


$('.room_list_box p.room_btns a.r_cancel').live('click',function(event){
	$('#J_RoomList li:hidden').show();
	$('input[name="is_travel_companion"]').removeAttr('checked');
	$('.room_list_box').hide();
});


$('#J_RoomList li').live('hover',function(){
	$(this).find('em').toggle();
});
$('#J_RoomList li em').live('click',function(){
	$(this).parent('li').hide();
	var _len = $('#J_RoomList li').length;
	if( _len < 1){
		$('.room_list_box').hide();	
		$('input[name="is_travel_companion"]').removeAttr('checked');
	}
	var _num = $('#J_Room .sel_rooms').val();
	$('#J_Room .sel_rooms').val(_num-1);
});

//异步提交数据计算总价格
function getPrice(){
	if(typeof(JS_productInfoUrl)=="undefined"){ /*alert('JS_productInfoUrl没有定义！');*/ return;}
    var form_data = $('#J_BookingBoxForm').serialize();
	var date = $('input[name="products_departure_date"]').val();
    var url = G.url_rand(JS_productInfoUrl);
	if(date != ''){
		$.getJSON(url+'&action=priceBudget&callback=?&'+form_data, function(d){
			if(d.priceTotal){
				if($('.total_price_box')){
					$('.total_price_box').remove();
				}
				$('.recharge_btn').before('<div class="total_price_box">总费用：<span class="total_pr">'+ d.priceTotal +'</span></div>');
				for(var i=0; i<d.otherCurrencies.length; i++){
					$('.total_price_box').append('<p class="otherPr">'+ d.otherCurrencies[i] +'</p>');
				}
			}else{
				art.dialog.tips(d.error);	
			}																				 
		});	
	}
}
booking_box.prototype = {
	//设置元素改变时的动作
	_change:function(form_id, name){
		var topThis = this;
		var obj = $('#'+form_id+' select[name="'+ name +'"]');
		if($(obj).attr('name')==name){
			$(obj).change(function(){
				switch(name){
					case 'products_departure_date':			//出发日期时
                        //alert('选了出发日期');没用了。
                        break;
					case 'room_num':						//选择房间时
						if(this.value >1 ){					//当房间数大于1时把结伴同游的复选框取消
							$('#'+form_id+' input[name="is_travel_companion"]').attr('checked',false);
						}
						topThis.set_adult_child_room(this.value);	//根据房间数据触发具体房间成人和小孩信息
					break;
				}
			});
		}
		//$(emtObj).change(function(){
			//alert($(this).attr('name'));
		//});
	},
	//设置元素点击时的动作
	_click:function(form_id, name){
        var topThis = this;
		var obj = $('#'+form_id+' input[name="'+ name +'"]');
		if($(obj).attr('name')==name){
			var check_box_done = false;
            $(obj).click(function(){
                switch(name){
                    case 'J_dAddressBox':   //上车地址选择
                        var _json = eval('('+ jsons['departureAddress'] +')');
                            var _Parent = '#J_dAddressBoxParent';
                            $(_Parent).creatAddr({data:_json, func : function(){ updateDepartureAddress(); } });
                            function updateDepartureAddress(){
                                $(obj).val($(_Parent).attr('area') + ' ' + $(_Parent).attr('time') + ' ' + $(_Parent).attr('addr'));
                            }
                        break;
                    case 'check_out_date':  //酒店产品的退房日期点击事件
                        if($('input[name="products_departure_date"]').val()==''){
                            art.dialog.alert('请先选择入住日期！');
                            return;
                        }
                        if($('div[virtual_id="products_departure_date"] ul li').last().attr('vtitle') == undefined){
                            art.dialog.alert('无日期可选！');
                            return;
                        }
                        var _min_date = DateAdd($('input[name="products_departure_date"]').val(),1);
                        var _max_date = DateAdd($('div[virtual_id="products_departure_date"] ul li').last().attr('vtitle'),1);
                        $('#J_hotel_check_out_date_input').attr('mindate', _min_date).attr('maxdate',_max_date);
                        G_checkoutCalendar('J_hotel_check_out_date_input','J_hotel_check_out_date',_min_date,_max_date);

                        break;
                    case 'is_travel_companion':	//结伴同游，选中时改变房间人数元素等值
						if($(this).attr('checked')==true){
							var roomnum = $('#'+form_id+' select[name="room_num"]');
							$(roomnum).val(1);
							$('#J_RoomList li').eq(0).siblings().remove();
						}
					break;
                    default :
                        //产品属性中的复选框
                        if(check_box_done === false && name.search(/id\[\d+\]\[\]/) > -1){//id[53][]
                            check_box_done = true;
                            var FC = new formsCheck();  //表单检查对象
                            FC.checkBoxLimit(obj);
                        }
                        getPrice();
					break;
				}
			});
		}
	},

	//设置各个房间的选择器li列表，包括成人小孩,num为房间数
	set_adult_child_room:function(num){
		var ul = $('#' + this.RoomListId);
		var li = $(ul).children('li');
		
		var checkbox = '<input name="room[D][agree_allocates]" value="1" type="checkbox" />';
		var adults_select = '<select adults="true" name="room[D][adult]">';
		for(var i=0; i < this.max_adult; i++){
			var I = (i+1);
			adults_select += '<option value="'+ I +'">'+ I +'人</option>';
		}
		adults_select += '</select>';
		var childs_select = '<select childs="true" name="room[D][child]">';
		for(var i=0; i <= this.max_child; i++){
			childs_select += '<option value="'+ i +'">'+ (i ? i + '人' : '无') +'</option>';
		}
		childs_select += '</select>';

		if(this.have_room == false){	//无房间
			$('<li id="J_RoomListLi_0"><span>成人：'+ adults_select.replace('[D]','[0]') +'</span> <span>小孩：'+ childs_select.replace('[D]','[0]') +'</span>').appendTo($(ul));
		}else{
			if($(li).length < num){		//有房间
				//$(ul).empty();
				var li_html = '';
				for(var i=$(li).length; i<num; i++){
					li_html += '<li id="J_RoomListLi_'+i+'" class="cfix"><span>房间'+ (i+1) +'成人：'+ adults_select.replace('[D]','['+ i +']') +'</span> <span>小孩：'+ childs_select.replace('[D]','['+ i +']') +'</span> <span><label>'+ checkbox.replace('[D]','['+ i +']') +' <span>接受单人配房</span></label></span><em>×</em></li>';
				}
				$(li_html).appendTo($(ul));
			}else if($(li).length > num){
				$(li).each( function(index){
					if((index+1) > num){
						$(this).hide();
					}
				});
			}
		}
		//动态添加change动作
		var _this = this;
		$('select[adults="true"]').change(function(){
			_this.reset_childs_select(this);
		});
		$('select[name="room_num"]').change(function(){
			$('#J_RoomList').show();	
		});
		
	},
	//重新设置小孩选择菜单项
	reset_childs_select : function(g){
		if(this.have_room != true) return false;		
		var li = $(g).parents('li');
		var child_max = Math.min((this.max_room_guest - g.value), this.max_child);
		var child_s = $('#' + $(li).attr('id')).find('select[childs="true"]');
		var option = $(child_s).find('option');
		if(($(option).length-1) > child_max){
			$(option).each( function(){
				if($(this).val() > child_max){
					$(this).remove();
				}
			});
		}else if(($(option).length-1) < child_max){
			var append_str = '';
			var n = ($(option).length);
			for(var i = n; i <= child_max; i++){
				append_str += '<option value="'+ i +'" >'+ i +'人</option>';
			}
			$(append_str).appendTo($(child_s));
		}
	}
};


/**
 * 酒店退房日期选择器(此函数需要日历控件类的支持@see calendar.js)
 * @outer 显示日历
 * @param {string} inputId 为日期输入框id
 * @param {string} inputParentId 日期输入框的父id（主要是用来放日历框）
 * @param {string} mindate 最小允许日期:1980-01-01
 * @param {string} maxdate 最大允许日期:2015-12-01
 */
var G_checkout_cal = '';
function G_checkoutCalendar(inputId, inputParentId, mindate, maxdate ){
    if(G_checkout_cal == '') G_checkout_cal = new Calendar();
    G_checkout_cal.appendTo(document.getElementById(inputParentId));
    var _mind = mindate, _maxd = maxdate;
    if(typeof(mindate)=='undefined'){
        var myDate = new Date();
        _mind = myDate.getFullYear() + '-'+ (myDate.getMonth()+1) +'-'+ myDate.getDate();
    }
    if(typeof(maxdate)=='undefined'){ _maxd = '2100-12-31';}
    G_checkout_cal.open(document.getElementById(inputId), {
        //acceptDate : ["2013-11-18", "2013-11-19", "2014-7-20", "2014-7-21", "2014-7-22", "2014-7-23", "2015-7-25", "2015-7-29"],
        minDate: _mind,
        maxDate: _maxd,
        selectedDate: $("#"+inputId).val()
        //dataNum: 1
    });
    //G_checkout_cal.wrapper.style.left = 0;
    //G_checkout_cal.wrapper.style.top = 25 + "px";
    G_checkout_cal.notClickClose();
};

/**
 * 检查和购买
 * @param buy_type 类型：0为快速购买、1为添加到购物车
 */
function checkBuy(buy_type){
    var error = false;
    //做一些检查，没问题就提交
    if($('#J_BookingBoxForm input[name="products_departure_date"]').val()==''){
        error = true;
        msn = '请选择出团时间';
    }
    if(error === true){
        art.dialog.alert(msn);
        return false;
    }
    var action = '';
    var url = $('#J_BookingBoxForm').attr('action');
    if(buy_type==1){
        //alert('添加到购物车！');
        url = url.replace('action=fast_buy','action=add_product');
    }else{
        url = url.replace('action=add_product','action=fast_buy');
    }
    $('#J_BookingBoxForm').attr('action', url);
    $('#J_BookingBoxForm').submit();
}