

<script type="text/javascript">
var selected;

function selectRowEffect(object, buttonSelect) {
	if (!selected) {
		if (document.getElementById) {
			selected = document.getElementById('defaultSelected');
		} else {
			selected = document.all['defaultSelected'];
		}
	}

	if (selected) selected.className = 'moduleRow';
	object.className = 'moduleRowSelected';
	selected = object;

	// one button is not an array
	if (document.checkout_address.address[0]) {
		document.checkout_address.address[buttonSelect].checked=true;
	} else {
		document.checkout_address.address.checked=true;
	}
}

function rowOverEffect(object) {
	if (object.className == 'moduleRow') object.className = 'moduleRowOver';
}

function rowOutEffect(object) {
	if (object.className == 'moduleRowOver') object.className = 'moduleRow';
}

function check_form_optional(form_name) {
	var form = form_name;

	var firstname = form.elements['firstname'].value;
	var lastname = form.elements['lastname'].value;
	var street_address = form.elements['street_address'].value;

	if (firstname == '' && lastname == '' && street_address == '') {
		return true;
	} else {
		return check_form(form_name);
	}
}
</script>
<?php require(DIR_WS_INCLUDES . 'form_check.js.php'); ?>

<h1><?php echo HEADING_TITLE; ?></h1>

<?php
if ($messageStack->size('checkout_address') > 0) {
	echo $messageStack->output('checkout_address');
}
?>

<?php echo html::form('checkout_address', html::href_link_noseo(FILENAME_CHECKOUT_SHIPPING_ADDRESS, '', 'SSL'), 'post', 'onsubmit="return check_form_optional(checkout_address);"', true); ?>

<div class="contentContainer">

<?php
if ($process == false) {
	?>

	<h2><?php echo TABLE_HEADING_SHIPPING_ADDRESS; ?></h2>

	<div class="contentText">
	<div class="ui-widget infoBoxContainer" style="float: right;">
	<div class="ui-widget-header infoBoxHeading"><?php echo TITLE_SHIPPING_ADDRESS; ?></div>

	<div class="ui-widget-content infoBoxContents">
	<?php echo tep_address_label($customer_id, $sendto, true, ' ', ', '); ?>
	</div>
	</div>

	<?php echo TEXT_SELECTED_SHIPPING_DESTINATION; ?>
	</div>

	<div style="clear: both;"></div>

	<?php
	if ($data['addresses_count'] > 1) {	//列地址簿列表
	
	?>

		<h2><?php echo TABLE_HEADING_ADDRESS_BOOK_ENTRIES; ?></h2>

		<div class="contentText">
		<div style="float: right;">
		<?php echo '<strong>' . TITLE_PLEASE_SELECT . '</strong>'; ?>
		</div>

		<?php echo TEXT_SELECT_OTHER_SHIPPING_DESTINATION; ?>
		</div>

		<div class="contentText">
		<table border="0" width="100%" cellspacing="0" cellpadding="2">

		<?php
		$radio_buttons = 0;		
		while (list(,$addresses) = each($data['address_books'])) {
			$format_id = tep_get_address_format_id($addresses['country_id']);

			if ($addresses['address_book_id'] == $sendto) {
				echo '      <tr id="defaultSelected" class="moduleRowSelected" onmouseover="rowOverEffect(this)" onmouseout="rowOutEffect(this)" onclick="selectRowEffect(this, ' . $radio_buttons . ')">' . "\n";
			} else {
				echo '      <tr class="moduleRow" onmouseover="rowOverEffect(this)" onmouseout="rowOutEffect(this)" onclick="selectRowEffect(this, ' . $radio_buttons . ')">' . "\n";
			}
			?>

			<td><strong><?php echo $addresses['firstname'] . ' ' . $addresses['lastname']; ?></strong></td>
			<td align="right"><?php echo html::input_radio_field('address', $addresses['address_book_id'], ($addresses['address_book_id'] == $sendto)); ?></td>
			</tr>
			<tr>
			<td colspan="2" style="padding-left: 15px;"><?php echo tep_address_format($format_id, $addresses, true, ' ', ', '); ?></td>
			</tr>

			<?php
			$radio_buttons++;
		}
		?>

		</table>
		</div>

		<?php
	}
}

if ($data['addresses_count'] < MAX_ADDRESS_BOOK_ENTRIES) {
	?>

	<h2><?php echo TABLE_HEADING_NEW_SHIPPING_ADDRESS; ?></h2>

	<div class="contentText">
	<?php echo TEXT_CREATE_NEW_SHIPPING_ADDRESS; ?>
	</div>

	<?php require(DIR_WS_MODULES . 'checkout_new_address.php'); ?>

	<?php
}
?>

<div class="contentText">
<div style="float: left; width: 60%; padding-top: 5px; padding-left: 15%;">
<div id="coProgressBar" style="height: 5px;"></div>

<table border="0" width="100%" cellspacing="0" cellpadding="2">
<tr>
<td align="center" width="33%" class="checkoutBarCurrent"><?php echo '<a href="' . html::href_link_noseo(FILENAME_CHECKOUT_SHIPPING, '', 'SSL') . '" class="checkoutBarCurrent">' . CHECKOUT_BAR_DELIVERY . '</a>'; ?></td>
<td align="center" width="33%" class="checkoutBarTo"><?php echo CHECKOUT_BAR_PAYMENT; ?></td>
<td align="center" width="33%" class="checkoutBarTo"><?php echo CHECKOUT_BAR_CONFIRMATION; ?></td>
</tr>
</table>
</div>

<div style="float: right;"><?php echo html::input_hidden_field('action', 'submit') . html::button_jquery_ui(IMAGE_BUTTON_CONTINUE, 'triangle-1-e', null, 'primary'); ?></div>
</div>

<script type="text/javascript">
$('#coProgressBar').progressbar({
	value: 33
});
</script>

<?php
if ($process == true) {
?>

  <div class="contentText">
    <?php echo html::button_jquery_ui(IMAGE_BUTTON_BACK, 'triangle-1-w', html::href_link_noseo(FILENAME_CHECKOUT_SHIPPING_ADDRESS, '', 'SSL')); ?>
  </div>

<?php
}
?>

</div>

</form>
