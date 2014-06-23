/**
 * 航班日期选择器(此函数需要日历控件类的支持@see calendar.js)
 * @outer 显示日历
 * @param {string} inputId 为日期输入框id
 * @param {string} inputParentId 日期输入框的父id（主要是用来放日历框）
 * @param {string} mindate 最小允许日期:1980-01-01
 * @param {string} maxdate 最大允许日期:2015-12-01
 */
var G_cal = null;
function flightsCalendar(inputId, inputParentId, mindate, maxdate ){
	if (G_cal == null) {
		G_cal = new Calendar();
	}
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
		selectedDate: $("#"+inputId).val(),
		dataNum: 1
	}); 
	//cal.wrapper.style.left = 0;
	//cal.wrapper.style.top = 25 + "px";
	G_cal.notClickClose();
};

//提交表单的JS方法 
function Submit_Companion(){
	var parms = {};
	var type = "1";//$('input[name="type_jieban"]:checked').val();
	parms.type = type;
	var t_companion_title = $('input[name="t_companion_title"]').val().trim();
	parms.t_companion_title = t_companion_title;
	switch (type) {
		case "1":
			
			//var area = $('#area').length > 0 ? $('#area').val() : '';
			//parms.area = area;
			var start_city = $('#start_city').length > 0 ? $('#start_city').val() : '';
			parms.start_city = start_city;
			var attraction_citys = $('#attraction').val();
			parms.attrs = attraction_citys;
			//var end_city = $('#end_city').length > 0 ? $('#end_city').val() : '';
			//parms.end_city = end_city;
			var products_id = $('#products_id').val();
			parms.products_id = products_id;
			//parms.tcpath = $('input[name="categories_id"]').val();
			break;
		default:
			//parms.start_city = $('#start_city_other').val();
			//parms.end_city = $('#end_city_other').val();
			//parms.destination = $("#addressId").tokenInput("get");
			break;	
	}
	var t_companion_content = $('#t_companion_content').val();
	parms.t_companion_content = t_companion_content;
	var hope_departure_date = $('#hope_departure_date').val();
	parms.hope_departure_date = hope_departure_date;
	var hope_departure_date_end = $('#hope_departure_date_end').val();
	parms.hope_departure_date_end = hope_departure_date_end;
	var now_people_man = $('#now_people_man').val().trim();
	parms.now_people_man = now_people_man;
	var now_people_woman = $('#now_people_woman').length > 0 ? $('#now_people_woman').val() : 0;
	parms.now_people_woman = now_people_woman;
	var now_people_child = $('#now_people_child').length > 0 ? $('#now_people_child').val() : 0;
	parms.now_people_child = now_people_child;
	var hope_people_man = $('#hope_people_man').val().trim();
	parms.hope_people_man = hope_people_man;
	var hope_people_woman = $('#hope_people_woman').length > 0 ? $('#hope_people_woman').val() : 0;
	parms.hope_people_woman = hope_people_woman;
	var hope_people_child = $('#hope_people_child').length > 0 ? $('#hope_people_child').val() : 0;
	parms.hope_people_child = hope_people_child;
	var open_ended = $('input[name="open_ended"]:checked').length > 0 ? '1' : '0';
	parms.open_ended = open_ended;
	var who_payment = $('#who_payment').length > 0 ? $('#who_payment').val() : 0;
	parms.who_payment = who_payment;
	
	var customers_name = $('#customers_name').val();
	parms.customers_name = customers_name;
	var t_gender = $('input[name="t_gender"]:checked').val();
	parms.t_gender = t_gender;
	var email_address = $('#email_address').val().trim();
	parms.email_address = email_address;
	var customers_phone = $('#customers_phone').val().trim();
	parms.customers_phone = customers_phone;
	var personal_introduction = $('#personal_introduction').val();
	parms.personal_introduction = personal_introduction;
	var set_top_box = $('input[name="set_top_box"]:checked').length > 0 ? '1' : '0';
	parms.set_top_box = set_top_box;
	if(set_top_box == '1'){
		var t_top_day = $('input[name="t_top_day"]:checked').val();
		parms.t_top_day = t_top_day;
	}
	
	console.log(parms);

	var url = $('#CompanionForm').attr('action');
	$.post(url,parms,function(r){
		console.log(r);
		if (r.status == 0) {
			alert(r.error);
			if (r.error == 'Error Not login!'){
				parent.G.popup.reload();
			}
		} else if (r.status == 1) {
			alert('发布成功！');
			parent.G.popup.reload();
		}
	},'json');
	return false;
}

