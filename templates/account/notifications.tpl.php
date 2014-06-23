<h1><?php echo HEADING_TITLE; ?></h1>

<?php echo html::form('account_notifications', html::href_link_noseo(FILENAME_ACCOUNT_NOTIFICATIONS, '', 'SSL'), 'post', '', true) . html::input_hidden_field('action', 'process'); ?>

<div class="contentContainer">
  <h2><?php echo MY_NOTIFICATIONS_TITLE; ?></h2>

  <div class="contentText">
    <?php echo MY_NOTIFICATIONS_DESCRIPTION; ?>
  </div>

  <h2><?php echo GLOBAL_NOTIFICATIONS_TITLE; ?></h2>

  <div class="contentText">
    <table border="0" width="100%" cellspacing="0" cellpadding="2">
      <tr>
        <td width="30"><?php echo html::input_checkbox_field('product_global', '1', (($global['global_product_notifications'] == '1') ? true : false), 'onclick="checkBox(\'product_global\')"'); ?></td>
        <td><strong><?php echo GLOBAL_NOTIFICATIONS_TITLE; ?></strong><br /><?php echo GLOBAL_NOTIFICATIONS_DESCRIPTION; ?></td>
      </tr>
    </table>
  </div>

<?php
if ($global['global_product_notifications'] != '1') {
?>

  <h2><?php echo NOTIFICATIONS_TITLE; ?></h2>

  <div class="contentText">

<?php
$products_check_query = $DB->query("select count(*) as total from " . TABLE_PRODUCTS_NOTIFICATIONS . " where customers_id = '" . (int)$customer_id . "'");
$products_check = $DB->fetch_array($products_check_query);
if ($products_check['total'] > 0) {
?>

    <div><?php echo NOTIFICATIONS_DESCRIPTION; ?></div>

    <table border="0" width="100%" cellspacing="0" cellpadding="2">

<?php
$counter = 0;
$products_query = $DB->query("select pd.products_id, pd.products_name from " . TABLE_PRODUCTS_DESCRIPTION . " pd, " . TABLE_PRODUCTS_NOTIFICATIONS . " pn where pn.customers_id = '" . (int)$customer_id . "' and pn.products_id = pd.products_id and pd.language_id = '" . (int)$languages_id . "' order by pd.products_name");
while ($products = $DB->fetch_array($products_query)) {
?>

      <tr>
        <td width="30"><?php echo html::input_checkbox_field('products[' . $counter . ']', $products['products_id'], true, 'onclick="checkBox(\'products[' . $counter . ']\')"'); ?></td>
        <td><strong><?php echo $products['products_name']; ?></strong></td>
      </tr>

<?php
$counter++;
}
?>

    </table>

<?php
} else {
?>

    <div>
      <?php echo NOTIFICATIONS_NON_EXISTING; ?>
    </div>

<?php
}
?>

  </div>

<?php
}
?>

  <div class="buttonSet">
    <span class="buttonAction"><?php echo html::button_jquery_ui(IMAGE_BUTTON_CONTINUE, 'triangle-1-e', null, 'primary'); ?></span>

    <?php echo html::button_jquery_ui(IMAGE_BUTTON_BACK, 'triangle-1-w', html::href_link(FILENAME_ACCOUNT, '', 'SSL')); ?>
  </div>
</div>

</form>