/*
 * author YHB
 * createTime 2014/05/16
 * 基于事件开发,利用事件驱动
 * 手机号码组件
 */
  
 (function(){
	Usitrip.ns('usitrip.staticResource');
	usitrip.staticResource.areaBgPosition = usitrip.staticResource.areaBgPosition || {1:"0px -44px",7:"0px -660px",20:"0px -2201px",27:"0px -2355px",30:"0px -165px",31:"0px -1441px",32:"0px 0px",33:"0px -1012px",34:"0px -1155px",36:"0px -682px",39:"0px -143px",40:"0px -671px",41:"0px -1320px",43:"0px -1331px",44:"0px -55px",45:"0px -1386px",46:"0px -385px",47:"0px -836px",48:"0px -1177px",49:"0px -2509px",51:"0px -946px",52:"0px -2024px",53:"0px -748px",54:"0px -2377px",55:"0px -770px",56:"0px -1342px",57:"0px -330px",58:"0px -1056px",60:"0px -1870px",61:"0px -1716px",62:"0px -1958px",63:"0px -1815px",64:"0px -1540px",65:"0px -22px",66:"0px -957px",81:"0px -429px",82:"0px -2245px",84:"0px -968px",86:"0px -825px",90:"0px -1606px",91:"0px -1694px",92:"0px -2035px",93:"0px -2311px",94:"0px -2641px",95:"0px -11px",98:"0px -2013px",211:"0px -2741px",212:"0px -2333px",213:"0px -528px",216:"0px -539px",218:"0px -132px",220:"0px -627px",221:"0px -2134px",222:"0px -253px",223:"0px -2520px",224:"0px -2575px",225:"0px -1661px",226:"0px -726px",227:"0px -550px",228:"0px -605px",229:"0px -1298px",230:"0px -2179px",231:"0px -2068px",232:"0px -737px",233:"0px -2112px",234:"0px -2476px",235:"0px -814px",236:"0px -1837px",237:"0px -2057px",238:"0px -2652px",239:"0px -2388px",240:"0px -1507px",241:"0px -880px",242:"0px -1793px",243:"0px -1518px",244:"0px -1947px",245:"0px -1925px",246:"0px -55px",247:"0px -55px",248:"0px -1045px",249:"0px -352px",250:"0px -2674px",251:"0px -2443px",252:"0px -1364px",253:"0px -2101px",254:"0px -2630px",255:"0px -2289px",256:"0px -1166px",257:"0px -1892px",258:"0px -638px",260:"0px -1595px",261:"0px -1287px",262:"0px -264px",263:"0px -2046px",264:"0px -1881px",265:"0px -2145px",266:"0px -2190px",267:"0px -2707px",268:"0px -2278px",269:"0px -1430px",290:"0px -495px",291:"0px -715px",297:"0px -792px",298:"0px -1111px",299:"0px -1760px",350:"0px -275px",351:"0px -517px",352:"0px -1474px",353:"0px -1969px",354:"0px -1991px",355:"0px -1034px",356:"0px -1551px",357:"0px -561px",358:"0px -1903px",359:"0px -2586px",370:"0px -1122px",371:"0px -1936px",372:"0px -2410px",373:"0px -2685px",374:"0px -176px",375:"0px -1100px",376:"0px -594px",377:"0px -913px",378:"0px -2123px",379:"0px -2322px",380:"0px -2002px",381:"0px -2465px",382:"0px -2167px",385:"0px -902px",386:"0px -1221px",387:"0px -1584px",389:"0px -1353px",420:"0px -2256px",421:"0px -2212px",423:"0px -979px",500:"0px -2762px",501:"0px -484px",502:"0px -935px",503:"0px -1639px",504:"0px -2156px",505:"0px -154px",506:"0px -2090px",507:"0px -847px",508:"0px -1078px",509:"0px -319px",590:"0px -1012px",591:"0px -1650px",592:"0px -803px",593:"0px -1188px",594:"0px -2234px",595:"0px -2344px",596:"0px -198px",597:"0px -2663px",598:"0px -2608px",599:"0px -2729px",670:"0px -2784px",673:"0px -1683px",674:"0px -1749px",675:"0px -1485px",676:"0px -1089px",677:"0px -1067px",678:"0px -1265px",679:"0px -1859px",680:"0px -231px",681:"0px -1012px",682:"0px -2267px",683:"0px -2079px",685:"0px -2300px",686:"0px -374px",687:"0px -1276px",688:"0px -286px",689:"0px -1705px",690:"0px -2751px",691:"0px -1738px",692:"0px -1144px",850:"0px -1804px",852:"0px -2696px",853:"0px -2597px",855:"0px -242px",856:"0px -451px",880:"0px -1771px",886:"0px -506px",960:"0px -616px",961:"0px -1254px",962:"0px -1463px",963:"0px -1826px",964:"0px -649px",965:"0px -2487px",966:"0px -33px",967:"0px -1672px",968:"0px -2454px",970:"0px -1199px",971:"0px -2223px",972:"0px -341px",973:"0px -1496px",974:"0px -462px",975:"0px -1848px",976:"0px -2553px",977:"0px -110px",992:"0px -187px",993:"0px -2542px",994:"0px -1243px",995:"0px -858px",996:"0px -1617px",998:"0px -1001px",1242:"0px -363px",1246:"0px -1573px",1264:"0px -1980px",1268:"0px -869px",1284:"0px -1408px",1340:"0px -1782px",1345:"0px -308px",1441:"0px -1914px",1473:"0px -2399px",1649:"0px -1309px",1664:"0px -583px",1671:"0px -2366px",1684:"0px -1562px",1721:"0px -2773px",1758:"0px -1397px",1767:"0px -2432px",1784:"0px -2619px",1787:"0px -473px",1809:"0px -1529px",1868:"0px -440px",1869:"0px -99px",1876:"0px -1727px",6723:"0px -209px"};
	
	

	usitrip.staticResource.hotArea = ['中国','美国','加拿大'];

	usitrip.staticResource.specialArea=[{code:1,zh:'美国',position:"0px -44px"},{code:1,zh:'加拿大',position:"0px -1375px"},{code:1,zh:'北马里亚纳群岛',position:"0px -704px"},{code:7,zh:"俄罗斯",position:"0px -660px"},{code:7,zh:"哈萨克斯坦",position:"0px -1210px"},{code:590,zh:'圣巴泰勒米',position:"0px -1012px"},{code:590,zh:'法属圣马丁',position:"0px -55px"},{code:590,zh:'瓜德罗普',position:"0px -407px"},{code:599,zh:'库拉索',position:"0px -2729px"},{code:599,zh:'荷兰加勒比区',position:"0px -2719px"}];
	
	
	usitrip.staticResource.areaData= usitrip.staticResource.areaData || [{code:86,zh:"中国",en:"China"},{code:1,zh:"美国",en:"(United"},{code:7,zh:"俄罗斯",en:"(Россия)"},{code:355,zh:"阿尔巴尼亚",en:"(Shqipëri)"},{code:213,zh:"阿尔及利亚",en:"(‫الجزائر‬‎)"},{code:93,zh:"阿富汗",en:"(‫افغانستان‬‎)"},{code:54,zh:"阿根廷",en:"(Argentina)"},{code:971,zh:"阿拉伯联合酋长国",en:"(‫الإمارات"},{code:297,zh:"阿鲁巴",en:"(Aruba)"},{code:968,zh:"阿曼",en:"(‫عُمان‬‎)"},{code:994,zh:"阿塞拜疆",en:"(Azərbaycan)"},{code:247,zh:"阿森松岛",en:"(Ascension"},{code:20,zh:"埃及",en:"(‫مصر‬‎)"},{code:251,zh:"埃塞俄比亚",en:"(Ethiopia)"},{code:353,zh:"爱尔兰",en:"(Ireland)"},{code:372,zh:"爱沙尼亚",en:"(Eesti)"},{code:376,zh:"安道尔",en:"(Andorra)"},{code:244,zh:"安哥拉",en:"(Angola)"},{code:1264,zh:"安圭拉",en:"(Anguilla)"},{code:1268,zh:"安提瓜和巴布达",en:"(Antigua"},{code:43,zh:"奥地利",en:"(Österreich)"},{code:61,zh:"澳大利亚",en:"(Australia)"},{code:853,zh:"澳门",en:"(澳門)"},{code:1246,zh:"巴巴多斯",en:"(Barbados)"},{code:675,zh:"巴布亚新几内亚",en:"(Papua"},{code:1242,zh:"巴哈马",en:"(Bahamas)"},{code:92,zh:"巴基斯坦",en:"(‫پاکستان‬‎)"},{code:595,zh:"巴拉圭",en:"(Paraguay)"},{code:970,zh:"巴勒斯坦",en:"(‫فلسطين‬‎)"},{code:973,zh:"巴林",en:"(‫البحرين‬‎)"},{code:507,zh:"巴拿马",en:"(Panamá)"},{code:55,zh:"巴西",en:"(Brasil)"},{code:375,zh:"白俄罗斯",en:"(Беларусь)"},{code:1441,zh:"百慕大",en:"(Bermuda)"},{code:359,zh:"保加利亚",en:"(България)"},{code:1,zh:"北马里亚纳群岛",en:"(Northern"},{code:229,zh:"贝宁",en:"(Bénin)"},{code:32,zh:"比利时",en:"(België)"},{code:354,zh:"冰岛",en:"(Ísland)"},{code:591,zh:"玻利维亚",en:"(Bolivia)"},{code:1787,zh:"波多黎各",en:"(Puerto"},{code:48,zh:"波兰",en:"(Polska)"},{code:387,zh:"波斯尼亚和黑塞哥维那",en:"(Босна"},{code:267,zh:"博茨瓦纳",en:"(Botswana)"},{code:501,zh:"伯利兹",en:"(Belize)"},{code:975,zh:"不丹",en:"(འབྲུག)"},{code:226,zh:"布基纳法索",en:"(Burkina"},{code:257,zh:"布隆迪",en:"(Uburundi)"},{code:850,zh:"朝鲜",en:"(조선"},{code:240,zh:"赤道几内亚",en:"(Guinea"},{code:45,zh:"丹麦",en:"(Danmark)"},{code:49,zh:"德国",en:"(Deutschland)"},{code:670,zh:"东帝汶",en:"(Timor-Leste)"},{code:228,zh:"多哥",en:"(Togo)"},{code:1809,zh:"多米尼加共和国",en:"(República"},{code:1767,zh:"多米尼克",en:"(Dominica)"},{code:593,zh:"厄瓜多尔",en:"(Ecuador)"},{code:291,zh:"厄立特里亚",en:"(Eritrea)"},{code:33,zh:"法国",en:"(France)"},{code:298,zh:"法罗群岛",en:"(Føroyar)"},{code:689,zh:"法属波利尼西亚",en:"(Polynésie"},{code:594,zh:"法属圭亚那",en:"(Guyane"},{code:590,zh:"法属圣马丁",en:"(Saint-Martin"},{code:63,zh:"菲律宾",en:"(Philippines)"},{code:358,zh:"芬兰",en:"(Suomi)"},{code:238,zh:"佛得角",en:"(Kabu"},{code:500,zh:"福克兰群岛",en:"(Falkland"},{code:220,zh:"冈比亚",en:"(Gambia)"},{code:242,zh:"刚果（布）",en:"(Congo-Brazzaville)"},{code:243,zh:"刚果（金）",en:"(Jamhuri"},{code:57,zh:"哥伦比亚",en:"(Colombia)"},{code:506,zh:"哥斯达黎加",en:"(Costa"},{code:1473,zh:"格林纳达",en:"(Grenada)"},{code:299,zh:"格陵兰",en:"(Kalaallit"},{code:995,zh:"格鲁吉亚",en:"(საქართველო)"},{code:53,zh:"古巴",en:"(Cuba)"},{code:590,zh:"瓜德罗普",en:"(Guadeloupe)"},{code:1671,zh:"关岛",en:"(Guam)"},{code:592,zh:"圭亚那",en:"(Guyana)"},{code:7,zh:"哈萨克斯坦",en:"(Казахстан)"},{code:509,zh:"海地",en:"(Haiti)"},{code:82,zh:"韩国",en:"(대한민국)"},{code:31,zh:"荷兰",en:"(Nederland)"},{code:599,zh:"荷兰加勒比区",en:"(Caribbean"},{code:1721,zh:"荷属圣马丁",en:"(Sint"},{code:382,zh:"黑山共和国",en:"(Crna"},{code:504,zh:"洪都拉斯",en:"(Honduras)"},{code:686,zh:"基里巴斯",en:"(Kiribati)"},{code:253,zh:"吉布提",en:"(Djibouti)"},{code:996,zh:"吉尔吉斯斯坦",en:"(Кыргызстан)"},{code:224,zh:"几内亚",en:"(Guinée)"},{code:245,zh:"几内亚比绍",en:"(Guiné"},{code:1,zh:"加拿大",en:"(Canada)"},{code:233,zh:"加纳",en:"(Gaana)"},{code:241,zh:"加蓬",en:"(Gabon)"},{code:855,zh:"柬埔寨",en:"(កម្ពុជា)"},{code:420,zh:"捷克共和国",en:"(Česká"},{code:263,zh:"津巴布韦",en:"(Zimbabwe)"},{code:237,zh:"喀麦隆",en:"(Cameroun)"},{code:974,zh:"卡塔尔",en:"(‫قطر‬‎)"},{code:1345,zh:"开曼群岛",en:"(Cayman"},{code:269,zh:"科摩罗",en:"(‫جزر"},{code:225,zh:"科特迪瓦",en:"(Côte"},{code:965,zh:"科威特",en:"(‫الكويت‬‎)"},{code:385,zh:"克罗地亚",en:"(Hrvatska)"},{code:254,zh:"肯尼亚",en:"(Kenya)"},{code:682,zh:"库克群岛",en:"(Cook"},{code:599,zh:"库拉索",en:"(Curaçao)"},{code:371,zh:"拉脱维亚",en:"(Latvija)"},{code:266,zh:"莱索托",en:"(Lesotho)"},{code:856,zh:"老挝",en:"(ລາວ)"},{code:961,zh:"黎巴嫩",en:"(‫لبنان‬‎)"},{code:231,zh:"利比里亚",en:"(Liberia)"},{code:218,zh:"利比亚",en:"(‫ليبيا‬‎)"},{code:370,zh:"立陶宛",en:"(Lietuva)"},{code:423,zh:"列支敦士登",en:"(Liechtenstein)"},{code:262,zh:"留尼汪",en:"(La"},{code:352,zh:"卢森堡",en:"(Luxembourg)"},{code:250,zh:"卢旺达",en:"(Rwanda)"},{code:40,zh:"罗马尼亚",en:"(România)"},{code:261,zh:"马达加斯加",en:"(Madagasikara)"},{code:356,zh:"马耳他",en:"(Malta)"},{code:960,zh:"马尔代夫",en:"(Maldives)"},{code:265,zh:"马拉维",en:"(Malawi)"},{code:60,zh:"马来西亚",en:"(Malaysia)"},{code:223,zh:"马里",en:"(Mali)"},{code:389,zh:"马其顿",en:"(Македонија)"},{code:692,zh:"马绍尔群岛",en:"(Marshall"},{code:596,zh:"马提尼克",en:"(Martinique)"},{code:230,zh:"毛里求斯",en:"(Moris)"},{code:222,zh:"毛里塔尼亚",en:"(‫موريتانيا‬‎)"},{code:1684,zh:"美属萨摩亚",en:"(American"},{code:1340,zh:"美属维京群岛",en:"(U.S."},{code:976,zh:"蒙古",en:"(Монгол)"},{code:1664,zh:"蒙特塞拉特",en:"(Montserrat)"},{code:880,zh:"孟加拉国",en:"(বাংলাদেশ)"},{code:51,zh:"秘鲁",en:"(Perú)"},{code:691,zh:"密克罗尼西亚",en:"(Micronesia)"},{code:95,zh:"缅甸",en:"(မြန်မာ)"},{code:373,zh:"摩尔多瓦",en:"(Republica"},{code:212,zh:"摩洛哥",en:"(‫المغرب‬‎)"},{code:377,zh:"摩纳哥",en:"(Monaco)"},{code:258,zh:"莫桑比克",en:"(Moçambique)"},{code:52,zh:"墨西哥",en:"(México)"},{code:264,zh:"纳米比亚",en:"(Namibië)"},{code:27,zh:"南非",en:"(South"},{code:211,zh:"南苏丹",en:"(‫جنوب"},{code:977,zh:"尼泊尔",en:"(नेपाल)"},{code:505,zh:"尼加拉瓜",en:"(Nicaragua)"},{code:227,zh:"尼日尔",en:"(Nijar)"},{code:234,zh:"尼日利亚",en:"(Nigeria)"},{code:683,zh:"纽埃",en:"(Niue)"},{code:47,zh:"挪威",en:"(Norge)"},{code:6723,zh:"诺福克岛",en:"(Norfolk"},{code:680,zh:"帕劳",en:"(Palau)"},{code:351,zh:"葡萄牙",en:"(Portugal)"},{code:81,zh:"日本",en:"undefined"},{code:46,zh:"瑞典",en:"(Sverige)"},{code:41,zh:"瑞士",en:"(Schweiz)"},{code:503,zh:"萨尔瓦多",en:"(El"},{code:685,zh:"萨摩亚",en:"(Samoa)"},{code:381,zh:"塞尔维亚",en:"(Србија)"},{code:232,zh:"塞拉利昂",en:"(Sierra"},{code:221,zh:"塞内加尔",en:"(Sénégal)"},{code:357,zh:"塞浦路斯",en:"(Κύπρος)"},{code:248,zh:"塞舌尔",en:"(Seychelles)"},{code:966,zh:"沙特阿拉伯",en:"(‫المملكة"},{code:590,zh:"圣巴泰勒米",en:"(Saint-Barthélemy)"},{code:239,zh:"圣多美和普林西比",en:"(São"},{code:290,zh:"圣赫勒拿",en:"(Saint"},{code:1869,zh:"圣基茨和尼维斯",en:"(Saint"},{code:1758,zh:"圣卢西亚",en:"(Saint"},{code:378,zh:"圣马力诺",en:"(San"},{code:508,zh:"圣皮埃尔和密克隆群岛",en:"(Saint-Pierre-et-Miquelon)"},{code:1784,zh:"圣文森特和格林纳丁斯",en:"(St."},{code:94,zh:"斯里兰卡",en:"(ශ්‍රී"},{code:421,zh:"斯洛伐克",en:"(Slovensko)"},{code:386,zh:"斯洛文尼亚",en:"(Slovenija)"},{code:268,zh:"斯威士兰",en:"(Swaziland)"},{code:249,zh:"苏丹",en:"(‫السودان‬‎)"},{code:597,zh:"苏里南",en:"(Suriname)"},{code:252,zh:"索马里",en:"(Soomaaliya)"},{code:677,zh:"所罗门群岛",en:"(Solomon"},{code:992,zh:"塔吉克斯坦",en:"(Tajikistan)"},{code:886,zh:"台湾",en:"(台灣)"},{code:66,zh:"泰国",en:"(ไทย)"},{code:255,zh:"坦桑尼亚",en:"(Tanzania)"},{code:676,zh:"汤加",en:"(Tonga)"},{code:1649,zh:"特克斯和凯科斯群岛",en:"(Turks"},{code:1868,zh:"特立尼达和多巴哥",en:"(Trinidad"},{code:216,zh:"突尼斯",en:"(‫تونس‬‎)"},{code:688,zh:"图瓦卢",en:"(Tuvalu)"},{code:90,zh:"土耳其",en:"(Türkiye)"},{code:993,zh:"土库曼斯坦",en:"(Turkmenistan)"},{code:690,zh:"托克劳",en:"(Tokelau)"},{code:681,zh:"瓦利斯和富图纳",en:"(Wallis"},{code:678,zh:"瓦努阿图",en:"(Vanuatu)"},{code:502,zh:"危地马拉",en:"(Guatemala)"},{code:58,zh:"委内瑞拉",en:"(Venezuela)"},{code:673,zh:"文莱",en:"(Brunei)"},{code:256,zh:"乌干达",en:"(Uganda)"},{code:380,zh:"乌克兰",en:"(Україна)"},{code:598,zh:"乌拉圭",en:"(Uruguay)"},{code:998,zh:"乌兹别克斯坦",en:"(Oʻzbekiston)"},{code:34,zh:"西班牙",en:"(España)"},{code:30,zh:"希腊",en:"(Ελλάδα)"},{code:852,zh:"香港",en:"undefined"},{code:65,zh:"新加坡",en:"(Singapore)"},{code:687,zh:"新喀里多尼亚",en:"(Nouvelle-Calédonie)"},{code:64,zh:"新西兰",en:"(New"},{code:36,zh:"匈牙利",en:"(Magyarország)"},{code:963,zh:"叙利亚",en:"(‫سوريا‬‎)"},{code:1876,zh:"牙买加",en:"(Jamaica)"},{code:374,zh:"亚美尼亚",en:"(Հայաստան)"},{code:967,zh:"也门",en:"(‫اليمن‬‎)"},{code:964,zh:"伊拉克",en:"(‫العراق‬‎)"},{code:98,zh:"伊朗",en:"(‫ایران‬‎)"},{code:972,zh:"以色列",en:"(‫ישראל‬‎)"},{code:39,zh:"意大利",en:"(Italia)"},{code:91,zh:"印度",en:"(भारत)"},{code:62,zh:"印度尼西亚",en:"(Indonesia)"},{code:44,zh:"英国",en:"(United"},{code:1284,zh:"英属维京群岛",en:"(British"},{code:246,zh:"英属印度洋领地",en:"(British"},{code:962,zh:"约旦",en:"(‫الأردن‬‎)"},{code:84,zh:"越南",en:"(Việt"},{code:260,zh:"赞比亚",en:"(Zambia)"},{code:235,zh:"乍得",en:"(Tchad)"},{code:350,zh:"直布罗陀",en:"(Gibraltar)"},{code:56,zh:"智利",en:"(Chile)"},{code:236,zh:"中非共和国",en:"(République"},{code:674,zh:"瑙鲁",en:"(Nauru)"},{code:379,zh:"梵蒂冈",en:"(Città"},{code:679,zh:"斐济",en:"(Fiji)"}];
	

	usitrip.staticResource.hots = usitrip.staticResource.hots || [];
	usitrip.staticResource.common = usitrip.staticResource.common || [];
	usitrip.staticResource.codes = usitrip.staticResource.codes || [];
	
	if(usitrip.staticResource.codes.length > 0){
		return ;
	}
	
	for(var i=0,len=usitrip.staticResource.areaData.length;i<len;i++){
		var area =usitrip.staticResource.areaData[i];
		var code = area['code'],
			name = area['zh'];
		usitrip.staticResource.codes.push(code);
		if(usitrip.staticResource.hotArea.indexOf(name) > -1){
			usitrip.staticResource.hots.push(area);
		} else {
			usitrip.staticResource.common.push(area);
		}
	}
	
})();
 
