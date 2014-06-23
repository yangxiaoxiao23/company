/**
 * 表单类（包括创建和@todo表单检查）
 * @example booking_box.js
 * @author zhh
 * @charsert utf-8
 */
function forms(Json){
	//美化下拉菜单用到的三个外观标签
	this.seletc_simulation_tags = {Div:"div", A:"span", Ul:"ul", Li:"li"};	//注意：是否开启美化版的下拉菜单则由cSelect方法中的simulation控制
	if(Json){
		if(Json.seletc_simulation_tags){
			this.seletc_simulation_tags = Json.seletc_simulation_tags;
		}
	}
};
forms.prototype = {
    /**
     * 创建表单
     * @param id
     * @param name
     * @param acton
     * @param enc_type
     * @param method
     * @param otherParameters
     * @returns {string}
     */
	cForm:function(id,name,acton,enc_type,method,otherParameters){
		var parameters = '';
        enc_type = enc_type || 'multipart/form-data';
		method = method || 'post';
		if(typeof(otherParameters)!='undefined') parameters = otherParameters;
		var html = '';
		html+= '<form id="'+ id +'" name="'+ name +'" action="'+ acton +'" '+ parameters + ' enctype="'+ enc_type +'" method="'+ method +'">';
		html+= '</form>';
		return html;
	},
	//创建文本输入框
	cInput:function(name, value, parameters, type, uuId){
		value = value || '';
		parameters = parameters || ''; 
		type = type || 'text';
        if(uuId){
            return '<input name="'+ name +'" value="'+ value +'" '+ parameters +' type="'+ type +'" id=' + uuId + ' />';
        }
		return '<input name="'+ name +'" value="'+ value +'" '+ parameters +' type="'+ type +'" />';
	},
	//创建英文或数字输入框，即不能输入汉字的输入
	cNumberEnglishIuput:function(name, value, parameters){
		parameters = parameters || '';
		var style = '';
		if(parameters.indexOf('style=')!=-1){
			style = parameters.replace(/.+style="([^"]+)".+/,'$1');
			parameters = parameters.replace(/style="([^"]+)"/,'');
		}
		style = 'ime-mode: disabled;' + style;
		parameters += ' style="'+ style +'" ';
		return this.cInput(name, value, parameters);
	},
	//创建隐藏域
	cHidden:function(name, value, parameters){
		return this.cInput(name, value, parameters, 'hidden');
	},
	//创建下拉菜单，simulation为创建ul美化的菜单，values的格式是key/value的数组
	cSelect:function(name, values, defaultValue, simulation, parameters){
		simulation = simulation || 0;
		parameters = parameters || '';
		var html = '';
		if(simulation==0){	//创建传统的下拉菜单
			html+= '<select name="'+ name +'"' + parameters +'>';
			for(var i=0, n=values.length; i<n; i++){
				if(values[i]['optgroup']!=true || values[i]['id']==defaultValue){
					var selected = '';
					if(values[i]['id']==defaultValue){ selected = 'selected="selected" '; }
					html+= '<option value="'+ values[i]['id'] +'" '+ selected +'>'+ values[i]['text'] +'</option>';
				}else{
					html+= '<optgroup label="' + values[i]['text'] +'" ';
					if(values[i]['class']){
						html+= ' class="'+ values[i]['class'] +'"';
					}
					html+= '></optgroup>';
				}
			}
			html+= '</select>';
		}else{	//创建美化的下拉菜单
			html+= this.cHidden(name, defaultValue);
			var defaultText = '';
			var li = '';
			for(var i=0, n=values.length; i<n; i++){
				if(values[i]['id']==defaultValue){ defaultText = values[i]['text']; }
				if(values[i]['optgroup']!=true || values[i]['id']==defaultValue){
					var selected = '';
					li+= '<'+ this.seletc_simulation_tags.Li +' name="'+ name +'" vtitle="'+ values[i]['id'] +'" title="'+ values[i]['text'] +'">'+ values[i]['text'] +'</'+ this.seletc_simulation_tags.Li +'>';
				}else{
					li+= '<'+ this.seletc_simulation_tags.Li +' class="disabled" title="'+ values[i]['text'] +'">'+ values[i]['text'] +'</'+ this.seletc_simulation_tags.Li +'>';
				}
			}
			var tips = '';
			if(simulation['aTips']){
				tips = ' tooltip="'+ simulation['aTips'] +'" ';
			}
			html+= '<'+ this.seletc_simulation_tags.Div +' class="sel_box"><'+ this.seletc_simulation_tags.A +' virtual_id="'+ name +'" class="'+ (simulation['aClass']||'') +' tooltip" '+ tips +'><span class="cont_text">'+ defaultText +'</span><'+ this.seletc_simulation_tags.Ul +' simulation="true" style="display:none;" name="'+ name +'" class="'+ (simulation['ulClass']||'') +'" >'+ li +'</'+ this.seletc_simulation_tags.Ul +'></'+ this.seletc_simulation_tags.A +'>';
			html+= '</'+ this.seletc_simulation_tags.Div +'>';
		}
		return html;
	},
	//美化的下拉菜单动作设置
	selectOnchage:function(name){
		var _this = this;
		this.hide_obj = '';
		var a = this.seletc_simulation_tags.A +"[virtual_id='"+ name +"']";
		var ul = this.seletc_simulation_tags.Ul+"[name='"+ name +"']";
		var li = this.seletc_simulation_tags.Li+"[name='"+ name +"']";
		var _li = $('#J_BookingBoxForm .slel_box ul li[vtitle]');
		var input = "input[name='"+ name +"']";
		$(li),$(_li).click( function() {
			$(this).parents('.slel_box').find(input).val($(this).attr('vtitle'));
			$(this).parents('.sel_box').find('span.cont_text').attr('title',$(this).text()).html($(this).text());
			//$(a).html($(this).html());
			$(this).parent('ul').hide();
			$(this).addClass('selected').siblings().removeClass('selected');
		});
		$(li),$(_li).hover(function(){
			$(this).addClass('hover');
		},function(){ $(this).removeClass('hover'); });
		$('span.cont_text').click(function(){
			$(this).next('ul').show();
			$('.selectspan').css('z-index','9');
			$(this).parent('.selectspan').css('z-index','100');
		});

		//关闭下拉菜单(此代码在ie6下效率很低，要再优化！)
		$(document).click(function(et){ 
			$(_this.hide_obj).hide().parent('.selectspan').css({
				'z-index':''
			});
			$(_li).parent('ul').hide();
			_this.hide_obj = '';
			var thisO = et.target;
			if(thisO.className == 'cont_text'){
				if(thisO.nextSibling.tagName=='UL'){
					$(thisO.nextSibling).show();
					$(thisO).parent('.selectspan').css('z-index','100');
					
				}
			}
			
			et.stopPropagation(); 
		});
		
		$(ul+','+a).mouseout(function(){
			_this.hide_obj = ul;
		});
		$(ul).mouseover(function(){
			_this.hide_obj = '';
		});
	},
    /**
     * 创建可多选的下拉框
     * @param {string} name 名称
     * @param {array} values key/value格式的数组
     * @param {string} defaultValue 默认值，若有多个默认值则以,号隔开
     * @param {json} simulation 为创建ul美化的菜单，必填项
     * @param {int} minSelect 最少要选几项
     * @param {int} maxSelect 最多可选几项
     */
    cSelectM:function(name, values, defaultValue, simulation, minSelect, maxSelect, defaultText){
        simulation = simulation || 0;
        minSelect = minSelect || 0;
        maxSelect = maxSelect || 0;
        if(defaultValue){
            var _tmp = defaultValue;
            var defaultVal = _tmp.split(",");
        }
        if(simulation==0){ alert('多选下拉菜单必须要设置simulation参数');}
        var html = '';
        var li = '';
        if(minSelect!=0 || maxSelect!=0){
            var _text = '可选';
            if(minSelect!=0 && maxSelect!=0){
                if(minSelect == maxSelect){
                    _text += minSelect + '项';
                }else{
                    _text += minSelect + '至' + maxSelect + '项';
                }
            }else if(minSelect!=0){
                _text += minSelect + '项';
            }else if(maxSelect!=0){
                _text += maxSelect + '项';
            }
            li+= '<'+ this.seletc_simulation_tags.Li +'><label>' + _text +'</label></'+ this.seletc_simulation_tags.Li +'>';
        }
        if(!defaultText){
            defaultText = _text;
        }

        for(var i=0, n=values.length; i<n; i++){
            var uuId = this.uuid();
            if(values[i]['optgroup']!=true || values[i]['id']==defaultValue){
                var selected = false;
                var _disabled = '';
                if(maxSelect>0 && defaultVal && defaultVal.length >= maxSelect){
                    _disabled = 'disabled="disabled"';
                }
                if(defaultVal && $.inArray(values[i]['id'], defaultVal) > -1){
                    selected = true;
                    _disabled = '';
                }
                li+= '<'+ this.seletc_simulation_tags.Li +'><label for="' + uuId + '">' + this.cCheckBox(name, values[i]['id'],selected, _disabled +' min-select="'+minSelect+'" max-select="'+maxSelect+'"', false, uuId) + values[i]['text'] +'</label></'+ this.seletc_simulation_tags.Li +'>';
            }else{
                li+= '<'+ this.seletc_simulation_tags.Li +'><label for="' + uuId + '">' + this.cCheckBox(name, values[i]['id'],false, 'disabled="disabled" min-select="'+minSelect+'" max-select="'+maxSelect+'"', false, uuId) + values[i]['text'] +'</label></'+ this.seletc_simulation_tags.Li +'>';
            }
        }
        li+= '<'+ this.seletc_simulation_tags.Li +'><a name="'+ name +'_confirm" href="javascript:;" class="rbtn_ok">确定</a><a name="'+ name +'_cancel" href="javascript:;" class="rbtn_cancel">取消</a></'+ this.seletc_simulation_tags.Li +'>';
        var tips = '';
        if(simulation['aTips']){
            tips = ' tooltip="'+ simulation['aTips'] +'" ';
        }
        html+= '<'+ this.seletc_simulation_tags.Div +' class="sel_box_m"><'+ this.seletc_simulation_tags.A +' virtual_id="'+ name +'" class="'+ (simulation['aClass']||'') +' tooltip" '+ tips +'><span class="cont_text">'+ defaultText +'</span><'+ this.seletc_simulation_tags.Ul +' simulation="true" style="display:none;" name="'+ name +'" class="'+ (simulation['ulClass']||'') +'" >'+ li +'</'+ this.seletc_simulation_tags.Ul +'></'+ this.seletc_simulation_tags.A +'>';
        html+= '</'+ this.seletc_simulation_tags.Div +'>';
        return html;
    },
    /**
     * 创建复选框
     * @param name 名称
     * @param value 值
     * @param checked 是否选中
     * @param parameters 其它的参数
     * @param simulation 是否美化
     * @param uuId 优化IE6 input与label关联点击
     * @returns {*}
     */
	cCheckBox:function(name, value, checked, parameters, simulation, uuId){
		parameters = parameters || '';
		checked = checked || false;
		simulation = simulation || false;
		if(simulation === false){//传统
            if(checked===true){
				parameters+=' checked="checked" ';
			}
			return this.cInput(name, value, parameters, 'checkbox', uuId);
		}else{	//美化
			alert('美化的筛选框未完成！');
		}
	},

    /**
     * 创建单选框
     * @param name 名称
     * @param value 值
     * @param checked 是否选中
     * @param parameters 其它的参数
     * @param simulation 是否美化
     * @param uuId 优化IE6 input与label关联点击
     * @return {*}
     */
	cRadio:function(name, value, checked, parameters, simulation, uuId){
		parameters = parameters || '';
		checked = checked || false;
		simulation = simulation || false;
		if(simulation === false){//传统
			if(checked===true){
				parameters+=' checked="checked" ';
			}
			return this.cInput(name, value, parameters, 'radio', uuId);
		}else{	//美化
			alert('美化的单选框未完成！');
		}
	},
	//创建密码框
	cPassword:function(name, value, parameters){
		return this.cInput(name, value, parameters, 'password');
	},
	//创建文本区域
	cTextarea:function(name, cols, rows, wrap, defaultText, parameters){
		cols = cols || 20;
		rows = rows || 5;
		wrap = wrap || 'virtual';
		defaultText = defaultText || '';
		parameters = parameters || '';
		var html = '<textarea name="'+ name +'" cols="'+ cols +'" rows="'+ rows +'" wrap="'+ wrap +'"' + parameters +'>'+ defaultText +'</textarea>';
		return html;
	},
    /**
     * 创建button按钮
     * @param buttonName 按钮显示的文字
     * @param type 类型：submit,button,reset
     * @param parameters 其它参数
     * @returns {string}
     */
	cButton:function(buttonName,type,parameters){
		type = type || 'submit';
		parameters = parameters || '';
		var html = '<button type="'+ type +'" '+parameters+'>'+ buttonName +'</button>';
		return html;
	},
	/**
     * 创建出生日期控件(注：第一个参数为要插入控件的目标元素，例如'body'。后面两个是接收的最大、最小日期),如果使用多个控件的话，还应加上container参数加以区分
     * @param target 要插入控件的目标元素，例如'body'
     * @param name 名称
     * @param container   控件的class名称，如果使用多个控件的话需要设置此值加以区分
     * @param defaultDate 初始日期
     * @param mindate 最小可用日期YYYY-MM-DD
     * @param maxdate 最大可用日期YYYY-MM-DD
     */
    cBirthday:function(target,name,container,defaultDate,mindate,maxdate){
		var _html = '<div class="'+ container +'"><div class="date_bir_box cfix"><label class="bir_year"><input class="BirthYear uc-zipipt" type="text" name="'+ name.y +'" value="" maxlength="4" /><span class="birthyear_placeholder placeholder_text">年</span></label><label class="bir_month"><span class="BirthMonth"><input value="" type="hidden" name="'+ name.m +'" /><div class="month_dis uc-zipipt"><span data="" class="mon_cap">月</span><span class="mon_arrow"><img alt="" disabled="disabled" src="/tpl/www/image/dot_6.png" /></span></div><div class="month_list"><ul><li data="01">1 月</li><li data="02">2 月</li><li data="03">3 月</li><li data="04">4 月</li><li data="05">5 月</li><li data="06">6 月</li><li data="07">7 月</li><li data="08">8 月</li><li data="09">9 月</li><li data="10">10 月</li><li data="11">11 月</li><li data="12">12 月</li></ul></div></span></label><label class="bir_day"><input class="BirthDay uc-zipipt" type="text" name="'+ name.d +'" value="" maxlength="2" /><span class="birthday_placeholder placeholder_text">日</span></label><p class="emsg"></p></div></div>';	
		$(target).append(_html); 
		var ischeck = false;
		var Ndate = new Date();
		var _y = Ndate.getFullYear();
		var maxdate = maxdate || _y+'-01-01', mindate = mindate || '1900-01-01';
		var smax = maxdate.split('-'), smin = mindate.split('-');
		var _max = Number(maxdate.replace(/\-/g,'')), _min = Number(mindate.replace(/\-/g,''));
		//判断如果有默认选中日期，则填入默认日期
		if(defaultDate){
			var _default = defaultDate.split('-');
			$('.'+ container +' .BirthYear').val(_default[0]);
			$('.'+ container +' .BirthYear').next('span').hide();
			var _num = Number(_default[1]);
			$('.'+ container +' .month_list ul li:eq('+ (_num-1) +')').addClass('oncur');
			$('.'+ container +' .month_dis span.mon_cap').attr('data',_num).html(_num+'月');
			$('.'+ container +' input[name="'+ name.m +'"]').val(_num);
			$('.'+ container +' .BirthDay').val(_default[2]);
			$('.'+ container +' .BirthDay').next('span').hide();
		}
		//显示错误信息
		function showerr(wd){ $('.'+ container +' .emsg').html(wd).show(); }
		//检查date有效性
		function checkDate(yv,mv,dv){
			if(yv > _y || yv < smin[0] && yv != ''){ $('.'+ container +' .BirthYear').addClass('warnL'); showerr('请填入正确的年份，'+ smin[0] + '-' + smax[0] +'！'); }
			var sv;
			var smon = new Array('04','06','09','11'), bmon = new Array('01','03','05','07','08','10','12');
			if(mv == '02'){sv = ((0 == yv % 4) && (0 != (yv % 100))) || (0 == yv % 400) ? 29 : 28;}
			for( var i=0; i<smon.length; i++){ if(mv == smon[i]){ sv = 30; } }
			for( var i=0; i<bmon.length; i++){ if(mv == bmon[i]){ sv = 31; } }
			if(dv > sv || dv < 1 && dv != ''){ $('.'+ container +' .BirthDay').addClass('warnL'); showerr('请务必填写01-31之间的合法日期！'); }	
			if(dv.length < 2 && dv !== ''){ dv = '0'+dv; }
			var _date = Number(yv.toString(10)+mv.toString(10)+dv.toString(10));
			if(yv != '' && dv !== ''){
				if(_date > _max || _date < _min){ showerr('您的出生年月日好像不对，请检查！'); }
			}
		}
		//隐藏错误提醒
		function remoc(targ){
			targ.removeClass('warnL');
			$('.'+ container +' .emsg').hide();
			if(isNaN(targ.val())){
				targ.val('');	
			}			
		}
		//输入框实时验证操作
		$('.'+ container +' .BirthYear').bind({
			focus:function(){ $(this).next('span.birthyear_placeholder').hide(); },
			blur:function(){
				var yv = this.value, mv = $('.'+ container +' .month_dis span.mon_cap').attr('data'), dv = $('.'+ container +' .BirthDay').val();
				if(yv == ''){$(this).addClass('warnL'); showerr('此项不能留空！'); }
				checkDate(yv,mv,dv);
			},
			keyup:function(){ var _this = $(this); remoc(_this); }
		});
		$('.'+ container +' .BirthDay').bind({
			focus:function(){ $(this).next('span.birthday_placeholder').hide();	},
			blur:function(){
				var yv = $('.'+ container +' .BirthYear').val(), mv = $('.'+ container +' .month_dis span.mon_cap').attr('data'), dv = this.value;
				if(dv == ''){$(this).addClass('warnL'); showerr('此项不能留空！'); }
				checkDate(yv,mv,dv);
			},
			keyup:function(){ var _this = $(this); remoc(_this); }
		});
			
		$('.'+ container +' .month_dis').click(function(){
			$(document).unbind('click');
			var _tar = $('.'+ container +' .BirthDay');
			remoc(_tar);
			var _list = $(this).next('.month_list');
			//var _oh = $(this).offset().top, _wh = $(window).height(), _th = _list.height();
			//if( _th > (_wh-_oh) ){ _list.css({ height:_wh-_oh-5, 'overflow-y':'scroll' }); }
			//关闭下拉菜单
			_list.fadeIn(200,function(){
				$(document).click(function(){ 
					$('.month_list').hide();	
				});						  
			});
			$('.BirthMonth').css("z-index","1");
			_list.parents('.BirthMonth').css("z-index","10");
		});
		
		$('.'+ container +' .month_dis span.mon_arrow').click(function(){ $(this).parent().click(); });
		//选择月份
		$('.'+ container +' .month_list ul li').bind({
			mouseover:function(){ $(this).addClass('oncur').siblings().removeClass('oncur'); },
			click:function(){
				$(this).addClass('seled').siblings().removeClass('seled');
				var _d = $(this).attr('data'), _t = $(this).text();
				$('.'+ container +' input[name="'+ name.m +'"]').val(_d);
				$('.'+ container +' .month_dis span.mon_cap').attr('data',_d).html(_t);
				var yv = $('.'+ container +' .BirthYear').val(), mv = $(this).attr('data'), dv = $('.'+ container +' .BirthDay').val();
				$('.'+ container +' .month_list').hide();
				$('.'+ container +' .month_list').parents('.BirthMonth').css("z-index","1");
				checkDate(yv,mv,dv);
			}
		});
	},

    uuid: function(){
        var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        var chars = CHARS, uuid = [], i, radix = radix || chars.length, r;

        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4';

        for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | Math.random()*16;
                uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
            }
        }
        return uuid.join('');
    }

};