// 切换结伴类弄的事件需要处理的东西。结伴人数，哪些框要隐藏与显示。。。
(function(a){
	a(function(){
		//var typeObj = a('input[name="type_jieban"]:checked');
		var type = "1";//typeObj.val();
		/*a('input[name="type_jieban"]').bind('click',function(){
			change(-1);
		});*/
		var c = function(index){
			var rtn = 0;
			for(var i=index;i>=0;i--){
				rtn += parseInt(selects[i].val().trim());
			}
			return rtn;
		};
		var change = function(index){
			var _c = c(index);
			//typeObj = a('input[name="type_jieban"]:checked');
			type = "1";//typeObj.val();
			if (type == '1') {
				a('#in_line').css('display','block');
				a('#in_other').css('display','none');
			}else{
				a('#in_line').css('display','none');
				a('#in_other').css('display','block');
			}
			var len = type == '1' ? 4 : 40;
			var obj = index < selects.length -1 ? selects[index+1] : false;
			if (!obj) return;
			obj.empty();
			var tmp = '';
			for(var i=0;i<=len-_c;i++) {
				tmp += '<option value="' + i + '">' + i + '</option>';
			};
			obj.append(tmp);
			obj.change();
		};
		var selects = [];
		var f = function(str){
			var npm = a('#'+str);
			if(npm.length) {
				var len = selects.length;
				selects[len] = npm;
				npm.bind('change',function(){
					change(len);
				});
				
			}
		};
		f('now_people_man');
		f('now_people_woman');
		f('now_people_child');
		f('hope_people_man');
		f('hope_people_woman');
		f('hope_people_child');
		change(-1);
	});
})(jQuery);	

//谁支付的事件
function set_hidden_field_val(obj){
	document.getElementById('who_payment').value = obj.id.replace('who_payment_','');
}
// 选择产品后，设置产品ID
function set_products_id(obj) {
	//var id = obj.options[obj.selectedIndex].value;
	//var text = obj.options[obj.selectedIndex].text;
	jQuery('#products_id').val(jQuery('#products_select').val());
	//jQuery('#t_companion_content').val(text);
}
// 取得产品列表
function getProducts(obj) {
	var start_id = jQuery('#start_city').val();
	//var end_id = jQuery('#end_city').val();
	var attraction_id = jQuery('#attraction').val();
	start_id = (isNaN(start_id) ? '': start_id);
	console.log(attraction_id.length);
	if (start_id == '' && attraction_id.length == 0) {
		return;
	}
	jQuery.post(
		obj.getAttribute('src'), 
		{
			'start_id': start_id,
			//'end_id': end_id,
			'attr_id': attraction_id,
			'action': 'products'
		},
		function(data) {
			var html = '';
			if (data.length == 0) {
				html = '<option>暂无可发起结伴同游的线路</option>';
			} else {
				//html = '<option>请选择旅游线路</option>';
				for (var i = 0,len = data.length; i < len; i++) {
					html += '<option value="' + data[i].products_id + '">' + data[i].products_name + "</option>";
				}
			}
			jQuery('#products_select').html(html);
		},
		'json'
	);
}
// 取得城市数据
function getCity(obj) {

	var start_id = jQuery('#start_city').val();

	start_id = (isNaN(start_id) ? 0: start_id);

	if (start_id == 0 )  return;
	jQuery.post(obj.getAttribute("src"), {'start_id': start_id,},function(data) {
		if (data.error == 'No login!') {
			location.reload();
		}
		if (data.length > 0) {
			var attractions = '';
			//attractions = '<option>请选择</option>';
			for (var aa in data) {
				attractions += '<option value="' + data[aa].id + '">' + data[aa].name + '</option>';
			}
			jQuery('#attraction').html(attractions);
		}
		
	},
	'json');
}

