<?php
/**
 * ��վhtmlҳ��ͷ������
 * @package 
 */

//�������JSת������
$simplified_traditional_conversion_file = '';
if(strtolower(CHARSET)=='gb2312'){
	$simplified_traditional_conversion_file = 'big5_gb-min.js';
}elseif (strtolower(CHARSET)=='big5'){
	$simplified_traditional_conversion_file = 'gb_big5-min.js';
}
//���뵱ǰҳ����е�js�ļ���css�ļ�
$tpl_fs_dir = TPL_DIR; //ģ��·�������ļ�ϵͳ
$tpl_ws_dir = str_replace(DIR_FS_CATALOG,'',$tpl_fs_dir); //ģ��·������web

$current_js_file = '';
$fs_js_file = $tpl_fs_dir.'js/'.substr($tpl_content,0,strpos($tpl_content, '.')).'.js';
$ws_js_file = $tpl_ws_dir.'js/'.substr($tpl_content,0,strpos($tpl_content,'.')).'.js';

if(file_exists($fs_js_file)){
	$current_js_file = $ws_js_file;
}

$current_css_file = '';
$fs_css_file = $tpl_fs_dir.'css/'.substr($tpl_content,0,strpos($tpl_content,'.')).'.css';
$ws_css_file = $tpl_ws_dir.'css/'.substr($tpl_content,0,strpos($tpl_content,'.')).'.css';
if(file_exists($fs_css_file)){
	$current_css_file = $ws_css_file;
}
//ȡ��js��css�ļ��İ汾�ų���
if(file_exists($tpl_fs_dir.'version.txt') && $fileArray = file($tpl_fs_dir.'version.txt')){
	$fileArray = arrays::trim($fileArray);
	foreach ($fileArray as $val){
		if(strpos($val,'#')===false && strpos($val,'=')!==false){
			$_contents = arrays::trim(explode('=',$val));
			if(tep_not_null($_contents[0]) && tep_not_null($_contents[1])){
				define($DB->output($_contents[0]), $DB->output($_contents[1]));
			}
		}
	}
}

//��ťͼƬ���ļ��е�ַ
$button_image_ws_dir = $tpl_ws_dir.'image/';
//$button_image_fs_dir = $tpl_fs_dir.'image/';
if(strtolower(CHARSET)=='big5'){
	$button_image_ws_dir = $tpl_ws_dir.'image/'.strtolower(CHARSET).'/';
}

//ֻȡͷβʱҪ�ر�53KF�Ͱٶ�google���ٵ�
if($_GET['onlyheader'] || $_GET['onlyfooter']){
	$close53kf = true;
	$closeBaiduAnalytics = true;
	$closeGoogleAnalytics = true;
}

//ע�⣺����YSlow�Ľ��飬���ļ��벻Ҫ�������κ�js�ļ���(jquery-1.4.2.min.js��$public_js����)���ŵ�ҳ��ײ����룬����template_bottom.tpl.php�ļ���</body>֮ǰ��λ�ü��ɡ�
/**
 * @see includes/application_top.php
 */
global $languages_id, $breadcrumb, $messageStack, $cPath, $tpl_fs_dir, $tpl_content, $tpl_ws_dir, $loadValidationEngine, $request_type, $the_title, $the_desc, $the_key_words, $isIndexPage;
ob_start();
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" <?php #echo HTML_PARAMS; ?>>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=<?php echo CHARSET; ?>" />
<title><?php echo tep_output_string_protected($the_title); ?></title>
<meta name="Description" content="<?php echo tep_output_string_protected($the_desc); ?>" />
<meta name="Keywords" content="<?php echo tep_output_string_protected($the_key_words); ?>" />
<base href="<?php echo (($request_type == 'SSL') ? HTTPS_SERVER : HTTP_SERVER) . DIR_WS_CATALOG; ?>" />
<script type="text/javascript">
<?php 
//ҳ������ʱ�����
if (STORE_PAGE_PARSE_TIME == 'true' || ALERT_HTML_JS_CSS_PARSE_TIME == 'true') {
?>
var TDate = new Date();
var startTime = TDate.getTime();
<?php }?>
</script>



<?php
//����ǰ����Ա�Զ����js��css�ļ��б�
$more_js_css = array();
$moreJsCss = array();

