<?php /* ����Ԥ���ɹ�ģ�� */?>

<h1>����Ԥ����ɣ����Ķ�����Ϊ��<?= $data['orderInfo']['orders_id']?>������������ѡ��һ��֧����ʽȥ֧�����Ķ����ˡ�</h1>
<h1>��ܰ��ʾ����л��Ԥ���������ķ��������г̣�����1-2�������������֧��������ɸ���ǰ������Ԥ��δ��������</h1>
<?php if($data['orderInfo']['isTravelCompanion'] === true){	//���ͬ���ζ�����ʾ?>
<h1>ע�⣺���ͬ�ζ�����ͬ�ο��˲����ٶ�����ֻ���¼�˻���֧�����ͬ�ζ������ɡ�</h1>
<?php }?>
<h1>
���α���
�α��գ�Ŀǰ���ķ����ṩ�������α��գ�<br>�������գ�Basic Limited Coverage��<br>���е��գ�Plus Quality Coverage��<br>���߼��գ�Elite Superior Coverage��<br>�������α��գ��˽����顣
����<a href="<?= html::href_link('insurance.php');?>" target="_blank">���α���</a>���˽����顣
</h1>
<h1>
������֪
1.���ǽ��������յ�ȷ�ϵ�������Ʊ����Ԥ�����Ļ�Ʊ���ڶ������Ʊ����ص�����վwww.usitrip.com ���ҵ��˻������油���Ʊ��Ϣ�Ա㵼�νӻ���<br>2. �������ղ�ͬ,�г̴������ǰ������������<br>3. ����ǰ����ϸ����������ȷ������֤����ȫ��������Ϣ,��鿴<a href="<?= html::href_link('tour_america_need.php') ?>" target="_blank">�������ġ�</a>
</h1>


<?php
//�����ɹ�����ʾ��Ϣ
?>

<?php
//֧��ģ��
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
		<button type="submit">ȷ����ȥ֧��</button>
	</form>
<?php }?>
</div>