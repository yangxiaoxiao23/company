//utf-8
$(document).ready(function(){
	//topbar menu
	$('li.userhome').hover(function(){
		$(this).addClass('uhover');
		$(this).find('.uhmenutree').stop(true,true).slideDown(300);
	},function(){
		$(this).removeClass('uhover');
		$(this).find('.uhmenutree').stop(true,true).hide();
	});
	//nav view
	$('.navItems li').click(function(){
		$(this).addClass('current').siblings('li').removeClass('current');							 
	});
	//shopcart Box
	$('#miniShopCartBox').hover(function(){
		var total = $(this).find('a.shoptotal').find('em').text();
		if(parseInt(total) == 0){
			$('#shopView').hide();	
		}else{
			$('#shopView').stop(true,true).slideDown(300);
		}
	},function(){
		$('#shopView').stop(true,true).slideUp(10);	
	});
	//搜索帮助
	$('.desthelp').hover(function(){
        $(this).find('.desthelpTips').toggleClass('hide');
    });
});
$(document).ready(function(){
	$('#pro-fixed-bar').find('a.bar-close').click(function(){
		$('#pro-fixed-bar').hide();													   
	});					   
});
/*以上的请aFei检查后看看能否删除 Howard */

/*======新站真正的js代码==================================================================================*/
/**
 * 全局类
 * @author Howard
 */
function global(){
	
};
	
