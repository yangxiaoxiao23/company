<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=gb2312">
	<meta name="robots" content="noindex,nofollow">
	<title>信用卡错误提示页面</title>
	<link href="<?=MODULE_PAYMENT_PAYPALCREDITCARD_API_WEB_DIR?>global.css" rel="stylesheet" type="text/css">
	<style type="text/css">
		/*跳转*/
		#jump {
			width: 860px;
			margin: 0 auto;
			text-align: center;
			border: 1px solid #e9e9e9;
			padding:5px;
		}
		#jump .usitrip, #jump .usitrip h1 {
			font-size: 24px;
			font-family: "微软雅黑", Arial, Helvetica, sans-serif;
		}
		.wait {
			padding: 0 40px;
			margin: 10px auto;
		}
		.pop_copyright {
			background: #f9f9f9;
			padding: 20px 0;
			line-height: 24px;
			color: #888;
		}
		.wait .s_1 {
			padding: 12px 0;
		}
		.wait .s_2 {
			background: #ececec;
			height: 16px;
			font-size: 0;
			line-height: 0;
			margin-bottom: 7px;
		}
		.wait .s_2 img {
			width: 243px;
			height: 16px;
		}
		td{padding:5px;}
		img{display:inline};
	</style>
</head>

<body>


<div id="jump">
		<table width="100%" align="center" border="0" cellpadding="0" cellspacing="1" style="background-color: #ccc;">
			<tr>
				<td colspan="2" align="center" style="background-color: #FFF;"><img src="<?=MODULE_PAYMENT_PAYPALCREDITCARD_API_WEB_DIR?>images/err.gif"/></td>
			</tr>
			<tr>
				<td colspan="2" align="center" style="background-color: #FFF;font-weight:700">信用卡支付错误！</td>
			</tr>
			<?php
			$resArray=isset($_SESSION['reshash']) ? $_SESSION['reshash'] : array();
			foreach ($resArray as $key => $value) {
				echo '<tr><td align="right" width="50%" style="background-color:#fff"> ' . $key . ':</td><td align="left" style="background-color:#fff">' . $value . '</td>';
			}
			?>
		</table>
		<a class="home" id="CallsLink" href="<?=$return_url?>" style="color: blue">返回再次交易</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		<a class="home" href="<?=$other_url?>" style="color: blue">改用其他支付方式</a>

</div>

</body>
</html>