$more_js_css_file = $tpl_fs_dir.'conf/'.preg_replace('/\..*/','',$tpl_content).'.conf';
if(file_exists($more_js_css_file)){
	$more_js_css = arrays::trim(file($more_js_css_file));
	$more_js_css = preg_replace('/[[:space:]]+/','',$more_js_css);
	$more_js_css = preg_replace('/#.*/','',$more_js_css);
	foreach ($more_js_css as $val){
		if(strpos($val,'#')===false && strpos($val,'=')!==false){
			$_array = explode('=',$val);
			if($_array[0] && $_array[1]){
				$moreJsCss[$_array[0]] = $_array[1];
			}
		}
	}
}

//��ʽ���ļ�����start {
$public_css = $tpl_ws_dir.'css/public.css';
$v_public_css = $tpl_ws_dir.'css/public-'. (defined('CSS_VERSION') ? CSS_VERSION : '').'.css';
if(file_exists(DIR_FS_CATALOG.$v_public_css)){
	$public_css = $v_public_css;
}
$stylesheet_link = $public_css;
$stylesheet_link .= (isset($moreJsCss['CSS']) && $moreJsCss['CSS'] ? ','.$moreJsCss['CSS'] : '');
//�������֤�����css
if($loadValidationEngine == true){
	$stylesheet_link .=','.'ext/formValidator.2.2/css/validationEngine.jquery.css';
}

//���뵱ǰҳ����е�css�ļ�
if(tep_not_null($current_css_file)){
	$v_current_css_file = DIR_FS_CATALOG.preg_replace('/\.css$/','',$current_css_file).'-'.(defined('CSS_VERSION') ? CSS_VERSION : '').'.css';
	if(file_exists($v_current_css_file)){
		$current_css_file = str_replace(DIR_FS_CATALOG,'',$v_current_css_file);
	}
	$stylesheet_link .=','.$current_css_file;
}
if (defined('DEBUG') && DEBUG == 'true') {

	if (isset($stylesheet_link)) {
		$js_arr = explode(',',$stylesheet_link);
		foreach($js_arr as $val) {
			if (strpos($val,'/') !== false) {
				$css_path = substr($val,0,strrpos($val,'/')+1);
				echo '<link rel="stylesheet" type="text/css" href="/' . $val . '" charset="utf-8"/>' . "\n";
			} else {
				if ($css_path) {
					echo '<link rel="stylesheet" type="text/css" href="/' . $css_path . $val . '" charset="utf-8"/>' . "\n";
				} else {
					echo '<link rel="stylesheet" type="text/css" href="/tpl/www/css/' . $val . '" charset="utf-8"/>' . "\n";
				}
			}
		}
	}
} else {
?>
<link rel="stylesheet" type="text/css" href="jscss??<?= $stylesheet_link;?>?t=<?= date('YmdHi')?>.css" charset="utf-8" />
<?php
}
//��ʽ���ļ�����end }
?>
<script type="text/javascript">
document.domain="<?php echo substr($_SERVER['SERVER_NAME'], strpos($_SERVER['SERVER_NAME'],'.',0)+1);?>";
var SEO_EXTENSION_SEPARATOR = '<?= SEO_EXTENSION_SEPARATOR?>';
</script>
<?php //����js�ļ� start {?>
<?php
$public_js = $tpl_ws_dir.'js/public.js';
$v_public_js = $tpl_ws_dir.'js/public-'.(defined('JS_VERSION') ? JS_VERSION : '').'.js';
if(file_exists(DIR_FS_CATALOG.$v_public_js)){
	$public_js = $v_public_js;
}
if (defined('DEBUG') && DEBUG == 'true') {
	echo '<script type="text/javascript" src="/ext/jquery/jquery-1.4.2.js" charset="utf-8"></script>' . "\n";
	echo '<script type="text/javascript" src="/' . $public_js . '" charset="utf-8"></script>' . "\n";

	if (isset($moreJsCss['HEAD_JS'])) {
		$js_arr = explode(',',$moreJsCss['HEAD_JS']);
		foreach($js_arr as $val) {
			if (strpos($val,'/') !== false) {
				$tep_path = substr($val,0,strrpos($val,'/')+1);
				echo '<script type="text/javascript" src="/' . $val . '" charset="utf-8"></script>' . "\n";
			} else {
				if ($tep_path) {
					echo '<script type="text/javascript" src="/' . $tep_path . $val . '" charset="utf-8"></script>' . "\n";
				} else {
					echo '<script type="text/javascript" src="/tpl/www/js/' . $val . '" charset="utf-8"></script>' . "\n";
				}
			}
		}
	}
} else {
?>
<script type="text/javascript" src="jscss??ext/jquery/jquery-1.4.2.min.js<?= (($public_js) ? ','.$public_js : '').(isset($moreJsCss['HEAD_JS']) && $moreJsCss['HEAD_JS'] ? ','.$moreJsCss['HEAD_JS'] : '');?>?t=<?= date('Ymd')?>.js" charset="utf-8"></script>
<?php
}
//����js�ļ� end }
?>
<!--[if IE  6]>
	<script type="text/javascript" src="/tpl/www/js/supportHover.js"></script>
    <script src="/tpl/www/js/DD_belatedPNG_0.0.8a-mini.js"></script>
	<script type="text/javascript">
    	$(parseStylesheets); //��IE6֧��hoverα��
        DD_belatedPNG.fix('.pngFix');	//��IE6PNGͼƬ͸��
	</script>
