<?php
/**
 * ��������Ϣ��ģ���ļ��������û�������Ϣ��Ҳ����ô�ģ�壡��
 */
if($_POST['action'] == 'getCheckoutPassenger'){
}

//print_r($_POST);
?>
<script language="javascript">
/* �����˵�Ԫ�صĲ���������ã�
$(function(){
	$('#checkout_passenger').jqTransform();
});
*/
</script>

<div class="order-title"><h3>��������</h3></div>

<div class="shopping-wrap clear">
<form name="checkout_passenger" id="checkout_passenger" action="" method="post" enctype="multipart/form-data" onsubmit="submit_passenger(); return false;">

<h1 style="display:<?= 'none';?>">�ο���Ϣ�ͺ�����Ϣ [<a href="javascript:void(0);" onclick="$('#J_passengers').toggle()">����</a>]</h1>
<ul id="J_passengers" class="clear">
<?php
//������������������
$products = $FastCart->sort_by_date_departure_date($products,'asc');
for ($i = 0, $n = sizeof($products); $i < $n; $i++) {
	$flight_source_str = '';
	$serial_number = ($n>1) ? ($i+1) : '';
	$P = $products[$i];
	$_products = Product::getProduct(tep_get_prid($P['id']));
	$P['projectName'] = $_products->get_project_name();
	//���ͬ��
	$_travel_companion_str = '';
	if($P['is_travel_companion']=='1' && $P['projectName']['titleTravelCompanions']){
		$_travel_companion_str = $P['projectName']['titleTravelCompanions'];
	}
	//������Ϣ
	$rooms = Product::getRoomInfoArrayFromString($P['id'],$P['total_room_adult_child_info']);
	//��������Ϣ
	$guest_array = Calculators::getGuestStringToArray($P['total_room_adult_child_info']);
	//�Ƿ��е����䷿
	$have_single_pu = false;
?>
<li class="product-list clear">
	<div class="product-detail clear">
	<div class="product-title"> 
		<span class="important-text-999 fl"><?= ($serial_number ? $serial_number.'��': '');?></span>
		<span class="title fl"><?= $P['name'];?></span>
		<span class="expand-collapse fr pngFix">����</span>
	</div>
	<div class="product-content">
		<dl class="product-attr-list">
        	<dd  style="position:relative;">
            	<div class="product-action  gradient">
                    <a class="product-action-editor" href="<?= html::href_link_noseo('shopping_cart.php');?>">�ع��ﳵ�޸�</a>
                </div>
            </dd>
		<?php
		//�����ź�
		if($P['model'] && $P['projectName']['titleModel']){
		?>
			<dd><span class="option-label"><?= $P['projectName']['titleModel'];?>��</span><?= $P['model'];?><?= ($_travel_companion_str ? '<span class="traveling-together">'.$_travel_companion_str.'</span>' : '');?></dd>
		<?php
		}
		//��Ʒ�������ںͽ�������
		if($P['products_departure_date'] && $P['projectName']['titleDepartureDate']){
		?>
			<dd>
			<p style="float:left;width:320px;"><span class="option-label"><?= $P['projectName']['titleDepartureDate'];?>��</span><?= Product::dateOutput($P['products_departure_date']);?></p>
			<?php  if(Product::getTypeId($P['id']) == 'Travel'){?>
			<p style="float:left;"><span class="option-label">�������ڣ�</span><em class="end-date"><?= Product::dateOutput(Product::getEndDate($P['id'], $P['products_departure_date']));?></em></p>
			<?php }?>
			</dd>
		<?php
		}
		//�˷�����
		if($P['check_out_date'] && $P['projectName']['titleCheckoutDate']){
		?>
			<dd><span class="option-label"><?= $P['projectName']['titleCheckoutDate']?>��</span><?= Product::dateOutput($P['check_out_date']);?></dd>
		<?php
		}
		//�ϳ���ַ
		if($P['departure_address_id'] && $P['projectName']['titleDepartureAddress']){
			$_departure = new Products_Departure((int)$P['id']);
			$_addr = $_departure->getOne($P['departure_address_id']);
		?>
			<dd><span class="option-label"><?= $P['projectName']['titleDepartureAddress'];?>��</span><?= $_addr['departure_time'].', '.$_addr['region'].', '.$_addr['full_address'];?></dd>
		<?php
		}
		//������Ϣ
		if($rooms){
			//�з���
			if($rooms['room_total'] > 0){
		?>
			<dd><span class="option-label">�ܷ�������</span><?= $rooms['room_total'];?></dd>
			<?php
			for ($j = 0, $num = sizeof($guest_array); $j < $num; $j++) {
				if($guest_array[$j]['agree_allocates'])	$have_single_pu = true;
			?>
			<dd><span class="option-label">����<?= ($j+1)?>��</span>
			<?= $guest_array[$j]['adult'];?>����
			<?= ($guest_array[$j]['child'] > 0 ? $guest_array[$j]['child'].'��ͯ' : '');?>
			<?= $guest_array[$j]['agree_allocates'] ? '���ܵ����䷿' : '';?>
			</dd>
			<?php }?>
		<?php
			}else{
			//�޷���
		?>
		<dd><span class="option-label">������Ա��</span><?= $guest_array[0]['adult'];?>���� <?= ($guest_array[0]['child'] > 0 ? $guest_array[0]['child'].'��ͯ' : '');?></dd>
		<?php
			}
		}
		//��Ʒ����
		if (isset($P['attributes']) && is_array($P['attributes'])) {
			reset($P['attributes']);
			foreach ($P['attributes'] as $option => $value) {
				if (!$value)
					continue;
				if ($value && !is_array($value)) {
					$value = explode(',', $value);
				}
				$_products_options_values_name_array = explode('<::>',$P[$option]['products_options_values_name']); //��ֵ��Դ�Թ��ﳵ���ƴ�ӣ���<::>���ָ�
				$_text = '<div class="special-project-detail fl"><ul>';
				$_i = 0;
				foreach ((array) $value as $v) {
					$_text .= '<li><span class="fl">'.$_products_options_values_name_array[$_i].'</span> '.'</li>';
					$_i++;
				}
				$_text.= '</ul></div>';
		?>
		<dd><span class="option-label"><?= $P[$option]['products_options_name'];?>��</span><?= $_text;?></dd>
		<?php
			}
		}
		?>
		
		<dd style="position:relative;">
			<div class="travel-cost">
				<strong class="important-text-666">С�ƣ�</strong>
				<strong class="js-summation important-text-f60"><?= $currencies->display_price($P['final_price'], tep_get_tax_rate($P['tax_class_id']), $P['quantity']);?></strong>
			</div>
		</dd>
		
		</dl>
		
		<div class="tourist-info">
			<div class="tourist-info-title">
				<span class="title fl"><?= $P['projectName']['titleGuest']?>��Ϣ</span>
				<span class="tooltip fl">(<?= $P['projectName']['titleGuest']?>��������ID������ͬ)</span>
				<span class="expand-collapse fr pngFix" style="background-position: 30px 0px;">����</span>
			</div>
			
			<div class="tourist-content-wrap" style="display: block;">
				<?php
				/* ������ʱû��
				<div class="depart-date-wrap">
					<span class="depart-date-key">��������:</span><span class="depart-date-value">26/03/2014</span> 
					<span>
						<label>
							<input type="checkbox">
							<span>�й���½����(δ������)�Ĺ˿ͣ�������ͬʱ����һ��ƽ������������</span>
							<div class="insurance-tooltip">
								<em class="tooltip-arrow"></em>
								<span>��������������������������������������������������</span>
							</div>
						</label>
					</span>
					<span class="chooise important-text-999">����ѡ��:</span>
					<span class="chooise-result js-chooise-result">��׼��</span><span class="chooise-result">����</span>
				</div>
			
				<div class="insurance-type">
					<label><input type="radio" name="insuranceType-1">������</label>
					<label><input type="radio" checked="" name="insuranceType-1">��׼��</label>
					<label><input type="radio" name="insuranceType-1">������</label>
					<label><input type="radio" name="insuranceType-1">������</label>
					<p>�����ս������� 
						<span class="adult-price">$40.00</span> δ������ <span class="minors-price">$30.00</span>
					</p>
				</div>
				*/?>			
				<?= html::input_hidden_field('products_id['.$i.']', $P['id']);?>
				<ul id="J_shopcart_pro_list_<?= $i?>" class="tourist-info-ul">
					<?php
					//С������˳�������������Ϣ
					$_allow_child_age = Product::getMaxAllowChildAge(tep_get_prid($P['id']));
					if($_allow_child_age < 1 ){
						$_allow_child_age = 12;
					}
					?>
					<script type="text/javascript">
					var defaultCon<?= $i?>Child = {
							today: "<?= date('Y-m-d')?>",
							dispalyMonths:1,
							readout: true,
							range: '<?= date('Y-m-d',strtotime('-'.$_allow_child_age.' years'))?>:<?= date('Y-m-d')?>'
					};
					var defaultCon<?= $i?>Adult = {
							today: "<?= date('Y-m-d')?>",
							dispalyMonths:1,
							readout: true,
							range: '<?= date('Y-m-d',strtotime('-100 years'))?>:<?= date('Y-m-d')?>'
					};
					</script>
						<?php
						//��session��ȡ�ò�������Ϣ����
						$P['passenger'] = $_SESSION['passenger'][$P['id']];
						for($j=0, $nj = $rooms['people_total']; $j < $nj; $j++){
							$flight_source_str[]= $i.'_'.$j;
							if($j==0 && $P['is_travel_companion']=="1" && !tep_not_null($P['passenger']['gues_email_account'][$j])){ $P['passenger']['gues_email_account'][$j] = customers::get_email_address($customer_id); }
							if(($j+1) > $rooms['adult_total'] && $rooms['child_total']){	//С���ӵ���Ϣ�����
						?>
						<li class="tourist-info-li">
							<div class="tourist-contact pngFix">
								<span class="tourist-number"><?= ($j+1);?></span>
								<span class="tourist-no"><!--�ο�--><?= $P['projectName']['titleGuest']?><?= ($j+1);?>(С��)</span>
							</div>
							<div class="tourist-detail">
								<ul class="tourist-info-input">
								<?php if($P['is_travel_companion']=="1"){?>
								<li><label>Email��</label><?= html::input_num_en_field('gues_email_account['.$i.']['.$j.']', $P['passenger']['gues_email_account'][$j], ' size="10" class="tourist-input" ');?></li>
								<?php }?>
								
								<li><label>��(ƴ������Ӣ��)��</label><?= html::input_num_en_field('child_last_name['.$i.']['.$j.']', $P['passenger']['child_last_name'][$j], 'oldval="'.$P['passenger']['child_last_name'][$j].'" source="last_name_'.$j.'" size="10" class="tourist-input"  monitor="lastName" index="'.$j.'" onblur="get_flights_guest(\'J_shopcart_pro_list_'.$i.'\','.(int)$i.');"');?></li>
								<li><label>��(ƴ������Ӣ��)��</label><?= html::input_num_en_field('child_name['.$i.']['.$j.']', $P['passenger']['child_name'][$j], 'oldval="'.$P['passenger']['child_name'][$j].'" source="name_'.$j.'" size="10" class="tourist-input" monitor="firstName" index="'.$j.'" onblur="get_flights_guest(\'J_shopcart_pro_list_'.$i.'\','.(int)$i.');"');?></li>
								<!--<li><span>����(����)��</span><?= html::input_field('child_chinese_name['.$i.']['.$j.']', $P['passenger']['child_chinese_name'][$j], 'size="2"');?></li>-->
								<li><label>�Ա�</label><?= html::select_field('child_gender['.$i.']['.$j.']',array(0=>array('id'=>'1','text'=>'��'), 1=>array('id'=>'2', 'text'=>'Ů')), $P['passenger']['child_gender'][$j]);?></li>
								<li>
									<label>�������ڣ�</label><?= html::input_field('child_birth_date['.$i.']['.$j.']', $P['passenger']['child_birth_date'][$j], 'id="J_child_birth_date_'.$i.'_'.$j.'" size="12" class="tourist-input" placeholder="YYYY-MM-DD"');?>
							<script type="text/javascript">
								$('#<?= 'J_child_birth_date_'.$i.'_'.$j; ?>').calendar(defaultCon<?= $i?>Child || {});
							</script>
								</li>
								<li><label>���أ�</label><?= html::input_field('child_body_weight['.$i.']['.$j.']', $P['passenger']['child_body_weight'][$j], 'size="2" class="tourist-input"');?>KG</li>
								<li><label>��ߣ�</label><?= html::input_field('child_body_height['.$i.']['.$j.']', $P['passenger']['child_body_height'][$j], 'size="2" class="tourist-input"');?>CM</li>
								
								<?php if($P['is_travel_companion']=="1"){?>
								<li><label>&nbsp;</label><label><?= html::input_checkbox_field('i_will_pay['.$i.']['.$j.']', '1', $P['passenger']['i_will_pay'][$j]);?> �Ҹ���</label></li>
								<?php }?>
								</ul>
							</div>
							
							</li>
						<?php
					}else{	//���˵���Ϣ�����
				?>
						<li class="tourist-info-li">
							<div class="tourist-contact  pngFix">
								<span class="tourist-number"><?= ($j+1);?></span>
								<span class="tourist-no"><!--�ο�--><?= $P['projectName']['titleGuest']?><?= ($j+1);?><?= $j==0 ? '����Ҫ��ϵ�ˣ�':''?></span>
							</div>
							<div class="tourist-detail">
								<ul class="tourist-info-input">
								<?php if($P['is_travel_companion']=="1"){?>
								<li><label>Email��</label><?= html::input_num_en_field('gues_email_account['.$i.']['.$j.']', $P['passenger']['gues_email_account'][$j], ' size="10" class="tourist-input" ');?></li>
								<?php }?>
								
								<li><label>��(ƴ������Ӣ��)��</label><?= html::input_num_en_field('adult_last_name['.$i.']['.$j.']', $P['passenger']['adult_last_name'][$j], 'oldval="'.$P['passenger']['adult_last_name'][$j].'" source="last_name_'.$j.'" size="10" class="tourist-input" monitor="lastName" index="'.$j.'" onblur="get_flights_guest(\'J_shopcart_pro_list_'.$i.'\','.(int)$i.');"');?></li>
								<li><label>��(ƴ������Ӣ��)��</label><?= html::input_num_en_field('adult_name['.$i.']['.$j.']', $P['passenger']['adult_name'][$j], 'oldval="'.$P['passenger']['adult_name'][$j].'" source="name_'.$j.'" size="10" class="tourist-input"  monitor="firstName" index="'.$j.'" onblur="get_flights_guest(\'J_shopcart_pro_list_'.$i.'\','.(int)$i.');"');?></li>
								
								<li><label>�ֻ��ţ�</label>
                                <p id="phone_<?=$i.'_'.$j?>"></p>
                                <!--
								<input readonly="" class="country-select">
								<input value="86" name="country_tel_code[<?= $i?>][<?= $j?>]" readonly="" class="country-id">
								<?= html::input_num_en_field('mobile_phone['.$i.']['.$j.']', $P['passenger']['mobile_phone'][$j], ' size="10" class="tourist-phone"');?> -->
								</li>
								<!--<li><span>����(����)��</span><?= html::input_field('adult_chinese_name['.$i.']['.$j.']', $P['passenger']['adult_chinese_name'][$j], 'size="2"');?></li>-->
								<li><label>�Ա�</label><?= html::select_field('adult_gender['.$i.']['.$j.']',array(0=>array('id'=>'m','text'=>'��'), 1=>array('id'=>'f', 'text'=>'Ů')), $P['passenger']['adult_gender'][$j]);?></li>
								<li>
									<label>�������ڣ�</label><?= html::input_field('adult_birth_date['.$i.']['.$j.']', $P['passenger']['adult_birth_date'][$j], 'id="J_adult_birth_date_'.$i.'_'.$j.'" size="12" class="tourist-input" placeholder="YYYY-MM-DD"');?>
							<script type="text/javascript">
								$('#<?= 'J_adult_birth_date_'.$i.'_'.$j; ?>').calendar(defaultCon<?= $i?>Adult || {});
							</script>
								</li>
								<li><label>���أ�</label><?= html::input_field('adult_body_weight['.$i.']['.$j.']', $P['passenger']['adult_body_weight'][$j], 'size="2" class="tourist-input"');?>KG</li>
								<li><label>��ߣ�</label><?= html::input_field('adult_body_height['.$i.']['.$j.']', $P['passenger']['adult_body_height'][$j], 'size="2" class="tourist-input"');?>CM</li>
									<?php
								if($have_single_pu === true){
									$_checked = false;
									if($P['passenger']['adult_single_pu_key'][$j]=='1' || $j == 0){
										$_checked = true;
									}
						?>
								<li><label>&nbsp;</label>
									<label><?= html::input_checkbox_field('adult_single_pu_key['.$i.']['.$j.']', '1', $_checked)?> �����䷿</label>
								</li>
								<?php }?>
								
								<?php if($P['is_travel_companion']=="1"){?>
								<li><label>&nbsp;</label><label><?= html::input_checkbox_field('i_will_pay['.$i.']['.$j.']', '1' , $P['passenger']['i_will_pay'][$j]);?> �Ҹ���</label></li>
								<?php }?>

								</ul>
							</div>
							</li>
						<script type="text/javascript">
							new usitrip.widget.MobilePhoneField({
								el: '#phone_<?=$i.'_'.$j?>',
								tipson: false,
								initValue: {
									phoneValue: '<?= ($P['passenger']['mobile_phone'][$j]) ? $P['passenger']['mobile_phone'][$j] : '+86';?>',//+86 18098916029
									zhWidth: 35,
									phoneWidth: 110
								},
								name: 'mobile_phone[<?= $i?>][<?= $j?>]'
							});
						</script>
						<?php	
					}	
				}
				?>
						
						<!-- <li><b><?= $P['projectName']['titleContactPhone']?>��</b><input size="50" id="contact_phone_<?= $i;?>" name="contact_phone[<?= $i;?>]" value="<?= $_SESSION['contact_phones'][$P['id']]?>" />������д��ϵ�˵��ֻ����룬�Ա���ϵ������
						</li> -->
                        
				</ul>
                <script type="text/javascript">
                    (function(){
                        /*var passengers = $('#J_shopcart_pro_list_<?= $i?> li.tourist-info-li'); //��ȡ���е���ϵ��
                        var config = {}, passengerData = [];
                        
                        config['passengerData'] = [];
                        for(var i=0,len=passengers.length;i<len;i++){
                            passengerData.push(new usitrip.data.PassengerData({
                                no : i
                            }));
                        }
                        
                        config['passengerData'] = passengerData;
                        config['ulId'] = 'js-passenger-option' + <?= $i?>;
                        
                        var passengerflight = new usitrip.checkout.PassengerFlight(config);
                        
                        passengers.delegate('input[monitor="firstName"], input[monitor="lastName"]', 'keyup', function(event){
                            var node = $(this);
                            passengerflight.passengerData[node.attr('index')].setData(node.attr('monitor'), node.val());
                        });*/
                        
						renderFlightView(<?=$i?>,'<?= html::href_link_noseo('ajax.php','mod=checkout_passenger','SSL');?>');
                    })();
                </script>
			 </div>
		 </div>
         	<?php if($_products->need_flight_information() === true ){	//������Ϣ?>
            <div class="flights">
            
            <div>
                <button type="button" index="<?=$i?>" id="js-add-flight<?=$i?>" class="add-flight"  >
                    <em>+</em><span class="add-flight-text">��Ӻ�����Ϣ</span>
                </button>
                <span class="tooltip">������ȷ���ڴ��г̹���ɹ�֮���ٹ����Ʊ��Ȼ���ٵ�¼�������˻����������Ϣ</span>
            </div>
            
            <div class="flight-wrap-title">
                <span class="title fl">������Ϣ</span>
                <span class="expand-collapse fr pngFix">����</span>
            </div>
            
            <!--
            <p><span>������Ϣ��[<a href="javascript:void(0);" onclick="$('#J_div_flightBox_<?= $i?>').toggle(300)">��ʾ/����</a>]</span><span style="color:#154da4"></span></p> -->
            
                <div id="J_div_flightBox_<?= $i?>" class="flight-info-wrap">
                    <ul id="J_addFlightsUl_<?= $i?>">
                        <!--  ���´���ע�� -->
                        <?php /*
                        for($J=0, $JN = max(1, (int)sizeof($P['flights']['arrival_date'])); $J<$JN; $J++){	//���뺽����Ϣģ��
                            include(TPL_DIR.'small_modules/flights_info.tpl.php');
                        }
                        */?>
                    </ul>
                
                <!--  �˹��ܲ�һ����Ҫ
                 
                <div><button class="repeat-add-flight add-flight" onclick="add_more_flights('<?= html::href_link_noseo('ajax.php','mod=checkout_passenger','SSL');?>', 'flightBox_<?= $i?>')"><em>+</em><span>������Ӻ�����Ϣ</span></button></div>
                
                -->
                </div>
            </div>
            <?php }?>
         
	</div>
	
	
	
	

	</div>
</li>
<?php }?>