/**
 * 表单检查与限制，全站可用
 */
function formsCheck(){};
formsCheck.prototype = {
    /**
     * 根据复选框上的最少(min-select)和最大值(max-select)属性来限制复选框最多和最少可选择数
     * @param {obj} checkObj 要限制的复选框对象
     * @example booking_box.js > FC.checkBoxLimit(obj)
     * @todo 未完成
     */
    checkBoxLimit:function(checkObj){
        //var _obj = $(checkObj);
        //alert($(checkObj).length + ':min:' + $(checkObj).attr('min-select') + ' max:' + $(checkObj).attr('max-select'));
        var c_name = $(checkObj).attr('name');
        //动态检查最大最小值并做相应的屏蔽
        var _min = $(checkObj).attr('min-select') || 0;
        var _max = $(checkObj).attr('max-select') || 0;
		var _len;
        $(checkObj).live('click', function(){
			_len = $(this).parents('ul').find('input[type="checkbox"]:checked').length;
            if(_min > 0 || _max > 0){
                if(_len >= _max ){
                    $('input[name="'+c_name+'"]:not(:checked)').attr('disabled','disabled');
                }else{
                    $('input[name="'+c_name+'"]:not(:checked)').removeAttr('disabled');
                }
                //console.log($(checkObj + ':checked').length);
            }
			//console.log(_len)
        });

        //确定按钮
        var confirmBtn = 'a[name="'+c_name+'_confirm"]';
        $(confirmBtn).click(function(){
            if(_min > 0 && _len < _min){			
                var errorMsn = '请选择';
                if(_min!=0 && _max!=0){
                    if(_min == _max){
                        errorMsn += _min + '项';
                    }else{
                        errorMsn += _min + '至' + _max + '项';
                    }
                }else if(_min!=0){
                    errorMsn += _min + '项';
                }else if(_max!=0){
                    errorMsn += _max + '项';
                }

                art.artDialog.alert(errorMsn);
                return;
            }
            $('ul[name="'+c_name+'"]').hide();
        });

        //关闭按钮
        var cancelBtn = 'a[name="'+c_name+'_cancel"]';
        if($(cancelBtn).attr('click-set')!='1'){
            $(cancelBtn).click(function(e){
                $(cancelBtn).attr('click-set','1');
                //alert('您点了取消按钮');
                $(checkObj).attr('checked',false);
                $('input[name="'+c_name+'"]:not(:checked)').attr('disabled', false);
                $('ul[name="'+c_name+'"]').hide();
            });
        }
    }
};
