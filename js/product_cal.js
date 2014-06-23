
/*��������ѡ��������start*/

	
function L_calendar(){this.init();}
L_calendar.prototype={
    HelpMsg:"1.��ɫ������Ϊ��ͨ�ɳ�������;<br>2.�ۺ챳�����Ϊ�ر�۸�����;<br>3.��ɫ������Ϊ��������;<br>4.��ɫ����û���г̰���,����ѡ;<br>5.�����л����������������;<br>6.�����ײ������Ƕ����ڵ�˵��",/* ��������Ӻ��޸İ����ĵ������� */

    DayInfo:new Array(),
    Moveable:false,
    NewName:"",
    insertId:"",
    ClickObject:null,
    InputObject:null,
    InputDate:null,
    IsOpen:false,
    MouseX:0,
    MouseY:0,
    GetDateLayer:function(){
        return window.L_DateLayer;
    },
	Browser : {},
	init : function(){
		try{  
            var idSeed = 0,  
    	    ua = navigator.userAgent.toLowerCase(),  
			check = function(r){  
				return r.test(ua);  
			},  
			DOC = document,  
			isStrict = DOC.compatMode == "CSS1Compat",  
			isOpera = check(/opera/),  
			isChrome = check(/\bchrome\b/),  
			isWebKit = check(/webkit/),  
			isSafari = !isChrome && check(/safari/),  
			isSafari2 = isSafari && check(/applewebkit\/4/), // unique to Safari 2  
			isSafari3 = isSafari && check(/version\/3/),  
			isSafari4 = isSafari && check(/version\/4/),  
			isIE = !isOpera && check(/msie/),  
			isIE7 = isIE && check(/msie 7/),  
			isIE8 = isIE && check(/msie 8/),  
			isIE6 = isIE && !isIE7 && !isIE8,  
			isGecko = !isWebKit && check(/gecko/),  
			isGecko2 = isGecko && check(/rv:1\.8/),  
			isGecko3 = isGecko && check(/rv:1\.9/),  
			isBorderBox = isIE && !isStrict,  
			isWindows = check(/windows|win32/),  
			isMac = check(/macintosh|mac os x/),  
			isAir = check(/adobeair/),  
			isLinux = check(/linux/),  
			isIpad = check(/ipad/),  
			isSecure = /^https/i.test(window.location.protocol);  
			this.Browser = {  
				isOpera:isOpera,  
				isIE:isIE,  
				isIE6:isIE6,  
				isFirefox:isGecko,  
				isSafari:isSafari,  
				isChrome:isChrome,  
				isIpad:isIpad  
			}  
		}catch(e){}
	},
    L_TheYear: new Date().getFullYear(), /* ������ı����ĳ�ʼֵ */
    L_TheMonth: new Date().getMonth()+1,/* �����µı����ĳ�ʼֵ */
    L_WDay:new Array(39),/* ����д���ڵ����� */
    MonHead:new Array(31,28,31,30,31,30,31,31,30,31,30,31),/* ����������ÿ���µ�������� */
    GetY:function(){
        var obj;
        if (arguments.length > 0){
            obj==arguments[0];
        }
        else{
            obj=this.ClickObject;
        }
        if(obj!=null){
            var y = obj.offsetTop;
            while (obj = obj.offsetParent) y += obj.offsetTop;
            return y;
        }
        else{return 0;}
    },
    GetX:function(){
        var obj;
        if (arguments.length > 0){
            obj==arguments[0];
        }
        else{
            obj=this.ClickObject;
        }
        if(obj!=null){
            var y = obj.offsetLeft;
            while (obj = obj.offsetParent) y += obj.offsetLeft;
            return y;
        }
        else{return 0;}
    },
    CreateHTML:function(){
        var htmlstr="";
        htmlstr+="<div id=\"L_calendar\">\r\n";
        htmlstr+="<span id=\"SelectYearLayer\" style=\"z-index: 9999;position: absolute;top: 3; left: 45;display: none\"></span>\r\n";
        htmlstr+="<span id=\"SelectMonthLayer\" style=\"z-index: 9999;position: absolute;top: 3; left: 105;display: none\"></span>\r\n";
        htmlstr+="<div id=\"L_calendar-year-month\">\r\n";
        htmlstr+="<div id=\"L_calendar-PrevM\" onclick=\"parent."+this.NewName+".PrevM()\" title=\"ǰһ��\"><b>&lt;</b><span id=\"L_calendar-PrevM-text\"></span></div>\r\n";
        htmlstr+="<div id=\"L_calendar-year\" onmouseover=\"style.backgroundColor='#ffeadd'\" onmouseout=\"style.backgroundColor='white'\" onclick=\"parent."+this.NewName+".SelectYearInnerHTML()\"></div>\r\n";
        htmlstr+="<div id=\"L_calendar-month\"  onmouseover=\"style.backgroundColor='#ffeadd'\" onmouseout=\"style.backgroundColor='white'\" onclick=\"parent."+this.NewName+".SelectMonthInnerHTML()\"></div>\r\n";
        htmlstr+="<div id=\"L_calendar-NextM\" onclick=\"parent."+this.NewName+".NextM()\" title=\"��һ��\"><span id=\"L_calendar-NextM-text\"></span><b>&gt;</b></div>\r\n";
        htmlstr+="</div>\r\n";
        htmlstr+="<div id=\"L_calendar-week\"><ul  onmouseup=\"StopMove()\"><li><b>��</b></li><li>һ</li><li>��</li><li>��</li><li>��</li><li>��</li><li><b>��</b></li></ul></div>\r\n";
        htmlstr+="<div id=\"L_calendar-day\">\r\n";
        htmlstr+="<ul>\r\n";
        for(var i=0;i<this.L_WDay.length;i++){
            htmlstr+="<li id=\"L_calendar-day_"+i+"\" style=\"background:#fff;border:1px solid #6bc4f3\" ></li>";
        }
        htmlstr+="</ul>\r\n";
        htmlstr+="</div>\r\n";
        htmlstr+="<div>\r\n";
        htmlstr+="<div id=\"L_calendar-help\" onclick='sAlert(\""+this.HelpMsg+"\")'><span>����</span></div>\r\n";
        htmlstr+="<div id=\"L_calendar-show-week\"><span>"+this.GetDOWToday()+"</span></div>\r\n";
        htmlstr+="<div id=\"L_calendar-show-info\"><span></span><b id=\"L_calendar-show-price\"></b></div>\r\n";
        htmlstr+="<div id=\"L_calendar-close\" onclick='parent."+this.NewName+".OnClose()'><span>�ر�</span></div>\r\n";
        htmlstr+="</div>\r\n";
        htmlstr+="</div>\r\n";
        htmlstr+="<scr" + "ipt type=\"text/javas" + "cript\">\r\n";
        htmlstr+="var MouseX,MouseY;";
        htmlstr+="var Moveable="+this.Moveable+";\r\n";
        htmlstr+="var MoveaStart=false;\r\n";
        htmlstr+="document.onmousemove=function(e)\r\n";
        htmlstr+="{\r\n";
        htmlstr+="var DateLayer=parent.document.getElementById(\"L_DateLayer\");\r\n";
        htmlstr+="	e = window.event || e;\r\n";
        htmlstr+="var DateLayerLeft=DateLayer.style.posLeft || parseInt(DateLayer.style.left.replace(\"px\",\"\"));\r\n";
        htmlstr+="var DateLayerTop=DateLayer.style.posTop || parseInt(DateLayer.style.top.replace(\"px\",\"\"));\r\n";
        htmlstr+="if(MoveaStart){DateLayer.style.left=(DateLayerLeft+e.clientX-MouseX)+\"px\";DateLayer.style.top=(DateLayerTop+e.clientY-MouseY)+\"px\"};\r\n";
        htmlstr+="}\r\n";

        htmlstr+="document.getElementById(\"L_calendar-week\").onmousedown=function(e){\r\n";
        htmlstr+="if(Moveable){MoveaStart=true;}\r\n";
        htmlstr+="	e = window.event || e;\r\n";
        htmlstr+="  MouseX = e.clientX;\r\n";
        htmlstr+="  MouseY = e.clientY;\r\n";
        htmlstr+="	}\r\n";
        htmlstr+="function StopMove(){\r\n";
        htmlstr+="MoveaStart=false;\r\n";
        htmlstr+="	}\r\n";
        htmlstr+="function sAlert(str){\r\n";
        htmlstr+="var msgw,msgh,bordercolor;\r\n";
        htmlstr+="msgw=200;\r\n";
        htmlstr+="msgh=180;\r\n";
        htmlstr+="titleheight=25;\r\n";
        htmlstr+="bordercolor=\"#336699\";\r\n";
        htmlstr+="titlecolor=\"#99CCFF\";\r\n";
        htmlstr+="var msgObj=document.createElement(\"div\");\r\n";
        htmlstr+="msgObj.setAttribute(\"id\",\"msgDiv\"); \r\n";
        htmlstr+="msgObj.setAttribute(\"align\",\"center\"); \r\n";
        htmlstr+="msgObj.style.background=\"white\"; \r\n";
        htmlstr+="msgObj.style.border=\"1px solid \" + bordercolor; \r\n";
        htmlstr+="msgObj.style.position = \"absolute\";\r\n";
        htmlstr+="var parentObj=document.getElementById(\"L_calendar-help\");\r\n";
        htmlstr+="msgObj.style.left = parentObj.offsetLeft; \r\n";
        htmlstr+="msgObj.style.top = parentObj.offsetTop-msgh+14; \r\n";
        htmlstr+="msgObj.style.font=\"12px/1.6em Verdana, Geneva, Arial, Helvetica, sans-serif\";\r\n";
        htmlstr+="msgObj.style.width = msgw + \"px\"; \r\n";
        htmlstr+="msgObj.style.height =msgh + \"px\"; \r\n";
        htmlstr+="msgObj.style.textAlign = \"left\"; \r\n";
        htmlstr+="msgObj.style.lineHeight =\"22px\"; \r\n";
        htmlstr+="msgObj.style.zIndex = \"10001\"; \r\n";
        htmlstr+="var title=document.createElement(\"h4\"); \r\n";
        htmlstr+="title.setAttribute(\"id\",\"msgTitle\"); \r\n";
        htmlstr+="title.setAttribute(\"align\",\"right\"); \r\n";
        htmlstr+="title.style.margin=\"0\"; \r\n";
        htmlstr+="title.style.padding=\"3px\"; \r\n";
        htmlstr+="title.style.background=bordercolor;\r\n";
        htmlstr+="title.style.border=\"1px solid \" + bordercolor; \r\n";
        htmlstr+="title.style.height=\"18px\";\r\n";
        htmlstr+="title.style.font=\"12px Verdana, Geneva, Arial, Helvetica, sans-serif\";\r\n";
        htmlstr+="title.style.color=\"white\";\r\n";
        htmlstr+="title.style.cursor=\"pointer\";\r\n";
        htmlstr+="title.innerHTML=\"�ر�\";\r\n";
        htmlstr+="title.onclick=function(){\r\n";
        htmlstr+="document.getElementById(\"msgDiv\").removeChild(title);\r\n";
        htmlstr+="document.body.removeChild(msgObj);\r\n";
        htmlstr+="}\r\n";
        htmlstr+="document.body.appendChild(msgObj);\r\n";
        htmlstr+="document.getElementById(\"msgDiv\").appendChild(title);\r\n";
        htmlstr+="var txt=document.createElement(\"p\"); \r\n";
        htmlstr+="txt.style.margin=\"1em 0\";\r\n";
        htmlstr+="txt.setAttribute(\"id\",\"msgTxt\");\r\n";
        htmlstr+="txt.innerHTML=str;\r\n";
        htmlstr+="document.getElementById(\"msgDiv\").appendChild(txt);\r\n";
        htmlstr+="}\r\n";
        htmlstr+="</scr"+"ipt>\r\n";
        var stylestr="";
        stylestr+="<style type=\"text/css\">";
        stylestr+="body{background:#fff;font-size:12px;margin:0px;padding:0px;text-align:left;position:relative;}\r\n";
        stylestr+="#L_calendar{border:1px solid #6bc4f3;width:205px;padding:1px;height:245px;z-index:9998;text-align:center;}\r\n";
        stylestr+="#L_calendar-year-month{height:23px;line-height:23px;z-index:9998;border-bottom:1px solid #6bc4f3;}\r\n";
        stylestr+="#L_calendar-year{line-height:20px;width:60px;float:left;z-index:9998;position: absolute;top: 3; left: 45;cursor:default;font-weight:bold;text-align:right;}\r\n";
        stylestr+="#L_calendar-month{line-height:20px;width:45px;float:left;z-index:9998;position: absolute;top: 3; left: 105;cursor:default;font-weight:bold;text-align:left;}\r\n";
        stylestr+="#L_calendar-PrevM{position: absolute;top: 3px; left: 5px;cursor:pointer;color:#f7860f;}\r\n";
        stylestr+="#L_calendar-PrevM-text{margin-left:3px;color:#108bcd;}\r\n";
        stylestr+="#L_calendar-NextM{position: absolute;top: 3px; left:160px;cursor:pointer;color:#f7860f;width:40px;text-align:right;}\r\n";
        stylestr+="#L_calendar-week{height:23px;line-height:23px;z-index:9998;}\r\n";
        stylestr+="#L_calendar-NextM-text{color:#108bcd;}\r\n";
        stylestr+="#L_calendar-day{height:175px;;z-index:9998;}\r\n";
        stylestr+="#L_calendar-week{background:#edf8fe;}\r\n";
        stylestr+="#L_calendar-week ul{cursor:move;list-style:none;margin:0px;padding:0px;margin-left:5px;}\r\n";
        stylestr+="#L_calendar-week li{width:24px !important;width:23px;height:24px !important;height:23px;line-height:23px;float:left;margin:2px;padding:0px;text-align:center;}\r\n";
        stylestr+="#L_calendar-day{background:#edf8fe;border-bottom:1px solid #d5d5d5}\r\n";
        stylestr+="#L_calendar-day ul{list-style:none;margin:0px;padding:0px;margin-left:5px;}\r\n";
        stylestr+="#L_calendar-day li{cursor:pointer;width:22px !important;width:23px;height:22px !important;height:23px;line-height:23px;float:left;;margin:2px;padding:0px;border:1px solid #6bc4f3;}\r\n";
        stylestr+="#L_calendar-help{color:#108bcd;float:left;width:30px;margin-top:8px;cursor:pointer;}\r\n";
        stylestr+="#L_calendar-show-week{float:left;width:60px;margin-top:8px;text-align:right;}\r\n";
        stylestr+="#L_calendar-show-info{float:left;width:85px;*width:80px;margin-top:8px;}\r\n";
        stylestr+="#L_calendar-show-price{color:f7860f;}\r\n";
        stylestr+="#L_calendar-close{color:#108bcd;float:left;width:30px;margin-top:8px;cursor:pointer;}\r\n";
        stylestr+="</style>";
        var TempLateContent="<html>\r\n";
        TempLateContent+="<head>\r\n";
        TempLateContent+="<title></title>\r\n";
        TempLateContent+=stylestr;
        TempLateContent+="</head>\r\n";
        TempLateContent+="<body>\r\n";
        TempLateContent+=htmlstr;
        TempLateContent+="</body>\r\n";
        TempLateContent+="</html>\r\n";
        this.GetDateLayer().document.writeln(TempLateContent);
        this.GetDateLayer().document.close();
    },
    InsertHTML:function(id,htmlstr){
        var L_DateLayer=this.GetDateLayer();
        if(L_DateLayer){L_DateLayer.document.getElementById(id).innerHTML=htmlstr;}
    },
    WriteHead:function (yy,mm)  /* �� head ��д�뵱ǰ�������� */
    {
        this.InsertHTML("L_calendar-year",yy + "��");
        this.InsertHTML("L_calendar-month",mm + "��");

        mm=Number(mm);
        var prevM=mm==1?12:mm-1;
        var nextM=mm==12?1:mm+1;

        this.InsertHTML("L_calendar-PrevM-text",prevM + "��");
        this.InsertHTML("L_calendar-NextM-text",nextM + "��");
    },
    IsPinYear:function(year)            /* �ж��Ƿ���ƽ�� */
    {
        if (0==year%4&&((year%100!=0)||(year%400==0))) return true;else return false;
    },
    GetMonthCount:function(year,month)  /* �������Ϊ29�� */
    {
        var c=this.MonHead[month-1];if((month==2)&&this.IsPinYear(year)) c++;return c;
    },
    GetDOW:function(day,month,year)     /* ��ĳ������ڼ� */
    {
        var day = new Date(year,month-1,day); /* ������ֵ��ʽ�� */
        var today = new Array("����","��һ","�ܶ�","����","����","����","����");
        return today[day.getDay()];
    },
    GetDOWToday:function()     /* ���������ڼ� */
    {
        var day = new Date(new Date().getFullYear(),(new Date().getMonth()+1-1),new Date().getDate()); /* ������ֵ��ʽ�� */
        var today = new Array("����","��һ","�ܶ�","����","����","����","����");
        return today[day.getDay()];
    },
    GetDateDiff:function (sDate1, sDate2)
    {/*  �����������ڵļ������ */
        /* sDate1��sDate2��2002-12-18��ʽ */
        var aDate, oDate1, oDate2, iDays;

        aDate = sDate1.split("-");
        oDate1 = new Date(aDate[0],aDate[1]-1,aDate[2],01,00,00);
        aDate = sDate2.split("-");
        oDate2 = new Date(aDate[0],aDate[1]-1,aDate[2],00,00,00);

        iDays = parseInt((oDate1 - oDate2) / 1000 / 60 / 60 /24); /* �����ĺ�����ת��Ϊ���� */
        return iDays;
    },
    GetText:function(obj){
        if(obj.innerText){return obj.innerText}
        else{return obj.textContent}
    },
    PrevM:function()  /* ��ǰ���·� */
    {
        if(this.L_TheMonth>1){this.L_TheMonth--}else{this.L_TheYear--;this.L_TheMonth=12;}
        this.SetDay(this.L_TheYear,this.L_TheMonth);
    },
    NextM:function()  /* �����·� */
    {
        if(this.L_TheMonth==12){this.L_TheYear++;this.L_TheMonth=1}else{this.L_TheMonth++}
        this.SetDay(this.L_TheYear,this.L_TheMonth);
    },
    SetDay:function (yy,mm)   /* ��Ҫ��д����********** */
    {
		var arr_soldout_dates=Array();
		        var infoCount=this.DayInfo.length;
        this.WriteHead(yy,mm);
        /* ���õ�ǰ���µĹ�������Ϊ����ֵ */
        this.L_TheYear=yy;
        this.L_TheMonth=mm;
        /* ��ҳ�汾��λ�ڿ����ʱ IE�᷵�ش����parent */
        if(window.top.location.href!=window.location.href){
            for(var i_f=0;i_f<window.top.frames.length;i_f++){
                    if(window.top.frames[i_f].location.href==window.location.href){L_DateLayer_Parent=window.top.frames[i_f];}
            }
        }
        else{
            L_DateLayer_Parent=window.parent;
        }
        for (var i = 0; i < 39; i++){this.L_WDay[i]=""}  /* ����ʾ�������ȫ����� */
        var day1 = 1,day2=1,firstday = new Date(yy,mm-1,1).getDay();  /* ĳ�µ�һ������ڼ� */
        for (i=0;i<firstday;i++)this.L_WDay[i]=this.GetMonthCount(mm==1?yy-1:yy,mm==1?12:mm-1)-firstday+i+1	/* �ϸ��µ������ */
        for (i = firstday; day1 < this.GetMonthCount(yy,mm)+1; i++){this.L_WDay[i]=day1;day1++;}
        for (i=firstday+this.GetMonthCount(yy,mm);i<39;i++){this.L_WDay[i]=day2;day2++}
        for (i = 0; i < 39; i++)
        {
			var is_date_sold = 0;
            var da=this.GetDateLayer().document.getElementById("L_calendar-day_"+i+"");
            var month,day;
            if (this.L_WDay[i]!="")
            {
                if(i<firstday){
                    da.style.border="1px solid #6bc4f3";
                    da.style.visibility="hidden";
                    da.innerHTML="<span style=\"color:gray\">" + this.L_WDay[i] + "</span>";
                    month=(mm==1?12:mm-1);
                    day=this.L_WDay[i];
                }
                else if(i>=firstday+this.GetMonthCount(yy,mm)){
                    da.style.visibility="hidden";
                    da.style.border="1px solid #6bc4f3";
                    da.innerHTML="<span style=\"color:gray\">" + this.L_WDay[i] + "</span>";
                    month=(mm==12?1:mm+1);
                    day=this.L_WDay[i];
                }
                else{
                    month=mm;
                    day=this.L_WDay[i];
                    var monthNow=new Date().getMonth()+1;
                    var dateDiff=this.GetDateDiff(yy+"-"+month+"-"+day,new Date().getFullYear()+"-"+monthNow+"-"+new Date().getDate());
                    if(infoCount>=dateDiff+1)
                    {
                        /*if(typeof(this.DayInfo[dateDiff])!="undefined"){
							alert(this.DayInfo[dateDiff][0]);
						}*/
						if(dateDiff>=0&&this.DayInfo[dateDiff][0])
                        {
							if(this.DayInfo[dateDiff][1])
                            {
                                da.style.visibility="visible";
                                da.style.border="1px solid #f7860f";
                                da.style.background='#ffeadd';
                                da.innerHTML="<span style=\"color:#108bcd\">" + this.L_WDay[i] + "</span>";
                                if(document.all){
                                    da.onclick=Function("L_DateLayer_Parent."+this.NewName+".DayClick("+month+","+day+","+this.DayInfo[dateDiff][1]+",'"+this.DayInfo[dateDiff][2]+"',"+this.DayInfo[dateDiff][3]+")");
                                    da.onmouseover=Function("L_DateLayer_Parent."+this.NewName+".OnMouseOverDay(this,"+yy+","+month+","+day+","+dateDiff+")");
                                    da.onmouseout=Function("L_DateLayer_Parent."+this.NewName+".OnMouseOutDay(this,"+dateDiff+","+this.DayInfo[dateDiff][1]+")");
                                }
                                else{
                                    da.setAttribute("onclick","parent."+this.NewName+".DayClick("+month+","+day+","+this.DayInfo[dateDiff][1]+",'"+this.DayInfo[dateDiff][2]+"',"+this.DayInfo[dateDiff][3]+")");
                                    da.setAttribute("onmouseover","parent."+this.NewName+".OnMouseOverDay(this,"+yy+","+month+","+day+","+dateDiff+")");
                                    da.setAttribute("onmouseout","parent."+this.NewName+".OnMouseOutDay(this,"+dateDiff+","+this.DayInfo[dateDiff][1]+")");
                                }
                            }
                            else
                            {
                                da.style.visibility="visible";
                                da.style.border="1px solid #6bc4f3";
                                da.style.background='#fff';
                                da.innerHTML="<span style=\"color:#108bcd\">" + this.L_WDay[i] + "</span>";
                                if(document.all){
                                    da.onclick=Function("L_DateLayer_Parent."+this.NewName+".DayClick("+month+","+day+","+this.DayInfo[dateDiff][1]+",'',"+this.DayInfo[dateDiff][3]+")");
                                    da.onmouseover=Function("L_DateLayer_Parent."+this.NewName+".OnMouseOverDay(this,"+yy+","+month+","+day+","+dateDiff+")");
                                    da.onmouseout=Function("L_DateLayer_Parent."+this.NewName+".OnMouseOutDay(this,"+dateDiff+","+this.DayInfo[dateDiff][1]+")");
                                }
                                else{
                                    da.setAttribute("onclick","parent."+this.NewName+".DayClick("+month+","+day+","+this.DayInfo[dateDiff][1]+",'',"+this.DayInfo[dateDiff][3]+")");
                                    da.setAttribute("onmouseover","parent."+this.NewName+".OnMouseOverDay(this,"+yy+","+month+","+day+","+dateDiff+")");
                                    da.setAttribute("onmouseout","parent."+this.NewName+".OnMouseOutDay(this,"+dateDiff+","+this.DayInfo[dateDiff][1]+")");
                                }
                            }
                            da.style.cursor="pointer";
                        
						}else{

							var sd_yy = str_pad(yy, 4, "0", STR_PAD_LEFT);
							var sd_mm = str_pad(month, 2, "0", STR_PAD_LEFT);
							var sd_dd = str_pad(day, 2, "0", STR_PAD_LEFT);
							var sd_date = sd_yy+"-"+sd_mm+"-"+sd_dd;

							var is_date_sold = 0;
							for (sd_key in arr_soldout_dates){
								if(arr_soldout_dates[sd_key] != ""){
									if(arr_soldout_dates[sd_key] == sd_date){
										is_date_sold = 1;
									}
								}
							}

							if(is_date_sold == 1 && this.L_WDay[i] >= new Date().getDate()){
								da.style.visibility="visible";
								da.style.border="1px solid #d5d5d5";
								da.style.background='#fff';
								da.style.cursor="default";
								da.innerHTML="<span style=\"color:#FF0000; text-decoration:line-through;\">" + this.L_WDay[i] +"</span>";
								if(document.all){
									da.onclick=Function("");
									da.onmouseover=Function("");
									da.onmouseout=Function("");
								}else{
									da.setAttribute("onclick","");
									da.setAttribute("onmouseover","");
									da.setAttribute("onmouseout","");
								}
							}else{
								da.style.visibility="visible";
								da.style.border="1px solid #d5d5d5";
								da.style.background='#fff';
								da.style.cursor="default";
								da.innerHTML="<span style=\"color:#d5d5d5\">" + this.L_WDay[i] + "</span>";
								if(document.all){
									da.onclick=Function("");
									da.onmouseover=Function("");
									da.onmouseout=Function("");
								}
								else{
									da.setAttribute("onclick","");
									da.setAttribute("onmouseover","");
									da.setAttribute("onmouseout","");
								}
							}
                        }
                    }
                    else{
                        da.style.visibility="visible";
                        da.style.border="1px solid #d5d5d5";
                        da.style.background='#fff';
                        da.style.cursor="default";
                        da.innerHTML="<span style=\"color:#d5d5d5\">" + this.L_WDay[i] + "</span>";
                        if(document.all){
                            da.onclick=Function("");
                            da.onmouseover=Function("");
                            da.onmouseout=Function("");
                        }
                        else{
                            da.setAttribute("onclick","");
                            da.setAttribute("onmouseover","");
                            da.setAttribute("onmouseout","");
                        }
                    }
                }
				if(is_date_sold == "1" && this.L_WDay[i] >= new Date().getDate() ){
					da.title="������";
				}else{
                	da.title=month+" ��"+day+" ��";
				}

                if(yy == new Date().getFullYear() && month==new Date().getMonth()+1 && day==new Date().getDate())
                {
                    da.style.border="1px solid #f7860f";
                    da.firstChild.style.color="#f7860f";
                    da.firstChild.style.fontWeight="bold";
                }
            }
        }
    },
    SelectYearInnerHTML:function () /* ��ݵ������� */
    {
        var DateLayer=this.GetDateLayer();
        var strYear=DateLayer.document.getElementById("L_calendar-year").innerHTML.substr(0,4);
        if(strYear.match(/\D/)!=null){alert("�����������������֣�");return;}

        var m = (strYear) ? strYear : new Date().getFullYear();
        if (m < 1000 || m > 9999) {alert("���ֵ���� 1000 �� 9999 ֮�䣡");return;}
        var n = m - 10;
        if (n < 1000) n = 1000;
        if (n + 26 > 9999) n = 9974;
        var s = "<select name=\"L_SelectYear\" id=\"L_SelectYear\" style='font-size: 12px' "
        s += "onblur='document.getElementById(\"SelectYearLayer\").style.display=\"none\"' "
        s += "onchange='document.getElementById(\"SelectYearLayer\").style.display=\"none\";"
        s += "parent."+this.NewName+".L_TheYear = this.value; parent."+this.NewName+".SetDay(parent."+this.NewName+".L_TheYear,parent."+this.NewName+".L_TheMonth)'>\r\n";
        var selectInnerHTML = s;
        for (var i = n; i < n + 26; i++)
        {
            if (i == m){
                selectInnerHTML += "<option value='" + i + "' selected>" + i + "��" + "</option>\r\n";
            }
            else{
                selectInnerHTML += "<option value='" + i + "'>" + i + "��" + "</option>\r\n";
            }
        }
        selectInnerHTML += "</select>";
        DateLayer.document.getElementById("SelectYearLayer").style.display="";
        DateLayer.document.getElementById("SelectYearLayer").innerHTML = selectInnerHTML;
        DateLayer.document.getElementById("L_SelectYear").focus();

    },
    SelectMonthInnerHTML:function () /* �·ݵ������� */
    {
        var DateLayer=this.GetDateLayer();
        var strMonth=DateLayer.document.getElementById("L_calendar-month").innerHTML.substr(0,2);
        if (strMonth.match(/\D/)!=null){strMonth=strMonth.substr(0,1);}
        if (strMonth.match(/\D/)!=null){alert("�·���������������֣�");return;}

        var m = (strMonth) ? strMonth : new Date().getMonth()+1;
        var s = "<select name=\"L_SelectYear\" id=\"L_SelectMonth\" style='font-size: 12px' "
        s += "onblur='document.getElementById(\"SelectMonthLayer\").style.display=\"none\"' "
        s += "onchange='document.getElementById(\"SelectMonthLayer\").style.display=\"none\";"
        s += "parent."+this.NewName+".L_TheMonth = this.value; parent."+this.NewName+".SetDay(parent."+this.NewName+".L_TheYear,parent."+this.NewName+".L_TheMonth)'>\r\n";
        var selectInnerHTML = s;
        for (var i = 1; i < 13; i++)
        {
            if (i == m){
                selectInnerHTML += "<option value='"+i+"' selected>"+i+"��"+"</option>\r\n";
            }
            else{
                selectInnerHTML += "<option value='"+i+"'>"+i+"��"+"</option>\r\n";
            }
        }
        selectInnerHTML += "</select>";
        DateLayer.document.getElementById("SelectMonthLayer").style.display="";
        DateLayer.document.getElementById("SelectMonthLayer").innerHTML = selectInnerHTML;
        DateLayer.document.getElementById("L_SelectMonth").focus();
    },
    DayClick:function(mm,dd,ynJQ,info,selectIndex)  /* �����ʾ��ѡȡ���ڣ������뺯��************* */
    {
        var yy=this.L_TheYear;
        /* �ж��·ݣ������ж�Ӧ�Ĵ��� */
        if(mm<1){yy--;mm=12+mm;}
        else if(mm>12){yy++;mm=mm-12;}
        if (mm < 10){mm = "0" + mm;}
        if (this.ClickObject){
            if (!dd) {return;}
            if ( dd < 10){dd = "0" + dd;}

            if(ynJQ==false){
                this.InputObject.value= mm+"/"+dd+"/"+yy+" ("+this.GetDOW(dd,mm,yy)+")"; /* ע�����������������ĳ�����Ҫ�ĸ�ʽ */
            }
            else{
                if(info=="(����)")
                {
                    this.InputObject.value= mm+"/"+dd+"/"+yy+" ("+this.GetDOW(dd,mm,yy)+") (���ռ۸�)";
                }
                else
                {
                    this.InputObject.value= mm+"/"+dd+"/"+yy+" ("+this.GetDOW(dd,mm,yy)+") ("+info+")";
                }
            }
            document.getElementById("availabletourdate").options[selectIndex].selected = true;
            this.CloseLayer();
        	this.InputObject.focus();
		}
        else {this.CloseLayer(); alert("����Ҫ����Ŀؼ����󲢲����ڣ�");}
    },
    SetDate:function(){
        /* ����״�ʹ���������ҳ����ؿ������� */
		
		if(this.DayInfo.length==0){
            var availabletour_date=document.getElementById("availabletourdate");
            if(availabletour_date==null){ alert("���������б����ڣ��������Ա��ϵ��"); }
			var aDateCount=availabletour_date.length;
            var nowMonth= new Date().getMonth()+1;
            var todayString=new Date().getFullYear()+"-"+nowMonth+"-"+new Date().getDate();

			if(typeof(availabletour_date.options[1])=="undefined"){ alert("�޳������ڣ������Ѿ����ꡣ"); return false; }
			var infoCount=this.GetDateDiff(availabletour_date.options[aDateCount-1].value.substr(0,10),todayString);
            var nowDate=new Date(new Date().getFullYear(),(new Date().getMonth()+1-1),new Date().getDate());

            var dateOption = availabletour_date.options[1].value.substr(0,10);
            var dateOptionArray=dateOption.split("-");
            var dateTemp=new Date(dateOptionArray[0],dateOptionArray[1]-1,dateOptionArray[2]);

            var j=1;
            while(dateTemp-nowDate < 0)
            {
                j++;
                dateOption = availabletour_date.options[j].value.substr(0,10);
                dateOptionArray=dateOption.split("-");
                dateTemp=new Date(dateOptionArray[0],dateOptionArray[1]-1,dateOptionArray[2]);
            }

            for(var i=0;i<=infoCount;i++)
            {
				/* var comp_temp_date = dateTemp.toString().substr(0,15); */
				/* var comp_now_date = nowDate.toString().substr(0,15); */
				var comp_temp_date = dateTemp.getFullYear()+"-"+dateTemp.getMonth()+"-"+dateTemp.getDate();
				var comp_now_date = nowDate.getFullYear()+"-"+nowDate.getMonth()+"-"+nowDate.getDate();
				
				/* alert(comp_temp_date+"
"+comp_now_date); */
				
                if(comp_temp_date==comp_now_date){
                    var dateOptionValue = availabletour_date.options[j].value;
                    if(dateOptionValue.indexOf("!!!")>-1){
                        this.DayInfo[i]=new Array(true,false,'',j);
                    }
                    else{
                        var indexFirst=dateOptionValue.indexOf("(");
                        if(indexFirst>-1)
                        {
                            var price=dateOptionValue.substr(indexFirst+1,1);
                            var indexSecond=dateOptionValue.indexOf("$");
                            var indexEnd=dateOptionValue.indexOf(")");
                            price=price+dateOptionValue.substr(indexSecond,indexEnd-indexSecond);
                            this.DayInfo[i]=new Array(true,true,price,j);
                        }
                        else
                        {
                            this.DayInfo[i]=new Array(true,true,"(����)",j);
                        }
                    }
                    j++;
                    Time_difference = 0;
					if(j==2){	/* ����ͻ�����������˵�ʱ�����⣬�ڵ�һ��ȡ����ʱ�������ʱ��ֵ */
												var dddd = new Date();
						var server_UTC = -7;
						var Client_UTC = dddd.getTimezoneOffset()/60;
						if((server_UTC+Client_UTC)>0){	/* ����ͻ���ʱ��ȷ�����ʱ�����ŵ�����������ʱ����й���������8��ʱ�� */
							Time_difference = (server_UTC+Client_UTC)*3600*1000;
						}						
					}
					nowDate=new Date(nowDate-0+1*86400000+Time_difference);
					if(i<infoCount){
                        if(typeof(availabletour_date.options[j])!="undefined"){
							dateOption = availabletour_date.options[j].value.substr(0,10);
                        	dateOptionArray=dateOption.split("-");
                        	dateTemp=new Date(dateOptionArray[0],dateOptionArray[1]-1,dateOptionArray[2]);
						}
                    }
                
				}else{
					this.DayInfo[i]=new Array(false);
					/* alert(nowDate); */
                    nowDate=new Date(nowDate-0+1*86400000);
                }
            }
        }

        if (arguments.length <  1){alert("�Բ��𣡴������̫�٣�");return;}
        else if (arguments.length >  2){alert("�Բ��𣡴������̫�࣡");return;}
        this.InputObject=(arguments.length==1) ? arguments[0] : arguments[1];
        this.ClickObject=arguments[0];
        var reg = /^(\d+)-(\d{1,2})-(\d{1,2})$/;
        var r = this.InputObject.value.match(reg);
        var atd = document.getElementById("availabletourdate").options[1].value.substr(0,10);
        if(r!=null){
            r[2]=r[2]-1;
            var d= new Date(r[1], r[2],r[3]);
            if(d.getFullYear()==r[1] && d.getMonth()==r[2] && d.getDate()==r[3]){
                    this.InputDate=d;		/* �����ⲿ��������� */
            }
            else this.InputDate="";
            this.L_TheYear=r[1];
            this.L_TheMonth=r[2]+1;
        }
        else if(atd){
            atdArray=atd.split("-");
            this.L_TheYear=atdArray[0];
            this.L_TheMonth=atdArray[1];
        }
        else{
            this.L_TheYear = new Date().getFullYear();
            this.L_TheMonth = new Date().getMonth()+1;
        }
        this.CreateHTML();
        var top=this.GetY();
        var left=this.GetX();
        var DateLayer=document.getElementById("L_DateLayer");
        DateLayer.style.top=top+this.ClickObject.clientHeight+5+"px";
        DateLayer.style.left=left+"px";
        DateLayer.style.display="block";
        if(document.all){
            this.GetDateLayer().document.getElementById("L_calendar").style.width="205px";
            this.GetDateLayer().document.getElementById("L_calendar").style.height="245px"
        }
        else{
            this.GetDateLayer().document.getElementById("L_calendar").style.width="205px";
            this.GetDateLayer().document.getElementById("L_calendar").style.height="245px"
			if(this.Browser.isIE6){
            	DateLayer.style.width="205px";
			}else if(this.Browser.isIE8){
				DateLayer.style.width = '230px';
			}else{
				DateLayer.style.width="210px";
			}
            DateLayer.style.height="250px";
        }
        this.SetDay(this.L_TheYear,this.L_TheMonth);
    },
    CloseLayer:function(){
        try{
            var DateLayer=document.getElementById("L_DateLayer");
            if((DateLayer.style.display=="" || DateLayer.style.display=="block") && arguments[0]!=this.ClickObject && arguments[0]!=this.InputObject){
                    DateLayer.style.display="none";
            }
        }
        catch(e){}
    },
    OnClose:function(){
        var DateLayer=document.getElementById("L_DateLayer");
        DateLayer.style.display="none";
    },
    OnMouseOverDay:function(e,yy,mm,day,dateDiff){
        e.style.border='1px solid #243c6c';
        e.firstChild.style.color='#243c6c';
        this.GetDateLayer().document.getElementById("L_calendar-show-week").innerHTML=this.GetDOW(day,mm,yy);
        if(this.DayInfo[dateDiff][1])
        {
            this.GetDateLayer().document.getElementById("L_calendar-show-price").innerHTML=this.DayInfo[dateDiff][2];
            if(window.ActiveXObject){
                var showinfo =this.GetDateLayer().document.getElementById("L_calendar-show-info");
                showinfo.style.marginTop="6px";
            }
        }
    },
    OnMouseOutDay:function(e,dateDiff,ynJQ){
        if(ynJQ)
        {
            e.style.border="1px solid #f7860f";
            e.style.background='#ffeadd';
        }
        else
        {
            e.style.background='#fff';
            e.style.border='1px solid #6bc4f3';
        }
        e.firstChild.style.color='#108bcd';
        if(dateDiff==0)
        {
            e.style.border="1px solid #f7860f";
            e.firstChild.style.color='#f7860f';
        }
        this.GetDateLayer().document.getElementById("L_calendar-show-week").innerHTML=this.GetDOWToday();
        this.GetDateLayer().document.getElementById("L_calendar-show-price").innerHTML="";
        if(window.ActiveXObject){
            var showinfo =this.GetDateLayer().document.getElementById("L_calendar-show-info");
            showinfo.style.marginTop="8px";
        }
    }
}

