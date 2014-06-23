<?php
/**
 * 网站html页面头部代码
 * @package 
 */

//引入简繁体JS转换代码
$simplified_traditional_conversion_file = '';
if(strtolower(CHARSET)=='gb2312'){
	$simplified_traditional_conversion_file = 'big5_gb-min.js';
}elseif (strtolower(CHARSET)=='big5'){
	$simplified_traditional_conversion_file = 'gb_big5-min.js';
}
//引入当前页面独有的js文件和css文件
$tpl_fs_dir = TPL_DIR; //模板路径用于文件系统
$tpl_ws_dir = str_replace(DIR_FS_CATALOG,'',$tpl_fs_dir); //模板路径用于web

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
//取得js和css文件的版本号常量
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

//按钮图片的文件夹地址
$button_image_ws_dir = $tpl_ws_dir.'image/';
//$button_image_fs_dir = $tpl_fs_dir.'image/';
if(strtolower(CHARSET)=='big5'){
	$button_image_ws_dir = $tpl_ws_dir.'image/'.strtolower(CHARSET).'/';
}


//注意：根据YSlow的建议，此文件请不要再载入任何js文件了(jquery-1.4.2.min.js和$public_js除外)，放到页面底部载入，即：template_bottom.tpl.php文件中</body>之前的位置即可。
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
//页面下载时间测试
if (STORE_PAGE_PARSE_TIME == 'true' || ALERT_HTML_JS_CSS_PARSE_TIME == 'true') {
?>
var TDate = new Date();
var startTime = TDate.getTime();
<?php }?>
</script>

<?php
//处理前端人员自定义的js和css文件列表
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

//样式表文件载入start {
$public_css = $tpl_ws_dir.'css/public.css';
$v_public_css = $tpl_ws_dir.'css/public-'. (defined('CSS_VERSION') ? CSS_VERSION : '').'.css';
if(file_exists(DIR_FS_CATALOG.$v_public_css)){
	$public_css = $v_public_css;
}
$stylesheet_link = $public_css;
$stylesheet_link .= (isset($moreJsCss['CSS']) && $moreJsCss['CSS'] ? ','.$moreJsCss['CSS'] : '');
//载入表单验证代码的css
if($loadValidationEngine == true){
	$stylesheet_link .=','.'ext/formValidator.2.2/css/validationEngine.jquery.css';
}

//引入当前页面独有的css文件
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
//样式表文件载入end }
?>
<script type="text/javascript">
document.domain="<?php echo substr($_SERVER['SERVER_NAME'], strpos($_SERVER['SERVER_NAME'],'.',0)+1);?>";
</script>
<?php //载入js文件 start {?>
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
//载入js文件 end }
?>

<!--[if IE  6]>
	<script type="text/javascript" src="/tpl/www/js/supportHover.js"></script>
    <script src="/tpl/www/js/DD_belatedPNG_0.0.8a-mini.js"></script>
	<script type="text/javascript">
    	$(parseStylesheets); //让IE6支持hover伪类
        DD_belatedPNG.fix('.pngFix');	//让IE6PNG图片透明
	</script>
<![endif]-->
</head>

<body>
<?php if(!isset($_GET['onlybody']) || !$_GET['onlybody']){	//如果有这个参数代表只需要中间的内容模板?>
<div id="sitebg">
<!--************************************************************页眉**********************************************-->
    
	
	<div id="head">
    
		<div class="hd">
        	<div class="fl logo"><a href="" title="欢迎来到走四方网">走四方网</a></div>
            <div class="fl grade">
            	<a target="_blank" href="http://www.bbb.org/baton-rouge/business-reviews/travel-agencies-and-bureaus/unitedstars-international-ltd-in-baton-rouge-la-90012303">全球华人首选出国旅游网站<br>美国BBB认证最高商誉评级</a>
            </div>
            <div class="fr hdContact">
            	<ul>
				<?php
                //代理商服务电话信息
                echo $agents->agents_contact_telphone_text;
                ?>
                </ul>
            </div>
        </div>
	</div>
<?php }?>

<?php
$CentralContentId = 'body';
if($isIndexPage==true){
	$CentralContentId = 'hbody';
}
?>

    <div id="<?php echo $CentralContentId;?>">
<?php
//信息提示栏{
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
//信息提示栏}
?>