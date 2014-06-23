<?php /* 订单预订成功模板 */?>

<h1>您已预订完成，您的订单号为：<?= $data['orderInfo']['orders_id']?>。现在您可以选择一种支付方式去支付您的订单了。</h1>
<h1>温馨提示：感谢您预定美国走四方的旅游行程！请在1-2个工作日内完成支付，在完成付款前，您的预定未被保留。</h1>
<?php if($data['orderInfo']['isTravelCompanion'] === true){	//结伴同旅游订单提示?>
<h1>注意：结伴同游订单中同游客人不需再订购，只需登录账户，支付结伴同游订单即可。</h1>
<?php }?>
<h1>
旅游保险
游保险！目前走四方网提供三种旅游保险：<br>·基本险（Basic Limited Coverage）<br>·中等险（Plus Quality Coverage）<br>·高级险（Elite Superior Coverage）<br>请点击旅游保险，了解详情。
请点击<a href="<?= html::href_link('insurance.php');?>" target="_blank">旅游保险</a>，了解详情。
</h1>
<h1>
旅美须知
1.我们建议您在收到确认电子旅游票后再预订您的机票，在订购完机票后请回到本网站www.usitrip.com “我的账户”里面补填机票信息以便导游接机。<br>2. 按出发日不同,行程次序可能前后稍作调整。<br>3. 出发前请详细检查您的行李及确定旅行证件齐全。更多信息,请查看<a href="<?= html::href_link('tour_america_need.php') ?>" target="_blank">帮助中心。</a>
</h1>


<?php
//订单成功的提示信息
?>

<?php
//支付模块
//print_r($data['PaymentsList']);exit;
?>
<div id="J_PaymentModuleList">
<?php if($data['PaymentsList']){?>
	<form name="J_PaymentModuleListForm" action="<?= html::href_link_noseo(FILENAME_CHECKOUT_SUCCESS, 'action=update', 'SSL');?>" enctype="multipart/form-data" method="post">
	<ul style="display:block; width:100%; clear:both;">
	<?php for($i=0, $n=sizeof($data['PaymentsList']); $i<$n; $i++){?>
		<li currency="<?= implode(',', (array)$data['PaymentsList'][$i]['currency']);?>"><label><input name="payments_id" type="radio" value="<?= $data['PaymentsList'][$i]['id']?>" /> <?= $data['PaymentsList'][$i]['module']?></label></li>
	<?php }?>
	</ul>
		<input name="orders_id" type="hidden" value="<?= $data['orderInfo']['orders_id']?>" />
		<input name="money" type="hidden" value="<?= $data['orderNeedPay']?>" />
		<input name="action" type="hidden" value="topay" />
		<button type="submit">确定，去支付</button>
	</form>
<?php }?>
</div>