

<h1><?php echo HEADING_TITLE; ?></h1>

<div class="contentContainer">
  <div class="contentText">

<?php
if (($specials_split->number_of_rows > 0) && ((PREV_NEXT_BAR_LOCATION == '1') || (PREV_NEXT_BAR_LOCATION == '3'))) {
?>

    <div>
      <span style="float: right;"><?php echo TEXT_RESULT_PAGE . ' ' . $specials_split->display_links(MAX_DISPLAY_PAGE_LINKS, tep_get_all_get_params(array('page', 'info', 'x', 'y'))); ?></span>

      <span><?php echo $specials_split->display_count(TEXT_DISPLAY_NUMBER_OF_SPECIALS); ?></span>
    </div>

    <br />

<?php
}
?>

    <table border="0" width="100%" cellspacing="0" cellpadding="2">
      <tr>
<?php
$row = 0;

while ($specials = $DB->fetch_array($specials_query)) {
	$row++;

	echo '        <td align="center" width="33%"><a href="' . html::href_link(FILENAME_PRODUCT_INFO, 'products_id=' . $specials['products_id']) . '">' . html::img(DIR_WS_IMAGES . $specials['products_image'], $specials['products_name'], SMALL_IMAGE_WIDTH, SMALL_IMAGE_HEIGHT) . '</a><br /><a href="' . html::href_link(FILENAME_PRODUCT_INFO, 'products_id=' . $specials['products_id']) . '">' . $specials['products_name'] . '</a><br /><del>' . $currencies->display_price($specials['products_price'], tep_get_tax_rate($specials['products_tax_class_id'])) . '</del><br /><span class="productSpecialPrice">' . $currencies->display_price($specials['specials_new_products_price'], tep_get_tax_rate($specials['products_tax_class_id'])) . '</span></td>' . "\n";

	if ((($row / 3) == floor($row / 3))) {
?>
      </tr>
      <tr>
<?php
	}
}
?>
      </tr>
    </table>

<?php
if (($specials_split->number_of_rows > 0) && ((PREV_NEXT_BAR_LOCATION == '2') || (PREV_NEXT_BAR_LOCATION == '3'))) {
?>

    <br />

    <div>
      <span style="float: right;"><?php echo TEXT_RESULT_PAGE . ' ' . $specials_split->display_links(MAX_DISPLAY_PAGE_LINKS, tep_get_all_get_params(array('page', 'info', 'x', 'y'))); ?></span>

      <span><?php echo $specials_split->display_count(TEXT_DISPLAY_NUMBER_OF_SPECIALS); ?></span>
    </div>

<?php
}
?>

  </div>
</div>