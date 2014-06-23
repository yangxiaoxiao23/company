//var data = ;
/**
 * 产品详细页大日历生成类
 * @param element string 生成的日期显示在哪个容器中（容器的ID）
 * @param inputTxt string 用户选择某日期后日期显示在哪个输入框中
 * @param data JSON 具体对应日期的一些信息
 * var data = {
 *	 "2012": {
 *		 "2": {
 *			 "18": {"p": "<span class=\"green\">\u5145\u8db3<\/span> $189\u8d77","detail": {"single":{"title":"\u6210\u4eba","text":"$2,500.00"},"kids":{"title":"\u5c0f\u5b69","text":"$800.00"}}},
 *			 "22": {...}
 *		 }...
 *	 }
 * }
 * var data = {"年份":{"月":{"日":{"p":"日期下附带显示的信息","detail":{...}}}}};
 */
function lwkCalendar(element,inputTxt,data){
	this.caption = {
		'month' : '月份',
		'week'  : ['星期日','星期一','星期二','星期三','星期四','星期五','星期六']
	};
	this.innerObj = null;
	this.MonHead = [31,28,31,30,31,30,31,31,30,31,30,31];//定义阳历中每个月的最大天
	this.L_WDay = new Array(42);//定义写日期的数
	this.liWidth = '0px';
	this.toolBar = null;
	this.conTxt = null;
	this.prevBtn = null;
	this.nextBtn = null;
	this.yearTxt = null; //显示当前年月的对象
	this.year = '1900';
	this.month = "1";
	this.inputTxt = (inputTxt == undefined) ? undefined : (typeof inputTxt == 'string') ? document.getElementById(inputTxt) : inputTxt;
	this.data = null;
	this._width = 0;
	this.init(element,data);
}