document.writeln('<iframe id="L_DateLayer" name="L_DateLayer" frameborder="0" scrolling="no" style="position:absolute;width:205px; height:250px;z-index:9998;display:none;"></iframe>');
var L_DateLayer_Parent=null;
var MyCalendar=new L_calendar();
MyCalendar.NewName="MyCalendar";
document.onclick=function(e)
{
    e = window.event || e;
    var srcElement = e.srcElement || e.target;
    MyCalendar.CloseLayer(srcElement);
}

/*��������ѡ��������end*/

function AddToCart(){
	//alert(1);
	validate();	/* ������ȡ�ý���ѡ��Ƶ����Ϣ�� */
	var form = document.getElementById('cart_quantity');
	if(form==null){ 
		alert("no cart_quantity");
		return false;
	}
	var departureDateCheck = true;
	if(form.elements["transfer_products_id"]) {
		departureDateCheck = form.elements['transfer_products_id'].value == form.elements['products_id'].value?false : true;
	}
	if(departureDateCheck && form.elements["availabletourdate"].value.length < 4 ){

		/* form.elements["availabletourdate"].focus(); */
		/* alert("TEXT_SELECT_DEPARTURE_DATE");	//ѡ��������� */
		/* return false; */
		if(form.elements["availabletourdate"].type=='select-one'){
			var slt = form.elements["availabletourdate"];
			/* slt.options[slt.options.length-1].selected='selected'; */
			if(typeof(slt.options[1])=="undefined"){
				alert("�����Ѿ����꣬�޳������ڣ�");
				return false;
			}else{
				slt.options[1].selected='selected';
			}
			/* alert(slt.value); */
		}
	}

	var url = url_ssl("http://test.usitrip.com/shopping_cart.php?action=add_product&products_id=322");
	var aparams=new Array();  /* ����һ�����д������Ԫ�غ�ֵ */
	for(i=0; i<form.length; i++){      
        // by panda Ϊһ�������ӽ��ͬ��ѡ��{ 
        if (form.elements[i].name == 'isOrNoCompanions' && form.elements['isOrNoCompanions'].value == 1){
            form.elements['travel_comp'].value = 1;
        }
         // by panda Ϊһ�������ӽ��ͬ��ѡ��}
		var sparam=encodeURIComponent(form.elements[i].name)+"=";  /* ȡ�ñ�Ԫ���� */
		if(form.elements[i].type=="radio"){
			if(form.elements[i].checked == true){
				sparam+=encodeURIComponent(form.elements[i].value);
			}else{
				sparam = "";
			}
		}else if(form.elements[i].type=="checkbox"){	/* ����ѡ��ťֵ */
			if(form.elements[i].checked == true){
				sparam+=encodeURIComponent(form.elements[i].value);
			}else{
				sparam = '';
			}
		}else{
			sparam+=encodeURIComponent(form.elements[i].value);   /* ��ñ�Ԫ��ֵ1 */
		}
		if(sparam!="")aparams.push(sparam);   /* push�ǰ���Ԫ����ӵ�������ȥ */
	}    
	var post_str = aparams.join("&");
	post_str += "&ajax=true";

    
	ajax.open("POST", url, true);
	ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	ajax.send(post_str);
     
	ajax.onreadystatechange = function() {
		
		if (ajax.readyState == 4 && ajax.status == 200 ) {
			var sex_regxp = /(.*\[Cart_Sum\])|(\[\/Cart_Sum\].*[:space:]*.*)/g;
			var sex_regxp1 = /(.*\[Cart_Total\])|(\[\/Cart_Total\].*[:space:]*.*)/g;
			var is_error = false;

			var error_regxp = /(.*\[ERROR\])|(\[\/ERROR\].*[:space:]*.*)/g;
			if(ajax.responseText.search(/(\[ERROR\].+\[\/ERROR\])/g)!=-1){
				alert(ajax.responseText.replace(error_regxp,''));
				is_error = true;
			}
			/*
			if(ajax.responseText.search(/(\[Cart_Sum\]\d+\[\/Cart_Sum\])/g)!=-1){
				if(document.getElementById('add_cart_msn')!=null){
					var CartSum = ajax.responseText.replace(sex_regxp,'');
					var CartTotal = ajax.responseText.replace(sex_regxp1,'');
					var AddCartMsn = document.getElementById('add_cart_msn');
					AddCartMsn.innerHTML = AddCartMsn.innerHTML.replace(/\[Cart_Sum\]/g, CartSum);
					AddCartMsn.innerHTML = AddCartMsn.innerHTML.replace(/\[Cart_Total\]/g, CartTotal);
					if(document.getElementById('CarSumTop')!=null){
						document.getElementById('CarSumTop').innerHTML = CartSum;
					}
					showPopup('add_cart_msn','add_cart_msn_con');

				}else{
					alert(ajax.responseText);
					is_error=true;
				}
			}*/
			if(!is_error)window.location = 'http://test.usitrip.com/shopping_cart.php';
		}

	}

}

