<?php
/**
 * ��վ�м�͵ײ�ģ��
 */

//ȫ����ʾ��Ϣ
if ($messageStack->size('global') > 0) {
	echo $messageStack->output('global'); //[ȫ����ʾ]
}

//�����м�����ģ��
$tpl_file_smarty = preg_replace('@.tpl.php$@','.html',($tpl_fs_dir.$tpl_content));
$tpl_file_php = $tpl_fs_dir.$tpl_content;
if(!file_exists($tpl_file_smarty) && !file_exists($tpl_file_php)){
	$tmp_var = $tpl_fs_dir.'templates/'.str_replace(array('_','-'), array('/'), $tpl_content);
	$tpl_file_smarty = preg_replace('@.tpl.php$@','.html',$tmp_var);
	$tpl_file_php = $tmp_var;
	//echo $tpl_file_php;exit;
}

if(file_exists($tpl_file_smarty) ){
	require(_SMARTY_ROOT_."write_smarty_vars.php");
	$smarty->display($tpl_file_smarty);
	
}else if(file_exists($tpl_file_php) && tep_not_null($tpl_content)){
	include($tpl_file_php);
}else{
	throw new Exception('��ģ��'.$tpl_file_php);
}
?>

</div> <!-- id="body" �� id="hbody" ������ //-->

<?php if(!isset($_GET['onlybody']) || !$_GET['onlybody']){	//����������������ֻ��Ҫ�м������ģ��?>
<?php require(DIR_FS_INCLUDES . 'footer_for_check.php'); ?>

</div> <!-- id="sitebg" ������ //-->
<?php }?>

<?php
//�������֤�����js start {
if($loadValidationEngine == true){
	$_en = 'en';
	if(CHARSET=='gb2312'){ $_en = 'cn'; } elseif(CHARSET=='big5'){ $_en = 'tw'; }
?>
<script src="ext/formValidator.2.2/js/languages/jquery.validationEngine-<?php echo $_en?>.js" type="text/javascript" charset="utf-8"></script>
<script src="ext/formValidator.2.2/js/jquery.validationEngine.js" type="text/javascript" charset="utf-8"></script>
<?php 
}
//�������֤�����js end }

//�������JSת������ start {
if(tep_not_null($simplified_traditional_conversion_file)){
?>
<script type="text/javascript">
function jQuery_Enter(event,obj,fun){ var key = -1; if (event.which == null){ key = event.keyCode; }else{ key = event.which; } if(key==13){ eval("obj.value="+fun+"(obj.value)"); } return true; };
</script>
<script type="text/javascript" src="ext/simplified_traditional_conversion/<?php echo $simplified_traditional_conversion_file;?>" charset="utf-8"></script>
<?php
}
//�������JSת������ end }

//���뵱ǰҳ����е�js�ļ� start {
if(tep_not_null($current_js_file)){
	$v_current_js_file = DIR_FS_CATALOG . preg_replace('/\.js$/','',$current_js_file) . '-' . (defined('JS_VERSION') ? JS_VERSION : '') . '.js';
	if(file_exists($v_current_js_file)){
		$current_js_file = str_replace(DIR_FS_CATALOG,'',$v_current_js_file);
	}
?>
<script type="text/javascript" src="<?php echo $current_js_file;?>" charset="utf-8"></script>
<?php
}
//���뵱ǰҳ����е�js�ļ� end }
//��������Ҫ������js�ļ� start {

if(isset($moreJsCss['FOOT_JS']) && $moreJsCss['FOOT_JS']){

    if (defined('DEBUG') && DEBUG == 'true') {
        if (isset($moreJsCss['FOOT_JS'])) {
            $js_arr = explode(',',$moreJsCss['FOOT_JS']);
            foreach($js_arr as $val) {
                if (strpos($val,'/') !== false) {
                    $tep_path_header = substr($val,0,strrpos($val,'/')+1);
                    echo '<script type="text/javascript" src="/' . $val . '" charset="utf-8"></script>' . "\n";
                } else {
                        if ($tep_path_header) {
                            echo '<script type="text/javascript" src="/' . $tep_path_header . $val . '" charset="utf-8"></script>' . "\n";
                        } else {
                            echo '<script type="text/javascript" src="/tpl/www/js/' . $val . '" charset="utf-8"></script>' . "\n";
                        }
                }
            }
        }
    } else {
?>
<script type="text/javascript" src="<?php echo (strpos($moreJsCss['FOOT_JS'],',')!==false ? 'jscss??' : '').$moreJsCss['FOOT_JS'];?>" charset="utf-8"></script>
<?php
    }
}
//��������Ҫ������js�ļ� end }
?>
<?php if(DEBUG == 'true'){?>
<script charset="utf-8" src="/tpl/www/js/lwk.js" type="text/javascript"></script>
<?php }
if (isset($_SESSION['need_send_email']) && $_SESSION['need_send_email']) {?>
<script type="text/javascript">
	$.getJSON('<?=html::href_link_noseo('ajax.php','mod=mail_auto_send')?>&t=' + (new Date()).toString(),function(r){});
</script>
<?php }
?>
</body>
</html>
<?php
//ҳ������ʱ�����
if (STORE_PAGE_PARSE_TIME == 'true' || ALERT_HTML_JS_CSS_PARSE_TIME == 'true') {
?>
<script type="text/javascript">
$().ready(function(){
	var TDate1 = new Date();
	var startTime1 = TDate1.getTime();
	var qitaiTime =  'ǰ̨ҳ��ִ��ʱ�䣺'+(startTime1 - startTime)+'���룡';
	var serverTime = '������������ʱ��'+ $('#J-ParseTime').text()+"���룩 \t\n";
	alert(serverTime + "\n\n"+ qitaiTime);

});
</script>
<?php }?>
<?php
$htmlCodes = others::db_to_html(ob_get_clean());
if(ZIP_HTML_CODE_TO_ONE_LINE == 'true'){
	$htmlCodes = preg_replace('/[[:space:]]+/',' ',$htmlCodes); //ѹ������
	$htmlCodes = preg_replace('/<!--[^!]*-->/','',$htmlCodes);
	
}
echo $htmlCodes;
//д����̬��ҳ��
//ע�⣺�������������չ�����ļ���Ҫ��httpd�����ļ��а��ļ���Ĭ�ϴ���ʽ���ó�html��ʽ��DefaultType text/html
isset($USE_PAGE_CACHE) || $USE_PAGE_CACHE = false;
Cache_Html::createHtml($htmlCodes, $tpl_content, $USE_PAGE_CACHE);
unset($htmlCodes);

?>