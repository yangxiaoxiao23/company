<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="zh-CN" lang="zh-CN">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta name="robots" content="noindex,nofollow">
	<title>���ķ� - ���ÿ�֧��ϵͳ</title>
</head>
<body scroll="no" style="position:static;" bgcolor="#FFFFFF">
<link href="<?=MODULE_PAYMENT_AUTHORIZENET2013_API_WEB_DIR?>global.css" rel="stylesheet" type="text/css">
<script type="application/javascript" src="/ext/jquery/jquery-1.4.2.js"></script>
<script type="application/javascript">
	$(document).ready(function () {
		$('#formAuthorize').submit(function () {
			var _submit = '#submitAuthorize';
			$(_submit).attr('disabled', 'disabled').text('����֧�������Ժ򡭡�');
		});
	});
</script>

<div id="bodyDiv">
	<h1>���ķ����������ÿ����߸���</h1><img src="<?=MODULE_PAYMENT_AUTHORIZENET2013_API_WEB_DIR?>images/card_logo.gif" alt="���ÿ����߸���">
	<div><?php echo $html_text; ?></div>
</div>

</body>
</html>
