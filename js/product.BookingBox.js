/**
 * @charset=utf-8
 */
//加入命名空间,来避免类名和方法名的重复
Usitrip.ns('usitrip.product');
(function(){
    usitrip.product.BookingBox = function (json){

        this.jsons = json;

        var oneself = this;

        //数据初始化区域
        this.Forms = new forms({seletc_simulation_tags:{Div:'div',Ul:'ul',Li:'li',A:'div'} });	//载入表单类forms.js，并定义下拉菜单标相关标签

        var G_checkout_cal = '',
            GET = json['get'];	//GET参数

        var initView = function(){
            var roomInfo = json['roomInfo'],
                form = json['form'],
                topDivId = json['top_div_id'],
                formsId = form['id'],
                formsName = form['name'];

            if(roomInfo){	//房间信息预定义
                this.have_room = roomInfo['have_room'];		//是否有房间
                this.max_adult = roomInfo['max_adult'];		//房间最大成人数
                this.max_child = roomInfo['max_child'];		//房间内最大小孩数
                this.max_room_guest = roomInfo['max_room_guest'];	//每间房最多住几人
                this.RoomListId = 'J_RoomList';						//房间信息列表的ul的id
            }

            $('#' + topDivId).html(this.Forms.cForm(formsId, formsName, form['action']));	//创建表单

            var producetProjectName = json['productProjectName'];


            if(!producetProjectName){
                return ;
            } else {//创建相关输入框
                var html = '';
                this.onchangeArray = [];
                this.onclickArray = [];				//收集表单各项数据完成后要赋予的各个动作

                html+= this.Forms.cHidden('products_id', json['products_id']);	//创建产品id隐藏域

                //创建出团时间
                if(producetProjectName['titleDepartureDate']){		//创建出发日期
                    html+= '<div class="slel_box"><div class="box_num start_time"></div><div><p class="sel_title">'
                          + producetProjectName['titleDepartureDate'] + "：" + '</p>'
                          + this.Forms.cSelect('products_departure_date', json['allDepartureDate'], GET['products_departure_date'], {'aClass':'selectspan'} )
                          + '</div></div>';
						  
					if(!producetProjectName['titleCheckoutDate']){
						html += '<p class="end-date"><span>结束日期：</span><em></em></p>';
					}

                    this.onchangeArray.push('products_departure_date');
                }


                if(producetProjectName['titleCheckoutDate']){
                    html += this.checkOut(json['checkOutDate']);   //酒店的退房日期
                    this.onclickArray.push('check_out_date');
                }

                //房间人数信息
                if(producetProjectName['titleRoomPeopleNum']){
                    html += this.createRoomInfo(json['roomInfo']);
                }

                if(json['attributes'] || json['departureAddress']){
                    html += '<div class="product_attribute"><div class="box_num"></div><div >'
                    if(json['attributes']){	//创建产品属性
                        html += this.createAttributes(json['attributes']);
                    }

                    //上车地址信息
                    if(json['departureAddress']){
                        html += this.createDepartureAddress(json['departureAddress']);
                    }

                    html += '</div></div>'
                }



                //加订酒店
                //判断是否有酒店
                if(json['haveHotel'] == 'Y'){
                    html += '<div class="book_hotel"><span class="book_btn">加订酒店</span>';
                }

                ///插入参团前酒店
                if(json['haveHotel'] == 'Y' && json['beforeHotel']){
                    html += '<div class="b_hotel b_before"><p class="book_title">参团前加订酒店<label class="no_book">不预订</label></p><ul class="book_options"><li style="z-index:3;"><label class="b_title">选择酒店：</label><span showbox="1" class="shadow_box show_bookbox"></span><div class="book_common_flow bc_flow1"><dt class="bc_title">推荐酒店<a class="bc_cancel" href="javascript:;">×</a></dt><div class="bc_list"><dl class="abso"></dl></div><div class="bc_detail"></div><p class="h_list_pages cfix"><a class="t_prev" href="javascript:;">上一页</a><a class="t_next" href="javascript:;">下一页</a></p><p class="h_list_btns"><a href="javascript:;" class="rbtn_ok">确定</a><a href="javascript:;" class="rbtn_cancel">取消</a></p></div></li><li id="book_in_box"><label class="b_title">入住日期：</label><input id="book_in" name="before_hotel[checkin_date]" type="text" value="" class="shadow_box date_bg"></li><li><label class="b_title">退房日期：</label><span class="book_set_date"></span></li></ul></div><p class="before-label"><a href="javascript:void(0);">参团前加订酒店</a></p>';
                }

                ///插入参团后酒店
                if(json['haveHotel'] == 'Y' && json['afterHotel']){
                    html+='<div class="b_hotel b_after"><p class="book_title">参团后加订酒店<label class="no_book">不预订</label></p><ul class="book_options"><li style="z-index:2;"><label class="b_title">选择酒店：</label><span showbox="1" class="shadow_box show_bookbox"></span><div class="book_common_flow bc_flow2"><dt class="bc_title">推荐酒店<a class="bc_cancel" href="javascript:;">×</a></dt><div class="bc_list"><dl class="abso"></dl></div><div class="bc_detail"></div><p class="h_list_pages cfix"><a class="t_prev" href="javascript:;">上一页</a><a class="t_next" href="javascript:;">下一页</a></p><p class="h_list_btns"><a href="javascript:;" class="rbtn_ok">确定</a><a href="javascript:;" class="rbtn_cancel">取消</a></p></div></li><li><label class="b_title">入住日期：</label><span class="book_set_date"></span></li><li id="book_out_box"><label class="b_title">退房日期：</label><input id="book_out" name="after_hotel[checkout_date]" type="text" value="" class="shadow_box date_bg"></li></ul></div><p class="after-label"><a href="javascript:void(0);">参团后加订酒店</a></p>';
                }

                if(json['haveHotel'] == 'Y'){
                    html+='</div>';
                }

                var fastBuyButton = '';

                if(json['fastBuyButton']){

                    fastBuyButton += '<span class="go_recharge fast">' + json['fastBuyButton'] + '</span>';
                    $('.recharge_btn .fast-wrap').live('click', function(){
                        oneself.checkBuy(0);
                    });
                }

                var addShopCartBtn = '<span class="go_recharge shopping_cart">' + json['submitButtonName'] + '</span>';

                html += '<div class="recharge_btn">'
                       +    '<div class="fast-wrap">' + fastBuyButton + '</div>'
                       +    '<div class="shopcart-ok-wrap">' + addShopCartBtn + '</div>'
                    + '</div>';

                $('.recharge_btn .go_recharge.shopping_cart').live('click', function(){
                    oneself.checkBuy(1);
                });

                $('#J_BookingBoxForm').html(html);


                var  selBoxMJq = $('.sel_box_m');

                selBoxMJq.after('<div class="sel_info_m"><ul><li></li></ul></div>');

                var titleContentJq = selBoxMJq.find('span.cont_text');
                titleContentJq.addClass('title_content');
                titleContentJq.parent().css({
                    cursor: 'pointer'
                });
				
                var bookInJq = $('#book_in'), bookOutJq = $('#book_out');

                this.minDateCalendar = bookInJq.calendar({
                    readout: true,
                    dispalyMonths: 2,
                    showBefore: function(){
                        var value = $('.bc_flow1').prev('.show_bookbox').attr('value');
                        if(!value){
                            art.dialog.alert('请先选择酒店，然后再选择入住日期！');
                            return false;
                        }
                        $('#calendar').css('z-index', 79);
                    },
                    callback: oneself.getPrice
                });

                this.maxDateCalendar = bookOutJq.calendar({
                    readout: true,
                    dispalyMonths: 2,
                    showBefore: function(){
                        var value = $('.bc_flow2').prev('.show_bookbox').attr('value');
                        if(!value){
                            art.dialog.alert('请先选择酒店，然后再选择入住日期！');
                            return false;
                        }
                        $('#calendar').css('z-index', 79);
                    },
                    callback: oneself.getPrice
                });

                //退房日期;
                this.checkOutDateInput = $('#J_hotel_check_out_date_input');

                this.checkOutDateInput.calendar({
                    readout: true,
                    dispalyMonths: 2,
                    showBefore: function(){

                        if(!$('input[name="products_departure_date"]').val()){
                            return false;
                        }
                        if(!$('div[virtual_id="products_departure_date"] ul li').last().attr('vtitle')){
                            return false;
                        }

                        $('#calendar').css('z-index', 103);
                    }
                });


                var addressJson = eval("(" + json['departureAddress'] + ")");

                if(addressJson){
                    var returnValue = json['get'];
                    addressJson[addressJson['addressName']] = returnValue[addressJson['addressName']];
                    addressJson[addressJson['regionName']] = returnValue[addressJson['regionName']];

                    this.addressWidget = new usitrip.product.Address({
                        data: addressJson,
                        targetEl: $('#J_dAddressBoxParent')
                    });

                    this.addressWidget.on('cancelBtn', function(){
						var addValue = $('#J_dAddressBoxParent input.train_line').val();
						if(addValue && addValue != '点击选择上车路线'){
							
						} else {
							$('#J_dAddressBoxParent .addr_common_flow').find('dd input').attr('checked', false);
						}
                        this.hide();
                        oneself.getPrice();
                    });

                    this.addressWidget.on('closeBtn', function(){
                        this.hide();
                        oneself.getPrice();
                    });

                    this.addressWidget.on('okBtn', function(){
                        var selected = this.getValue();
                        if(selected.length < 3){
                            return ;
                        }

                        this.addressInputValue.val(selected.join(','));
                        this.addressInputValue.parent().attr({
                            area: selected[0],
                            time: selected[1],
                            addr: selected[2]
                        });
                        this.hide();
                        oneself.getPrice();
						$('#J_BookingBoxForm .dep_add p.sel_title span').text('可修改');
                    });

                }


                //触发出发日期等下拉列表动作
                for(var i=0, n=this.onchangeArray.length; i<n; i++){
                    this.Forms.selectOnchage(this.onchangeArray[i]);
                    this.elementChange(formsId, this.onchangeArray[i]);
                }
                //触发结伴同游等复选框动作
                for(var i=0, n=this.onclickArray.length; i<n; i++){
                    this.elementClick(formsId, this.onclickArray[i]);
                }
                //数据载入完毕后要触发一次房间信息动作
                if(json['roomInfo']){
                    $('#' + formsId + ' select[name="room_num"]').change();
                }

            }			

        };

        /**
         * 初始化事件
         *  @private initEvent
         *
         */
        var initEvent = function(){

            //选择六大主题项目按钮
            $('span.cont_text').click(function(){
                $(this).parent().css('position','relative');
            });

            //点击六大主题明细信息
            $('div.sel_info_m ul li').live('click', function(){
                $('div.sel_box_m div').css('position','relative').children().last().show();
            });

            //选择房间人数
            $('#J_Room .sel_rooms_num').live('click',function(){
                $(this).next('.room_list_box').show();
            });
			
			//选择上车地址
            $('#J_dAddressBoxParent p.dep-add-status').live('click',function(){
               $('.addr_common_flow').show();
            });
			$('#J_dAddressBoxParent .train_line.shadow_box').live('click',function(){
               $('.addr_common_flow').show();
            });
			

            //点击房间人数显示信息也展开房间人数
            $('#J_Room .room_info_box ul li').live('click',function(){
                $('#J_Room .room_list_box').show();
            });

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
            $('.book_options').delegate('.show_bookbox', 'click', function(){
                $('.book_common_flow').hide();
                $(this).next('.book_common_flow').show();
            });


            this.bcFlow('.bc_flow1');
            this.bcFlow('.bc_flow2');

            //订或不订酒店的展示操作
            $('.book_hotel span.book_btn').live('click',function(){
                $('.book_hotel .b_hotel').show();
                $(this).hide();
                oneself.getPrice();
            });
			
			$('.book_hotel p.before-label, .book_hotel p.after-label').live('click', function(){
				$(this).hide().prev().show();
			});

            //不预订时要把当前选择的酒店和日期信息清除！
            $('.b_hotel').delegate('.no_book', 'click',function(){
                var parent = $(this).parents('.b_hotel');
                $(parent).hide();
                $(parent).find(':text').val('');
                $(parent).find(':radio').attr('checked',false);
                $(parent).find('span[showbox="1"]').html();
				$(parent).next('p').show();
                if($('.b_hotel:visible').length < 1){
                    $('.book_hotel span.book_btn').show();
					$(parent).parent().find('> p').hide();
                }
                oneself.getPrice();
            });

            //选择或改变出团日期后重置酒店日期
            $('div[virtual_id="products_departure_date"] ul li').live('click',function(){
                if($(this).attr('vtitle')){
                    var _gdate = $(this).attr('vtitle');
                    var _g = Usitrip.Date.strToDate($(this).attr('vtitle'));
                    _g.setDate(_g.getDate() - 1);
                    var _maxdate = _g.getFullYear() + '-' + Usitrip.Number.lpadZero(_g.getMonth()+1) + '-' + Usitrip.Number.lpadZero(_g.getDate());
                    var _adate = Usitrip.Date.delayDate(_gdate, json['TravelDays']-1);
                    var _mindate = Usitrip.Date.delayDate(_adate, +1);
                    $('#J_BookingBoxForm input[name="before_hotel[p_id]"]').attr("maxdate",_maxdate);
                    $('#J_BookingBoxForm input[name="after_hotel[p_id]"]').attr('mindate',_mindate);
                    $('#J_BookingBoxForm .b_before ul li span.book_set_date').html(_gdate);
                    $('#J_BookingBoxForm .b_after ul li span.book_set_date').html(_adate);
                    $('#J_BookingBoxForm #book_in').val('').attr('maxdate',_maxdate);
                    $('#J_BookingBoxForm #book_out').val('').attr('mindate',_mindate);
					
					$('#J_BookingBoxForm .end-date').show().find('em').html(_adate);
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
				
				if(oneself.checkOutDateInput){
					var checkOntDate = oneself.checkOutDateInput.val();
					if(checkOntDate && (Usitrip.Date.strToDate(checkOntDate) <= Usitrip.Date.strToDate($(this).attr('vtitle')))){
						oneself.checkOutDateInput.val('');
					}
				}
            });


            //确认房间人数信息
            $('.room_list_box p.room_btns a.r_ok').live('click', function(event){
                $('.room_list_box').next('.room_info_box').empty();
                var roomInfo = $('.room_list_box #J_RoomList li:visible');
                $('#J_RoomList li:hidden').remove();
                var _html='<ul>';
                for(var i=0; i<roomInfo.length; i++){
                    if(roomInfo.eq(i).find('input[type="checkbox"]').attr('checked')){
                        var _t = roomInfo.eq(i).find('input[type="checkbox"]').next('span').text();
                        _html+='<li><span>成人：'+ roomInfo.eq(i).find('select').eq(0).val() +'</span><span>小孩：'+ roomInfo.eq(i).find('select').eq(1).val() +'</span><span>'+ _t +'</span></li>';
                    }else{
                        _html+='<li><span>成人：'+ roomInfo.eq(i).find('select').eq(0).val() +'</span><span>小孩：'+ roomInfo.eq(i).find('select').eq(1).val() +'</span></li>';
                    }
                }
                _html+='</ul>'
                $('.room_info_box').append(_html);
                $('.room_list_box').hide();

                $('.sel_rooms_num').text('可修改');
                oneself.getPrice();

            });

            //取消房间人数信息
            $('.room_list_box p.room_btns a.r_cancel').live('click',function(event){
                $('#J_RoomList li:hidden').show();
                $('input[name="is_travel_companion"]').removeAttr('checked');
                $('.room_list_box').hide();
            });


            //每次打开日期控件前初始化日期控件
            var bookInJq = $('#book_in'), bookOutJq = $('#book_out');

            oneself.minDateCalendar.bind('initialize', function(event, cfg){
                var currentProductId = $('.bc_list dl dd input[checked]', '.bc_flow1').val();
                var result = oneself.getRangeDate(bookInJq.attr('mindate'), bookInJq.attr('maxdate'), oneself.getProductLimitTime(currentProductId));
                cfg.range = result;
            });

            oneself.maxDateCalendar.bind('initialize', function(event, cfg){
                var currentProductId = $('.bc_list dl dd input[checked]', '.bc_flow2').val();
                var result = oneself.getRangeDate(bookOutJq.attr('mindate'),
                    bookOutJq.attr('maxdate'),0);
                cfg.range = result;
            });


            oneself.checkOutDateInput.bind('initialize', function(event, cfg){

                var _min_date = Usitrip.Date.delayDate($('input[name="products_departure_date"]').val(),1);
                var _max_date = Usitrip.Date.delayDate($('div[virtual_id="products_departure_date"] ul li').last().attr('vtitle'),1);

                $('#J_hotel_check_out_date_input').attr('mindate', _min_date).attr('maxdate',_max_date);

                var result = oneself.getRangeDate(_min_date,
                    _max_date, 0);
                cfg.range = result;
            });


            $('.sel_box ul li').live('click',function(){
                oneself.getPrice();
            });

            var self = this;

			/*
            //所有的弹出层ID或者Class
            var popupDiv = [];
            //popupDiv.push('.sel_box ul[name="products_departure_date"]'); //出团时间的弹出层
            //popupDiv.push('.sel_box ul[name!="products_departure_date"]'); //单选框选项的弹出层
            popupDiv.push('#J_hotel_check_out_date_input');
            popupDiv.push('.sel_box_m ul');  //六大主题项目
            popupDiv.push('.addr_common_flow'); //上车地址
            popupDiv.push('.room_list_box'); //房间选择
            popupDiv.push('.book_common_flow.bc_flow1'); //参团前加订酒店
            popupDiv.push('.book_common_flow.bc_flow2'); //参团后加订酒店

			
            //在点击页面的时候(不包含点击当前展开的层),将其展开的层隐藏
            $('body').click(function(event){
                var targetJq = $(event.target); //获得鼠标点击的元素
                var temp;
                if(!self.isSelectSelBoxLiPass){ //如果六大主题项目选择的项目不是2个或者3个,则弹出层不隐藏
                    self.isSelectSelBoxLiPass = true;
                    return ;
                }

                if(targetJq.hasClass('loadMask') || targetJq.parent().hasClass('loadMask')){ //如果点击的是遮罩层
                    return ;
                }

                if(targetJq.hasClass('aui_icon') || targetJq.parent().hasClass('aui_icon')){ //如果点击的是弹出的提示框
                    return ;
                }

                if(targetJq.hasClass('aui_main') || targetJq.parent().hasClass('aui_main')){ //如果点击的是弹出的提示框
                    return ;
                }

                if(targetJq.hasClass('aui_footer') || targetJq.parent().hasClass('aui_footer')){ //如果点击的是弹出的提示框
                    return ;
                }

                if(targetJq.hasClass('aui_state_highlight')){ //如果点击的是弹出的提示框
                    return ;
                }

                //如果点击的弹出层内部的元素
                var cont = false;
                for(var i=0,len=popupDiv.length;i<len;i++){
                    cont = $(popupDiv[i]) && $(popupDiv[i])[0] && $.contains($(popupDiv[i])[0], targetJq[0]);
                    if(cont){
                        return ;
                    }
                }

                for(var i=0,len=popupDiv.length;i<len;i++){
                    if($(popupDiv[i]).css('display') === 'block'){
                        if(popupDiv[i] === '.sel_box_m ul'){
                            var selInfoMJq = $('.sel_box_m').next('.sel_info_m');
                            if(selInfoMJq.find('li').length > 1){
                                selInfoMJq.empty(); //如果存在,则先移除该节点
                            }
                            var content = '<ul>',
                                checkedBox = $('.sel_box_m input[type="checkbox"]:checked');
                            if(checkedBox.length > 1){
                                checkedBox.each(function(){
                                    var checkBox = $(this);
                                    var nextNode = checkBox[0].nextSibling;
                                    content += '<li>' + (nextNode && nextNode.nodeValue) || '' + '</li>';
                                });

                                content += '</ul>';

                                $('.sel_box_m ul').hide();
                                $('.sel_info_m').html(content);
                                oneself.getPrice();
                            }
                        } else {
                            $(popupDiv[i]).find('.rbtn_ok').click();
                        }
                        $(popupDiv[i]).css('display', 'none');
                    }
                }

                if(targetJq.parents('#J_BookingBox')){
                    var tarJq = $(event.target);
                    var fun = function(){
                        $(tarJq).next().css('display', 'block');
                    };
                    if(tarJq.hasClass('cont_text title_content')){ //六大主题项目
                        fun();
                    } else if(tarJq.hasClass('train_line shadow_box')){ //上车地址
                        fun();
                    } else if(tarJq.hasClass('selectspan sel_rooms_num')){ //房间选择
                        fun();
                    } else if(tarJq.hasClass('shadow_box show_bookbox')){ //参团前加订酒店,参团后加订酒店
                        fun();
                    }
                }
            });*/
			
			
			$('body').click(function(event){
				var e = window.event || event;
				obj = $(e.srcElement || e.target);
				var wrap = [];
				var popEl = [];
				wrap.push('.sel_rooms_num');
				wrap.push('.room_list_box');
				wrap.push('.room_list_box *');
				
				wrap.push('.cont_text.title_content');
				wrap.push('.sel_box_m ul');
				wrap.push('.sel_box_m ul *');
				
				wrap.push('.dep-add-status');
				wrap.push('.addr_common_flow');
				wrap.push('.addr_common_flow *');
				
				wrap.push('.shadow_box.show_bookbox');
				wrap.push('.bc_flow1');
				wrap.push('.bc_flow1 *');
				wrap.push('.bc_flow2');
				wrap.push('.bc_flow2 *');
				
				popEl.push('.room_list_box');
				popEl.push('.sel_box_m ul');
				popEl.push('.addr_common_flow');
				popEl.push('.bc_flow1');
				popEl.push('.bc_flow2');
				
				if ($(obj).is(wrap.join(','))) {
				} else {
					$(popEl.join(',')).hide();
				} 
			});
			
            //确认选择六大主项目
            $('.slel_box .sel_box_m a.rbtn_ok').click($.proxy(this.rbtnOkCallBack, this));

            this.rbtnOkCallBack();

            //取消选择六大主项目
            $('.slel_box .sel_box_m a.rbtn_cancel').click(function(event){
                $('.sel_box_m ul').hide();
            });

            //大日历框日期点击事件
            $('#divCalendar .calendarContent ul li:not(".disable")').live('click',function(){
                $(this).css('background-color','#cae2f8').siblings().css('background-color','');
                var _d = Usitrip.Number.lpadZero($(this).attr('d'));
                var _m = Usitrip.Number.lpadZero($(this).parents('#divCalendar').find('.calendarTool .yearTitle').attr('m'));
                var _y = $(this).parents('#divCalendar').find('.calendarTool .yearTitle').attr('y');
                var _date = _y + '-' + _m + '-' + _d;
                $('#J_BookingBox .slel_box .sel_box ul[name="products_departure_date"] li[vtitle='+ _date +']')	.click();
            });

            /**
             * 同步房间人数
             */
            (function(){
                var roomInfos = oneself.jsons['get']['room'];
                if(!roomInfos){
                    return ;
                }

                $('#J_Room .room_info_box').empty();

                var _html='<ul>';

                var roomListBox = $('#J_Room .room_list_box');
				
				var room ;
				if(roomInfos.constructor.toString().indexOf('Object') > -1){
					room = [];
					for(var p in roomInfos){
						room.push(roomInfos[p]);
					}
				} else {
					room = roomInfos;
				}
				
                for(var i=0; i<room.length; i++){
                    var roomInfo = room[i];
                    if(roomInfo['agree_allocates']){
                        _html+='<li><span>成人：'+ roomInfo['adult'] +'</span><span>小孩：'+ roomInfo['child'] +'</span><span>接受单人配房</span></li>';
                    } else {
                        _html+='<li><span>成人：'+ roomInfo['adult'] +'</span><span>小孩：'+ roomInfo['child'] +'</span></li>';
                    }
                    var lis = roomListBox.find('li span');
                    $(lis[i*4 + 0]).find('select option[value=' + roomInfo['adult'] + ']')[0].selected = true;
                    $(lis[i*4 + 1]).find('select option[value=' + roomInfo['child'] + ']')[0].selected = true;


                    //同步弹出的DIV内容
                    if(roomInfo['agree_allocates']){
                        $(lis[i*4 + 2]).find('label').click();
                    }
                }
                _html+='</ul>'
                $('.room_info_box').html(_html);
                $('.sel_rooms_num').text('可修改');
				
				$('#J_RoomList li').each(function(){
					var sum = parseInt($(this).find('select[adults]').val()) + parseInt($(this).find('select[childs]').val())
					if(sum > 1){
						$(this).find('span:eq(2)').hide();
					}
				});
				
                oneself.getPrice();
            })();


            $('#J_RoomList li').live('mouseover',function(){
                if($('#J_RoomList li:visible').length > 1){ //至少有一个房间
						var delBtn = $(this).find('em');
						delBtn.show();	
                }
            }).live('mouseout', function(){
				var delBtn = $(this).find('em');
				delBtn.hide();	
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
        };

        initView.apply(this);
        this.generateBeforeHotelHtml.apply(this);
        this.generateAfterHotelHtml.apply(this);
        initEvent.apply(this);

        //初始化上车地址
        (function(){
            var departureAddress  = eval('[' + json.departureAddress + ']');
			
			var modifySpan = $('#J_BookingBoxForm .dep_add p.sel_title span');
			
			modifySpan.click(function(){
				oneself.addressWidget.show();
			});
			
            if(Usitrip.isEmptyArray(departureAddress) || !departureAddress[0]){
                return;
            }

            var address = departureAddress[0]['list'];
            var _area , _time ,_addr;
            if(Usitrip.isArray(GET) && !GET.length){
                return ;
            } else if(Usitrip.isObject(GET) && !(GET['dRegion'] || GET['departure_address_id']) ){
                return ;
            }
            for(var i= 0,len=address.length;i<len;i++){
                var addr = address[i];
                if(addr['regionId'] == GET['dRegion']){
                    var contents = addr['addressConten'];
                    for(var j= 0,size=contents.length;j<size;j++){
                        var content = contents[j];
                        if(content['id'] == GET['departure_address_id']){
                            _time = content['time'];
                            _addr = content['address'];
                            break ;
                        }
                    }
                    _area = addr['regionText'];
                    break ;
                }
            }
            if(Usitrip.isEmpty(_area) || Usitrip.isEmpty(_time) || Usitrip.isEmpty(_addr)){
                return ;
            }
            $('#J_dAddressBoxParent').attr({"area":_area,"time":_time,"addr":_addr});
			var oTrainLineShadow = $('#J_dAddressBoxParent .train_line.shadow_box');
            oTrainLineShadow.val(_area + ',' + _time + ',' + _addr);
            //oTrainLineShadow.click();
			//oTrainLineShadow.next().hide();
			modifySpan.text('可修改');
        })();

        //初始化出团时间相关信息
        (function(){
            var _gdate = json.get.products_departure_date;
            if(!_gdate){
                return;
            }
            var _g = Usitrip.Date.strToDate(_gdate);
            _g.setDate(_g.getDate() - 1);
            var _maxdate = _g.getFullYear() + '-' + Usitrip.Number.lpadZero(_g.getMonth()+1) + '-' + Usitrip.Number.lpadZero(_g.getDate());
            var _adate = Usitrip.Date.delayDate(_gdate, json['TravelDays']-1);
            var _mindate = Usitrip.Date.delayDate(_adate, +1);
            $('#J_BookingBoxForm input[name="before_hotel[p_id]"]').attr("maxdate",_maxdate);
            $('#J_BookingBoxForm input[name="after_hotel[p_id]"]').attr('mindate',_mindate);
            $('#J_BookingBoxForm .b_before ul li span.book_set_date').html(_gdate);
            $('#J_BookingBoxForm .b_after ul li span.book_set_date').html(_adate);
            $('#J_BookingBoxForm #book_in').val('').attr('maxdate',_maxdate);
            $('#J_BookingBoxForm #book_out').val('').attr('mindate',_mindate);
			
			$('#J_BookingBoxForm .end-date').show().find('em').html(_adate);
        })();

        //初始化参团前后的酒店预定信息
        (function(){
            var returnData = json['get'],
                beforeHotel = returnData['before_hotel'],
                afterHotel = returnData['after_hotel'],
                hotelJq = $('.book_hotel');

            var fun = function(hotel){
                var  inputCheckJq = $('.bc_list dl dd input[checked]',hotel),
                    value = inputCheckJq.val(),
                    spanJq =  inputCheckJq.next('span'),
                    _t = spanJq.text(),
                    _min = inputCheckJq.attr('mindate'),
                    _max = inputCheckJq.attr('maxdate');

                $(inputCheckJq).parents('li').nextAll('li').find('input:visible').attr({'mindate':_min,'maxdate':_max});

                var showBookBoxJq = $(hotel).prev('.show_bookbox');
                showBookBoxJq.text(_t);
                showBookBoxJq.attr('value', value);
            }

            var havaBeforeHotel = !!beforeHotel,
                haveAfterHotel = !!afterHotel;

            for(var p in beforeHotel){
                if(Usitrip.isEmpty(beforeHotel[p])){
                    havaBeforeHotel = false;
                    break;
                }
            }

            for(var p in afterHotel){
                if(Usitrip.isEmpty(afterHotel[p])){
                    haveAfterHotel = false;
                    break;
                }
            }

            if(havaBeforeHotel || haveAfterHotel){
                $('#J_BookingBoxForm .book_hotel .book_btn').click();
                if(!havaBeforeHotel){
                    hotelJq.find('.b_hotel.b_before .book_title .no_book').click();
                }

                if(!haveAfterHotel){
                    hotelJq.find('.b_hotel.b_after .book_title .no_book').click();
                }
            }

            if(havaBeforeHotel){
                var hotalId = beforeHotel['p_id'];
                var input = hotelJq.find('.b_hotel.b_before .book_options .book_common_flow.bc_flow1 .abso input[value=' + hotalId + ']');
                if(!Usitrip.isEmpty(input)){
                    input.parent().click();
                    fun('.bc_flow1');
                }
                hotelJq.find('#book_in').val(beforeHotel['checkin_date']);
            }

            if(haveAfterHotel){
                var hotalId = afterHotel['p_id'];
                var input = hotelJq.find('.b_hotel.b_after .book_options .book_common_flow.bc_flow2 .abso input[value=' + hotalId + ']');
                if(!Usitrip.isEmpty(input)){
                    input.parent().click();
                    fun('.bc_flow2');
                }
                hotelJq.find('#book_out').val(afterHotel['checkout_date']);
            }
        })();


        (function(){
            var isTravelCompanion = json['is_travel_companion'];
            if(!Usitrip.isEmpty(isTravelCompanion)){
                $('#J_BookingBoxForm #J_Room .tra_com').click().find('input').attr("checked", true);
                var roomnum = $('#J_BookingBoxForm select[name="room_num"]');
                roomnum.val(1);
                roomnum.attr('disabled', 'disabled ');

                var firstEle = $('#J_RoomList li').eq(0);
                firstEle.show();
                firstEle.find('em').hide();
                firstEle.siblings().remove();
            }
        })();
    }

    usitrip.product.BookingBox.prototype = {
        checkOut: function(jsonCheckOut){
            var html='<div class="hotel_check_out_time">';
            html+= '<p class="sel_title">退房日期：</p>';
            html+= '<div id="J_hotel_check_out_date" >'+this.Forms.cNumberEnglishIuput('check_out_date', this.jsons['get']['check_out_date'], 'id="J_hotel_check_out_date_input" readonly="readonly" class="date_bg" mindate="'+jsonCheckOut.checkOutMinDate+'" maxdate="'+jsonCheckOut.checkOutMaxDate+'"')+'</div>';
            html+= '</div>';
            return html;
        },

        /**
         * 创建产品属性
         * @param Array jsonAttributes json格式的属性
         */
        createAttributes: function(jsonAttributes){
            var html='';
            for(var i=0, n=jsonAttributes.length; i<n; i++){
                var jsonOne = jsonAttributes[i] ,
                    _options_name = '',
                    selects = '',
                    _products_options_id = jsonOne['products_options_id'],
                    _selected = jsonOne['selected'].toString(),
                    _options_array = [],
                    _isTitle = true;

                for(var j in jsonOne){
                    if(_isTitle === true){
                        _options_array = jsonOne[j];
                        _options_name = j;
                        _isTitle = false;
                    }
                }
                //复选框
                if(jsonOne['products_options_type']=='checkbox'){
                    var _min = 0, _max = 0;
                    if(jsonOne['checkbox_min_max']){
                        var tmp = jsonOne['checkbox_min_max'].split(':');
                        _min = tmp[0];
                        _max = tmp[1];
                    }
                    html+='<div class="slel_box title_checkbox"><p class="sel_title" style="float: left;">'+ _options_name +'：'+'</p>'+ this.Forms.cSelectM('id['+_products_options_id+'][]', _options_array , _selected, {'aClass':'','ulClass':''}, _min, _max, '可选择') +'</div>';
                    this.onclickArray.push('id['+_products_options_id+'][]');
                }else{
                    //单选下拉框
                    html+='<div class="slel_box title_radio"><p class="sel_title">'+ _options_name +'：'+'</p>'+ this.Forms.cSelect('id['+_products_options_id+']', _options_array , _selected, {'aClass':'selectspan','ulClass':''} ) +'</div>';
                    this.onchangeArray.push('id['+_products_options_id+']');
                }
            }
            return html;
        },

        /**
         * 创建房间人数信息
         * @param Array json_room 已选择的房间人数信息
         */
        createRoomInfo: function(json_room){

            var html = '', _options = [];
            html += '<div class="slel_box rooms_info clear"><div class="box_num room_info"></div><div><p class="sel_title room_p">'
                + this.jsons['productProjectName']['titleRoomPeopleNum'] + "：" + '</p>';

            for(var i=1; i<=json_room['max_room']; i++){
                _options.push({'id':i,'text':i});
            }

            html+='<div id="J_Room"><span class="sel_rooms_num">可选择</span>';
            this.onchangeArray.push('room_num');

            html += '<div class="room_list_box">';
            if(json_room['have_room']){

                //结伴同游
                html+= '<span>房间：</span>'+ this.Forms.cSelect('room_num', _options, json_room['selected_room_num'],'','class="sel_rooms"');
                if(this.jsons['productProjectName']['titleTravelCompanions']){
                    html+= '<label class="tra_com tooltip" tooltip="结伴同游仅支持1个房间">'+this.Forms.cCheckBox('is_travel_companion','1',(this.jsons['is_travel_companion']=='1' ? true : false),'class="check_tra"')+' '+ this.jsons['productProjectName']['titleTravelCompanions'] +'</label>';
                    this.onclickArray.push('is_travel_companion');
                }
                html+='<ul id="'+ this.RoomListId +'" tip="具体房间人数信息"></ul><p class="room_btns"><a href="javascript:;" class="rbtn_ok r_ok">确定</a><a href="javascript:;" class="rbtn_cancel r_cancel">取消</a></p></div><div class="room_info_box"><ul><li></li></ul></div></div></div></div>';

            } else {
				
				var maxAdult = json_room['max_adult'],
					maxChild = json_room['max_child'];
				
				var fun = function(persons){
					var str = '';
					for(var i=0;i<persons;i++){
						str += '<option value="' + (i+1) + '">' + (i+1) + '人</option>'
					}
					return str;
				};		
					
				
                html+='<ul id="'+ this.RoomListId +'" tip="具体房间人数信息">' +
                    '<li id="J_RoomListLi_0" class="cfix"><span>成人：<select adults="true" name="room[0][adult]">' + fun(maxAdult) + '</select></span> <span>小孩：<select childs="true" name="room[0][child]"><option value="0">无</option>' + fun(maxChild) + '</select></span></li></ul>' +                    '<p class="room_btns"><a href="javascript:;" class="rbtn_ok r_ok">确定</a><a href="javascript:;" class="rbtn_cancel r_cancel">取消</a></p></div><div class="room_info_box"><ul><li></li></ul></div></div></div></div>';
            }


            return html;
        },

        /**
         * 创建上车地址信息框
         * @param string json_str 上车地址数据信息字符串，注意是json字符串，不是对象。用时要处理成对象
         */
        createDepartureAddress: function(json_str){
            var html = '';
            html += '<div class="slel_box dep_add"><p class="sel_title">上车地址：</p><div id="J_dAddressBoxParent"><p class="dep-add-status">可选择</p><input name="J_dAddressBox" class="train_line shadow_box" style="_display:block;" value="点击选择上车路线" /></div></div>';
            this.onclickArray.push('J_dAddressBox');
            return html;
        },

        /**
         * 返回酒店的提前预定天数
         * @param productId 酒店的ID
         * @return {*|int}
         */
        getProductLimitTime: function(productId){
            var hotels = this.jsons['beforeHotel'];
            for(var i= 0,len = hotels.length;i<len;i++){
                var hotel = hotels[i];
                if(hotel['id'] == productId){
                    return hotel['bookLimitTime'] || 2;
                }
            }
            return 2;
        },

        /**
         * 返回range参数
         * @param startDate 从数据库中读取出来的最小时间,即开始时间
         * @param endDatebo  从数据库中读取出来的最大时间,即结束时间
         * @param limit 提前预定天数
         * @return {String} 然会range参数
         */
        getRangeDate: function(startDate, endDate, limit){
            var today = new Date(),
                sd = Usitrip.Date.strToDate(startDate);

            startDate = today > sd  ? today : sd;
            limit += '';
            if(limit.indexOf('hours') > -1){
                limit = Math.ceil(parseInt(limit)/24);
            } else {
                limit = Math.ceil(parseInt(limit));
            }
            startDate = Usitrip.Date.delayDate(startDate, limit);
            if(!endDate){
                endDate = '2099-12-31';
            }
            return startDate + ':' + Usitrip.Date.delayDate(endDate, 0);
        },

        /**
         * 参团前后酒店的相关操作
         * @param hotel
         */
        bcFlow: function(hotel){
            var oneself = this;
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

            $('.h_list_btns a.rbtn_ok', hotel).live('click',function(){
                var  inputCheckJq = $('.bc_list dl dd input[checked]',hotel),
                     value = inputCheckJq.val(),
                     spanJq =  inputCheckJq.next('span'),
                     _t = spanJq.text(),
                     _min = $('.bc_list dl dd input[checked]',hotel).attr('mindate'),
                     _max = $('.bc_list dl dd input[checked]',hotel).attr('maxdate');

                $(this).parents('li').nextAll('li').find('input:visible').attr({'mindate':_min,'maxdate':_max});

                var showBookBoxJq = $(hotel).prev('.show_bookbox');
                showBookBoxJq.text(_t);
                showBookBoxJq.attr('value', value);
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
        },


        /**
         * 获取最小的必选的选项个数
         * @param {Object} json_attributes
         * @return {Number}
         */
        getMinChecked: function(json_attributes){
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
        },

        /**
         * 点击六大主题弹出层的确定按钮执行的回调方法
         * @param event
         */
        rbtnOkCallBack: function(event){
            this.isSelectSelBoxLiPass = true;
            var content = '<ul>',
                checkedBox = $('.sel_box_m input[type="checkbox"]:checked');
            if(checkedBox.length < this.getMinChecked(this.jsons['attributes']) || checkedBox.length === 0){
                this.isSelectSelBoxLiPass = false;
                return;
            }
            $('.sel_box_m').next('.sel_info_m').empty(); //如果存在,则先移除该节点
            checkedBox.each(function(){
                var checkBox = $(this);
                var nextNode = checkBox[0].nextSibling;
                content += '<li>' + (nextNode && nextNode.nodeValue) || '' + '</li>';
            });
            content += '</ul>';
            $('.sel_box_m ul').hide();
            $('.sel_info_m').html(content);
            $('.sel_box_m .cont_text.title_content').text('可修改');
            this.getPrice();
        },

        //异步提交数据计算总价格
        getPrice: function(){
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
						$('.total_price_box').append('<div class="total-other"></div>');
                        for(var i=0; i<d.otherCurrencies.length; i++){
                            $('.total_price_box .total-other').append('<span class="otherPr">'+ d.otherCurrencies[i] +'</span>');
                        }
                    }else{
                        art.dialog.tips(d.error);
                    }
                });
            }
        },

        //设置元素改变时的动作
        elementChange:function(form_id, name){
            var topThis = this;
            var obj = $('#'+form_id+' select[name="'+ name +'"]');
            if($(obj).attr('name')==name){
                $(obj).change(function(){
                    switch(name){
                        case 'products_departure_date':			//出发日期时
                            //alert('选了出发日期');没用了。
                            break;
                        case 'room_num':						//选择房间时
                            /*if(this.value >1 ){					//当房间数大于1时把结伴同游的复选框取消
                                //$('#'+form_id+' input[name="is_travel_companion"]').attr('checked',false);
                            }*/
                            topThis.setAdultChildRoom(this.value);	//根据房间数据触发具体房间成人和小孩信息
                            break;
                    }
                });
            }
        },
        //设置元素点击时的动作
        elementClick:function(form_id, name){
            var topThis = this;
            var obj = $('#'+form_id+' input[name="'+ name +'"]');
            if($(obj).attr('name')==name){
                var check_box_done = false;
                $(obj).click(function(event){
                    switch(name){
                        case 'J_dAddressBox':   //上车地址选择
                            topThis.addressWidget.show();
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
                            break;
                        case 'is_travel_companion':	//结伴同游，选中时改变房间人数元素等值
                            var roomnum = $('#'+form_id+' select[name="room_num"]');
                            if($(this).attr('checked')==true){
                                roomnum.val(1);
                                roomnum.attr('disabled', 'disabled');
                                var firstEle = $('#J_RoomList li').eq(0);
                                firstEle.show();
                                firstEle.find('em').hide();
                                firstEle.siblings().remove();
                            } else {
                                roomnum.removeAttr('disabled');
                            }
                            break;
                        default :
                            //产品属性中的复选框
                            if(check_box_done === false && name.search(/id\[\d+\]\[\]/) > -1){//id[53][]
                                check_box_done = true;
                                var FC = new formsCheck();  //表单检查对象
                                FC.checkBoxLimit(obj);
                            }
                            topThis.getPrice();
                            break;
                    }
                });
            }
        },

        //设置各个房间的选择器li列表，包括成人小孩,num为房间数
        setAdultChildRoom:function(num){
            var ul = $('#' + this.RoomListId);
            var li = $(ul).children('li');
			var initAdult = 1 ;
            var checkbox = '<input name="room[D][agree_allocates]" value="1" type="checkbox" />';
            var adults_select = '<select adults="true" name="room[D][adult]">';
            for(var i=0; i < this.max_adult; i++){
                var I = (i+1);
				if(I == initAdult){
					adults_select += '<option value="'+ I +'" selected>'+ I +'人</option>';
				} else {
	                adults_select += '<option value="'+ I +'">'+ I +'人</option>';
				}
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
                        li_html += '<li id="J_RoomListLi_'+i+'" class="cfix"><span>房间'+ (i+1) +'成人：'+ adults_select.replace('[D]','['+ i +']') +'</span> <span>小孩：'+ childs_select.replace('[D]','['+ i +']') +'</span>';
						if(this.jsons.allow_single_pu){
							if(initAdult > 1){
								li_html += '<span style="display:none;"><label>'+ checkbox.replace('[D]','['+ i +']') +' <span>接受单人配房</span></label></span><em style="display:none;">×</em>';
							} else {
								li_html += '<span><label>'+ checkbox.replace('[D]','['+ i +']') +' <span>接受单人配房</span></label></span><em>×</em>';
							}
							
						}
						li_html += '</li>';
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
                _this.resetChildsSelect(this);
				_this.updateSingleRoom(this);
            });
			
			
			$('select[childs="true"]').change(function(){
                _this.updateSingleRoom(this);
            });
			
            $('select[name="room_num"]').change(function(){
                $('#J_RoomList').show();
                var lis = $('#J_RoomList li'),
                    size = parseInt($(this).val());

                if(size > lis){
                    lis.show();
                    lis.find('em').hide();
                } else {
                    for(var i= 0;i<size;i++){
                        $(lis[i]).show();
                        $(lis[i]).find('em').hide();
                    }
                }
            });

        },
		
		updateSingleRoom: function(g){
			var selectField = $(g) ;
			var li = selectField.parent().parent();
			var spans = li.find('span');
			var singleRoom = spans.eq(2);
			var em = singleRoom.next();
			
			var selects = li.find('select');
			var persons = 0;
			selects.each(function(){
				persons += parseInt($(this).val());
			})
			if(persons > 1){
				singleRoom.hide().find('input').attr('checked', false);
			} else {
				singleRoom.show();
			}
			em.hide();
		},
		
        //重新设置小孩选择菜单项
        resetChildsSelect : function(g){
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
        },
        /**
         * 酒店退房日期选择器(此函数需要日历控件类的支持@see calendar.js)
         * @outer 显示日历
         * @param {string} inputId 为日期输入框id
         * @param {string} inputParentId 日期输入框的父id（主要是用来放日历框）
         * @param {string} mindate 最小允许日期:1980-01-01
         * @param {string} maxdate 最大允许日期:2015-12-01
         */
        G_checkoutCalendar: function(inputId, inputParentId, mindate, maxdate ){
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
        },

        /**
         * 检查和购买
         * @param buy_type 类型：0为快速购买、1为添加到购物车
         */
        checkBuy: function(buy_type){
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

            var roomnum = $('#J_BookingBoxForm select[name="room_num"]');
            roomnum.removeAttr('disabled');

            $('#J_BookingBoxForm').attr('action', url);
            $('#J_BookingBoxForm').submit();
        },

        //插入参团后加订酒店列表
        generateAfterHotelHtml: function(){
            var json = this.jsons;
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
        },

        //插入参团前加订酒店列表
        generateBeforeHotelHtml: function(){
            var json = this.jsons;
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
        }
    }
})();