<!--product_info.js-->

function popupWindow(url) {
  window.open(url,'popupWindow','toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=yes,copyhistory=no,width=100,height=100,screenX=150,screenY=150,top=150,left=150')
}
function popupWindow1(url) {
  window.open(url,'popupWindow','toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=yes,copyhistory=no,width=600,height=500,screenX=150,screenY=150,top=150,left=150')
}

var i = 5 ;
function showdiv_deplisting(obj_id,maxdata){
	if(maxdata=='all'){
		var all_div = document.getElementsByTagName("div");
		for(num=0; num < all_div.length; num++ ){
			if(all_div[num].id.indexOf(obj_id)>-1){
				if (all_div[num].style.display=="none"){
					all_div[num].style.display="";
				}else{
					all_div[num].style.display="none";
				}
			}
		}
	}else{
		obj_id = obj_id + "_" + i;
		i = i + 5 ;
		/* var obj = (document.getElementById)? document.getElementById(obj_id) : eval("document.all[obj_id]"); */
		var obj = document.getElementById(obj_id);
		if(obj!=null){
			if (obj.style.display=="none"){
				obj.style.display="";
			}else{
				obj.style.display="none";
			}
			if(maxdata!='' && i > maxdata){
				var obj = (document.getElementById)? document.getElementById('more_div_peparute_link') : eval("document.all['more_div_peparute_link']");
				obj.style.display="none";
			}
		}else{
			alert('no date on showdiv_deplisting("'+obj_id+'","'+maxdata+'")');
		}
	}
}


