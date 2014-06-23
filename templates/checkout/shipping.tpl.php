<h1>收货地址信息</h1>
<div class="contentContainer">
<h2>送货地址</h2>

<div class="contentText">
<div class="ui-widget infoBoxContainer" style="float: right;">
<div class="ui-widget-header infoBoxHeading">送货地址：</div>

<div class="ui-widget-content infoBoxContents">
<?php
echo tep_address_label($customer_id, $sendto, true, ' ', ', ');
?>
</div>
</div>

请从地址薄中选择您想要送达的地址。<br /><br /><?php echo html::button_jquery_ui(IMAGE_BUTTON_CHANGE_ADDRESS, 'home', html::href_link_noseo(FILENAME_CHECKOUT_SHIPPING_ADDRESS, '', 'SSL')); ?>
</div>

<div style="clear: both;"></div>

<?php
if (tep_count_shipping_modules() > 0) {
	?>

	<h2>送货方式</h2>

	<?php
	if (sizeof($quotes) > 1 && sizeof($quotes[0]) > 1) {
		?>

		<div class="contentText">
		<div style="float: right;">
		<?php echo '<strong>' . TITLE_PLEASE_SELECT . '</strong>'; ?>
		</div>

		<?php echo TEXT_CHOOSE_SHIPPING_METHOD; ?>
		</div>

		<?php
	} elseif ($free_shipping == false) {
		?>

		<div class="contentText">
		这是此订单当前唯一可用的送货方式。
		</div>

		<?php
	}
	?>

	<div class="contentText">
	<table border="0" width="100%" cellspacing="0" cellpadding="2">

	<?php
	if ($free_shipping == true) {
		?>

		<tr>
		<td><strong><?php echo FREE_SHIPPING_TITLE; ?></strong>&nbsp;<?php echo $quotes[$i]['icon']; ?></td>
		</tr>
		<tr id="defaultSelected" class="moduleRowSelected" onmouseover="rowOverEffect(this)" onmouseout="rowOutEffect(this)" onclick="selectRowEffect(this, 0)">
		<td style="padding-left: 15px;"><?php echo sprintf(FREE_SHIPPING_DESCRIPTION, $currencies->format(MODULE_ORDER_TOTAL_SHIPPING_FREE_SHIPPING_OVER)) . html::input_hidden_field('shipping', 'free_free'); ?></td>
		</tr>

		<?php
	} else {
		$radio_buttons = 0;
		for ($i=0, $n=sizeof($quotes); $i<$n; $i++) {
			?>

			<tr>
			<td colspan="3"><strong><?php echo $quotes[$i]['module']; ?></strong>&nbsp;<?php if (isset($quotes[$i]['icon']) && tep_not_null($quotes[$i]['icon'])) { echo $quotes[$i]['icon']; } ?></td>
			</tr>

			<?php
			if (isset($quotes[$i]['error'])) {
				?>

				<tr>
				<td colspan="3"><?php echo $quotes[$i]['error']; ?></td>
				</tr>

				<?php
			} else {
				for ($j=0, $n2=sizeof($quotes[$i]['methods']); $j<$n2; $j++) {
					// set the radio button to be checked if it is the method chosen
					$checked = (($quotes[$i]['id'] . '_' . $quotes[$i]['methods'][$j]['id'] == $shipping['id']) ? true : false);

					if ( ($checked == true) || ($n == 1 && $n2 == 1) ) {
						echo '      <tr id="defaultSelected" class="moduleRowSelected" onmouseover="rowOverEffect(this)" onmouseout="rowOutEffect(this)" onclick="selectRowEffect(this, ' . $radio_buttons . ')">' . "\n";
					} else {
						echo '      <tr class="moduleRow" onmouseover="rowOverEffect(this)" onmouseout="rowOutEffect(this)" onclick="selectRowEffect(this, ' . $radio_buttons . ')">' . "\n";
					}
					?>

					<td width="75%" style="padding-left: 15px;"><?php echo $quotes[$i]['methods'][$j]['title']; ?></td>

					<?php
					if ( ($n > 1) || ($n2 > 1) ) {
						?>

						<td><?php echo $currencies->format(tep_add_tax($quotes[$i]['methods'][$j]['cost'], (isset($quotes[$i]['tax']) ? $quotes[$i]['tax'] : 0))); ?></td>
						<td align="right"><?php echo html::input_radio_field('shipping', $quotes[$i]['id'] . '_' . $quotes[$i]['methods'][$j]['id'], $checked); ?></td>

						<?php
					} else {
						?>

						<td align="right" colspan="2"><?php echo $currencies->format(tep_add_tax($quotes[$i]['methods'][$j]['cost'], (isset($quotes[$i]['tax']) ? $quotes[$i]['tax'] : 0))) . html::input_hidden_field('shipping', $quotes[$i]['id'] . '_' . $quotes[$i]['methods'][$j]['id']); ?></td>

						<?php
					}
					?>

					</tr>

					<?php
					$radio_buttons++;
				}
			}
		}
	}
	?>

	</table>
	</div>

	<?php
}
?>
</div>