

<h1><?php echo sprintf(HEADING_TITLE, $product_info['products_name']); ?></h1>

<?php
if ($messageStack->size('friend') > 0) {
	echo $messageStack->output('friend');
}
?>

<?php echo html::form('email_friend', html::href_link_noseo(FILENAME_TELL_A_FRIEND, 'action=process&products_id=' . (int)$_GET['products_id']), 'post', '', true); ?>

<div class="contentContainer">
  <div>
    <span class="inputRequirement" style="float: right;"><?php echo FORM_REQUIRED_INFORMATION; ?></span>
    <h2><?php echo FORM_TITLE_CUSTOMER_DETAILS; ?></h2>
  </div>

  <div class="contentText">
    <table border="0" cellspacing="2" cellpadding="2" width="100%">
      <tr>
        <td class="fieldKey"><?php echo FORM_FIELD_CUSTOMER_NAME; ?></td>
        <td class="fieldValue"><?php echo html::input_field('from_name'); ?></td>
      </tr>
      <tr>
        <td class="fieldKey"><?php echo FORM_FIELD_CUSTOMER_EMAIL; ?></td>
        <td class="fieldValue"><?php echo html::input_field('from_email_address'); ?></td>
      </tr>
    </table>
  </div>

  <h2><?php echo FORM_TITLE_FRIEND_DETAILS; ?></h2>

  <div class="contentText">
    <table border="0" cellspacing="2" cellpadding="2" width="100%">
      <tr>
        <td class="fieldKey"><?php echo FORM_FIELD_FRIEND_NAME; ?></td>
        <td class="fieldValue"><?php echo html::input_field('to_name') . '&nbsp;<span class="inputRequirement">' . ENTRY_FIRST_NAME_TEXT . '</span>'; ?></td>
      </tr>
      <tr>
        <td class="fieldKey"><?php echo FORM_FIELD_FRIEND_EMAIL; ?></td>
        <td class="fieldValue"><?php echo html::input_field('to_email_address') . '&nbsp;<span class="inputRequirement">' . ENTRY_EMAIL_ADDRESS_TEXT . '</span>'; ?></td>
      </tr>
    </table>
  </div>

  <h2><?php echo FORM_TITLE_FRIEND_MESSAGE; ?></h2>

  <div class="contentText">
    <table border="0" cellspacing="2" cellpadding="2" width="100%">
      <tr>
        <td class="fieldValue"><?php echo html::textarea_field('message', 'soft', 40, 8); ?></td>
      </tr>
    </table>
  </div>

  <div class="buttonSet">
    <span class="buttonAction"><?php echo html::button_jquery_ui(IMAGE_BUTTON_CONTINUE, 'triangle-1-e', null, 'primary'); ?></span>

    <?php echo html::button_jquery_ui(IMAGE_BUTTON_BACK, 'triangle-1-w', html::href_link(FILENAME_PRODUCT_INFO, 'products_id=' . (int)$_GET['products_id'])); ?>
  </div>
</div>

</form>