global.prototype = {
	
	getLoginStatus: function(url){
		url = this.url_rand(url);
		var ID = document.getElementById('loginOrLogin');
		//以下必须用GET的方式处理，如果用POST的话有些旧的浏览器不能解决跨域问题
		$.ajax({type:'GET',url:url, data:{'action':'loginAndShoppingCartCheckForTop','previousURL':URL.url }, dataType:'jsonp', 
			success : function(data){
				if(typeof(data)=='object' && data['status']==1){
					var html = '';
					var loginWrap = $('#login-wrap');
					var returnContent = data['html'];
					if(returnContent['logStatus']){ //登陆成功
						html += '<span class="login-status js-login-status">您好，';
						html += '<a class="login-name js-login-name">';
						html += '<span class="simple-name">' + returnContent['name'] + '</span>';
						html += '<span class="full-name">' + returnContent['name'] + '</span>';
						html += '</a>';
						html += '<a class="go-out" href="' + returnContent['logOffUrl'] + '">[退出]</a>';
						html += '</span>';
					} else {
						html += '<span class="logout-status js-logout-status"><a href="' + returnContent['loginUrl'] + '">[登录]</a><a href="' + returnContent['regUrl'] + '">[免费注册]</a></span>';
					}
					
					loginWrap.append(html);
					
					var simpleName = loginWrap.find('.simple-name');
					var wid = simpleName.width();
					if(wid > 150){
						simpleName.css('width', 150);
					}
					loginWrap.find('.js-login-name').attr('href', returnContent['myAccountUrl']);
					
					
					var myUsitrip = $('#js-myusi');
					myUsitrip.find('.myusi-text .title').attr('href', returnContent['myAccountUrl']);
					
					$(ID).html(data['html']);	//项部登录信息数据
					function TopShopCart(data){	//迷你购物车数据
						if(data['shopcart']['list'] && $('#shopviewList li').length){
							$('#CarSumTop, #CarSumTop1').text(data['shopcart']['sum']);
							$('#cartBoxTotal').text(data['shopcart']['money']);
							var tpl = $('#shopviewList li').html();
							var li_html = '';
							for(var i=0; i<data['shopcart']['list'].length; i++){
								var DelAction = "G.cartRemove('"+ data['shopcart']['list'][i]['id'] + "','"+ url + "&action=remove_product')";
								li_html +='<li>';
								var proName= data['shopcart']['list'][i]['name'];
								proName = proName.replace('<','');
								proName = proName.replace('>','');
								
								li_html += tpl.replace(/___ProductName___/g, proName).replace(/___ProductFinalPrice___/g,data['shopcart']['list'][i]['price_str']).replace(/___ProductImgSrc___/g,data['shopcart']['list'][i]['img_src']).replace(/___src___/g,'src').replace(/___ProductLinks___/g,data['shopcart']['list'][i]['product_href']).replace(/___DelAction___/g, DelAction);
								li_html +='</li>';
							}
							$('#shopviewList').html(li_html);
						}
					};
					TopShopCart(data);
					var cartList = $('#js-cart-list'),
						shopCart = data['shopcart'],
						cartContent = shopCart['list'],
						sum = shopCart['sum'],
						money = shopCart['money'],
						cart,
						content = '';
						
					for(var i=0,len=cartContent.length;i<len;i++){
						cart = cartContent[i];
						var delAction = "G.cartRemove('"+ cart['id'] + "','"+ url + "&action=remove_product')";
						content += '<dd>';
                        content += '<a href="' + cart['product_href'] + '" class="pro-detail">';
						content += '<img src="' + cart['img_src']+ '">';
                        content += '<span>' + cart['name'].replace(/[<>]/g,'')+ '</span>';
						content += '</a>';
                        content += '<div class="pro-action">';
                        content += '<strong class="price">' + cart['price_str'] + '</strong><a onclick="' + delAction + '" href="javascript:void(0);" class="del">删除</a>';
                        content += '</div>';
                        content += '</dd>';
					}
					cartList.append(content);
					
					var proTotal = $('#js-pro-total');
					proTotal.find('em').text(sum);
					proTotal.find('.total').text(money);
					
					var cartWrap = $('#js-cart');
					cartWrap.find('.cart-text .title strong').text(sum);
				}else{
					alert('程序异常！');
				}
			}
		});
	
	},
	
    /**
     * 登录和购物车检查 loginOrLogin 能跨域
     * @param {string} url 目标地址
     */
	writeLoginInfo : function (url){
			url = this.url_rand(url);
			var ID = document.getElementById('loginOrLogin');
			//以下必须用GET的方式处理，如果用POST的话不能解决跨域的问题
			$.ajax({type:'GET',url:url, data:{'action':'loginAndShoppingCartCheckForTop','previousURL':URL.url }, dataType:'jsonp', 
				success : function(data){
					if(typeof(data)=='object' && data['status']==1){
                        $(ID).html(data['html']);	//项部登录信息数据
						function TopShopCart(data){	//迷你购物车数据
							if(data['shopcart']['list'] && $('#shopviewList li').length){
								$('#CarSumTop, #CarSumTop1').text(data['shopcart']['sum']);
								$('#cartBoxTotal').text(data['shopcart']['money']);
								var tpl = $('#shopviewList li').html();
								var li_html = '';
								for(var i=0; i<data['shopcart']['list'].length; i++){
									var DelAction = 'G.cartRemove("'+ data['shopcart']['list'][i]['id'] +'","'+ url +'&action=remove_product")';
									li_html +='<li>';
									var proName= data['shopcart']['list'][i]['name'];
									proName = proName.replace('<','');
									proName = proName.replace('>','');
                                    li_html += tpl.replace(/___ProductName___/g,proName).replace(/___ProductFinalPrice___/g,data['shopcart']['list'][i]['price_str']).replace(/___ProductImgSrc___/g,data['shopcart']['list'][i]['img_src']).replace(/___src___/g,'src').replace(/___ProductLinks___/g,data['shopcart']['list'][i]['product_href']).replace(/___DelAction___/g, DelAction);
                                    li_html +='</li>';
								}
								$('#shopviewList').html(li_html);
							}
						};
						TopShopCart(data);
					}else{
						alert('程序异常！');
					}
				}
			});
	},
	/**
	 * 删除顶部购物车的产品项
	 * @param {string} prid_str 产品id字符串
	 * @param {string} url 提交的目标网址
	 */
	cartRemove : function(prid_str, url, x){
		if(confirm("确定从购物车中删除此商品？")){
			url = this.url_rand(url);
			url += '&ajax=true&action=remove_product&products_id='+prid_str+'&callback=?';
			$.getJSON(url, function(json){ if(json['removeSuccess'] && json['removeSuccess']=='1'){ alert('删除成功！'); window.location.reload(); } });
		}
	},
	/**
	 * 快速搜索关键词
	 * @param string keyword_str 输入的关键词
	 * @param string language_encoding 网页的语言编码，gb2312或big5
	 * @param string url 提交的目标网址
	fastGetKeyword : function(keyword_str, language_encoding, url){
		if(keyword_str){
			url = this.url_rand(url);
			url += '&ajax=true&action=keywordsQuickSearch&language_encoding='+ language_encoding +'&w='+ keyword_str +'&callback=?';
			$.getJSON(url, function(json){
				//返回json，根据json的值来处理快速搜索菜单的数据
				
			});
		}
	},
	 */
	
    /**
     * 实时载入J_BookingBox
     * @param {string} url 数据源url
     * @param {string} products_id_str 产品id字符串
     * @param {string} BookingBoxId 该购买面板的元素id名称
     * @param {array} otherParam 其它GET参数
     */
	getBookingBox : function (url, products_id_str, BookingBoxId, otherParam){
		if(products_id_str!=""){
			url = this.url_rand(url);
            if(otherParam && otherParam['t_companion_id'] && otherParam['t_companion_id'] > 0){
                url+='&t_companion_id=' + otherParam['t_companion_id'];
            }
			url += '&products_id='+ products_id_str +'&action=getBookingBox&callback=?';

			$.getJSON(url, function(json){
				//写购买面板的html内容
				json['top_div_id'] = BookingBoxId;
				//var BBox = new booking_box(json);
                var box = new usitrip.product.BookingBox(json);
			});
		}
	},
	
    /**
     * 产品详细页面大日历框
     * @param {string} url 数据源的地址
     * @param {int} products_id 产品id号
     * @param {number} year 要取得的年份。如：2014
     * @param {number} month 要取得的月份。如：12
     */
	getCalendarData : function(url, products_id, year, month){
		if(products_id!=""){
			url = this.url_rand(url);
			url += '&departure_year='+ year +'&departure_month='+ month +'&products_id='+ products_id +'&action=getCalendarData&callback=?';
			$.getJSON(url, function(json){
				if(json){
					//@todo 这里处理返回的json对象，到时安排前端人员写动态日历框，下面的代码只是示例
					var html = '<ul>';
					for(var i=0; i<json.length; i++){
						html+='<li>'+ json[i]['departure_date'] +':'+ json[i].departure_year +':'+ json[i].departure_month +':'+json[i].departure_week+':'+ json[i].products_price +'……</li>'
					}
					html+='</ul>';
					$('#J_Calendarbox').html(html);
				}
			});
		}
	},
	
    /**
     * 收集表单数据信息，用于ajax提交表单前的数据收集工作。类似jquery中的.serialize()
     * @param {string} form_id 表单ID
     * @param {string} output_type 输出类型
     * @return {array|string}
     */
    get_form_data : function (form_id, output_type ){
			var form = document.getElementById(form_id);
			var aparams = new Array();															/* 创建一个阵列存表单所有元素和值 */
			var eval_string = new Array();														
			for(var i=0; i<form.elements.length; i++){
				var name = encodeURIComponent(form.elements[i].name); 							/* 取得表单元素名 */
				var value = '';
				if(form.elements[i].type=="radio" || form.elements[i].type=="checkbox" ){		/* 处理单选、复选按钮值 */
					var a = '';
					if(form.elements[i].checked == true){
						a = form.elements[i].value;
						value = encodeURIComponent(a);   									/* 获得表单元素值 */
					}else{
						name ='';
					}
				}else{
					value = encodeURIComponent(form.elements[i].value);   					/* 获得表单元素值1 */
				}
				
				if(name!=""){
					var _l = aparams.length;
					aparams[_l] = new Array();
					aparams[_l][name] = value;
					eval_string[eval_string.length] = name + '='+value;
				}
			}
			if(output_type == "array"){
				return aparams;
			}
			var string = eval_string.join('&');
			string += "&ajax=true";
			
			return string; 
	},
	
    /**
     * 格式化转换特殊符号
     * @param str 源字符串
     * @return {string|XML}
     */
	htmlspecialchars : function (str) {
		str = str.replace(/&/g, '&amp;');
		str = str.replace(/</g, '&lt;');
		str = str.replace(/>/g, '&gt;');
		str = str.replace(/'/g, '&acute;');
		str = str.replace(/"/g, '&quot;');
		str = str.replace(/\|/g, '&brvbar;');
		return str;
	},
	
    /**
     * 快速到达当前页面某个位置
     * @param obj 目标元素如#id或对象
     */
    _goto : function (obj) {
		$("html,body").animate({scrollTop:$(obj).position().top});
	},
	
    /**
     * 给url添加随机参数
     * @param {string} url
     * @return {String}
     */
	url_rand : function(url){
		if (url.indexOf("?") > 0){ url += "&randnumforajaxaction=" + Math.random(); }else{ url += "?randnumforajaxaction=" + Math.random(); }
		return url;
	}
	/*这里添加此文档的新方法(fucntion)或变量var...................................................................................................................*/
};
var G = new global();

/**
 * 全部通用的弹出层基本结构 by lwkai
 * <code>
 * <a href="" class="popup" pop-src="要打开的URL地址" pop-type="iframe">文字</a>
 * @property pop-type 如果你要弹出的层需要一个子框架，则需要此属性，并且值为iframe
 * @property pop-src  弹出层取得内容的URL地址，如果是子框架，则子框架地址就是此地址
 * @property class    必须把此属性中加上 popup 才会生效
 * </code>
 */
/* 全站通用弹出层基本结构 by lwkai start { */
(function(a) {
	a.extend({
		popup : {
			p : null,
			ifr : null,
			mask : null,
			type : '',
			init : function(){
				a(function(){
					a("body").append('<div id="popup-mask" style="display:none"></div><div id="popup-wrap" class="popup-default"><iframe id="popup-iframe" height="0" frameborder="0" src="about:blank"></iframe><div id="popup-con"></div></div>');
					a.popup.ifr = a('#popup-iframe');
					a.popup.p = a('#popup-wrap');
					a.popup.con = a('#popup-con');
					a.popup.mask = a('#popup-mask');
					a(".popup").live("click",function(){
						var o = a(this);
						var pars = o.attr('pop-src');
						a.popup.type = o.attr('pop-type') || '';
						var win_w = a(window).width();
						var win_h = a(window).height();
						switch (a.popup.type) {
							case 'iframe':
								a.popup.ifr.css('display','').attr('src',pars);
								a.popup.con.css('display','none');
								a.popup.mask.css({'display':'block','width':win_w + 'px','position':'fixed','left':0,'top':0,'height':win_h+'px','z-index':'9998','opacity':'0.6','background-color':'#000'});
								a.popup.p.css({'display':'block','z-index':'9999','position':'fixed'});
								break;
							default:
								var url = pars.split('?');
								pars = url[1] || URL.parse(url[1]);
								url = url[0];
								a.get(url,pars,function(r){
									a.popup.ifr.css('display','none');
									a.popup.con.css('display','').html(r).css({"background-color":"#fff"});
									a.popup.mask.css({'display':'block','width':win_w + 'px','position':'fixed','left':0,'top':0,'height':win_h+'px','z-index':'9998','opacity':'0.6','background-color':'#000'});
									a.popup.p.css({'display':'block','z-index':'9999','position':'fixed'});
								},'text');
								break;
						}
					});
				});
			},
			set_size : function(w,h) {
				this.d_w = w;
				this.d_h = h;
				if (a.popup.type == 'iframe')
					this.ifr.attr('width',w).attr('height',h);
				else
					this.con.css({'width':w+'px','height':h+'px'});
				this.p.css({'width':parseFloat(w) + 'px','height':parseFloat(h) + 'px'});
				this.resize();
				a(window).bind('resize',function(){a.popup.resize();});
			},
			resize : function(){
				var win_w = a(window).width();
				var win_h = a(window).height();
				var my_w = (win_w - this.d_w) / 2;
				var my_h = ((win_h - this.d_h) / 2);// + a(window).scrollTop();
				//console.log('resize');
				a.popup.mask.css({'width':win_w,'height':win_h});
				a.popup.p.css({'left':my_w + 'px','top':my_h + 'px'});
			},
			hide : function(){
				this.d_w = 0;
				this.d_h = 0;
				this.p.css('display','none');
				this.mask.css('display','none');
				a(window).unbind('resize');
			},
			reload : function(){
				window.location.reload();
			}
		}
	});
	G.popup = a.popup;
	G.popup.init();
})(jQuery);
/* 全站通用弹出层基本结构 end } */	



/**
 * url 处理对象
 * @param {string} url 要处理的网址
 * @constructor
 * @author LWK
 */
function Url(url){
	this.url = url || window.location.href;
};
Url.prototype = {
    /**
     * 取得网址的GET参数，返回数组，与PHP的相同
     * @return {Array|false}
     */
    getParame:function(){
		var string = this.url.replace(/.+\?/,'').replace(/\#+.{0,}/,'') || null;
		return this.parse(string);
	},
    /**
     * 取得#号后面的锚点参数，返回字符串
     * @return {array|false}
     */
	getAnchor:function(){
		var string = this.url.split("#")[1] || null;
		return string;
	},
	parse : function (string) {
		if(string != null){
			var Parames = [];
			var strs = string.split('&');
			for(var i = 0; i < strs.length; i ++) {
				Parames[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
				//alert(Parames[strs[i].split("=")[0]]);
			}
			return Parames;
		}
		return false;
	}
}
var URL = new Url();

/* 创建XMLHttp对象 start */
var XMLHttp = {
    _objPool: [],
   
    _getInstance: function ()
    {
        for (var i = 0; i < this._objPool.length; i ++)
        {
            if (this._objPool[i].readyState == 0 || this._objPool[i].readyState == 4)
            {
                return this._objPool[i];
            }
        }
   
        /*  IE5中不支持push方法 */
        this._objPool[this._objPool.length] = this._createObj();
   
        return this._objPool[this._objPool.length - 1];
    },
   
    _createObj: function ()
    {
        if (window.XMLHttpRequest)
        {
            var objXMLHttp = new XMLHttpRequest();
   
        }
        else
        {
            var MSXML = ['MSXML2.XMLHTTP.5.0', 'MSXML2.XMLHTTP.4.0',
                  'MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP', 'Microsoft.XMLHTTP'];
            for(var n = 0; n < MSXML.length; n ++)
            {
                try
                {
                    var objXMLHttp = new ActiveXObject(MSXML[n]);
                    break;
                }
                catch(e)
                {
                }
            }
         }         
   
        /*  mozilla某些版本没有readyState属性 */
        if (objXMLHttp.readyState == null)
        {
            objXMLHttp.readyState = 0;
   
            objXMLHttp.addEventListener("load", function ()
                {
                    objXMLHttp.readyState = 4;
   
                    if (typeof objXMLHttp.onreadystatechange == "function")
                    {
                        objXMLHttp.onreadystatechange();
                    }
                },  false);
        }
   
        return objXMLHttp;
    },
   
    /*  发送请求(方法[post,get], 地址, 数据, 回调函数) */
    sendReq: function (method, url, data, callback)
    {
        var objXMLHttp = this._getInstance();
   
        with(objXMLHttp)
        {
            try
            {
                /*  加随机数防止缓存 */
                if (url.indexOf("?") > 0)
                {
                    url += "&randnumforajaxaction=" + Math.random();
                }
                else
                {
                    url += "?randnumforajaxaction=" + Math.random();
                }
   
                open(method, url, true);
   
                /*  设定请求编码方式 */
                setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                send(data);
                onreadystatechange = function ()
                {
                    if (objXMLHttp.readyState == 4 && (objXMLHttp.status == 200 || objXMLHttp.status == 304))
                    {
                        callback(objXMLHttp);
                    }
                }
            }
            catch(e)
            {
                alert(e);
            }
        }
    }
};
/* 创建XMLHttp对象 end */


/* tooltip提示信息 start { */
(function(a) {
	a(function() {
		a("body").append('<div id="tooltip-wrap" class="tooltip-default"><span id="tooltip-arrow"></span><div id="tooltip-con"></div></div>');
		var i = a("#tooltip-wrap");
		var c = a("#tooltip-con");
		var j = a("#tooltip-arrow");
		var g = j.width();
		var b;
		var h = a(window);
		var d = i.outerWidth();
		var f = (d - g) / 2;
		j.css({
			left: f
		});
		var e = function() {
			i.fadeOut()
		};
		a(".tooltip").live("mouseenter",
		function() {
			clearTimeout(b);
			var o = a(this);
			var n = o.outerHeight();
			var r = o.outerWidth();
			var u = 0;
			var m = o.attr("tooltip");
			var t = o.find(".tooltipCon");
			if (!m) {
				if (t.text() == "") {
					return
				}
			}
			if (m == "") {
				return
			}
			if (!o.attr("tooltip")) {
				c.html("");
				t.clone().show().appendTo(c)
			} else {
				c.html(m)
			}
			var s = o.offset().left;
			var q = o.offset().top + (-75) + n;
			var p = h.width();
			var l = s - (d - r) / 2;
			if (d + l > p) {
				var k = d + l - p;
				i.css({
					left: l - k
				});
				j.css({
					left: f + k + u
				})
			} else {
				if (l < 0) {
					i.css({
						left: 0
					});
					j.css({
						left: f + l + u
					})
				} else {
					i.css({
						left: l
					});
					j.css({
						left: f + u
					})
				}
			}
			i.css({
				top: q
			});
			i.fadeIn()
		}).live("mouseleave",
		function() {
			b = setTimeout(e, 300)
		});
		
		/*i.hover(function() {
			clearTimeout(b)
		},
		function() {
			b = setTimeout(e, 300)
		})*/
	})
})(jQuery);

/* tooltip提示信息 end } */


 


jQuery(document).ready(function($){
/* 顶部搜索框 */
	function sendData(url,limit,val,tar){
		url = G.url_rand(url);
		url += '&ajax=true&val='+ val +'&limit='+ limit +'&callback=?';
		$.getJSON(url, function(data){
			//返回json，根据json的值来处理快速搜索菜单的数据
			if(data.rows.length > 0){
				var _ul = tar.parents('.hdsearchIpt').find('.hdAutocomplete');
				_ul.empty();
				_sn = -1;
				$('.hdAutocomplete').hide();
				for(var i=0; i<data.rows.length; i++){
					$('.hdAutocomplete').hide();
					_ul.append('<li class="t_s_list">'+ data.rows[i].text +'</li>').show();
				}
			}else{
				$('.hdAutocomplete').hide();	
			}
		});
	}
	
	var _url = $('.hdsearchWords').attr('dataurl');
	var _li = $('.hdAutocomplete li');
	var _sn = -1;
   _li.live('click',function(){
		var _key = $(this).text();
		$(this).parents('.hdsearchIpt').find('.hdsearchWords').val(_key);
		var btn = $(this).parents('.hdsearchIpt').next('.hdsearchSubmit');
		if(btn){
			$('form[name="quick_find"]').submit();		
		}
	});
   
   
   _li.live('hover',function(){
		$(this).addClass('hover').siblings().removeClass('hover');
		_sn = $(this).index();
	});
  
   function selLi(num,_this){
		$('.hdAutocomplete li').eq(num).addClass('hover').siblings().removeClass('hover');
		var _tt = $('.hdAutocomplete li:eq('+ num +')').text();
		_this.parents('.hdsearchIpt').find('.hdsearchWords').val(_tt);
	}
   $('.hdsearchWords').focus(function(){
	   var _this = $(this),_val = $(this).val(),_url = $(this).attr('dataurl');
	   sendData(_url,10,_val,_this);
	}).keyup(function(e){
		var _this = $(this),_val = $(this).val();
		var _len = $('.hdAutocomplete li').length;
		switch(e.keyCode){
			case 40: //方向下
				if(_sn == _len-1){_sn = 0;}else{_sn += 1;}
				selLi(_sn,_this);
				break;
			case 38: //方向上
				if(_sn == 0){_sn = _len-1;}else{_sn -= 1;}
				selLi(_sn,_this);
				break;
			case 37:break;
			case 39:break;
			default:
				sendData(_url,10,_val,_this);
				break;
		}
	});
   $(document).click(function(event){
		var e = event || window.event;
		var obj = e.srcElement || e.target; 
		if(obj.className != 'hdsearchWords' && obj.className !== 't_s_list'){
			$(obj).find('.hdAutocomplete').hide();	
		}
	});
});

//设置artDialog的路径
window._artDialog_path = '/tpl/www/js/artDialog';