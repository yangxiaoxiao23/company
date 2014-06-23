<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=gb2312">
	<meta name="robots" content="noindex,nofollow">
	<title>信用卡在线结账</title>
	<link href="<?=MODULE_PAYMENT_PAYPALCREDITCARD_API_WEB_DIR?>global.css" rel="stylesheet" type="text/css"/>
	<style type="text/css">
		/*跳转*/
		#jump {
			width: 860px;
			margin: 0 auto;
			text-align: center;
			border: 1px solid #e9e9e9;
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
	</style>
</head>
<body scroll="auto" style="position:static;" bgcolor="#FFFFFF">
<div id="jump">
<div class="usitrip color_orange">Paypal信用卡在线付款</div>
<div class="wait">
	<p class="s_1" style="text-align:center;"><img style="margin:0 auto;" src="<?=MODULE_PAYMENT_PAYPALCREDITCARD_API_WEB_DIR?>images/pay1.jpg" alt="Paypal信用卡在线付款"></p>

	<p class="s_3">
		<strong class="color_green font_bold">USITRIP走四方，伴您一起走四方！</strong>
	</p>
</div>
<div style="padding:0 10px">
<form method="post" action="<?=$form_action?>" name="DoDirectPaymentForm" autocomplete="off">
<!--Payment type is <?=$paymentType?><br> -->
<input type="hidden" name="save" value="ok" />
<table>
<tr>
	<td align="right">First Name(名):</td>
	<td align="left"><input type="text" size="30" maxlength="32" name="firstName" value=""></td>
</tr>
<tr>
	<td align="right">Last Name(姓):</td>
	<td align="left"><input type="text" size="30" maxlength="32" name="lastName" value=""></td>
</tr>
<tr>
	<td align="right">Card Type(信用卡类型):</td>
	<td align="left">
		<select name="creditCardType">
			<option value="Visa" selected="selected">Visa</option>
			<option value="MasterCard">MasterCard</option>
			<option value="Discover">Discover</option>
			<option value="Amex">American Express</option>
		</select></td>
</tr>
<tr>
	<td align="right">Card Number(卡号):</td>
	<td align="left"><input type="text" size="19" maxlength="19" name="creditCardNumber"></td>
</tr>
<tr>
	<td align="right">Expiration Date(有效期至):</td>
	<td align="left">
		<p>
			<select name="expDateMonth">
				<option value="01">01</option>
				<option value="02">02</option>
				<option value="03">03</option>
				<option value="04">04</option>
				<option value="05">05</option>
				<option value="06">06</option>
				<option value="07">07</option>
				<option value="08">08</option>
				<option value="09">09</option>
				<option value="10">10</option>
				<option value="11">11</option>
				<option value="12">12</option>
			</select>
			<select name="expDateYear">
				<?php for ($i = date("Y"); $i <= date("Y") + 10; $i++) { ?>
					<option value="<?php echo $i; ?>"><?php echo $i; ?></option>
				<?php } ?>
			</select>
		</p>
	</td>
</tr>
<tr>
	<td align="right">Card Verification Number(信用卡认证号码):</td>
	<td align="left"><input type="text" size="3" maxlength="4" name="cvv2Number" value=""></td>
</tr>
<tr>
	<td align="right"><br>
		<b>Billing Address(账单地址)</b></td>
	<td>
		</td>
</tr>
<tr>
	<td align="right">Address 1(街道地址):</td>
	<td align="left"><input type="text" size="25" maxlength="100" name="address1" value=""></td>
</tr>
<tr>
	<td align="right">Address 2:</td>
	<td align="left"><input type="text" size="25" maxlength="100" name="address2">(optional)</td>
</tr>
<tr>
	<td align="right">City(城市):</td>
	<td align="left"><input type="text" size="25" maxlength="40" name="city" value=""></td>