var defaultAdults="2";
var defaultchildren="0";
var cellStyle=" class='mainblue'";
var childHelp="Please provide the ages of children in each room. Children's ages should be their age at the time of travel.";
var adultHelp="";
var textChildError="Please specify the ages of all children.";
var pad='';
var adultsPerRoom=new Array(defaultAdults);
var childrenPerRoom=new Array(defaultchildren);
var childAgesPerRoom=new Array();
var numRooms=1;	/* Ĭ�ϵķ����� */
var maxChildren=0;


var maxPerRoomPeopleNum = 4;	/* �ò�Ʒ��ÿ������������� */
/*  ȥ���������Ͷ�ͯ���Ķ����ѡ�� */
function sub_rooms_people_num(){
	var cart_quantity = document.getElementById("cart_quantity");
	if(cart_quantity==null){
		return false;
	}

//alert(1);

	var numberOfRooms = cart_quantity.elements['numberOfRooms'];
	if(numberOfRooms!=null){
		var room_num = cart_quantity.elements['numberOfRooms'].value;
		for(i=0; i<room_num; i++){
			var adult_select = cart_quantity.elements['room-'+ i +'-adult-total'];
			var child_select = cart_quantity.elements['room-'+ i +'-child-total'];
			/* ɾ��4�Ժ��ѡ�� ���� */
			var adult_options = adult_select.options;
			for(var j=(adult_options.length-1); j>=maxPerRoomPeopleNum; j--){
				/* alert(adult_options.length); */
				adult_select.remove(j);
				/* adult_options.selectedIndex = (adult_options.length-1); */
			}
			/*������С����*/
			if(typeof(min_num_guest)!='undefined'){
				for(var j=0; j<(min_num_guest-1); j++){
					adult_select.remove(0);
				}
			}

			/* ���������ͯ��ѡ�� */
			var child_options = child_select.options;
			for(var j=(child_options.length-1); j>=maxPerRoomPeopleNum; j--){
				child_select.remove(j);
			}

			
			if(room_num==16){
				/* ����ǽ��ƴ����Ҫ��1�˵�ѡ��ȥ�� */
				if(adult_options[0].value=="1"){
					adult_select.remove(0);
				}
				break;
			}
		}
	}
}

