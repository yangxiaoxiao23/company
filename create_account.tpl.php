<?php
//创建账户页面模板文件。创建人aBen by 2012-01-06
//验证码 需要验证码的页面模板必须加载
VerificationCode::verification_code_script(5);

echo html::form('create_account', html::href_link_noseo(FILENAME_CREATE_ACCOUNT,'', 'SSL'), 'post', ' id="create_account" ', true) . html::input_hidden_field('action', 'process'); ?>

<div id="registered">
    		<div class="tip"><?php echo sprintf(TEXT_ORIGIN_LOGIN, html::href_link_noseo(FILENAME_LOGIN, tep_get_all_get_params(array('mod')), 'SSL')); ?></div>
            <div class="input">
            <dl>
            <dt><em class="color_orange">*</em> <?php echo FORM_EMAIL ?>:</dt>
            <dd><?php echo html::input_field('email_address','','id="email_address" class="validate[required,custom[email]] box1" '); ?><span class="color_b3b3b3"><?php echo FORM_EMAIL_TIP ?></span></dd>
            </dl>
            
            <dl>
            <dt><em class="color_orange">*</em> <?php echo FORM_PWD ?>:</dt>
            <dd>
              <?php echo html::input_password_field('password','','id="password" class="validate[required,minSize[5],maxSize[12]] box1" ') ; ?>
            <span class="color_b3b3b3"><?php echo FORM_PWD_TIP ?> </span></dd>
            </dl>
            
             <dl>
            <dt><em class="color_orange">*</em> <?php echo FORM_PWDCONFIM ?>:</dt>
            <dd><?php echo html::input_password_field('confirmation','','id="confirmation" class="validate[required,equals[password]] box1" '); ?><span class="color_b3b3b3"><?php echo FORM_PWDCONFIM_TIP ?></span></dd>
            </dl>
            
            <dl>
            <dt><em class="color_orange"> </em> <?php echo FORM_MOBILEPHONE ?>:</dt>
            <dd><?php echo html::input_field('mobilephone','','id="mobilephone" class="validate[optional,minSize[10]] box1" '); ?><span class="color_b3b3b3"><?php echo FORM_MOBILEPHONE_TIP ?></span></dd>
      		</dl>

      <?php if(VERIFICATION_CODE_ENABLE==='1'){?>    
      <dl>
            <dt><em class="color_orange">*</em> <?php echo FORM_VERIFYCODE ?>:</dt>
        <dd class="verification" >
          <?php echo html::input_field('verification_code','',' class="box2" '); ?>
          <img src="<?php echo html::href_link('display.php');?>" alt="Word Verification" name="refreshVerift" align="middle" id="refreshVerift" style="cursor:pointer;vertical-align:middle;" onClick="javascript:reloadcode();" >        
      </dl>
      <?php }?>
            <dl><dt></dt><dd>
			<input type="image" src="<?php echo $button_image_ws_dir;?>registed_an.jpg" name="" title="<?php echo IMAGE_BUTTON_AGREE;?>" value="" >
			
			</dd></dl>
            </div>
            <div class="agreement"><p><?php echo TEXT_AGREEMENT ?></p>
              <textarea name="textarea" cols="" rows="" class="box"></textarea>
      </div>
    </div>
</form>
<input type=hidden name=img_num id=img_num value="<?php echo $img_num;?>" />
<script type="text/javascript">
jQuery(document).ready(function(){
	// binds form submission and fields to the validation engine
	jQuery("#create_account").validationEngine();
});
</script>