</tr>
<tr>
	<td align="right">(US/CA) State(州省[美加]):</td>
	<td align="left">
		<select id="state" name="state">
			<option value=""></option>
			<option value="AK">AK</option>
			<option value="AL">AL</option>
			<option value="AR">AR</option>
			<option value="AZ">AZ</option>
			<option value="CA">CA</option>
			<option value="CO">CO</option>
			<option value="CT">CT</option>
			<option value="DC">DC</option>
			<option value="DE">DE</option>
			<option value="FL">FL</option>
			<option value="GA">GA</option>
			<option value="HI">HI</option>
			<option value="IA">IA</option>
			<option value="ID">ID</option>
			<option value="IL">IL</option>
			<option value="IN">IN</option>
			<option value="KS">KS</option>
			<option value="KY">KY</option>
			<option value="LA">LA</option>
			<option value="MA">MA</option>
			<option value="MD">MD</option>
			<option value="ME">ME</option>
			<option value="MI">MI</option>
			<option value="MN">MN</option>
			<option value="MO">MO</option>
			<option value="MS">MS</option>
			<option value="MT">MT</option>
			<option value="NC">NC</option>
			<option value="ND">ND</option>
			<option value="NE">NE</option>
			<option value="NH">NH</option>
			<option value="NJ">NJ</option>
			<option value="NM">NM</option>
			<option value="NV">NV</option>
			<option value="NY">NY</option>
			<option value="OH">OH</option>
			<option value="OK">OK</option>
			<option value="OR">OR</option>
			<option value="PA">PA</option>
			<option value="RI">RI</option>
			<option value="SC">SC</option>
			<option value="SD">SD</option>
			<option value="TN">TN</option>
			<option value="TX">TX</option>
			<option value="UT">UT</option>
			<option value="VA">VA</option>
			<option value="VT">VT</option>
			<option value="WA">WA</option>
			<option value="WI">WI</option>
			<option value="WV">WV</option>
			<option value="WY">WY</option>
			<option value="AA">AA</option>
			<option value="AE">AE</option>
			<option value="AP">AP</option>
			<option value="AS">AS</option>
			<option value="FM">FM</option>
			<option value="GU">GU</option>
			<option value="MH">MH</option>
			<option value="MP">MP</option>
			<option value="PR">PR</option>
			<option value="PW">PW</option>
			<option value="VI">VI</option>
		</select>
	</td>
</tr>
<tr>
	<td align="right">(Non-US/CA) State/Province(其它国家州/省):</td>
	<td align="left"><input type="text" size="25" maxlength="40" name="state1" value=""></td>
</tr>
<tr>
	<td align="right">ZIP Code(邮编):</td>
	<td align="left"><input type="text" size="10" maxlength="10" name="zip" value="">(5 or 9 digits)</td>
</tr>
<tr>
	<td align="right">Country(国家):</td>
	<td align="left">
		<?php

		?>
		<select id="countrycode" name="countrycode">
			<?php
			foreach ($_countrycode as $key => $val) {
				$_str     = ucwords(strtolower($val));
				$selected = '';
				if ($key == "US") {
					$selected = 'selected';
				}
				?>
				<option value="<?php echo $key; ?>" <?php echo $selected; ?>><?php echo $_str; ?></option>
			<?php } ?>
		</select>
	</td>
</tr>
<tr>
	<td align="right"><br><b>订单信息:</b></td>
	<td>&nbsp;</td>
</tr>
<tr>
	<td align="right">订单编号：</td>
	<td align="left"><?=$orders_id?></td>
</tr>
<?=$order_totals?>
<tr>
	<td align="right">支付金额：</td>
	<td align="left"><?=$amount_html?> <?=$currency?><input type="hidden" name="currency" value="<?=$currency?>" />
	</td>
	<!-- onkeyup="checkValue(this.value)" -->
</tr>
<tr>
	<td/>
	<td align="left"><input type="button" value="确定付款"
	                        onClick="this.form.submit(); this.disabled=true; this.value=&quot;正在付款，请稍后&hellip;&hellip;&quot;"
	                        id="confirm_button"/></td>
</tr>
<tr>
	<td colspan="2" align="center"><span class="font_size14"><strong><font color="#FF0000">付款后请耐心等待不要刷新页面，以免重复支付；付款完成后，请不要即时关掉付款完成页面，停留一分钟后再关闭</font></strong></span>
	</td>
</tr>
<?php if ($_COOKIE['login_id']) { ?>
	<tr>
		<td colspan="2" align="center">
			<iframe style="display:block; border:none;" width="720" height="85"
			        src="/auto_login_url.php?order_id=<?=$orders_id?>"></iframe>
		</td>
	</tr>
<?php } ?>
</table>
</form>
</div>
</div>
<script type="text/javascript" language="javascript">
	function checkValue(value) {
		if (parseFloat(value) >=<?php printf("%1\$.2f",$min_money);?>) {
			document.getElementById('confirm_button').disabled = false;
		} else {
			document.getElementById('confirm_button').disabled = true;
		}
	}
</script>
</body>
</html>