/* ���ݵ�ǰ���������ж��Ƿ���ʾ����ѡ����king�󴲵�ѡ�� */
function set_bed_option(){
	var cart_quantity = document.getElementById("cart_quantity");
	if(cart_quantity==null){
		return false;
	}
	var numberOfRooms = cart_quantity.elements['numberOfRooms'];
	if(numberOfRooms!==undefined){
		var room_num = numberOfRooms.value;
		for(i=0; i<room_num; i++){
			var adult_select = cart_quantity.elements['room-'+ i +'-adult-total'];
			var child_select = cart_quantity.elements['room-'+ i +'-child-total'];
			var the_room_per_num = (Number(adult_select.value) + Number(child_select.value));
			/* ������+��ͯ�����==2����ʾ��ѡ�����ֻ������׼�� */
			var bed_select = cart_quantity.elements['room-'+ i +'-bed'];
			if(bed_select===undefined){

			}else{
				var bed_selects = bed_select.options;
				var bed_value = bed_select.value;
				for(j=(bed_selects.length-1); j>=0; j--){
					bed_select.remove(j);
				}

				var options_array = new Array();
				options_array[0] = new Array(0,'������');
				options_array[1] = new Array(1,'һ��King-sized��');
				options_array[2] = new Array(2,'���ű�׼��');
				if(the_room_per_num==2 && room_num<16){
					for(n=0; n<options_array.length; n++){
						bed_select[n] = new Option(options_array[n][1], options_array[n][0]);
						if(bed_value==options_array[n][0]){
							bed_select.value = options_array[n][0];
						}
					}
				}else{
					bed_select[0] = new Option(options_array[0][1], options_array[0][0]);
				}
			}

			if(room_num==16){ break;}
		}
	}

}