//让弹出层与本窗体自适应
$(document).ready(function(){
	//setTimeout(function(){parent.G.popup.set_size($(document).width(),$(document).height());},500);
});

// 置顶显示设置天的元素
function not_set_top(obj){
	if (obj.checked == true) {
		$('#set_top_radio').css('display','');
	} else {
		$('#set_top_radio').css('display','none');
	}
}

// 输入提示框，支持多个
(function(e) {
	var c = {
		method: "GET",
		contentType: "json",
		queryParam: "q",
		searchDelay: 300,
		minChars: 1,
		propertyToSearch: "name",
		jsonContainer: null,
		hintText: "Type in a search term",
		noResultsText: "No results",
		searchingText: "Searching...",
		deleteText: "&times;",
		animateDropdown: true,
		tokenLimit: null,
		tokenDelimiter: ",",
		preventDuplicates: false,
		tokenValue: "id",
		prePopulate: null,
		processPrePopulate: false,
		idPrefix: "token-input-",
		resultsFormatter: function(g) {
			return "<li>" + g[this.propertyToSearch] + "</li>";
		},
		tokenFormatter: function(g) {
			return "<li><p>" + g[this.propertyToSearch] + "</p></li>";
		},
		onResult: null,
		onAdd: null,
		onDelete: null,
		onReady: null
	};
	var f = {
		tokenList: "token-input-list",
		token: "token-input-token",
		tokenDelete: "token-input-delete-token",
		selectedToken: "token-input-selected-token",
		highlightedToken: "token-input-highlighted-token",
		dropdown: "token-input-dropdown",
		dropdownItem: "token-input-dropdown-item",
		dropdownItem2: "token-input-dropdown-item2",
		selectedDropdownItem: "token-input-selected-dropdown-item",
		inputToken: "token-input-input-token"
	};
	var d = {
		BEFORE: 0,
		AFTER: 1,
		END: 2
	};
	var a = {
		BACKSPACE: 8,
		TAB: 9,
		ENTER: 13,
		ESCAPE: 27,
		SPACE: 32,
		PAGE_UP: 33,
		PAGE_DOWN: 34,
		END: 35,
		HOME: 36,
		LEFT: 37,
		UP: 38,
		RIGHT: 39,
		DOWN: 40,
		NUMPAD_ENTER: 108,
		COMMA: 188
	};
	var b = {
		init: function(g, h) {
			var i = e.extend({},
			c, h || {});
			return this.each(function() {
				e(this).data("tokenInputObject", new e.TokenList(this, g, i));
			});
		},
		clear: function() {
			this.data("tokenInputObject").clear();
			return this;
		},
		add: function(g) {
			this.data("tokenInputObject").add(g);
			return this;
		},
		remove: function(g) {
			this.data("tokenInputObject").remove(g);
			return this;
		},
		get: function() {
			return this.data("tokenInputObject").getTokens();
		}
	};
	e.fn.tokenInput = function(g) {
		if (b[g]) {
			return b[g].apply(this, Array.prototype.slice.call(arguments, 1));
		} else {
			return b.init.apply(this, arguments);
		}
	};
	e.TokenList = function(i, s, Q) {
		if (typeof(s) === "string" || typeof(s) === "function") {
			Q.url = s;
			var m = x();
			if (Q.crossDomain === undefined) {
				if (m.indexOf("://") === -1) {
					Q.crossDomain = false;
				} else {
					Q.crossDomain = (location.href.split(/\/+/g)[1] !== m.split(/\/+/g)[1]);
				}
			}
		} else {
			if (typeof(s) === "object") {
				Q.local_data = s;
			}
		}
		if (Q.classes) {
			Q.classes = e.extend({},
			f, Q.classes);
		} else {
			if (Q.theme) {
				Q.classes = {};
				e.each(f,
				function(V, W) {
					Q.classes[V] = W + "-" + Q.theme;
				});
			} else {
				Q.classes = f;
			}
		}
		var E = [];
		var v = 0;
		var r = new e.TokenList.Cache();
		var O;
		var L;
		var z = e('<input type="text"  autocomplete="off">').css({
			outline: "none"
		}).attr("id", Q.idPrefix + i.id).focus(function() {
			if (Q.tokenLimit === null || Q.tokenLimit !== v) {
				l();
			}
		}).blur(function() {
			F();
			e(this).val("");
		}).bind("keyup keydown blur update", g).keyup(function(W) {
			var Y;
			var V;
			switch (W.keyCode) {
			case a.LEFT:
			case a.RIGHT:
			case a.UP:
			case a.DOWN:
				if (!e(this).val()) {
					Y = n.prev();
					V = n.next();
					if ((Y.length && Y.get(0) === C) || (V.length && V.get(0) === C)) {
						if (W.keyCode === a.LEFT || W.keyCode === a.UP) {
							I(e(C), d.BEFORE);
						} else {
							I(e(C), d.AFTER);
						}
					} else {
						if ((W.keyCode === a.LEFT || W.keyCode === a.UP) && Y.length) {
							R(e(Y.get(0)));
						} else {
							if ((W.keyCode === a.RIGHT || W.keyCode === a.DOWN) && V.length) {
								R(e(V.get(0)));
							}
						}
					}
				} else {
					var X = null;
					if (W.keyCode === a.DOWN || W.keyCode === a.RIGHT) {
						X = e(N).next();
					} else {
						X = e(N).prev();
					}
					if (X.length) {
						U(X);
					}
					return false;
				}
				break;
			case a.BACKSPACE:
				Y = n.prev();
				if (!e(this).val().length) {
					if (C) {
						k(e(C));
						D.change();
					} else {
						if (Y.length) {
							R(e(Y.get(0)));
						}
					}
					return false;
				} else {
					if (e(this).val().length === 1) {
						F();
					} else {
						setTimeout(function() {
							B();
						},
						5);
					}
				}
				break;
			case a.TAB:
			case a.ENTER:
			case a.NUMPAD_ENTER:
			case a.COMMA:
				if (N) {
					K(e(N).data("tokeninput"));
					D.change();
					return false;
				}
				break;
			case a.ESCAPE:
				F();
				return true;
			default:
				if (String.fromCharCode(W.which)) {
					setTimeout(function() {
						B();
					},
					5);
				}
				break;
			}
		});
		var D = e(i).hide().val("").focus(function() {
			z.focus();
		}).blur(function() {
			z.blur();
		});
		var C = null;
		var G = 0;
		var N = null;
		var p = e("<ul />").addClass(Q.classes.tokenList).click(function(W) {
			var V = e(W.target).closest("li");
			if (V && V.get(0) && e.data(V.get(0), "tokeninput")) {
				T(V);
			} else {
				if (C) {
					I(e(C), d.END);
				}
				z.focus();
			}
		}).mouseover(function(W) {
			var V = e(W.target).closest("li");
			if (V && C !== this) {
				V.addClass(Q.classes.highlightedToken);
			}
		}).mouseout(function(W) {
			var V = e(W.target).closest("li");
			if (V && C !== this) {
				V.removeClass(Q.classes.highlightedToken);
			}
		}).insertBefore(D);
		var n = e("<li />").addClass(Q.classes.inputToken).appendTo(p).append(z);
		var S = e("<div>").addClass(Q.classes.dropdown).appendTo("body").hide();
		var J = e("<tester/>").insertAfter(z).css({
			position: "absolute",
			top: -9999,
			left: -9999,
			width: "auto",
			fontSize: z.css("fontSize"),
			fontFamily: z.css("fontFamily"),
			fontWeight: z.css("fontWeight"),
			letterSpacing: z.css("letterSpacing"),
			whiteSpace: "nowrap"
		});
		D.val("");
		var y = Q.prePopulate || D.data("pre");
		if (Q.processPrePopulate && e.isFunction(Q.onResult)) {
			y = Q.onResult.call(D, y);
		}
		if (y && y.length) {
			e.each(y,
			function(V, W) {
				j(W);
				H();
			});
		}
		if (e.isFunction(Q.onReady)) {
			Q.onReady.call();
		}
		this.clear = function() {
			p.children("li").each(function() {
				if (e(this).children("input").length === 0) {
					k(e(this));
				}
			});
		};
		this.add = function(V) {
			K(V);
		};
		this.remove = function(V) {
			p.children("li").each(function() {
				if (e(this).children("input").length === 0) {
					var Y = e(this).data("tokeninput");
					var W = true;
					for (var X in V) {
						if (V[X] !== Y[X]) {
							W = false;
							break;
						}
					}
					if (W) {
						k(e(this));
					}
				}
			});
		};
		this.getTokens = function() {
			return E;
		};
		function H() {
			if (Q.tokenLimit !== null && v >= Q.tokenLimit) {
				z.hide();
				F();
				return;
			}
		}
		function g() {
			if (L === (L = z.val())) {
				return;
			}
			var V = L.replace(/&/g, "&amp;").replace(/\s/g, " ").replace(/</g, "&lt;").replace(/>/g, "&gt;");
			J.html(V);
			z.width(J.width() + 30);
		}
		function P(V) {
			return ((V >= 48 && V <= 90) || (V >= 96 && V <= 111) || (V >= 186 && V <= 192) || (V >= 219 && V <= 222));
		}
		function j(V) {
			var X = Q.tokenFormatter(V);
			X = e(X).addClass(Q.classes.token).insertBefore(n);
			e("<span>" + Q.deleteText + "</span>").addClass(Q.classes.tokenDelete).appendTo(X).click(function() {
				k(e(this).parent());
				D.change();
				return false;
			});
			var W = {
				id: V.id
			};
			W[Q.propertyToSearch] = V[Q.propertyToSearch];
			e.data(X.get(0), "tokeninput", V);
			E = E.slice(0, G).concat([W]).concat(E.slice(G));
			G++;
			w(E, D);
			v += 1;
			if (Q.tokenLimit !== null && v >= Q.tokenLimit) {
				z.hide();
				F();
			}
			return X;
		}
		function K(V) {
			var X = Q.onAdd;
			if (v > 0 && Q.preventDuplicates) {
				var W = null;
				p.children().each(function() {
					var Z = e(this);
					var Y = e.data(Z.get(0), "tokeninput");
					if (Y && Y.id === V.id) {
						W = Z;
						return false;
					}
				});
				if (W) {
					R(W);
					n.insertAfter(W);
					z.focus();
					return;
				}
			}
			if (Q.tokenLimit == null || v < Q.tokenLimit) {
				j(V);
				H();
			}
			z.val("");
			F();
			if (e.isFunction(X)) {
				X.call(D, V);
			}
		}
		function R(V) {
			V.addClass(Q.classes.selectedToken);
			C = V.get(0);
			z.val("");
			F();
		}
		function I(W, V) {
			W.removeClass(Q.classes.selectedToken);
			C = null;
			if (V === d.BEFORE) {
				n.insertBefore(W);
				G--;
			} else {
				if (V === d.AFTER) {
					n.insertAfter(W);
					G++;
				} else {
					n.appendTo(p);
					G = v;
				}
			}
			z.focus();
		}
		function T(W) {
			var V = C;
			if (C) {
				I(e(C), d.END);
			}
			if (V === W.get(0)) {
				I(W, d.END);
			} else {
				R(W);
			}
		}
		function k(W) {
			var X = e.data(W.get(0), "tokeninput");
			var Y = Q.onDelete;
			var V = W.prevAll().length;
			if (V > G) {
				V--;
			}
			W.remove();
			C = null;
			z.focus();
			E = E.slice(0, V).concat(E.slice(V + 1));
			if (V < G) {
				G--;
			}
			w(E, D);
			v -= 1;
			if (Q.tokenLimit !== null) {
				z.show().val("").focus();
			}
			if (e.isFunction(Y)) {
				Y.call(D, X);
			}
		}
		function w(X, V) {
			var W = e.map(X,
			function(Y) {
				return Y[Q.tokenValue];
			});
			V.val(W.join(Q.tokenDelimiter));
		}
		function F() {
			S.hide().empty();
			N = null;
		}
		function q() {
			S.css({
				position: "absolute",
				top: e(p).offset().top + e(p).outerHeight(),
				left: e(p).offset().left,
				zindex: 999
			}).show();
		}
		function o() {
			if (Q.searchingText) {
				q();
			}
		}
		function l() {
			if (Q.hintText) {
				F();
			}
		}
		function u(W, V) {
			return W.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + V + ")(?![^<>]*>)(?![^&;]+;)", "gi"), "<b>$1</b>");
		}
		function A(W, X, V) {
			return W.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + X + ")(?![^<>]*>)(?![^&;]+;)", "g"), u(X, V));
		}
		function M(X, V) {
			if (V && V.length) {
				S.empty();
				var W = e("<ul>").appendTo(S).mouseover(function(Y) {
					U(e(Y.target).closest("li"));
				}).mousedown(function(Y) {
					K(e(Y.target).closest("li").data("tokeninput"));
					D.change();
					return false;
				}).hide();
				e.each(V,
				function(Y, Z) {
					var aa = Q.resultsFormatter(Z);
					aa = A(aa, Z[Q.propertyToSearch], X);
					aa = e(aa).appendTo(W);
					if (Y % 2) {
						aa.addClass(Q.classes.dropdownItem);
					} else {
						aa.addClass(Q.classes.dropdownItem2);
					}
					if (Y === 0) {
						U(aa);
					}
					e.data(aa.get(0), "tokeninput", Z);
				});
				q();
				if (Q.animateDropdown) {
					W.slideDown("fast");
				} else {
					W.show();
				}
			} else {
				if (Q.noResultsText) {
					S.html("<p>对不起，不支持该地</p>");
					q();
				}
			}
		}
		function U(V) {
			if (V) {
				if (N) {
					h(e(N));
				}
				//console.log(Q.classes.selectedDropdownItem);
				V.addClass(Q.classes.selectedDropdownItem);
				N = V.get(0);
			}
		}
		function h(V) {
			V.removeClass(Q.classes.selectedDropdownItem);
			N = null;
		}
		function B() {
			var V = z.val().toLowerCase();
			if (V && V.length) {
				if (C) {
					I(e(C), d.AFTER);
				}
				if (V.length >= Q.minChars) {
					o();
					clearTimeout(O);
					O = setTimeout(function() {
						t(V);
					},
					Q.searchDelay);
				} else {
					F();
				}
			}
		}
		function t(ab) {
			var X = ab + x();
			var V = r.get(X);
			if (V) {
				M(ab, V);
			} else {
				if (Q.url) {
					var Z = x();
					var Y = {};
					Y.data = {};
					if (Z.indexOf("?") > -1) {
						var ac = Z.split("?");
						Y.url = ac[0];
						var W = ac[1].split("&");
						e.each(W,
						function(ad, af) {
							var ae = af.split("=");
							Y.data[ae[0]] = ae[1];
						});
					} else {
						Y.url = Z;
					}
					Y.data[Q.queryParam] = ab;
					Y.type = Q.method;
					Y.dataType = Q.contentType;
					if (Q.crossDomain) {
						Y.dataType = "jsonp";
					}
					Y.success = function(ad) {
						if (e.isFunction(Q.onResult)) {
							ad = Q.onResult.call(D, ad);
						}
						r.add(X, Q.jsonContainer ? ad[Q.jsonContainer] : ad);
						if (z.val().toLowerCase() === ab) {
							M(ab, Q.jsonContainer ? ad[Q.jsonContainer] : ad);
						}
					};
					e.ajax(Y);
				} else {
					if (Q.local_data) {
						var aa = e.grep(Q.local_data,
						function(ad) {
							return ad[Q.propertyToSearch].toLowerCase().indexOf(ab.toLowerCase()) > -1;
						});
						if (e.isFunction(Q.onResult)) {
							aa = Q.onResult.call(D, aa);
						}
						r.add(X, aa);
						M(ab, aa);
					}
				}
			}
		}
		function x() {
			var V = Q.url;
			if (typeof Q.url == "function") {
				V = Q.url.call();
			}
			return V;
		}
	};
	e.TokenList.Cache = function(h) {
		var j = e.extend({
			max_size: 500
		},
		h);
		var k = {};
		var i = 0;
		var g = function() {
			k = {};
			i = 0;
		};
		this.add = function(m, l) {
			if (i > j.max_size) {
				g();
			}
			if (!k[m]) {
				i += 1;
			}
			k[m] = l;
		};
		this.get = function(l) {
			return k[l];
		};
	};
} (jQuery)); 