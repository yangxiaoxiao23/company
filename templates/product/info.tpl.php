<?php
//��Ʒ������Ϣ
//print_r($product['info']);

//��Ʒ��������
//print_r($product['departure']);

//��Ʒ����
//print_r($product['attributes']);
?>


<div>
  <h1 style="float: right;"><?php echo $product['info']['priceTag'];  //��Ʒ�۸�ע��������htmlӴ?></h1>
  <h1><?php echo $product['info']['products_name'].'['.$product['info']['products_model'].']'; //��Ʒ���ƺ��ͺ�?></h1>
</div>

<div>
<ul>
<?php
if($productProjectName['titleModel']){
?>
<li><?= $productProjectName['titleModel']?>��<?= $product['info']['products_model'];?></li>
<?php
}
if($productProjectName['titleDeparture']){
?>
<li><?= $productProjectName['titleDeparture']?>��<?= implode(', ',(array)$product['info']['startCity']);?></li>
<?php 
}
if($productProjectName['titleEndCity']){
?>
<li><?= $productProjectName['titleEndCity']?>��<?= implode(', ',(array)$product['info']['endCity']);?></li>
<?php 
}
if($productProjectName['titleViaAttractions']){
?>
<li><?= $productProjectName['titleViaAttractions']?>��<?= implode(', ',(array)$product['info']['attractionsCity']);?></li>
<?php 
}
if($productProjectName['titleDepartureDate']){
?>
<li><?= $productProjectName['titleDepartureDate']?>��<?= $product['info']['departureString'];?></li>
<?php
}
?>
<li>������������</li>
<?php 
if($productProjectName['titleProductsSmall']){
?>
<li><?= $productProjectName['titleProductsSmall']?>��<?= $product['info']['products_small_description'];?></li>
<?php
}
?>
</ul>
</div>

<div class="contentContainer">
  <div class="contentText">
<div>
ͼƬ��Ϣ
<img src="<?= $product['info']['productsImageThumbnailsSrc']; //��Ʒ����Сͼ?>" />
<img src="<?= $product['info']['productsImageSrc']; //��Ʒ�����ͼ?>" />
<?php
//��ƷͼƬ�����б�
for($i=0, $n=sizeof($product['info']['imagesList']); $i<$n; $i++){
?>
<img alt="Сͼ��<?= $product['info']['imagesList'][$i]['html_content']?>" src="<?= $product['info']['imagesList'][$i]['imageSrc']; //��ͼ?>" />
<img alt="��ͼ��<?= $product['info']['imagesList'][$i]['html_content']?>" src="<?= $product['info']['imagesList'][$i]['imageThumbnailsSrc']; //Сͼ?>" />
<?php
}
?>

</div>


<?php echo stripslashes($product['info']['products_description']); //��Ʒ��ϸ����?>

<?php //ע�⣺J_Calendarbox������Ӧ������ajax��ȡ��������ʵʱ����
if($productProjectName['titleDepartureDate']){
?>
<div id="J_Calendarbox">�����������С���</div>
<script type="text/javascript">
	G.getCalendarData("<?= html::href_link_noseo('ajax.php','mod=product_info','NONSSL');?>","<?= (int)$products_id;?>", "<?= date('Y')?>", "<?= date('m')?>");
</script>
<?php
}

//ע�⣺J_BookingBox������Ӧ������ajax��ȡ��
?>
<div class="fr pro-group-order">
<div class="pro-order-hd">
	<h3 class="fl">��������</h3>
</div>
<div id="J_BookingBox" class="pro-order-list">
�����С���
</div>
</div>
<?php //ʵʱ����J_BookingBox?>
<?php /* ���²��������ˣ����Ѿ�д��www/conf/product_info.conf�ļ�����
<script type="text/javascript" src="tpl/www/js/forms.js" charset="utf-8"></script>
<script type="text/javascript" src="tpl/www/js/booking_box.js" charset="utf-8"></script>
<link rel="stylesheet" type="text/css" href="tpl/www/css/booking_box.css" />
*/
?>
<script type="text/javascript">
$(document).ready(function(){
	var GET = URL.getParame();
	var url = "<?= html::href_link_noseo('ajax.php','mod=product_info','NONSSL');?>";
	if(!GET['products_id']){
		GET['products_id'] = "<?php echo $_GET['products_id'];?>";
	};
	G.getBookingBox(url,GET['products_id'],"J_BookingBox");
});	
</script>



    <div style="clear: both;"></div>

<?php
if ($product['info']['products_date_available'] > date('Y-m-d H:i:s')) {
?>

    <p style="text-align: center;"><?php echo sprintf(TEXT_DATE_AVAILABLE, tep_date_long($product['info']['products_date_available'])); ?></p>

<?php
}
?>

  </div>

  <div class="buttonSet">
  <div><a href="<?= html::href_link(FILENAME_PRODUCT_REVIEWS, tep_get_all_get_params());?>">���ۣ�<span id="ReviewNum"><?= Product::getReviewsCount($product['info']['products_id'])?></span>��</a></div>
  <div>�������<span id="ViewedNum"></span></div>
  <div>�ͻ���ѯ����<span id="QuestionNum"><?= Product::getQuestionNum($product['info']['products_id']);?></span></div>
  <div>��Ƭ����<span id="PhotoNum"><?= Product::getPhotoNum($product['info']['products_id']);?></span></div>
  </div>

<?php
//�ѱ�����Ĳ�Ʒ�б� start{
if ((USE_CACHE == 'true') && empty($SID)) {
	echo tep_cache_also_purchased(3600);
} else {
	include(DIR_WS_MODULES . FILENAME_ALSO_PURCHASED_PRODUCTS);
}
//�ѱ�����Ĳ�Ʒ�б� end}
?>
</div>

<?php //���²�Ʒ����������۵���Ϣ��ҳ�������Ϻ�����?>
<script type="text/javascript">
$().ready(function(){
	PI.getViewedReviewPhotoQuestionNum("<?= html::href_link_noseo('ajax.php','mod=product_info','NONSSL');?>","<?= (int)$products_id;?>");
});
</script>