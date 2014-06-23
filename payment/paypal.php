<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="zh-CN" lang="zh-CN"><head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta name="robots" content="noindex,nofollow">
	<title>正在连接目标网页......支付宝</title>
	<link href="<?=MODULE_PAYMENT_ALIPAY_DIRECT_PAY_API_WEB_DIR?>global.css" rel="stylesheet" type="text/css">

</head>

<body scroll="no" style="position:static;" bgcolor="#FFFFFF">
<style type="text/css">
	.wait{ height:auto; padding:10px 50px 20px 50px;}
	.wait .s_1 img{ margin:0 auto;}
	/*跳转*/
	#jump{	width:860px;height:388px;position:absolute;left:50%;top:50%;z-index:5; margin:-229px 0 0 -430px;text-align:center; padding-top:70px; border:1px solid #e9e9e9;}
	#jump h1{ display:inline;}
	#jump .usitrip,#jump .usitrip h1{ font-size:24px; font-family:"微软雅黑",Arial, Helvetica, sans-serif; }
	.wait{ width:243px; padding:0 40px; border:1px solid #dadada; margin:62px auto;}
	.pop_copyright{ background:#f9f9f9; padding:20px 0; line-height:24px; color:#888;}
	.wait .s_1{ padding:12px 0;}
	.wait .s_2{ background:#ececec; height:16px; font-size:0; line-height:0; margin-bottom:7px;}
	.wait .s_2 img{ width:243px; height:16px;}

</style>

<div id="jump">
	<div class="usitrip color_orange">正在前往贝宝(PayPal)支付页面进行支付……</div>
	<div class="wait">
		<p class="s_1" style="text-align:center;"><img src="https://www.paypalobjects.com/webstatic/mktg/Logos/paypal-logo1x.svg" alt="alipay"/></p>
		<p class="s_2"><img src="<?=MODULE_PAYMENT_ALIPAY_DIRECT_PAY_API_WEB_DIR?>images/loading.gif"></p>
		<p class="s_3">
			<strong class="color_green font_bold">USITRIP走四方，伴您一起走四方！</strong>
		</p>
	</div>
	<div><?php echo $html_text;?></div>
</div>

</body>
</html>
