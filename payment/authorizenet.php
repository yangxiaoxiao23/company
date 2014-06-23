<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="zh-CN" lang="zh-CN">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta name="robots" content="noindex,nofollow">
	<title>走四方 - 信用卡支付系统</title>
</head>
<body scroll="no" style="position:static;" bgcolor="#FFFFFF">
<link href="<?=MODULE_PAYMENT_AUTHORIZENET2013_API_WEB_DIR?>global.css" rel="stylesheet" type="text/css">
<script type="application/javascript" src="/ext/jquery/jquery-1.4.2.js"></script>
<script type="application/javascript">
	$(document).ready(function () {
		$('#formAuthorize').submit(function () {
			var _submit = '#submitAuthorize';
			$(_submit).attr('disabled', 'disabled').text('正在支付，请稍候……');
		});
	});
</script>

<div id="bodyDiv">
	<h1>走四方旅游网信用卡在线付款</h1><img src="<?=MODULE_PAYMENT_AUTHORIZENET2013_API_WEB_DIR?>images/card_logo.gif" alt="信用卡在线付款">
	<div><?php echo $html_text; ?></div>
</div>

</body>
</html>
