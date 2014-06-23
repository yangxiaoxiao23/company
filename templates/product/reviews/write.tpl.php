

<script type="text/javascript">
function checkForm() {
	var error = 0;
	var error_message = "<?php echo JS_ERROR; ?>";

	var review = document.product_reviews_write.review.value;

	if (review.length < <?php echo REVIEW_TEXT_MIN_LENGTH; ?>) {
		error_message = error_message + "<?php echo JS_REVIEW_TEXT; ?>";
		error = 1;
	}

	if ((document.product_reviews_write.rating[0].checked) || (document.product_reviews_write.rating[1].checked) || (document.product_reviews_write.rating[2].checked) || (document.product_reviews_write.rating[3].checked) || (document.product_reviews_write.rating[4].checked)) {
	} else {
		error_message = error_message + "<?php echo JS_REVIEW_RATING; ?>";
		error = 1;
	}

	if (error == 1) {
		alert(error_message);
		return false;
	} else {
		return true;
	}
}
</script>

<div>
<h1 style="float: right;"><?php echo $products_price; ?></h1>
<h1><?php echo $products_name; ?></h1>
</div>

<?php
if ($messageStack->size('review') > 0) {
	echo $messageStack->output('review');
}
?>

<?php echo html::form('product_reviews_write', html::href_link_noseo(FILENAME_PRODUCT_REVIEWS_WRITE, 'action=process&products_id=' . $_GET['products_id']), 'post', 'onsubmit="return checkForm();"', true); ?>

<div class="contentContainer">

<?php
if (tep_not_null($product_info['products_image'])) {
	?>

	<div style="float: right; width: <?php echo SMALL_IMAGE_WIDTH+20; ?>px; text-align: center;">
	<?php echo '<a href="' . html::href_link(FILENAME_PRODUCT_INFO, 'products_id=' . $product_info['products_id']) . '">' . html::img(DIR_WS_IMAGES . $product_info['products_image'], addslashes($product_info['products_name']), SMALL_IMAGE_WIDTH, SMALL_IMAGE_HEIGHT, 'hspace="5" vspace="5"') . '</a>'; ?>

	<p><?php echo html::button_jquery_ui(IMAGE_BUTTON_IN_CART, 'cart', html::href_link(basename($PHP_SELF), tep_get_all_get_params(array('action')) . 'action=buy_now')); ?></p>
	</div>

	<?php
}
?>

<div class="contentText">
<table border="0" cellspacing="0" cellpadding="2">
<tr>
<td class="fieldKey"><?php echo SUB_TITLE_FROM; ?></td>
<td class="fieldValue"><?php echo tep_output_string_protected($customer['customers_firstname'] . ' ' . $customer['customers_lastname']); ?></td>
</tr>
<tr>
<td class="fieldKey" valign="top"><?php echo SUB_TITLE_REVIEW; ?></td>
<td class="fieldValue"><?php echo html::textarea_field('review', 'soft', 60, 15) . '<br /><span style="float: right;">' . TEXT_NO_HTML . '</span>'; ?></td>
</tr>
<tr>
<td class="fieldKey"><?php echo SUB_TITLE_RATING; ?></td>
<td class="fieldValue"><?php echo TEXT_BAD . ' ' . html::input_radio_field('rating', '1') . ' ' . html::input_radio_field('rating', '2') . ' ' . html::input_radio_field('rating', '3') . ' ' . html::input_radio_field('rating', '4') . ' ' . html::input_radio_field('rating', '5') . ' ' . TEXT_GOOD; ?></td>
</tr>
</table>
</div>

<div class="buttonSet">
<span class="buttonAction"><?php echo html::button_jquery_ui(IMAGE_BUTTON_CONTINUE, 'triangle-1-e', null, 'primary'); ?></span>

<?php echo html::button_jquery_ui(IMAGE_BUTTON_BACK, 'triangle-1-w', html::href_link(FILENAME_PRODUCT_REVIEWS, tep_get_all_get_params(array('reviews_id', 'action')))); ?>
</div>
</div>

</form>