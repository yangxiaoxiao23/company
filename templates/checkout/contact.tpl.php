
<form name="checkout_contact" id="checkout_contact" action="<?= html::href_link_noseo(FILENAME_CHECKOUT_CONFIRMATION, '', 'SSL')?>" method="post" enctype="multipart/form-data" onsubmit="submit_contact(); return false;">

<p class="title">��������</p>
<div class="contentText" id="order_comments">
<div style="display:<?= 'none'; //��ϵ����Ϣ�����أ�������Ҫ�������Ա����ɶ���ʱ��¼��?>">
<label>������<?= html::input_field('customers_name',$customers_name,'size="20"');?></label> <label>�绰��<?= html::input_num_en_field('customers_telephone',$customers_telephone,'size="20"');?></label> <label>Email��<?= html::input_num_en_field('customers_email_address',$customers_email_address,'size="20"');?></label>
<em>����д������������ϵ�绰��Email����Ϣ��</em>
</div>

<?php  echo html::textarea_field('comments', 'soft', '60', '3', $comments, 'class="comments" placeholder="�������г�������Ҫ��������ڴ����ԣ��Ա����Ǿ������š�"'); ?> 



</div>
<div class="action"><button type="submit">���涩������</button></div>
</form>

<script type="text/javascript">
/*�ύ��ϵ��Ϣ*/
function submit_contact(){
	var _url = "<?= html::href_link_noseo('ajax.php','mod=checkout_contact','SSL');?>";
	if (_url.indexOf("?") > 0){ _url += "&randnumforajaxaction=" + Math.random(); }else{ _url += "?randnumforajaxaction=" + Math.random(); }
	var _data = G.get_form_data('checkout_contact', 'eval_string');
	_data += '&action=post_contact';
	$.post(_url,_data,function(json){
		if(json['result']=='success'){
			//ȡ�ö����嵥��Ϣ
			getCheckoutModule("<?= html::href_link_noseo('ajax.php','mod=checkout_confirmation','SSL');?>", "getOrderInfo", "ProductsList");
			G._goto("#ProductsList");
		}
	},'json');
};

<?php if ($_SESSION['orders_contact'] && tep_not_null($_SESSION['orders_contact'])){	//����Ѿ���������ϵ��Ϣ���Զ�����Ʒ�嵥��Ϣ?>
	$().ready(function(){
		getCheckoutModule("<?= html::href_link_noseo('ajax.php','mod=checkout_confirmation','SSL');?>", "getOrderInfo", "ProductsList");
	});
<?php }?>
</script>