<![endif]-->
</head>

<body>
<div id="sitebg">
<?php if(!isset($_GET['onlybody']) && !isset($_GET['onlyfooter'])){	//ҳͷ?>

<!--************************************************************ҳü**********************************************-->
    <div id="topbar">
        <div class="uiWrap clear">
        	<div class="fl login-wrap" id="login-wrap">
            	<span class="bar-welcome pngFix">��ӭ�������ķ���������</span>
                <!--
                <span class="logout-status js-logout-status"><a href="">[��¼]</a><a href="">[���ע��]</a></span>
                <span class="login-status js-login-status">���ã�
                    <a class="login-name js-login-name">
                        <span class="simple-name">Gabriel Omar Batistuta Omar</span>
                        <span class="full-name">Gabriel Omar Batistuta Omar123123131312313123</span>
                    </a>
                    <a class="go-out" href="">[�˳�]</a>
                </span>
                <div class="register-succ-tooltip">
                    <p><strong>��ʾ��</strong>�𾴵Ļ�Ա�����ѵ�¼�������Ѿ����͵��������䣬����գ�</p>
                </div>-->
            </div>
            
            <div class="toolbar fr">
            	<!--
                <ul class="fl uhmenu">
					<li id="loginOrLogin" class="freeregister"></li>
					<script type="text/javascript">G.writeLoginInfo('<?= html::href_link_noseo('ajax.php','mod=login');?>');</script>
                    
					<li class="userhome">
                    	<a href="<?= html::href_link_noseo('account.php', '', 'SSL');?>">�û�����</a>
                        <div class="uhmenutree hide">
                        	<a href="<?= html::href_link_noseo('account_history.php', '', 'SSL');?>">�ҵĶ���</a>
                            <a href="">�ҵ��ղ�</a>
                        </div>
                    </li>
                </ul>
                <ul class="fl helpmenu">
					<li class="helpcenter"><a href="">��������</a></li>
                	<?php
					//���塢���塢English�水ť
					//echo tep_languages_button();
					?>
                </ul> -->
       
                <div class="bar-menu">
                    <ul class="menu-list">
                    	<li class="myusi" id="js-myusi">
                        	<div class="myusi-text">
                            	<a class="title" href="#"><span>�ҵ����ķ�</span></a>
                                <span class="down-arrow"><!----></span>
                                <span class="split">|</span>
                            </div>
                            <dl class="myusi-list">
                            	<dd><a href="<?= html::href_link_noseo('account_history.php', '', 'SSL');?>">�ҵĶ���</a></dd>
                                <dd><a href="">�ҵ��ղ�</a></dd>
                            </dl>
                        </li>
                        <li class="cart" id="js-cart">
                        	<div class="cart-bd">
                                <div class="cart-text pngFix">
                                    <a  class="title" href="<?= html::href_link_noseo(FILENAME_SHOPPING_CART);?>"><span>���ﳵ<strong class="total">0</strong></span></a>
                                    <span class="down-arrow"><!----></span>
                                    <span class="split">|</span>
                                </div>
                                
                                <div class="expand-shoppingcart">
                                    <dl class="cart-list" id="js-cart-list">
                                    </dl>
                                    
                                    <div class="product-total" id="js-pro-total">
                                        <span>��<em>0</em>����Ʒ ����ܼ�:</span><strong class="total">$0.00</strong>
                                    </div>
                                    <div class="goshoppingcart"><a href="<?= html::href_link_noseo(FILENAME_SHOPPING_CART);?>"><span>ȥ���ﳵ����</span></a></div>
                                </div>
                            </div>
                        </li>
                        <li class="weixin pngFix"><p><a href="#"><span class="title">΢��</span><span class="split">|</span></a></p>
                        	<div id="weixin-bg-wrap">
                            	<p class="arrow pngFix"><!----></p>
                                <div class="bg">
                                	<p class="desc">��΢�� ���Ż�</p>
                                </div>
                            </div>
                        </li>
                        <li class="phone-site pngFix"><a target="_blank" href="http://m.usitrip.com"><span class="title">�ֻ�վ</span><span class="split">|</span></a></li>
                        <li class="help pngFix"><a href="<?= html::href_link('faq_question.php');?>"><span class="title">��������</span></a></li>
                    </ul>
                </div>
                
                <script>
					G.getLoginStatus("<?= html::href_link_noseo('ajax.php','mod=login');?>");
				</script>
                
                <!-- ��������ѡ�� -->
				<?php
				if(!$lng){
					$lng = new language();
				}
				?>
                <div class="bar-language js-bar-language">
                	<div class="bar-language-bd">
                        <div class="selected-language <?= $lng->language['code']?> pngFix">
                            <a class="title" href="<?= $lng->get_url($lng->language['code'])?>"><span><?= $lng->language['name']?></span></a>
                            <span class="down-arrow"><!----></span>
                        </div>
                        
                        <ul class="site-language js-site-language">
                            <?php 
                            foreach((array)$lng->allow_langs as $k => $code){
                                if($lng->language['code'] != $code){
                            ?>
                            <li class="<?= $code?> pngFix"><a href="<?= $lng->get_url($code)?>"><span class="title"><?= $lng->catalog_languages[$code]['name']?></span></a></li>
                            <?php
                                }
                            }
                            ?>
                        </ul>
                    </div>
                </div>   
            </div>
            <!--
            <span class="topwords"><?php echo TOP_TIPS;?></span> -->
            
            
        </div>
    </div>
	
	<div id="head">
    
	<div class="hd">
        	<div class="fl logo"><a href="" title="��ӭ�������ķ���">���ķ���</a></div>
            <div class="fl grade">
            	<a target="_blank" href="http://www.bbb.org/baton-rouge/business-reviews/travel-agencies-and-bureaus/unitedstars-international-ltd-in-baton-rouge-la-90012303">ȫ������ѡ����������վ<br>����BBB��֤�����������</a>
            </div>
            <div class="fl hdsearch">
            	<form autocomplete="off" name="quick_find" action="<?= html::href_link_noseo(FILENAME_ADVANCED_SEARCH_RESULT, '', 'NONSSL', false)?>" method="get">
                	<input name="mod" type="hidden" value="advanced_search_result" />
					<div class="fl rel hdsearchIpt">
                        <?= html::input_field('w', TOP_SEARCH_TIPS, 'class="hdsearchWords" dataurl="'.html::href_link('ajax.php','action=keywordsQuickSearch').'" onfocus="if(this.value!=\''.TOP_SEARCH_TIPS.'\'){this.style.color=\'#404040\'}else{this.value=\'\';this.style.color=\'#404040\'}" onblur="if(this.value==\'\'){this.value=\''.TOP_SEARCH_TIPS.'\';this.style.color=\'#b6b7b9\'}"');?>
						<?= html::input_hidden_field('search_in_description', '1');?>
						<?= html::input_hidden_field('language_encoding', CHARSET);?>
						<?= html::input_hidden_session_id();?>
						<ul class="abs hdAutocomplete">
                        	
                        </ul>
						
                    </div>
                    <input type="submit" class="fr hdsearchSubmit" value="����" />
                </form>
            </div>
            <div class="fr hdContact">
            	<ul>
				<?php
                //�����̷���绰��Ϣ
                echo $agents->agents_contact_telphone_text;
                ?>
                </ul>
            </div>
        </div>
	<?php
	$_CategoriesIds = array('25','24','33','54','157','298','182','299','196');	//ע����Щ������Ŀ¼ID�����ں�̨categories.phpҳ��鵽 
	?>
    <div class="nav">
		<div class="nav_Ibox">
        	<ul class="navItems">
                <li id="menu_0"><a href="<?php echo html::href_link(FILENAME_DEFAULT);?>"><?php echo MENU_TITLE_TOP;?></a></li>
                <?php
				$_count = sizeof($_CategoriesIds);
				$_loop = 0;
				foreach($_CategoriesIds as $cId){
					$_loop++;
					$_class = '';
					if($_count == $_loop){
						$_class = 'last';
					}
				?>				
				<li id="menu_<?= $cId?>"><a href="<?php echo html::href_link(FILENAME_DEFAULT,'cPath='.$cId);?>"><?= tep_get_category_name($cId,$languages_id);?></a></li>
				<?php }?>
				<li id="menu_companion"><a href="<?php echo html::href_link('companions.php');?>">���ͬ��</a></li>
            </ul>
		</div>
            <div class="navbar">
                <dl class="fl navScenic">
                    <dt>���ž��㣺</dt>
                    
					<?php
					foreach($_CategoriesIds as $cId){
						$aid = $cId;
						if(in_array($cId,array('182','196'))) $aid = 0;
					?>
					<dd id="sub_menu_<?=$cId?>" class="display_none">
                        <?php echo tep_get_top_attractions_href($aid);?>
                    </dd>
					<?php }?>
					
                </dl>
				<script type="text/javascript">
				 <?php
				 //���Ʋ˵�����Class�����ž������ʾ
				 if((int)$cPath){
					$_cPath = preg_replace('/\_.+/','',$cPath);
				 	$_key = array_search($_cPath, $_CategoriesIds);
					if($_key !== false){
						$_cid = $_CategoriesIds[$_key];
						echo '$("#sub_menu_'.$_cid.'").show(); $("#menu_'.$_cid.'").addClass("current");'."\n"; $cPathOnly = $_cid;
					}
				 }else{
					 $cPathOnly = '0'; if($isIndexPage==true){ echo '$("#sub_menu_0").show(); document.getElementById("menu_0").className="current";'."\n";} else {
					 	echo 'document.getElementById("menu_companion").className="current";'."\n";
					 }
				 }
				 ?>
				 
				 </script>
				
				<?php
				//���ﳵС���� start {
				if(strpos($tpl_content,'shopping_cart')===false){
				?>
                <?php /*ע�⣺idΪCarSumTop��shopviewList��CarSumTop1��cartBoxTotal�⼸��Ԫ�ص����ݶ���ͨ��ajax�첽ȡ�õģ�������ЩID����ɾ����*/?>
				<div id="miniShopCartBox" class="fr shopcart">
                	<a href="<?php echo html::href_link_noseo(FILENAME_SHOPPING_CART);?>" class="fl shoptotal">���ﳵ<em id="CarSumTop">0</em>��</a>
                    <a href="<?php echo html::href_link_noseo('checkout.php', '', 'SSL');?>" class="fr shopbtn">ȥ����</a>
                    <div id="shopView" class="shopview hide">
                        <ul id="shopviewList" class="shopview_list">
                            <!--liӦ��ajaxȡ��-->
							<li>
                                <div class="fl shopview_pic">
                                    <a href="___ProductLinks___"><img ___src___="___ProductImgSrc___" alt="___ProductName___"></a>
                                </div>
                                <div class="shopview_info">
                                    <p><a class="g_title" href="___ProductLinks___" title="___ProductName___">___ProductName___</a></p>
                                    <p><em class="shop_price">___ProductFinalPrice___</em><a href="javascript:void(0);" onclick="___DelAction___" class="shop_del">ɾ��</a></p>
                                </div>
                            </li>
                        </ul>
                        <div class="shopview_account">
                            <p>����<em id="CarSumTop1">0</em>����Ʒ ����ܼƣ�<em id="cartBoxTotal" class="account_money">$00.00</em></p>
                            <a href="<?php echo html::href_link_noseo(FILENAME_SHOPPING_CART);?>" class="fr account_btn">ȥ���ﳵ������</a>
                        </div>
                    </div>
                </div>
				<?php
				}
				//���ﳵС���� end }
				?>
				
            </div>
        </div>
		
	
	</div>
<?php }?>

<?php
$CentralContentId = 'body';
if($isIndexPage==true){
	$CentralContentId = 'hbody';
}

if(!isset($_GET['onlyheader']) && !isset($_GET['onlyfooter'])){ //����
?>

    <div id="<?php echo $CentralContentId;?>">
<?php
//���м start {
if($isIndexPage!=true && (!isset($_GET['onlybody']) || !$_GET['onlybody'])) {
?>    
    <div id="position"><?php echo YOU_ARE_HERE.'&nbsp;&nbsp;' . $breadcrumb->trail(' &gt; '); ?></div>
<?php
}
//���м end }

//��Ϣ��ʾ��{
if ($messageStack->size('header') > 0) {
	echo '<div>' . $messageStack->output('header') . '</div>';
}

if (isset($_GET['error_message']) && tep_not_null($_GET['error_message'])) {
?>
<div><?php echo htmlspecialchars(stripslashes(urldecode($_GET['error_message']))); ?></div>
<?php
}

if (isset($_GET['info_message']) && tep_not_null($_GET['info_message'])) {
?>
<div><?php echo htmlspecialchars(stripslashes(urldecode($_GET['info_message']))); ?></div>
<?php
}
//��Ϣ��ʾ��}
}
?>