(function(){
	
	Usitrip.ns('usitrip.widget');
	
	usitrip.widget.MobilePhoneField = function(config){
		
		usitrip.widget.MobilePhoneField.superclass.constructor.apply(this, arguments);
		
		this.addEvents('beforerender', 'afterrender');
		this.initComponent(config);
	}
	
	Usitrip.extend(usitrip.widget.MobilePhoneField, usitrip.event.UsitripEvent, {
		
		/**
		 * 将该组件渲染到的el节点下
		 * el {String}
		 */
		el: '',
		
		/**
		 * 手机号码选择组件中手机号码input的name属性
		 * name {String}
		 */
		name: 'mobilephone',
		
		/**
		 * 热点国家的class名
		 * @private
		 * hotClazz {String}
		 */
		hotClazz: 'hot',
		
		/**
		 * 其他国家的class名
		 * @private
		 * commonClazz {String}
		 */
		commonClazz: 'common',
		
		/**
		 * 初始值
		 * @cfg default {Object}
		 */
		initValue : {
			phoneValue: '+86',
			zhWidth: 50,
			phoneWidth: 120,
			placeholder: ''
		},
		
		/**
		 * 是否显示提示信息
		 * @cfg tipson {Boolean}
		 */
		tipson: true,
	
		/**
		 * 是否开启按ENTER键选中数据,默认开启
		 * @cfg openEnterKey {Boolean}
		 */
		openEnterKey: true,
		
		/**
		 * 是否显示地区的英文名, 默认不显示
		 * @cfg areaEnDisplay {Boolean}
		 */
		areaEnDisplay: false,
		
		/**
		 * 默认的提示信息
		 * @cfg tipText {String}
		 */
		tipText: '请输入正确格式的号码,格式为:+86 17012345678',
		
		/**
		 * 国家地区输入框属性
		 * @cfg areaAttr {Object}
		 */
		areaAttr:{
			
		},
		
		/**
		 * 电话输入框属性
		 * @cfg phoneAttr {Object}
		 */
		phoneAttr:{
			
		},
		
		/**
		 * 是否需要边框
		 * @cfg border {Boolean}
		 */
		border: true,
		
		/**
		 * 初始化组件
		 */
		initComponent: function(config){
			
			Usitrip.apply(this.initValue, config.initValue);
			Usitrip.apply(config.initValue, this.initValue);
			
			Usitrip.apply(this, config);
			
			this.initData();
			
			this.render(this.el);
			
			this.doEvent();
			
			this.initAttributes();
			
			this.initDefaultValue();
			
			if(this.tipson){
				this.areaTips.show();
			} else {
				this.areaTips.hide();
			}
			
			if(!this.areaEnDisplay){
				this.areaEn.css('display', 'none');
			}
			
			this.setBorder(this.border);
		},
		
		initAttributes: function(){
			for(var p in this.areaAttr){
				this.areaName.attr(p, this.areaAttr[p]);
			}
			
			for(var p in this.phoneAttr){
				this.areaPhone.attr(p, this.phoneAttr[p]);
			}
		
		},
		
		initDefaultValue: function(){
			
			var areaPhone = this.findAreaPhoneByCode(this.initValue['phoneValue'] || '+86');
			var zh,en,code,phone;
			if(areaPhone){
				zh = areaPhone[0];
				en = areaPhone[1];
				code = areaPhone[2];
				phone = areaPhone[3];
			}
			this.areaName.css({
				width: this.initValue['zhWidth']
			});
			
			this.areaPhone.width(this.initValue['phoneWidth']);
			this.updateBgImgPosition(this.areaFlag, code, zh);
		},
		
		/**
		 * 初始化数据
		 */
		initData: function(){
			this.areaData = usitrip.staticResource.areaData;
			this.hots = usitrip.staticResource.hots;
			this.common = usitrip.staticResource.common;
			this.codes = usitrip.staticResource.codes;
			this.areaBgPosition = usitrip.staticResource.areaBgPosition;
			this.specialArea = usitrip.staticResource.specialArea;
		},
		
		/**
		 * 渲染组件的入口
		 */
		render: function(el){
			if(this.fireEvent('beforerender', this) === false){
				return ;
			}
			this.doRender(el);
			this.fireEvent('afterrender');
		},
		
		/**
		 * 实现组件的渲染
		 */
		doRender: function(el){
			var areaPhone = this.findAreaPhoneByCode(this.initValue['phoneValue'] || '+86');
			var zh,en,code,phone;
			
			if(areaPhone){
				zh = areaPhone[0];
				en = areaPhone[1];
				code = areaPhone[2];
				phone = areaPhone[3];
			}
			
			var phoneInit = '+' + code + ' ' + phone;
			
			this.origin = zh;
			
			var content = '<div class="area-wrap"><div class="con"><dl class="area-con-dl">';
			content += this.getListHtml(this.hots, this.hotClazz);
			content += '<dd class="spl"><div class="spl-up"></div><div class="spl-center"></div><div class="spl-down"></div></dd>'
			content += this.getListHtml(this.common, this.commonClazz);
			content += '</dl></div>';
			content += '<div class="area-box"><div class="areas"><i class="flag"></i><input class="areaname" value="' + zh + '"><em><!– –></em></div> <input name="' + this.name + '" class="phone" type="text" value="' + phoneInit + '" placeholder="' + this.initValue.placeholder + '" /><i class="tips">' + this.tipText +'</i></div>'
				+ '</div>';
			$(el).html(content);
			
		},
		
		/**
		 * 初始化事件
		 */
		doEvent: function(){
			var el = this.el;
			this.areaWrap = $(el).find('.area-wrap');
			this.areaWrapCon = this.areaWrap.find('.con');
			this.areaWrapDl = this.areaWrapCon.find('dl');
			this.areaWrapDd = this.areaWrapDl.find('dd');
			this.areaHot = this.areaWrapDl.find('.hot');
			this.areaCommon = this.areaWrapDl.find('.common');
			this.areaEn = this.areaWrapDd.find('span[lang=en]');
			this.areaBox = this.areaWrap.find('div.area-box');
			this.areas = this.areaBox.find('div.areas');
			this.areaFlag = this.areas.find('.flag');
			this.areaName = this.areas.find('.areaname');
			this.areaBoxEm = this.areas.find('em');
			this.areaPhone = this.areaBox.find('.phone');
			this.areaTips = this.areaBox.find('.tips');
			
			this.areas.click($.proxy(function(event){
				this.show();
				this.moveEnd(this.areaName);
				event.stopPropagation();
			},this));
			
			var fun = function(event){
				var currentEl = event.currentTarget;
				var position = $(currentEl).find('i').css('backgroundPosition'),
					zh = $(currentEl).find('span[lang=zh]').text(),
					en = $(currentEl).find('span[lang=en]').text(),
					code = $(currentEl).find('em').text();
					
				this.updateBgImgPosition(this.areaFlag, code, zh);
				this.areaName.get(0).setAttribute("value", zh);
				this.areaPhone.get(0).setAttribute("value",code + ' ');
			}
			this.areaWrapDd.click($.proxy(fun, this));
			this.areaWrapDd.click($.proxy(this.hide, this));
			
			this.on('afterhide', this.focusPhone);
			
			
			var keyDownAction = function(event){
				var keyCode = event.keyCode || event.which;
				if(keyCode === 40 && this.areaWrapDl.is(':hidden')){ //按方向键 下
					this.show();
				}
				
				if(keyCode === 40 && !this.areaWrapDl.is(':hidden')){ //按方向键 下
					var isHighLig = this.areaWrapDd.hasClass('highlight');
					if(isHighLig){ //如果有高亮
						var highEl = this.areaWrapDl.find('.highlight');
						var nextEl = highEl.removeClass('highlight').next();
						if(nextEl.hasClass('spl')){
							nextEl = nextEl.next();
							this.areaWrapDl.scrollTop(this.areaWrapDl.scrollTop() + 36);
						}
						if(!nextEl.length){
							this.areaWrapDd.removeClass('highlight').first().addClass('highlight');
							this.areaWrapDl.scrollTop(0);
						} else {
							this.areaWrapDd.removeClass('highlight');
							nextEl.addClass('highlight');
							this.areaWrapDl.scrollTop(this.areaWrapDl.scrollTop() + 36);
						}
					} else {
						this.areaWrapDd.removeClass('highlight').first().addClass('highlight');
						this.areaWrapDl.scrollTop(0);
					}
				}
				
				if(keyCode === 38 && !this.areaWrapDl.is(':hidden')){ //按方向键上
					var isHighLig = this.areaWrapDd.hasClass('highlight');
					if(isHighLig){ //如果有高亮
						var highEl = this.areaWrapDl.find('.highlight');
						var prevEl = highEl.removeClass('highlight').prev();
						if(prevEl.hasClass('spl')){
							prevEl = prevEl.prev();
							this.areaWrapDl.scrollTop(this.areaWrapDl.scrollTop() - 36);
						}
						if(!prevEl.length){
							this.areaWrapDd.removeClass('highlight').last().addClass('highlight');
							this.areaWrapDl.scrollTop(10000);
						} else {
							this.areaWrapDd.removeClass('highlight');
							prevEl.addClass('highlight');
							this.areaWrapDl.scrollTop(this.areaWrapDl.scrollTop() - 36);
						}
					} else {
						this.areaWrapDd.removeClass('highlight').first().addClass('highlight');
						this.areaWrapDl.scrollTop(0);
					}
					
				}
				
				if(this.openEnterKey){
					if(keyCode === 13){ //回车
						this.areaWrapDl.find('dd.highlight').click();
					}
				}
							
				if(keyCode === 27){ //ESC
					this.hide();
				}
			}
			
			var keyUpAction = function(event){
				var text = $.trim(this.areaName.val());
				
				if(this.origin != text){
					var matchDd = this.areaWrapDl.find('span[zh*=' + this.areaName.val() + ']').parent();
					//this.areaWrapDl.prepend(matchDd);
				}
				
				this.origin = this.areaName.val();
			}
			
			this.areaName.keydown($.proxy(keyDownAction, this));
			
			this.areaName.keyup($.proxy(keyUpAction, this));
			
			this.areaPhone.keypress($.proxy(this.validateInput, this));
			this.areaPhone.keyup($.proxy(this.inputComplete, this));
			
			$(document).click($.proxy(this.hide, this));
		},
		
		/**
		 * 初始化组件
		 */
		getEl: function(){
			return this.el;
		},
		
		/**
		 * @private
		 * 获取列表的html
		 */
		getListHtml: function(data, clazzName){
			var html = '';
			var code,name;
			var special = [1, 7, 590, 599];
			var hotSpecial = ['美国', '俄罗斯', '圣巴泰勒', '库拉索']
			for(var i=0,len=data.length;i<len;i++){
				var attr = data[i];
				code = attr['code'];
				name = attr['zh'];
				en = attr['en'];
				if(special.indexOf(code) > -1){
					var position = this.findSpecialBgPosition(code, name);
					html += '<dd class=' + clazzName + '><i style="background-position:' + position + '"></i><span lang="zh">' + name + '</span><span lang="en" zh="' + attr['zh'] + '">' + en + '</span><em>+' + code + '</em></dd>';
				} else {
					html += '<dd class=' + clazzName + '><i style="background-position:' + this.areaBgPosition[attr['code']] + '"></i><span lang="zh" zh="' + attr['zh'] + '">' + attr['zh'] + '</span><span lang="en">' + en + '</span><em>+' + attr['code'] + '</em></dd>';
				}
			}
			return html;
		},
		
		/**
		 * 显示
		 */
		show: function(){
			
			if(this.areaName.attr('readOnly')){
				return ;	
			}
			
			if(this.visibility){
				return ;
			}
			
			this.areaWrap.css('position','relative');
			this.areaWrapDd.removeClass('highlight');
			this.areaWrapDl.find('span[zh=' + this.areaName.val() + ']').parent().addClass('highlight');
			this.areaWrapCon.css({top: this.areaWrap.height()});
			this.areaWrapCon.show();
			this.visibility = true;
		},
		
		/**
		 * 隐藏
		 */
		hide: function(){
			if(!this.visibility){
				return ;
			}
			
			if(this.fireEvent('beforehide', this) === false){
				return ;
			}
			this.areaWrap.css('position','');
			this.areaWrapCon.hide();
			this.visibility = false;
			this.fireEvent('afterhide', this);
		},
		
		/**
		 * 将焦点置到电话输入框
		 */
		focusPhone: function(){
			this.moveEnd(this.areaPhone);
		}, 
		
		/**
		 * 验证电话输入框
		 */
		validateInput: function(event){
			var keyCode = event.keyCode || event.which;
			var value = this.areaPhone.val();
			if(keyCode > 47 && keyCode < 58){
				if(value.indexOf('+') == -1){
					this.areaPhone.get(0).setAttribute("value",'+' + value);
					return true;
				}
			} else {
				if(!value && keyCode == 43){ //如果等于空 且等于输入的是+
					return true;
				}
				if(value && value.indexOf(" ") == -1 && keyCode === 32){ //等于空格
					this.areaTips.text("您已输0位");
					return true;
				}
				
				if(keyCode == 8){ //删除键
					return true;			
				} else if (keyCode == 37){ //左
					return true;
				} else if (keyCode == 39){ //左
					return true;
				}
				
				//this.areaTips.text(this.tipText);
				return false;
			}
		},
		
		/**
		 * 电话输入框的输入完成后
		 */
		inputComplete: function(event){
			this.findArea(event);
			var value = this.areaPhone.val();
			if(/^\+\d+\s+\d+$/.test(value)){
				var len = value.substr(value.indexOf(' ') + 1).replace(/' '/g, '').length;
				this.areaTips.text("您已输入" + len + '位');
			}
			
			if(!value){
				this.areaTips.text(this.tipText);
			}
		},
		
		/**
		 * 查找国家
		 */
		findArea: function(event){
			var phone = this.areaPhone.val();
			var areaPhone = this.findAreaPhoneByCode(phone);
			if(areaPhone){
				this.areaName.get(0).setAttribute("value",areaPhone[0]);
				this.updateBgImgPosition(this.areaFlag, areaPhone[2], areaPhone[0]);
			}
		},
		
		findAreaPhoneByCode: function(phoneValue){
			var index = -1;
			var areaPhone = [];
			var zh, en, code, phone;
			if(/^\+?\d+\s*\d*$/.test(phoneValue)){//匹配 +86 12333
				code = parseInt(phoneValue.replace(/\s+\d*/g,''));
				phone = phoneValue.replace(/^\+?\d+\s?/,'');
				if((index = this.codes.indexOf(code)) > -1){
					zh = this.areaData[index].zh;
					en = this.areaData[index].en;
					areaPhone.push(zh, en, code, phone);
					return areaPhone;
				}
			}
		},
		
		/**
		 * 更新国家国旗的背景图片
		 */
		updateBgImgPosition: function(el, code, name){
			var code = parseInt(code);
			var special = [1, 7, 590, 599];
			var position = '';
			if(special.indexOf(code)>-1){
				position = this.findSpecialBgPosition(code, name);
			} else {
				position = this.areaBgPosition[code];
			}
			el.css('backgroundPosition', position);
		},
		
		/**
		 * 查找几个特殊国家的国家坐标
		 */
		findSpecialBgPosition: function(code, name){
			for(var i=0,len=this.specialArea.length;i<len;i++){
				var area = this.specialArea[i];
				if(area['code'] == code && area['zh'] == name){
					return area['position'];
				}
			}
		},
		
		/**
		 * 光标移动到末尾
		 */
		moveEnd: function moveEnd(obj) {
			obj = obj[0];
			if(!obj){
				return ;
			}
			obj.focus();
			var len = obj.value.length;
			if (document.selection) {
				var sel = obj.createTextRange();
				sel.moveStart('character', len);
				sel.collapse();
				sel.select();
			} else if (typeof obj.selectionStart == 'number'
					&& typeof obj.selectionEnd == 'number') {
				obj.selectionStart = obj.selectionEnd = len;
			}
		},
		
		/**
		 * 获取电话号码框的值
		 */
		getValue: function(){
			return this.areaPhone.val();	
		},
		
		/**
		 * 电话号码框赋值
		 */
		setValue: function(value){
			this.areaPhone.get(0).setAttribute("value", value);
		},
		
		setBorder: function(border){
			if(!border){
				this.areas.css('border', 'none');
				this.areaPhone.css('border', 'none');
			}
		},
		
		setReadonly: function(){
			
		}
	});
})();