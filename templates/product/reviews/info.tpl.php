<div>
  <h1 style="float: right;"><?php echo $products_price; ?></h1>
  <h1><?php echo $products_name; ?></h1>
</div>

<div class="contentContainer">

<?php
if (tep_not_null($review['products_image'])) {
?>

  <div style="float: right; width: <?php echo SMALL_IMAGE_WIDTH+20; ?>px; text-align: center;">
    <?php echo '<a href="' . html::href_link(FILENAME_PRODUCT_INFO, 'products_id=' . $review['products_id']) . '">' . html::img(DIR_WS_IMAGES . $review['products_image'], addslashes($review['products_name']), SMALL_IMAGE_WIDTH, SMALL_IMAGE_HEIGHT, 'hspace="5" vspace="5"') . '</a>'; ?>

    <p><?php echo html::button_jquery_ui(IMAGE_BUTTON_IN_CART, 'cart', html::href_link(basename($PHP_SELF), tep_get_all_get_params(array('action')) . 'action=buy_now')); ?></p>
  </div>

<?php
}
?>

  <div>
    <span style="float: right;"><?php echo sprintf(TEXT_REVIEW_DATE_ADDED, tep_date_long($review['date_added'])); ?></span>
    <h2><?php echo sprintf(TEXT_REVIEW_BY, tep_output_string_protected($review['customers_name'])); ?></h2>
  </div>

  <div class="contentText">
    <?php echo tep_break_string(nl2br(tep_output_string_protected($review['reviews_text'])), 60, '-<br />') . '<br /><br /><i>' . sprintf(TEXT_REVIEW_RATING, html::img(DIR_WS_IMAGES . 'stars_' . $review['reviews_rating'] . '.gif', sprintf(TEXT_OF_5_STARS, $review['reviews_rating'])), sprintf(TEXT_OF_5_STARS, $review['reviews_rating'])) . '</i>'; ?>
  </div>

  <br />

  <div class="buttonSet">
    <span class="buttonAction"><?php echo html::button_jquery_ui(IMAGE_BUTTON_WRITE_REVIEW, 'comment', html::href_link(FILENAME_PRODUCT_REVIEWS_WRITE, tep_get_all_get_params(array('reviews_id'))), 'primary'); ?></span>

    <?php echo html::button_jquery_ui(IMAGE_BUTTON_BACK, 'triangle-1-w', html::href_link(FILENAME_PRODUCT_REVIEWS, tep_get_all_get_params(array('reviews_id')))); ?>
  </div>
</div>
