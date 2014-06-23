<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="zh-CN" lang="zh-CN"><head>
	<meta http-equiv="Content-Type" content="text/html; charset=gb2312">
	<meta name="robots" content="noindex,nofollow">
	<title>正在连接目标网页......网银在线</title>
	<link href="<?=MODULE_PAYMENT_A_CHINABANK_API_WEB_DIR?>global.css" rel="stylesheet" type="text/css">
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
</head>

<body scroll="no" style="position:static;" bgcolor="#FFFFFF"><!-- onLoad="javascript:document.E_FORM.submit()"-->

<div id="jump">
	<div class="usitrip color_orange">正在前往网银在线支付页面进行支付&hellip;&hellip;</div>
	<div class="wait">
		<p class="s_1" style="text-align:center;"><img src="<?=MODULE_PAYMENT_A_CHINABANK_API_WEB_DIR?>images/chinabank_logo.gif" alt="chinabank_logo"/></p>
		<p class="s_2"><img src="<?=MODULE_PAYMENT_A_CHINABANK_API_WEB_DIR?>images/loading.gif"></p>
		<p class="s_3">
			<strong class="color_green font_bold">USITRIP走四方，伴您一起走四方！</strong>
		</p>
	</div>
	<div>

		<!--以下信息为标准的 HTML 格式 + ASP 语言 拼凑而成的 网银在线 支付接口标准演示页面 无需修改-->

		<!--<form method="post" name="E_FORM" action="https://Pay3.chinabank.com.cn/PayGate">
			<input type="hidden" name="v_mid"         value="<?php echo $v_mid;?>">
			<input type="hidden" name="v_oid"         value="<?php echo $v_oid;?>">
			<input type="hidden" name="v_amount"      value="<?php echo $v_amount;?>">
			<input type="hidden" name="v_moneytype"   value="<?php echo $v_moneytype;?>">
			<input type="hidden" name="v_url"         value="<?php echo $v_url;?>">
			<input type="hidden" name="v_md5info"     value="<?php echo $v_md5info;?>">

			<!--以下几项项为网上支付完成后，随支付反馈信息一同传给信息接收页 - ->

			<input type="hidden" name="remark1"       value="<?php echo $remark1;?>">
			<input type="hidden" name="remark2"       value="<?php echo $remark2;?>">



			<!--以下几项只是用来记录客户信息，可以不用，不影响支付 - ->
			<input type="hidden" name="v_rcvname"      value="<?php echo $v_rcvname;?>">
			<input type="hidden" name="v_rcvtel"       value="<?php echo $v_rcvtel;?>">
			<input type="hidden" name="v_rcvpost"      value="<?php echo $v_rcvpost;?>">
			<input type="hidden" name="v_rcvaddr"      value="<?php echo $v_rcvaddr;?>">
			<input type="hidden" name="v_rcvemail"     value="<?php echo $v_rcvemail;?>">
			<input type="hidden" name="v_rcvmobile"    value="<?php echo $v_rcvmobile;?>">

			<input type="hidden" name="v_ordername"    value="<?php echo $v_ordername;?>">
			<input type="hidden" name="v_ordertel"     value="<?php echo $v_ordertel;?>">
			<input type="hidden" name="v_orderpost"    value="<?php echo $v_orderpost;?>">
			<input type="hidden" name="v_orderaddr"    value="<?php echo $v_orderaddr;?>">
			<input type="hidden" name="v_ordermobile"  value="<?php echo $v_ordermobile;?>">
			<input type="hidden" name="v_orderemail"   value="<?php echo $v_orderemail;?>">
			<input type="submit" value="确定" />

		</form>-->
		<?=$html_text?>
	</div>
</div>

</body>
</html>