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
<?php if(!isset($_GET['onlybody']) || !$_GET['onlybody']){	//����������������ֻ��Ҫ�м������ģ��?>
<div id="sitebg">
<!--************************************************************ҳü**********************************************-->
    
	
	<div id="head">
    
		<div class="hd">
        	<div class="fl logo"><a href="" title="��ӭ�������ķ���">���ķ���</a></div>
            <div class="fl grade">
            	<a target="_blank" href="http://www.bbb.org/baton-rouge/business-reviews/travel-agencies-and-bureaus/unitedstars-international-ltd-in-baton-rouge-la-90012303">ȫ������ѡ����������վ<br>����BBB��֤�����������</a>
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
?>