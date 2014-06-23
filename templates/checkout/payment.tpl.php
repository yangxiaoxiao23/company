<form name="checkout_payment" id="checkout_payment" action="<?= html::href_link_noseo(FILENAME_CHECKOUT_CONFIRMATION, '', 'SSL')?>" method="post" enctype="multipart/form-data" onsubmit="submit_payment(); return false;">

<?php echo $payment_modules->javascript_validation(); ?>

<?php
if (isset($_GET['payment_error']) && is_object(${$_GET['payment_error']}) && ($error = ${$_GET['payment_error']}->get_error())) {
	?>

	<div class="contentText">
	<?php echo '<strong>' . tep_output_string_protected($error['title']) . '</strong>'; ?>

	<p class="messageStackError"><?php echo tep_output_string_protected($error['error']); ?></p>
	</div>

	<?php
}
?>


<h1><?php echo TABLE_HEADING_PAYMENT_METHOD; ?></h1>
<?php
$selection = $payment_modules->selection();

if (sizeof($selection) > 1) {
	?>

	<div class="contentText">
	<div style="float: right;">
	<?php echo '<strong>' . TITLE_PLEASE_SELECT . '</strong>'; ?>
	</div>

	<?php echo TEXT_SELECT_PAYMENT_METHOD; ?>
	</div>

	<?php
} elseif ($free_shipping == false) {
	?>

	<div class="contentText">
	<?php echo TEXT_ENTER_PAYMENT_INFORMATION; ?>
	</div>

	<?php
}
?>

<div class="contentText">

<?php
$radio_buttons = 0;
for ($i=0, $n=sizeof($selection); $i<$n; $i++) {
	?>

	<table border="0" cellspacing="0" cellpadding="2">
	<tr>
	<td><strong><?php echo $selection[$i]['module']; ?></strong></td>
	<td align="right">

	<?php
	if (sizeof($selection) > 1) {
		echo html::input_radio_field('payment', $selection[$i]['id'], ($selection[$i]['id'] == $_SESSION['payment']));
	} else {
		echo html::input_hidden_field('payment', $selection[$i]['id'], true);
	}
	?>

	</td>
	</tr>

	<?php
	if (isset($selection[$i]['error'])) {
		?>

		<tr>
		<td colspan="2"><?php echo $selection[$i]['error']; ?></td>
		</tr>

		<?php
	} elseif (isset($selection[$i]['fields']) && is_array($selection[$i]['fields'])) {
		?>

		<tr>
		<td colspan="2"><table border="0" cellspacing="0" cellpadding="2">

		<?php
		for ($j=0, $n2=sizeof($selection[$i]['fields']); $j<$n2; $j++) {
			?>

			<tr>
			<td><?php echo $selection[$i]['fields'][$j]['title']; ?></td>
			<td><?php echo $selection[$i]['fields'][$j]['field']; ?></td>
			</tr>

			<?php
		}
		?>

		</table></td>
		</tr>

		<?php
	}
	?>

	</table>

	<?php
	$radio_buttons++;
}
?>

</div>
<div><button type="submit">确定</button></div>

</form>

<script type="text/javascript">
/*提交支付方式信息*/
function submit_payment(){
	var _url = "<?= html::href_link_noseo('ajax.php','mod=checkout_payment','SSL');?>";
	if (_url.indexOf("?") > 0){ _url += "&randnumforajaxaction=" + Math.random(); }else{ _url += "?randnumforajaxaction=" + Math.random(); }
	var _data = G.get_form_data('checkout_payment', 'eval_string');
	_data += '&action=post_payment';
	$.post(_url,_data,function(json){
		if(json['result']=='success'){
			getCheckoutModule("<?= html::href_link_noseo('ajax.php','mod=checkout_contact','SSL');?>", "getContact", "ContactInfo");			//成功后重新调用联系人信息模块
			G._goto("#ContactInfo");
		}else if(json['result']=='error'){
			alert(json['errortext'])
		}else{ alert('未知错误！'); }
	},'json');
};

<?php if (tep_session_is_registered('payment') && tep_not_null($_SESSION['payment'])){	//如果游客信息已经选择了付款方式则自动载入下一步的订购人联系信息?>
	$().ready(function(){
		getCheckoutModule("<?= html::href_link_noseo('ajax.php','mod=checkout_contact','SSL');?>", "getContact", "ContactInfo");
	});
<?php }?>

</script>
