<?php
//网站首页模板文件。创建人Howard by 2012-01-30
?>

<h1><?php echo HEADING_TITLE; ?></h1>

<div class="contentContainer">
  

<?php
    if (tep_not_null(TEXT_MAIN)) {
?>

  <div class="contentText">
    <?php echo TEXT_MAIN; ?>
  </div>

<?php
    }

    include(DIR_WS_MODULES . FILENAME_NEW_PRODUCTS);
    include(DIR_WS_MODULES . FILENAME_UPCOMING_PRODUCTS);
?>

</div>