/* ����ѡ��ĳ����������ͯѡ���Ƿ���Ҫ����ѡ�� */
function set_child_option(){
	var cart_quantity = document.getElementById("cart_quantity");
	if(cart_quantity==null){
		return false;
	}

	var numberOfRooms = cart_quantity.elements['numberOfRooms'];
	if(numberOfRooms!=null){
		var room_num = cart_quantity.elements['numberOfRooms'].value;
		for(i=0; i<room_num; i++){
			var adult_select = cart_quantity.elements['room-'+ i +'-adult-total'];
			var child_select = cart_quantity.elements['room-'+ i +'-child-total'];
			/* ������+��ͯ�� <=4 */

			/* alert(adult_select.value); */
			/* ���������ͯ��ѡ��(�����ѡ�������ѡ��) */
			var child_options = child_select.options;
			var child_value = child_select.value;
			for(j=(child_options.length-1); j>=0; j--){
				child_select.remove(j);
			}
			for(n=0; n<(maxPerRoomPeopleNum-adult_select.value)+1; n++){
				child_options[n] = new Option(n, n);
				if(child_value==n){
					child_select.value = n;
				}
			}
			
			if(room_num==16){
				break;
			}
		}
	}
}

function setChildAge(room, child, age) {
	if (childAgesPerRoom[room] == null) {
		childAgesPerRoom[room] = new Array();
	}
	childAgesPerRoom[room][child] = age;
}

function setNumAdults(room, numAdults) {
	adultsPerRoom[room] = numAdults;
	set_child_option();
	set_bed_option();
}

function setNumChildren(room, numChildren) {
	childrenPerRoom[room] = numChildren;
	set_bed_option();
	/* refresh(); */
}

function setNumRooms(x) {
	numRooms = x;
	for (i = 0; i < x; i++) {
		if (adultsPerRoom[i] == null) {
			adultsPerRoom[i] = 2;
		}
		if (childrenPerRoom[i] == null) {
			childrenPerRoom[i] = 0;
		}
	}
	
	if(x!=16){ jQuery('#_checkboxTravelCompanion').attr('checked',false); }
	
	refresh();
	set_bed_option();
	
	calculation_room_price();
}

function renderRoomSelect() {
	var x = '';
	x += '<select class="sel2" style="width:70px;" name="numberOfRooms" onchange="setNumRooms(this.options[this.selectedIndex].value);">'; /*  id="numberOfRooms" */
	for (var i = 1; i < 17; i++) {
		if(i==16){
						x += '<option value="'+i+'"'+(numRooms == i ? ' selected' : '')+'>' + '���ƴ��';
					}else{
			x += '<option value="'+i+'"'+(numRooms == i ? ' selected' : '')+'>' + i;
		}
	}
	x += '</select>';
	/* alert(1); */
	return x;
}

// by panda Ϊһ�������ӡ����ͬ�Ρ����� {
function renderRoomSelectForTravelCompanion(){
    var x = '';
	x += '<select class="sel2" style="width:70px;" name="isOrNoCompanions" onchange="">'; /*  id="numberOfRooms" */
    x += '<option value="0">��ѡ��';
        //x += '<option value="1"'+(numRooms == 1 ? ' selected' : '')+'>' + '���ͬ��';
    x += '<option value="1">' + '���ͬ��';
    
	x += '</select>';
	/* alert(1); */
	return x;
}
// by panda Ϊһ�������ӡ����ͬ�Ρ����� }
function fastSelectTravelCompanion(checkboxObj){
	var roomsSelectObj = jQuery('select[name="numberOfRooms"]');
	if(checkboxObj.checked == true){
		jQuery(roomsSelectObj).val('16');
	}else{
		jQuery(roomsSelectObj).val('1');
	}
	jQuery(roomsSelectObj).change();
}
function buildSelect(name, onchange, min, max, selected) {
	var x = '<select class="sel2" name="' + name + '" id="' + name + '"';
	if (onchange != null) {
		x += ' onchange="' + onchange + '"';
	}
	x +='>\n';
	for (var i = min; i <= max; i++) {
		x += '<option value="' + i + '"';
		if (i == selected) {
			x += ' selected';
		}

		x += '>' + i + '\n';
	//alert(min+':'+max+':'+i);
	}
	x += '</select>';
	
	return x;
	
}

function buildStrSelect(name, onchange, option_array, max_n, selected) {
	var option_array = option_array;
	var x = '<select class="sel2" name="' + name + '" id="'+ name +'"';
	if (onchange != null) {
		x += ' onchange="' + onchange + '"';
	}
	x +='>\n';


	for (var i = 0; i < max_n; i++) {
		x += '<option value="' + option_array[i][0] + '"';
		if (option_array[i][0] == selected) {
			x += ' selected';
		}

		x += '>' + option_array[i][1] + '\n';
	}

	x += '</select>';
	return x;
}

function validateGuests(form) {
	if (numRooms < 18) {
		var missingAge = false;
		for (var i = 0; i < numRooms; i++) {
			var numChildren = childrenPerRoom[i];
			if (numChildren != null && numChildren > 0) {
				for (var j = 0; j < numChildren; j++) {
					if (childAgesPerRoom[i] == null || childAgesPerRoom[i][j] == null || childAgesPerRoom[i][j] == -1) {
						missingAge = true;
					}
				}
			}
		}

		if (missingAge) {
			alert(textChildError);
			return false;
		} else {
			return true;
		}
	} else {
		return true;
	}
}

function submitGuestInfoForm(form) {
	if (!validateGuests(form)) {
		return false;
	}

	return true;
}

function getValue(str, val) {
	return str.replace(/\?/g, val);
}



var initial_count = new Array();
var rows_limit = 0; /*  Set to 0 to disable limitation */

function addRow(table_id,text_value,textarea_value,photo_text,language)
{
  var tbl = document.getElementById(table_id);
  if(tbl==null){
  	alert('You need reload the page.');
	location.reload();
	/* location.href = location.href; */
	/* alert('no '+table_id); */
	return false;
  }
  /*  counting rows in table */
  var rows_count = tbl.rows.length;
  if (initial_count[table_id] == undefined)
  {
    /*  if it is first adding in this table setting initial rows count */
    initial_count[table_id] = rows_count;
  }
  /*  determining real count of added fields */
  if(language=='schinese'){
		var onBlur = 'onBlur="this.value = simplized(this.value)"';
	}else{
		var onBlur = 'onBlur="this.value = traditionalized(this.value)"';
	}

  var tFielsNum =  (rows_count - initial_count[table_id])+2;
  if (rows_limit!=0 && tFielsNum >= rows_limit) return false;
  var text = photo_text+' '+tFielsNum+':';
  var count = rows_count+1;
  var input = '<br><input type="file" name="image_file[]" id="image_file'+count+'" onchange="check_extension(this.value,this.id);"/><br /><br style="line-height:5px;" /><input type="text" '+onBlur+' name="image_title[]" value="'+text_value+'" id="image_title'+count+'" onfocus="value_null(this.id,\''+text_value+'\');" style="width:300px;"/><br /><br style="line-height:5px;" /><textarea name="image_description[]" '+onBlur+' id="image_description'+count+'" style="width:300px;"  onfocus="value_null(this.id,\''+textarea_value+'\');">'+textarea_value+'</textarea>';

  /* alert(input); */
  document.getElementById('total_imgs').value=rows_count+1;
  /* var remove= '<input type="button" value="X" onclick="removeRow(\''+table_id+'\',this.parentNode.parentNode)" style="width:100%;"/>'; */
   var remove ='';
  try {
    var newRow = tbl.insertRow(rows_count);
    var newCell = newRow.insertCell(0);
    newCell.innerHTML = text;
    var newCell = newRow.insertCell(1);
    newCell.innerHTML = input;
    /*var newCell = newRow.insertCell(2);
    newCell.innerHTML = remove; */
  } catch (ex) {
    /* if exception occurs */
    alert(ex);
  }
}

function removeRow(tbl,row)
{
  var table = document.getElementById(tbl);
  try {
    table.deleteRow(row.rowIndex);
  } catch (ex) {
    alert(ex);
  }

}
function value_null(val,originaltext)
{
	if(document.getElementById(val).value==originaltext || document.getElementById(val).value==originaltext)
	{
		document.getElementById(val).value='';
	}
}

function check_extension(val,id,error)
{
var filename = val;
	filename.lastIndexOf(".");
	var front_ext =  filename.substring(filename.lastIndexOf(".")+1,filename.length);
	front_ext  = front_ext.toLowerCase() ;

	if(front_ext == "jpeg" || front_ext == "jpg" || front_ext == "png" || front_ext == "gif" || front_ext == "bmp")
	{
		return true;
	}
	else
	{
		alert(error);
		document.getElementById(id).value= "";
		return false;
	}
}
function upload_submit()
{
	/* alert('here'); */
	document.frmupload.submit();

}
function startUpload(){
      document.getElementById('f1_upload_process').style.visibility = 'visible';
      document.getElementById('f1_upload_form').style.visibility = 'hidden';
      return true;
}

function createRequestObjectEndDateAjax(){
		var request_;
		var browser = navigator.appName;
		if(browser == "Microsoft Internet Explorer"){
		 request_ = new ActiveXObject("Microsoft.XMLHTTP");
		}else{
		 request_ = new XMLHttpRequest();
		}
		return request_;
}

