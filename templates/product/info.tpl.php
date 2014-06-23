<?php
//产品基本信息
//print_r($product['info']);

//产品出发日期
//print_r($product['departure']);

//产品属性
//print_r($product['attributes']);
?>


<div>
  <h1 style="float: right;"><?php echo $product['info']['priceTag'];  //产品价格，注意里面有html哟?></h1>
  <h1><?php echo $product['info']['products_name'].'['.$product['info']['products_model'].']'; //产品名称和型号?></h1>
</div>

<div>
<ul>
<?php
if($productProjectName['titleModel']){
?>
<li><?= $productProjectName['titleModel']?>：<?= $product['info']['products_model'];?></li>
<?php
}
if($productProjectName['titleDeparture']){
?>
<li><?= $productProjectName['titleDeparture']?>：<?= implode(', ',(array)$product['info']['startCity']);?></li>
<?php 
}
if($productProjectName['titleEndCity']){
?>
<li><?= $productProjectName['titleEndCity']?>：<?= implode(', ',(array)$product['info']['endCity']);?></li>
<?php 
}
if($productProjectName['titleViaAttractions']){
?>
<li><?= $productProjectName['titleViaAttractions']?>：<?= implode(', ',(array)$product['info']['attractionsCity']);?></li>
<?php 
}
if($productProjectName['titleDepartureDate']){
?>
<li><?= $productProjectName['titleDepartureDate']?>：<?= $product['info']['departureString'];?></li>
<?php
}
?>
<li>促销活动：促销活动</li>
<?php 
if($productProjectName['titleProductsSmall']){
?>
<li><?= $productProjectName['titleProductsSmall']?>：<?= $product['info']['products_small_description'];?></li>
<?php
}
?>
</ul>
</div>

<div class="contentContainer">
  <div class="contentText">
<div>
图片信息
<img src="<?= $product['info']['productsImageThumbnailsSrc']; //产品封面小图?>" />
<img src="<?= $product['info']['productsImageSrc']; //产品封面大图?>" />
<?php
//产品图片具体列表
for($i=0, $n=sizeof($product['info']['imagesList']); $i<$n; $i++){
?>
<img alt="小图：<?= $product['info']['imagesList'][$i]['html_content']?>" src="<?= $product['info']['imagesList'][$i]['imageSrc']; //大图?>" />
<img alt="大图：<?= $product['info']['imagesList'][$i]['html_content']?>" src="<?= $product['info']['imagesList'][$i]['imageThumbnailsSrc']; //小图?>" />
<?php
}
?>

</div>


<?php echo stripslashes($product['info']['products_description']); //产品详细描述?>

<?php //注意：J_Calendarbox的内容应该是用ajax读取！并且是实时载入
if($productProjectName['titleDepartureDate']){
?>
<div id="J_Calendarbox">大日历载入中……</div>
<script type="text/javascript">
	G.getCalendarData("<?= html::href_link_noseo('ajax.php','mod=product_info','NONSSL');?>","<?= (int)$products_id;?>", "<?= date('Y')?>", "<?= date('m')?>");
</script>
<?php
}

//注意：J_BookingBox的内容应该是用ajax读取！
?>
<div class="fr pro-group-order">
<div class="pro-order-hd">
	<h3 class="fl">立即订购</h3>
</div>
<div id="J_BookingBox" class="pro-order-list">
载入中……
</div>
</div>
<?php //实时载入J_BookingBox?>
<?php /* 以下不用引入了，在已经写在www/conf/product_info.conf文件中了
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
  <div><a href="<?= html::href_link(FILENAME_PRODUCT_REVIEWS, tep_get_all_get_params());?>">评论（<span id="ReviewNum"><?= Product::getReviewsCount($product['info']['products_id'])?></span>）</a></div>
  <div>点击数：<span id="ViewedNum"></span></div>
  <div>客户咨询数：<span id="QuestionNum"><?= Product::getQuestionNum($product['info']['products_id']);?></span></div>
  <div>相片数：<span id="PhotoNum"><?= Product::getPhotoNum($product['info']['products_id']);?></span></div>
  </div>

<?php
//已被购买的产品列表 start{
if ((USE_CACHE == 'true') && empty($SID)) {
	echo tep_cache_also_purchased(3600);
} else {
	include(DIR_WS_MODULES . FILENAME_ALSO_PURCHASED_PRODUCTS);
}
//已被购买的产品列表 end}
?>
</div>

<?php //更新产品浏览量、评论等信息，页面加载完毕后载入?>
<script type="text/javascript">
$().ready(function(){
	PI.getViewedReviewPhotoQuestionNum("<?= html::href_link_noseo('ajax.php','mod=product_info','NONSSL');?>","<?= (int)$products_id;?>");
});
</script>