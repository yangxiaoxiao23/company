

<h1><?php if (isset($_GET['edit'])) { echo HEADING_TITLE_MODIFY_ENTRY; } elseif (isset($_GET['delete'])) { echo HEADING_TITLE_DELETE_ENTRY; } else { echo HEADING_TITLE_ADD_ENTRY; } ?></h1>


<?php
if (isset($_GET['delete'])) {
?>

<div class="contentContainer">
  <h2><?php echo DELETE_ADDRESS_TITLE; ?></h2>

  <div class="contentText">
    <p><?php echo DELETE_ADDRESS_DESCRIPTION; ?></p>

    <p><?php echo tep_address_label($customer_id, $_GET['delete'], true, ' ', '<br />'); ?></p>
  </div>

  <div>
    <span style="float: right;"><?php echo html::button_jquery_ui(IMAGE_BUTTON_DELETE, 'trash', html::href_link(FILENAME_ADDRESS_BOOK_PROCESS, 'delete=' . $_GET['delete'] . '&action=deleteconfirm&formid=' . md5($sessiontoken), 'SSL'), 'primary'); ?></span>

    <?php echo html::button_jquery_ui(IMAGE_BUTTON_BACK, 'triangle-1-w', html::href_link(FILENAME_ADDRESS_BOOK, '', 'SSL')); ?>
  </div>
</div>

<?php
} else {
?>

<?php echo html::form('addressbook', html::href_link_noseo(FILENAME_ADDRESS_BOOK_PROCESS, (isset($_GET['edit']) ? 'edit=' . $_GET['edit'] : ''), 'SSL'), 'post', 'onsubmit="return check_form(addressbook);"', true); ?>

<div class="contentContainer">

<?php include(DIR_WS_MODULES . 'address_book_details.php'); ?>

<?php
if (isset($_GET['edit']) && is_numeric($_GET['edit'])) {
?>

  <div>
    <span style="float: right;"><?php echo html::input_hidden_field('action', 'update') . html::input_hidden_field('edit', $_GET['edit']) . html::button_jquery_ui(IMAGE_BUTTON_UPDATE, 'refresh', null, 'primary'); ?></span>

    <?php echo html::button_jquery_ui(IMAGE_BUTTON_BACK, 'triangle-1-w', html::href_link(FILENAME_ADDRESS_BOOK, '', 'SSL')); ?>
  </div>

<?php
} else {
	if (sizeof($navigation->snapshot) > 0) {
		$back_link = html::href_link($navigation->snapshot['page'], tep_array_to_string($navigation->snapshot['get'], array(tep_session_name())), $navigation->snapshot['mode']);
	} else {
		$back_link = html::href_link(FILENAME_ADDRESS_BOOK, '', 'SSL');
	}
?>

  <div class="buttonSet">
    <span class="buttonAction"><?php echo html::input_hidden_field('action', 'process') . html::button_jquery_ui(IMAGE_BUTTON_CONTINUE, 'triangle-1-e', null, 'primary'); ?></span>

    <?php echo html::button_jquery_ui(IMAGE_BUTTON_BACK, 'triangle-1-w', $back_link); ?>
  </div>

<?php
}
?>

</div>

</form>

<?php
}
?>