var httpobjajaxenddate = createRequestObjectEndDateAjax();

function search_tour_end_date_ajax(nodays,changedate){
			date_final_split_array = changedate.split("::");
			if(date_final_split_array[0] == ''){
				document.getElementById("div_display_departure_end_date").style.display="none";
				return true;
			}else{
				//�ر�����
				if(typeof(checkInDate)!='undefined'){
					checkInDate.hide();
				}
				if(typeof(checkOutDate)!='undefined'){
					checkOutDate.hide();
				}
				
				httpobjajaxenddate.open('get', 'product_info.php?action=calculate&addnofodays='+nodays+'&selecteddate='+date_final_split_array[0]+'');
				httpobjajaxenddate.onreadystatechange = hendleInfo_search_tour_end_date_ajax;
				httpobjajaxenddate.send(null);
			}
}

function hendleInfo_search_tour_end_date_ajax(){
	if(httpobjajaxenddate.readyState == 4)
	{
	 var response_enddate = httpobjajaxenddate.responseText;
		 if(response_enddate != ''){
			document.getElementById("final_dep_date_div").innerHTML=response_enddate;
			document.getElementById("div_display_departure_end_date").style.display="";
			enddatearr = response_enddate.split(" ");
			var ddatesel = document.getElementById('availabletourdate');
			ddate = ddatesel.options[ddatesel.selectedIndex].text;		
			ddatearr = ddate.split(" ");			
			if(document.getElementById('EarlyHotelCheckoutDateDiv'))document.getElementById('EarlyHotelCheckoutDateDiv').innerHTML = ddate;
			if(document.getElementById('EarlyHotelCheckoutDate'))document.getElementById('EarlyHotelCheckoutDate').value=ddatearr[0];
			if(document.getElementById('LateHotelCheckinDateDiv'))document.getElementById('LateHotelCheckinDateDiv').innerHTML=response_enddate;			
			if(document.getElementById('LateHotelCheckinDate'))document.getElementById('LateHotelCheckinDate').value=enddatearr[0];		
			if(typeof(checkInDate)!='undefined'){
				checkInDate.minDate = new Date();
				checkInDate.maxDate = new Date(Date.parse(ddatearr[0]) - 3600*24);
				checkInDate.makeCalendar(checkInDate.maxDate.getMonth() , checkInDate.maxDate.getFullYear());
			}
			if(typeof(checkOutDate)!='undefined'){
				checkOutDate.minDate = new Date(Date.parse(enddatearr[0])+3600*24);
				checkOutDate.makeCalendar(checkOutDate.minDate.getMonth() , checkOutDate.minDate.getFullYear());
			}
		}else{
			document.getElementById("div_display_departure_end_date").style.display="none";
		}

	}
}

/* today added */
function scrollFunLeft()
{
i++;
if(box.scrollLeft<386)
{
box.scrollLeft+=i;
ts.className="";
}
else
{
clearInterval(t);
i=0;
ts.className="alert";
}
}

function scrollFunRight()
{
i++;
if(box.scrollLeft>0)
{
box.scrollLeft-=i;
ts.className="";
}
else
{
clearInterval(t);
i=0;
ts.className="alert";
}
}
 /* today added */

function closeDivPopSubmit(){
closePopup('popDiv');

var validPopup = new Validation('cart_quantity', {immediate : true,useTitles:true, onFormValidate : formCallback});
var result_check_pop = validPopup.validate();
	if(result_check_pop == true){
		validate();
		document.cart_quantity.submit()
	}
}

/* js ��ʽ�ύBooking �� */
function SubmitCartQuantityFrom(){
	var Valid = new Validation('cart_quantity', {immediate : true,useTitles:true, onFormValidate : formCallback});
	var Result = Valid.validate();
	if(Result == true){
		validate();
		document.cart_quantity.submit()
	}
}

/* Start - Javascript string pad */
var STR_PAD_LEFT = 1;
var STR_PAD_RIGHT = 2;
var STR_PAD_BOTH = 3;
function str_pad(str, len, pad, dir) {
	if (typeof(len) == "undefined") { var len = 0; }
	if (typeof(pad) == "undefined") { var pad = ' '; }
	if (typeof(dir) == "undefined") { var dir = STR_PAD_RIGHT; }
	str=str.toString();

	if (len + 1 >= str.length) {
		switch (dir){
			case STR_PAD_LEFT:
				str = Array(len + 1 - str.length).join(pad) + str;
			break;
			case STR_PAD_BOTH:
				var right = Math.ceil((padlen = len - str.length) / 2);
				var left = padlen - right;
				str = Array(left+1).join(pad) + str + Array(right+1).join(pad);
			break;
			default:
				str = str + Array(len + 1 - str.length).join(pad);
			break;
		} /*  switch */
	}
	return str;
}
/* End - Javascript string pad */

/* �طü�¼����ʾ��ϸ���ݹ��� */
function show_full_reviews(reviews_id){
	var reviews_sub = document.getElementById('reviews_sub_'+ reviews_id);
	var reviews_all = document.getElementById('reviews_all_'+ reviews_id);
	if(reviews_sub!=null){
		if(reviews_sub.style.display == ""){
			reviews_sub.style.display = "none";
		}else{
			reviews_sub.style.display = "";
		}
	}

	if(reviews_all!=null){
		if(reviews_all.style.display == "none"){
			reviews_all.style.display = "";
		}else{
			reviews_all.style.display = "none";
		}
	}
}


/* ����û�Ԥ������������ʾ��Ϣ */

function check_remaining_seats(){
	
    
	var old_time = new Date().getTime();
	
	var form_obj = document.getElementById("cart_quantity");
    var msg_check_submit = document.getElementById("check_remaining_seats_td");

	var room_num = form_obj.elements["numberOfRooms"];
	if(typeof(room_num)=="undefined"){
		return false;
	}
	loop_num = room_num.value;
	if(room_num.value==16){	/* ���ͬ�δ��� */
		loop_num = 1;
	}
	var total_adult =0;
	for(var i=0;i<loop_num;i++){
		total_adult=total_adult+Number(form_obj.elements['room-' + i + '-adult-total'].value);

	}
	for(var j=0;j<loop_num;j++){
		total_adult=total_adult+Number(form_obj.elements['room-' + j + '-child-total'].value);

	}
	var products_id = form_obj.elements["products_id"].value;
	var departure_time = document.getElementById("availabletourdate").value;
	departure_time=departure_time.split("::");
	var departure_date=departure_time[0];
	if(departure_date!=''){
		var CheckRemainingSeatsBuy = document.getElementById("check_remaining_seats_buy");
		if(document.all){
			CheckRemainingSeatsBuy.onmousemove=Function('');
		}else{
			CheckRemainingSeatsBuy.setAttribute('onmousemove','');
		}
		var url ="check_neworder_remaining_seats.php?total_adult="+total_adult+"&products_id="+products_id+"&departure_date="+departure_date;
		ajax.open('GET',url,true);
		ajax.onreadystatechange = function(){
			if (ajax.readyState == 4 && ajax.status == 200){
				var new_time = new Date().getTime();
				/* alert(new_time-old_time); */
				if(ajax.responseText.search(/book_now_out/)!=-1){
					var error_msn = "����ʣ����λС�ڶ�������,��ѡ�������ڵ���";
									document.getElementById("notice_remaining_seats_div").innerHTML ="<b>"+error_msn+"</b>";
									document.getElementById("div_display_notice_remaining_seats").style.display="";
								   
									msg_check_submit.innerHTML = ajax.responseText;
									if(document.all){
										document.getElementById("check_remaining_seats_cart").onclick=Function('');
									}else{
										document.getElementById("check_remaining_seats_cart").setAttribute('onclick','');
									}
								   
								   /*  document.getElementById("check_remaining_seats_cart_img").setAttribute('src','image/buttons/tchinese/shopping-cart-button-out.gif'); */
	
							}else{
	
									document.getElementById("div_display_notice_remaining_seats").style.display="none";
									msg_check_submit.innerHTML = ajax.responseText;
									
									if(document.all){
										document.getElementById("check_remaining_seats_cart").onclick=Function('AddToCart()');
									}else{
										document.getElementById("check_remaining_seats_cart").setAttribute('onclick','AddToCart()');
									}
									/* document.getElementById("check_remaining_seats_cart_img").setAttribute('src','image/buttons/tchinese/shopping-cart-button.gif'); */
				}
			}
	
		}
	ajax.send(null);
    }
}

