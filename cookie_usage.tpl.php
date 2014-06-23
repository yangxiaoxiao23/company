

<h1><?php echo HEADING_TITLE; ?></h1>

<div class="contentContainer">
  <div class="contentText">
    <div class="ui-widget infoBoxContainer" style=" width: 40%; float: right; padding: 0 0 10px 10px;">
      <div class="ui-widget-header infoBoxHeading"><?php echo BOX_INFORMATION_HEADING; ?></div>

      <div class="ui-widget-content infoBoxContents">
        <?php echo BOX_INFORMATION; ?>
      </div>
    </div>

    <?php echo TEXT_INFORMATION; ?>
  </div>

  <div class="buttonSet">
    <span class="buttonAction"><?php echo html::button_jquery_ui(IMAGE_BUTTON_CONTINUE, 'triangle-1-e', html::href_link(FILENAME_DEFAULT)); ?></span>
  </div>
</div>
