
<h1><?php echo HEADING_TITLE; ?></h1>

<?php echo html::form('account_newsletter', html::href_link_noseo(FILENAME_ACCOUNT_NEWSLETTERS, '', 'SSL'), 'post', '', true) . html::input_hidden_field('action', 'process'); ?>

<div class="contentContainer">
  <h2><?php echo MY_NEWSLETTERS_TITLE; ?></h2>

  <div class="contentText">
    <table border="0" cellspacing="2" cellpadding="2">
      <tr>
        <td><?php echo html::input_checkbox_field('newsletter_general', '1', (($newsletter['customers_newsletter'] == '1') ? true : false), 'onclick="checkBox(\'newsletter_general\')"'); ?></td>
        <td><strong><?php echo MY_NEWSLETTERS_GENERAL_NEWSLETTER; ?></strong><br /><?php echo MY_NEWSLETTERS_GENERAL_NEWSLETTER_DESCRIPTION; ?></td>
      </tr>
    </table>
  </div>

  <div class="buttonSet">
    <span class="buttonAction"><?php echo html::button_jquery_ui(IMAGE_BUTTON_CONTINUE, 'triangle-1-e', null, 'primary'); ?></span>

    <?php echo html::button_jquery_ui(IMAGE_BUTTON_BACK, 'triangle-1-w', html::href_link(FILENAME_ACCOUNT, '', 'SSL')); ?>
  </div>
</div>

</form>

