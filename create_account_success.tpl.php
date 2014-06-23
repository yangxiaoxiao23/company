  <link href="./tpl/www/css/login_registed.css" rel="stylesheet" type="text/css" />
  <!--***********登陆内容**********-->
  <div id="logining">
    <div id="login_registed">
        <div class="cont success" style=" padding:0">
           	<p class="contBox"><span class=" font_size24 font_family font_bold color_orange">注册成功！</span><br /><span class="font_size14">您已注册成功，页面将在<em class="color_orange">10</em>秒后自动转到注册前页面。</span><hr />
您也可以进入<?php echo '<a href="' . html::href_link(FILENAME_ACCOUNT, '', 'SSL') . '">' . '用户中心' . '</a>'; ?>编辑个人信息，补足个人信息会奖励积分哦。</p>
        </div>
      <div class="del_float"></div>
    </div>   
  </div>
  <?php echo '<script language="javascript">setTimeout("window.location.href=\"'.$origin_href.'\"", 10000);</script>';?>

