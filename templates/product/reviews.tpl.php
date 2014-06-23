

<?php
if ($messageStack->size('product_reviews') > 0) {
	echo $messageStack->output('product_reviews');
}
?>

<div>
  <h1 style="float: right;"><?php echo $products_price; ?></h1>
  <h1><?php echo $products_name; ?></h1>
</div>

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

$reviews_query_raw = "select r.reviews_id, left(rd.reviews_text, 100) as reviews_text, r.reviews_rating, r.date_added, r.customers_name from " . TABLE_REVIEWS . " r, " . TABLE_REVIEWS_DESCRIPTION . " rd where r.products_id = '" . (int)$product_info['products_id'] . "' and r.reviews_id = rd.reviews_id and rd.languages_id = '" . (int)$languages_id . "' and r.reviews_status = 1 order by r.reviews_id desc";
$reviews_split = new splitPageResults($reviews_query_raw, MAX_DISPLAY_NEW_REVIEWS);

if ($reviews_split->number_of_rows > 0) {
	if ((PREV_NEXT_BAR_LOCATION == '1') || (PREV_NEXT_BAR_LOCATION == '3')) {
?>

  <div class="contentText">
    <p style="float: right;"><?php echo TEXT_RESULT_PAGE . ' ' . $reviews_split->display_links(MAX_DISPLAY_PAGE_LINKS, tep_get_all_get_params(array('page', 'info'))); ?></p>

    <p><?php echo $reviews_split->display_count(TEXT_DISPLAY_NUMBER_OF_REVIEWS); ?></p>
  </div>

  <br />

<?php
	}

	$reviews_query = $DB->query($reviews_split->sql_query);
	while ($reviews = $DB->fetch_array($reviews_query)) {
?>

  <div>
    <span style="float: right;"><?php echo sprintf(TEXT_REVIEW_DATE_ADDED, tep_date_long($reviews['date_added'])); ?></span>
    <h2><?php echo '<a href="' . html::href_link(FILENAME_PRODUCT_REVIEWS_INFO, 'products_id=' . $product_info['products_id'] . '&reviews_id=' . $reviews['reviews_id']) . '">' . sprintf(TEXT_REVIEW_BY, tep_output_string_protected($reviews['customers_name'])) . '</a>'; ?></h2>
  </div>

  <div class="contentText">
    <?php echo tep_break_string(tep_output_string_protected($reviews['reviews_text']), 60, '-<br />') . ((strlen($reviews['reviews_text']) >= 100) ? '..' : '') . '<br /><br /><i>' . sprintf(TEXT_REVIEW_RATING, html::img(DIR_WS_IMAGES . 'stars_' . $reviews['reviews_rating'] . '.gif', sprintf(TEXT_OF_5_STARS, $reviews['reviews_rating'])), sprintf(TEXT_OF_5_STARS, $reviews['reviews_rating'])) . '</i>'; ?>
  </div>

<?php
	}
} else {
?>

  <div class="contentText">
    <?php echo TEXT_NO_REVIEWS; ?>
  </div>

<?php
}

if (($reviews_split->number_of_rows > 0) && ((PREV_NEXT_BAR_LOCATION == '2') || (PREV_NEXT_BAR_LOCATION == '3'))) {
?>

  <div class="contentText">
    <p style="float: right;"><?php echo TEXT_RESULT_PAGE . ' ' . $reviews_split->display_links(MAX_DISPLAY_PAGE_LINKS, tep_get_all_get_params(array('page', 'info'))); ?></p>

    <p><?php echo $reviews_split->display_count(TEXT_DISPLAY_NUMBER_OF_REVIEWS); ?></p>
  </div>

<?php
}
?>

  <br />

  <div class="buttonSet">
    <span class="buttonAction"><?php echo html::button_jquery_ui(IMAGE_BUTTON_WRITE_REVIEW, 'comment', html::href_link(FILENAME_PRODUCT_REVIEWS_WRITE, tep_get_all_get_params()), 'primary'); ?></span>

    <?php echo html::button_jquery_ui(IMAGE_BUTTON_BACK, 'triangle-1-w', html::href_link(FILENAME_PRODUCT_INFO, tep_get_all_get_params())); ?>
  </div>
</div>