</ul>
<div class="action"><button type="submit">ȷ�������ο���Ϣ</button></div>
</form>
</div>

<script type="text/javascript">
/*�ύ�ο���Ϣ*/
function submit_passenger(){
	var _url = "<?= html::href_link_noseo('ajax.php','mod=checkout_passenger','SSL');?>";
	if (_url.indexOf("?") > 0){ _url += "&randnumforajaxaction=" + Math.random(); }else{ _url += "?randnumforajaxaction=" + Math.random(); }
	var _data = G.get_form_data('checkout_passenger', 'eval_string');
	_data += '&action=post_passenger';
	//$.ajax({type:'POST',url:_url,dataType:"script", cache:false, data:_data,success:function(html){ }});
	$.post(_url,_data,function(json){
		if(json['result']=='success'){
			//getCheckoutModule("<?= html::href_link_noseo('ajax.php','mod=checkout_payment','SSL');?>", "getCheckoutPayment", "PaymentInfo");	//ȡ�ø��ʽ
			//G._goto("#PaymentInfo");
			getCheckoutModule("<?= html::href_link_noseo('ajax.php','mod=checkout_contact','SSL');?>", "getCheckoutContact", "ContactInfo");	//ȡ����ϵ����Ϣ��
			G._goto("#PaymentInfo");
		}else if(json['result']=='error'){
			alert(json['errortext']);
		}else{
			alert('δ֪����');
		}
	},'json');
};

<?php if($FastCart->passenger_done === true){	//����ο���Ϣ�Ѿ���д������һ���ĸ��ʽ?>
	$().ready(function(){
		//getCheckoutModule("<?= html::href_link_noseo('ajax.php','mod=checkout_payment','SSL');?>", "getCheckoutPayment", "PaymentInfo");	//ȡ�ø��ʽ
		getCheckoutModule("<?= html::href_link_noseo('ajax.php','mod=checkout_contact','SSL');?>", "getCheckoutContact", "ContactInfo");	//ȡ����ϵ����Ϣ��
	});
<?php }?>

</script>

<script>

</script>