lwkCalendar.prototype = {
	init : function(element,data){
		this.innerObj = typeof element == "string" ? document.getElementById(element) : element;
		this.data = data;
		this.insertHead();
		this.insertBody();
		for(year in this.data) {
			this.year = year;
			break;
		}
		for(month in this.data[this.year]){
			this.month = month;
			break;
		}
		this.setDay();
		this.disableButton();
		var height = this.conTxt.offsetHeight - 61;
		var padTop = (height - 40) / 2;
		this.yearTxt.style.height = (height - padTop) + 'px';
		this.yearTxt.style.paddingTop = padTop + 'px';
	},
	insertHead : function(){
		var head = "<div class='header'>";
		head += "<div>" + this.caption.month + "</div>";
		var len = this.caption.week.length;
		var width = this.innerObj.offsetWidth;
		this.liWidth = ((width - 45 - 10) / 7) + 'px';
		for (var i = 0; i < len; i++) {
			head += "<div style='width:" + this.liWidth + "'" ;
			if (i == 0 || i == len - 1) {
				head += "class='special'";
			}
			head += ">" + this.caption.week[i] + "</div>";
		}

		head += "</div>";
		this.innerObj.innerHTML = head;
	},
	insertBody : function(){
		var me = this;
		this.toolBar = document.createElement("div");
		this.toolBar.className = 'calendarTool';
		//this.toolBar.style.cssText = 'float:left;width:45px;background:#0f0;';
		this.innerObj.appendChild(this.toolBar);
		
		this.prevBtn = document.createElement('span'); //创建上月按钮
		this.prevBtn.className = 'prev';
		//this.prevBtn.innerHTML = "上月";
		this.prevBtn.onclick = function(){me.prev()};
		this.toolBar.appendChild(this.prevBtn);
		
		this.yearTxt = document.createElement("div"); //中间显示年月
		this.yearTxt.className = 'yearTitle';
		this.yearTxt.style.cssText = 'line-height:20px;text-align:center;';
		//this.yearTxt.innerHTML = "2012年<br/>2月";
		this.toolBar.appendChild(this.yearTxt);
		
		this.nextBtn = document.createElement("span");
		this.nextBtn.className = 'next';
		this.nextBtn.onclick = function(){me.next()};
		this.toolBar.appendChild(this.nextBtn);
		
		
		this.conTxt = document.createElement('div');
		this.conTxt.className = 'calendarContent';
		//this.conTxt.style.cssText = 'float:left';
		this.innerObj.appendChild(this.conTxt);
		var clear = document.createElement('div');
		clear.style.cssText = 'clear:both;height:0px;background:#f00;_display:none;';
		this.innerObj.appendChild(clear);
	},
	prev : function(){
		this.month --;
		if (this.month < 1) {
			this.year --;
			this.month = 12;
		}
		this.setDay();
		this.disableButton();
	},
	next : function(){
		this.month ++;
		if (this.month > 12) {
			this.year ++;
			this.month = 1;
		} 
		this.setDay();
		this.disableButton();
	},
	disableButton : function(){
		var me = this;
		var year = parseInt(this.year,10), month = parseInt(this.month,10);
		if (12 < month + 1) {
			 month = 1;
			 year ++;
		} else {
			month ++;
		}
		if (this.data[year] == undefined || this.data[year][month] == undefined) {
			this.nextBtn.className = 'next_disable';
			this.nextBtn.style.cursor = 'default';
			this.nextBtn.onclick = function(){};
		} else {
			 this.nextBtn.className = 'next';
			 this.nextBtn.style.cursor = 'pointer';
			 this.nextBtn.onclick = function(){me.next()};
		}
		year = parseInt(this.year,10), month = parseInt(this.month,10);
		if (month - 1 < 1) {
			month = 12;
			year = year - 1;	
		} else {
			month --;
		}
		if (this.data[year] == undefined || this.data[year][month] == undefined) {
			this.prevBtn.className = 'prev_disable';
			this.prevBtn.style.cursor = 'default';
			this.prevBtn.onclick = function(){};
		} else {
			this.prevBtn.className = 'prev';
			this.prevBtn.style.cursor = 'pointer';
			this.prevBtn.onclick = function(){me.prev()};
		}
	},
	isPinYear : function(year){            //判断是否闰平年
    	return (0==year%4&&((year%100!=0)||(year%400==0))) ? true : false;
  	},
	getMonthCount:function(year,month){  //闰年二月为29天
    	var c=this.MonHead[month-1];
		if((month == 2) && this.isPinYear(year)) c++;
		return c;
  	},

	detail : function (detail) {
		var rtn = '',j=0;
		if (detail != undefined && detail != '' && detail != null){
			if (detail.constructor == Array || detail.constructor == Object) {
				for (var items in detail) {
					rtn += '<td><span style="width:' + this.liWidth + ';"><nobr>' + detail[items]['title'] + '<\/nobr><\/span><em>' + detail[items]['text'] + '/人<\/em><\/td>';
					j++;
				}
			} else {
				rtn += '<td>' + detail + '<\/td>';
				j++;
			}
			return '<table style="' + (parseInt(this.liWidth) * j) + 'px;" cellpadding="0" cellspacing="0" border="0"><tr>' + rtn + '<\/tr><\/table>';
		} else {
			return '';	
		}
		
	},
	/** 
	 * 传JSON对象或者数组对象进来对日历进行填充
	 * @param year  年份
	 * @param month 月份
	 * @param data  JSON对象
	 */
	setDay : function(year,month,data){
	
		/* 如果从外部传来数据 */
		var yy = (year == undefined ? this.year : year);
		var mm = (month == undefined ? this.month : month);
		var data = data; //先假设用户传了参数进来
		if (data == undefined) { //  如果没传 则从原来的大数组中找
			if (this.data[this.year] != undefined && this.data[this.year][this.month] != undefined) {
				for(day in this.data[this.year][this.month]) {
					data = this.data[this.year][this.month][day];
					break;
				}
			}
		}
		
		var yy = this.year,mm = this.month;
		this.yearTxt.setAttribute('y',yy);
		this.yearTxt.setAttribute('m',mm);
		this.yearTxt.innerHTML = yy + '年<br/>' + mm + '月';
		for (var i = 0; i < 42; i++){this.L_WDay[i]=""};  //清空之前的数组
		var prevMDC = (new Date(yy,mm-1,1)).getDay(); //某月第一天的星期几
		var day1 =1,day2 = 1; //day2 下月显示几个日期的开始日期号
		//上个月的最后几天
		for (i = 0; i < prevMDC; i++) 
			this.L_WDay[i] = "<li class='disable' style='width:" + this.liWidth + "'>" + (this.getMonthCount(mm == 1 ? yy - 1 : yy, mm == 1 ? 12 : mm - 1) - prevMDC + i + 1) + "</li>" ;
		//本月的日期	
		for (i = prevMDC; day1 < this.getMonthCount(yy,mm) + 1; i++){
			var temp = undefined;
			if (data != undefined) { 
				temp = this.data[this.year][this.month][day1];
			}
			if (temp == undefined) { 
				this.L_WDay[i] = "<li class='disable' style='width:" + this.liWidth + "'>" + day1 + '<em></em></li>';
			} else {
				var p_str = temp.p.replace('&#65509;','');
				p_str = p_str.replace('$','');
				var p = temp.p ? parseInt(p_str,10) : 0;
				if (p > 0) { // 如果价格为零 则当天不允许显示
					this.L_WDay[i] = "<li index='" + i + "' d='" + day1 + "' style='width:" + this.liWidth + "'><div class='pop' style='display:none'>" + this.detail(temp.detail) + "<\/div>" + day1 + '<em>' + temp.p + '</em></li>';
				} else {
					this.L_WDay[i] = "<li class='disable' style='width:" + this.liWidth + "'>" + day1 + '<em></em></li>';	
				}
			}
			day1++;
		}
		//还可以显示下月几个日期
  		for (i = prevMDC + this.getMonthCount(yy,mm); i < 42; i++){
			this.L_WDay[i] = "<li class='disable' style='width:" + this.liWidth + "'>" + day2 + "</li>";
			day2++;
		}
		var html = "<ul>" + this.L_WDay.join('') + "</ul>";
		this.conTxt.style.width = (this.innerObj.offsetWidth - 47) + 'px';
		this.conTxt.innerHTML = html;
		var li = this.conTxt.getElementsByTagName("li");
		var me = this;
		for(var i = 0; i<li.length;i++){
			//li[i].style.width = this.liWidth;
			if (li[i].className != 'disable') {
				li[i].onmouseover = function(){
					this.style.position = 'relative';
					this.className = 'hover';
					var div = this.getElementsByTagName('div');
					if (div.length > 0){
						//with(div[0]){
							div[0].style.display = 'block';
							div[0].style.position = 'absolute';
							div[0].style.top = this.offsetHeight + 'px';
							var temp_i = this.getAttribute("index");
							temp_i = parseInt(temp_i,10);
							var ins = (temp_i % 7);
							var cWidth = ins * parseFloat(me.liWidth,10);
							cWidth = div[0].offsetWidth + cWidth;
							if(cWidth > me.conTxt.offsetWidth){
								div[0].style.left = '-' + (cWidth - me.conTxt.offsetWidth) + 'px';
							} else {
								div[0].style.left = '0px'
							}
						//}
					}
				}
				li[i].onmouseout = function(){
					this.style.position = '';
					this.className = '';
					var div = this.getElementsByTagName('div');
					if (div.length > 0) {
						div[0].style.display = 'none';
					}
				}
				li[i].onclick = function(){
					if (me.inputTxt != undefined) {
						var tagName = me.inputTxt.tagName;
						switch (tagName) {
						case "SELECT":
							var month = me.month;
							month = month.toString().length < 2 ? '0' + month : month;
							var d = this.getAttribute('d');
							d = d.length < 2 ? '0' + d : d;
							var regtxt = "^" + me.year + '-' + month + '-' + d;
							var reg = new RegExp("^" + me.year + '-' + month + '-' + d,"i");
							if (me.inputTxt.style.display == 'none'){
								document.getElementById('change_date_box_style_a').onclick();
							}
							for(var i = 0,len = me.inputTxt.options.length; i < len; i++){
								var value = me.inputTxt.options[i].value;
								if (reg.test(value)){
									me.inputTxt.options[i].selected = true;
									me.inputTxt.onchange();
									
									break;
								}
							}
							break;
						case "INPUT":
							me.inputTxt.value = me.year + '/' + me.month + '/' + this.getAttribute('d');
							break;
						default:
							break;
						}
					}
				}
			}
		}
	}
}