/* �����Ƿ����õ�ͶƱ */
function SetAsGoodComment(reviews_id, good_or_bad){
	if(reviews_id<1 || (good_or_bad!="good" && good_or_bad!="bad") ){ return false;}
	var url = url_ssl("http://test.usitrip.com/product_reviews_tabs_ajax.php?ajax=true&action=SetAsGoodComment&reviews_id="+reviews_id+"&good_or_bad="+good_or_bad);
	ajax_get_submit(url,"","","");
}

	/*��Ʒѡ��ѡ����*/
	function SetShowSteps2(products_options_id){
		var From = document.getElementById("cart_quantity");
		if(From==null){ alert("cart_quantity no find.");}
		var box_html = "";
		if(typeof(From.elements["id[" +products_options_id+ "]"])!="undefined" && From.elements["id[" +products_options_id+ "]"].length){
			var _radios = From.elements["id[" +products_options_id+ "]"];
			for(var i=0; i< _radios.length; i++){
				if(_radios[i].type=="radio" && _radios[i].checked == true){
					var em_id = "#id_"+products_options_id+'__'+ _radios[i].value;
					box_html = jQuery(em_id).html();
					break;
				}
			}
		}else if(From.elements["id[" +products_options_id+ "]"].type=="select-one"){
			box_html = jQuery(From.elements["id[" +products_options_id+ "]"]).find("option:selected").text();
		}else if(From.elements["id[" +products_options_id+ "]"].type=="radio"){
			From.elements["id[" +products_options_id+ "]"].checked = true;
			var em_id = "#id_"+products_options_id+'__'+ From.elements["id[" +products_options_id+ "]"].value;
			box_html = jQuery(em_id).html();
		}
		
		if(box_html!=""){
			jQuery("#TextBox_ProductsOptions"+products_options_id).html(box_html);
		}
		jQuery("#ProductsOptions_"+products_options_id).hide();
		jQuery("#ConTitleA_ProductsOptions"+products_options_id).html('���޸�');
		
		auto_update_budget();
	}
	function SetShowDepartureLocationsBox(){
		var From = document.getElementById("cart_quantity");
		if(From==null){ alert("cart_quantity no find.");}
		if(typeof(From.elements["departurelocation"])!="undefined" && From.elements["departurelocation"].length){
			var _radios = From.elements["departurelocation"];
			box_html = "";
			for(var i=0; i< _radios.length; i++){
				if(_radios[i].type=="radio" && _radios[i].checked == true){
					var em_id = '#departurelocation_em_'+ (i+1);
					box_html = jQuery(em_id).html();
					break;
				}
			}
			
		}else if(From.elements["departurelocation"].type=="select-one"){
			box_html = jQuery(_radios).find("option:selected").text();
		}else if(From.elements["departurelocation"].type=="radio"){
			From.elements["departurelocation"].checked = true;
			var em_id = '#departurelocation_em_'+ 1;
			box_html = jQuery(em_id).html();
		}

		if(box_html!=""){
			jQuery("#TextBox_departurelocations").html(box_html);
		}
		jQuery("#departurelocations").hide();
		jQuery("#ConTitleA_departurelocations").html('���޸�');
		auto_update_budget();
		
	}
	/*��ʾ������Ϣ��ShowSteps3*/
	function SetShowSteps3(){
		var From = document.getElementById("cart_quantity");
		if(From==null){ alert("cart_quantity no find.");}
		var numberOfRoomsSelect = From.elements["numberOfRooms"];
		var loop_num = 1;

		if( typeof(numberOfRoomsSelect)!="undefined"  && numberOfRoomsSelect!=null){
			loop_num = numberOfRoomsSelect.value;			
			if(numberOfRoomsSelect.value==16){
				loop_num = 1;
			}
		}
		var Steps3Html = '';
		var addRoomTitle = false;
		if(jQuery("#ConTitle_hot-search-params h2").text() == "����������ѡ��"){
			addRoomTitle = true ;
		}
		
		for(var i=0; i<loop_num; i++){
			
			Steps3Html +='<dl>';
			if(addRoomTitle == true){
				Steps3Html +='<dt>'+ jQuery("#room-"+i+"-left-title").text() +'</dt>';
				//Steps3Html +='<dd onclick="SetPopBox(&quot;hot-search-params&quot;);">';
			}
			Steps3Html +='<dd><label>���ˣ� </label>'+ From.elements["room-" +i+ "-adult-total"].value +'��</dd>';		
			
			if(From.elements["room-" +i+ "-child-total"].value > 0){ 					
				Steps3Html +='<dd><label>С��: </label>'+ From.elements["room-" +i+ "-child-total"].value +'��</dd>';			
			 }
			if(typeof(From.elements["room-" +i+ "-bed"])!="undefined"){
				Steps3Html +='<dd class="size"><label>����: </label>'+ jQuery(From.elements["room-" +i+ "-bed"]).find("option:selected").text() +'</dd>';
			}
			/* <div class="price"><label>���: </label><span>$150.00</span></div> */
			Steps3Html +='</dd>';
			Steps3Html +='</dl>';
		}
		
		jQuery("#ShowSteps3").html(Steps3Html);
		jQuery("#ConTitleA_hot-search-params").html('���޸�');
		jQuery("#hot-search-params").hide();
		auto_update_budget();
	}
	
	/* �Զ�����Ԥ��۸���Ϣ */
	function auto_update_budget(){
		jQuery("#price_ajax_response").css({"display":"none"});
		return sendFormData('cart_quantity','http://test.usitrip.com/budget_calculation_ajax.php?action_calculate_price=true&products_id=322','price_ajax_response','true');
	}
	
    function getValueChinese(str, val) {

        return str.replace(/\?/g, val);
    }

/* //�ı��Ʒѡ������ѡ����ʽ */
function onclick_products_options(obj){
	/* jQuery(".choosePop tr").removeClass("trClick"); */
	jQuery(obj).parent().find("tr").removeClass("trClick");
	jQuery(obj).addClass("trClick");
}
function onclick_set_p_class(obj){
	jQuery(obj).parent().parent().parent().find("p").removeClass("pClick");
	jQuery(obj).addClass("pClick");
}
/*
 *�ύAJAX����
 * vincent
 */
function vin_ajax_post(form_id,callback_json){	
	var formObj = jQuery('#'+form_id);
	var actionUrl = formObj.attr('action');
	var From = from_obj;
	var url = url_ssl("http://test.usitrip.com/tour_question_write.php?ajax=true&action=process&aryFormData=1&products_id=322");
	var form_id = from_obj;
	var success_msm="";
	var success_go_to="";
	var replace_id="";
	ajax_post_submit(url,form_id,success_msm,success_go_to, replace_id);
}


function cleanAllCruisesOptionForBookingBox(){
		jQuery('input[id^="radioid_"]').attr("checked", false);
	}

//var data = ;
/**
 * ����������
 * @param element string ���ɵ�������ʾ���ĸ������У�������ID��
 * @param inputTxt string �û�ѡ��ĳ���ں�������ʾ���ĸ��������
 * @param data JSON �����Ӧ���ڵ�һЩ��Ϣ
 * var data = {
 *	 "2012": {
 *		 "2": {
 *			 "18": {"p": "<span class=\"green\">\u5145\u8db3<\/span> $189\u8d77","detail": {"single":{"title":"\u6210\u4eba","text":"$2,500.00"},"kids":{"title":"\u5c0f\u5b69","text":"$800.00"}}},
 *			 "22": {...}
 *		 }...
 *	 }
 * }
 * var data = {"���":{"��":{"��":{"p":"�����¸�����ʾ����Ϣ","detail":{...}}}}};
 */
function lwkCalendar(element,inputTxt,data){
	this.caption = {
		'month' : '�·�',
		'week'  : ['������','����һ','���ڶ�','������','������','������','������']
	};
	this.innerObj = null;
	this.MonHead = [31,28,31,30,31,30,31,31,30,31,30,31];//����������ÿ���µ������
	this.L_WDay = new Array(42);//����д���ڵ���
	this.liWidth = '0px';
	this.toolBar = null;
	this.conTxt = null;
	this.prevBtn = null;
	this.nextBtn = null;
	this.yearTxt = null; //��ʾ��ǰ���µĶ���
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
		
		this.prevBtn = document.createElement('span'); //�������°�ť
		this.prevBtn.className = 'prev';
		//this.prevBtn.innerHTML = "����";
		this.prevBtn.onclick = function(){me.prev()};
		this.toolBar.appendChild(this.prevBtn);
		
		this.yearTxt = document.createElement("div"); //�м���ʾ����
		this.yearTxt.className = 'yearTitle';
		this.yearTxt.style.cssText = 'line-height:20px;text-align:center;';
		//this.yearTxt.innerHTML = "2012��<br/>2��";
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
	isPinYear : function(year){            //�ж��Ƿ���ƽ��
    	return (0==year%4&&((year%100!=0)||(year%400==0))) ? true : false;
  	},
	getMonthCount:function(year,month){  //�������Ϊ29��
    	var c=this.MonHead[month-1];
		if((month == 2) && this.isPinYear(year)) c++;
		return c;
  	},

	detail : function (detail) {
		var rtn = '',j=0;
		if (detail != undefined && detail != '' && detail != null){
			if (detail.constructor == Array || detail.constructor == Object) {
				for (var items in detail) {
					rtn += '<td><span style="width:' + this.liWidth + ';"><nobr>' + detail[items]['title'] + '<\/nobr><\/span><em>' + detail[items]['text'] + '/��<\/em><\/td>';
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
	 * ��JSON������������������������������
	 * @param year  ���
	 * @param month �·�
	 * @param data  JSON����
	 */
	setDay : function(year,month,data){
	
		/* ������ⲿ�������� */
		var yy = (year == undefined ? this.year : year);
		var mm = (month == undefined ? this.month : month);
		var data = data; //�ȼ����û����˲�������
		if (data == undefined) { //  ���û�� ���ԭ���Ĵ���������
			if (this.data[this.year] != undefined && this.data[this.year][this.month] != undefined) {
				for(day in this.data[this.year][this.month]) {
					data = this.data[this.year][this.month][day];
					break;
				}
			}
		}
		
		var yy = this.year,mm = this.month;
		this.yearTxt.innerHTML = yy + '��<br/>' + mm + '��';
		for (var i = 0; i < 42; i++){this.L_WDay[i]=""};  //���֮ǰ������
		var prevMDC = (new Date(yy,mm-1,1)).getDay(); //ĳ�µ�һ������ڼ�
		var day1 =1,day2 = 1; //day2 ������ʾ�������ڵĿ�ʼ���ں�
		//�ϸ��µ������
		for (i = 0; i < prevMDC; i++) 
			this.L_WDay[i] = "<li class='disable' style='width:" + this.liWidth + "'>" + (this.getMonthCount(mm == 1 ? yy - 1 : yy, mm == 1 ? 12 : mm - 1) - prevMDC + i + 1) + "</li>" ;
		//���µ�����	
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
				if (p > 0) { // ����۸�Ϊ�� ���첻������ʾ
					this.L_WDay[i] = "<li index='" + i + "' d='" + day1 + "' style='width:" + this.liWidth + "'><div class='pop' style='display:none'>" + this.detail(temp.detail) + "<\/div>" + day1 + '<em>' + temp.p + '</em></li>';
				} else {
					this.L_WDay[i] = "<li class='disable' style='width:" + this.liWidth + "'>" + day1 + '<em></em></li>';	
				}
			}
			day1++;
		}
		//��������ʾ���¼�������
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



<!--product_info.js end-->