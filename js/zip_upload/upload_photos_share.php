<?php
/*
��Ƭ�����ϴ�ͼƬ�ļ�
1.�Ƚ��ļ��浽/tmp
2.���û���д�������Ϣ����Ŵ浽images/reviews/
*/

$tmp_microtime = str_replace(array('.',' '),array('',''),microtime());
$new_name = 'detail_'.mt_rand().'_'.$tmp_microtime;

/*�����ļ�·��*/
$dir = $_SERVER['DOCUMENT_ROOT'].'/tmp/';
$http_url = 'http://'.$_SERVER['HTTP_HOST'].'/tmp/';

$headers = getallheaders();
$exc_name = preg_replace('/^.*\./','.',$headers['Image-Name']);
/*�ϴ����ļ�����*/
$new_name .= strtolower($exc_name);

$image_name = $dir.$new_name;
$file = fopen($image_name, 'wb');
if(fwrite($file, $GLOBALS['HTTP_RAW_POST_DATA'])=== FALSE){
	echo "0";
	exit();
}

include($_SERVER['DOCUMENT_ROOT'].'/includes/functions/webmakers_added_functions.php');
imageCompression($image_name,250, str_replace('detail_','thumb_',$image_name));

echo "1"."|".$new_name."|".$dir."|".$image_name."|".$http_url.$new_name."|".$http_url.str_replace('detail_','thumb_',$new_name);	//״̬��|�ļ���|Ŀ¼��|ȫ����Ŀ¼+�ļ���|ͼƬ��ַ|ͼƬ����ͼ
fclose($file);

?>