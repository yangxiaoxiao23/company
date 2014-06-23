
<form name="checkout_contact" id="checkout_contact" action="<?= html::href_link_noseo(FILENAME_CHECKOUT_CONFIRMATION, '', 'SSL')?>" method="post" enctype="multipart/form-data" onsubmit="submit_contact(); return false;">

<p class="title">订购留言</p>
<div class="contentText" id="order_comments">
<div style="display:<?= 'none'; //联系人信息暂隐藏，但数据要保留，以便生成订单时记录！?>">
<label>姓名：<?= html::input_field('customers_name',$customers_name,'size="20"');?></label> <label>电话：<?= html::input_num_en_field('customers_telephone',$customers_telephone,'size="20"');?></label> <label>Email：<?= html::input_num_en_field('customers_email_address',$customers_email_address,'size="20"');?></label>
<em>请填写您的姓名、联系电话和Email等信息！</em>
</div>

<?php  echo html::textarea_field('comments', 'soft', '60', '3', $comments, 'class="comments" placeholder="如您对行程有特殊要求，请务必在此留言，以便我们尽量安排。"'); ?> 



</div>
<div class="action"><button type="submit">保存订购留言</button></div>
</form>

<script type="text/javascript">
/*提交联系信息*/
function submit_contact(){
	var _url = "<?= html::href_link_noseo('ajax.php','mod=checkout_contact','SSL');?>";
	if (_url.indexOf("?") > 0){ _url += "&randnumforajaxaction=" + Math.random(); }else{ _url += "?randnumforajaxaction=" + Math.random(); }
	var _data = G.get_form_data('checkout_contact', 'eval_string');
	_data += '&action=post_contact';
	$.post(_url,_data,function(json){
		if(json['result']=='success'){
			//取得订单清单信息
			getCheckoutModule("<?= html::href_link_noseo('ajax.php','mod=checkout_confirmation','SSL');?>", "getOrderInfo", "ProductsList");
			G._goto("#ProductsList");
		}
	},'json');
};

<?php if ($_SESSION['orders_contact'] && tep_not_null($_SESSION['orders_contact'])){	//如果已经订购人联系信息则自动调产品清单信息?>
	$().ready(function(){
		getCheckoutModule("<?= html::href_link_noseo('ajax.php','mod=checkout_confirmation','SSL');?>", "getOrderInfo", "ProductsList");
	});
<?php }?>
</script>