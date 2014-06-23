<?php
//登录页面模板文件。创建人Howard by 2012-01-06

echo html::form('login_form', html::href_link_noseo(FILENAME_LOGIN, 'action=process', 'SSL'), 'post', ' id="login_form" ', true); 
?>
<div id="logining">
  <div id="login">
          <div class="login_left">
              <ul>
              <li><em class="font_size14"><?php echo ENTRY_USER_ACCOUNT; ?></em>
              <?php echo html::input_field('email_address', '', 'id="email_address" class="validate[required] box1 inset_shadow"'); ?>
              <span class="color_b3b3b3"><?php echo EMAIL_ADDRESS_TIPS?></span>
              
              </li>
              <li><em class="font_size14"><?php echo ENTRY_PASSWORD; ?></em>
              <?php echo html::input_password_field('password','','id="password" class="validate[required] box1 inset_shadow"'); ?>
              <span class="color_orange"><a href="<?php echo html::href_link(FILENAME_PASSWORD_FORGOTTEN, '', 'SSL');?>"><?php echo TEXT_PASSWORD_FORGOTTEN?></a></span></li>
              <li class="paddingL45">
              <label><?php echo html::input_checkbox_field('record_user','1',false,'class="box2"');?>&nbsp;<?php echo RECORD_USER_NAME;?></label>&nbsp;&nbsp;&nbsp;&nbsp;
              </li>
              <li class="paddingL45">
              <input type="image" src="<?php echo $button_image_ws_dir;?>login_an.jpg" name="" title="<?php echo IMAGE_BUTTON_LOGIN;?>" value="<?php echo IMAGE_BUTTON_LOGIN;?>" >
              </li>
              </ul>
          </div>
          <div class="login_right">
              <p class="color_b3b3b3"><?php echo RIGHT_BOX_TEXT;?></p>
              <a href="<?php echo html::href_link(FILENAME_CREATE_ACCOUNT, '', 'SSL');?>" title="<?php echo FREE_REGISTRATION;?>"><img alt="<?php echo FREE_REGISTRATION;?>" src="<?php echo $button_image_ws_dir;?>login_an2.jpg" /></a>
          </div> 
          <div class="del_float"></div>
      </div>
</div>
</form>

<script type="text/javascript">
jQuery(document).ready(function(){
	// binds form submission and fields to the validation engine
	jQuery("#login_form").validationEngine();
});
</script>