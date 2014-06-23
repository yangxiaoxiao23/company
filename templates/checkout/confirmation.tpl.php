
<?php
if (isset($$payment->form_action_url)) {
	$form_action_url = $$payment->form_action_url;
} else {
	$form_action_url = html::href_link_noseo(FILENAME_CHECKOUT_PROCESS, '', 'SSL');
}
?>

<p class="confirmation-orders" id="preview-split"></p>
<div class="contentContainer">
<!-- <h1 class="confirmation-orders">订单确认</h1> -->


  <?php
  $getCheckoutShipping = 0;	//是否启用收货地址
  if($getCheckoutShipping == '1'){
	?>
  <div>
  <h2>收货地址信息</h2>

  <div class="contentText">
<?php
if ($sendto != false) {
?>

        <div>收货地址：<?php echo tep_address_format($FastCart->delivery['format_id'], $FastCart->delivery, 1, ' ', '<br />'); ?></div>

<?php
if ($FastCart->info['shipping_method']) {
?>
		<div>收货方式：<?php echo $FastCart->info['shipping_method']; ?></div>
<?php
}
}
?>
  </div>
  </div>
<?php }?>

<?php //产品清单 start {?>
<!-- <div style="display:<?= 'none';?>"> -->

<div>
<div class="order-people">
    <p class="info">订购人信息</p>
    <div>
        姓 名：<span class="name"><?=$_SESSION['orders_contact']['customers_name']?></span>
        电 话：<span class="phone"><?=$_SESSION['orders_contact']['customers_telephone']?></span> 
        电子邮箱：<span class="email"><?=$_SESSION['orders_contact']['customers_email_address']?></span>
    </div>
</div>

<div  class="title">
    <h3>产品清单 <a class="gobackmodify" href="<?= html::href_link_noseo('shopping_cart.php');?>">[返回修改购物车]</a></h3>
</div>

<div>
			<ul class="shopcart-pro-list">
                    <?php	
					//购物车产品详细信息 sart {
					$tr_class = 'even';
					$cart_have_jiebantongyong = false;
					$option_value_hidden_fields = '';
					$products = $FastCart->get_products_and_attributes(); //$order->products;
					//按出发日期升序排序
					$products = $FastCart->sort_by_date_departure_date($products,'asc');
					for ($i=0, $n=sizeof($products); $i<$n; $i++) {
						$P = $products[$i];
						$_products = Product::getProduct(tep_get_prid($P['id']));
						$P['projectName'] = $_products->get_project_name();
						$_options_str = '';
						
						//房间信息
						$rooms = Product::getRoomInfoArrayFromString($P['id'],$P['total_room_adult_child_info']);
						
						
						//库存检查
						if (STOCK_CHECK == 'true') {
							$stock_check = tep_check_stock($P['id'], $P['qty']);
							if (tep_not_null($stock_check)) {
								$any_out_of_stock = 1;
								$_options_str.= $stock_check;
							}
						}
						
						//旅游团号 start {
						if($P['model'] && $P['projectName']['titleModel']){
							$_options_str.= '<p><span>'.$P['projectName']['titleModel'].'：</span>'.$P['model'];
							if($P['is_travel_companion']=='1' && $P['projectName']['titleTravelCompanions']){
								$cart_have_jiebantongyong = true;
								$_options_str.= '<i class="is-jieban">('.$P['projectName']['titleTravelCompanions'].')</i>';
							}
							$_options_str.= '</p>';
						}
						//旅游团号 end }
						//产品出发日期 start {
						if($P['products_departure_date'] && $P['projectName']['titleDepartureDate']){
							$_options_str.= '<p><span>'.$P['projectName']['titleDepartureDate'].'：</span><em class="start-date">'.Product::dateOutput($P['products_departure_date']).'</em></p>';
							//结伴同游
														
						}
						//产品出发日期 end }
						//上车地址{
						if($P['departure_address_id'] && $P['projectName']['titleDepartureAddress']){
							$_departure = new Products_Departure((int)$P['id']);
							$_addr = $_departure->getOne($P['departure_address_id']);
							$_options_str.= '<p><span>'.$P['projectName']['titleDepartureAddress'].'：</span>'.$_addr['departure_time'].', '.$_addr['region'].', '.$_addr['full_address'].'</p>';
						}
						//}
						$_attributes_str = '';
						//产品属性选项信息 start {
						if (isset($P['attributes']) && is_array($P['attributes'])) {
							reset($P['attributes']);
							foreach ($P['attributes'] as $option => $value) {
								if (!$value)
									continue;
								if ($value && !is_array($value)) {
									$value = explode(',', $value);
								}
								$_products_options_values_name_array = explode('<::>',$P[$option]['products_options_values_name']); //此值来源对购物车类的拼接，用<::>符分割
								$_text = '<div class="special-project-detail fl"><ul>';
								$_i = 0;
								foreach ((array) $value as $v) {
									$_text .= '<li><span class="fl">'.$_products_options_values_name_array[$_i].'</span> '.'</li>';
									$_i++;
								}
								$_text.= '</ul></div>';
								$_attributes_str.= '<p><span>' . $P[$option]['products_options_name'] . '：</span>' . $_text .'</p>';
							}
						}
						//产品属性选项信息 end }
						//产品人数信息 start {
						$room_str = '';
						if($P['total_room_adult_child_info'] && $P['projectName']['titleRoomPeopleNum']){
							$rooms = Product::getRoomInfoArrayFromString($P['id'],$P['total_room_adult_child_info']);
							$guest_array = Calculators::getGuestStringToArray($P['total_room_adult_child_info']);
							if($rooms['room_total']>0){	//有房间
								$room_str .= '<p><b><span>总房间数：</span>'.$rooms['room_total'].'</b></p>';
								for($j=0, $num=sizeof($guest_array); $j<$num; $j++){
									if($guest_array[$j]['adult']>0){
										$room_str .= "<p><span>".'房间'.($j+1).'成人数：</span>'.$guest_array[$j]['adult'].($guest_array[$j]['agree_allocates'] ? ' <b>接受单人配房</b>':'').'</p>';
										if($guest_array[$j]['child']>0){
											$room_str .= "<p><span>".' 房间'.($j+1).'小孩数：</span>'.$guest_array[$j]['child'].'</p>';
										
										}
									}
								}
							}else{	//没有房间的
								if($guest_array[0]['adult']>0){
									$room_str .= "<p><span>".'成人数：</span>'.$guest_array[0]['adult'].'</p>';
									if($guest_array[0]['child']>0){
										$room_str .= "<p><span>".'小孩数：</span>'.$guest_array[0]['child'].'</p>';
									
									}
								}
							}
						}
						//产品人数信息 end }
						$tr_class = tep_not_null($tr_class) ? '':'even';
					?>	
						<li id="J_catrTr_<?= $P['id']?>" class="<?= $tr_class;?> pro-li">                           	
								<div class="shopcart-pro-box uifix">
                                	<!--<div class="shopcart-pro-pic">
                                    	<a target="_blank" href="<?= html::href_link(FILENAME_PRODUCT_INFO, 'products_id=' . $P['id'])?>"><img src="<?= Product::getThumbnailsSrc(Product::getImageSrc(($P['image'])));?>"></a>
                                    </div> -->
                                    <div class="shopcart-pro-info">
                                    	<h4><em><?=$i + 1?>、</em><a target="_blank" href="<?= html::href_link(FILENAME_PRODUCT_INFO, 'products_id=' . $P['id'])?>"><?= $P['name']?></a></h4>                                     
										<div id="infoBox_<?= $P['id'];?>" class="con">
										<?php echo $_options_str;?>
                                        <?php echo $_attributes_str;?>
                                        <?php echo $room_str;?>
										</div>
										<div id="BookingBox_<?= $P['id']?>" tag="结账页面产品编辑框"></div>
                                    </div>
                                </div>
                                
                                
                             <div class="point-price">
                             <p><label>价格：</label><span id="J_TrPriceBox_<?= $P['id'];?>" class="shopcart-pro-price"><?= $currencies->display_price($P['price'], tep_get_tax_rate($P['tax_class_id']));?></span></p>
                            
							<?php if (sizeof($FastCart->info['tax_groups']) > 1){?>
							<?php echo $currencies->display_price($P['final_price'], $P['tax'], $P['quantity'])?>
							<?php }?>
							
                            <p><label>赠送积分：</label><span id="J_TrPoint_<?= $P['id'];?>"><?= (int)$P['points'];?>分</span></p>
                            <p><label>总计：</label><span class="small-total"><?= $currencies->display_price($P['final_price'], tep_get_tax_rate($P['tax_class_id']), $P['quantity']);?></span></p>
                            </div>
                            
                            <div class="passenger-wrap">
                                <h3>游客信息 <a onclick="G._goto('#PassengerFlightInfo');" href="javascript:void(0);">[编辑]</a></h3>
                                <ul class="passenger-info-wrap">
                                	<?php
										//从session中取得参团人信息数据
										$P['passenger'] = $_SESSION['passenger'][$P['id']];
                               			for ($k=0, $len=$rooms['people_total']; $k<$len; $k++) {
											if($k==0 && $P['is_travel_companion']=="1" && 
												!tep_not_null($P['passenger']['gues_email_account'][$k])){ 
												$P['passenger']['gues_email_account'][$k] = customers::get_email_address($customer_id);
											}
											
											if(($k+1) > $rooms['adult_total'] && $rooms['child_total']){	//小孩子的信息输入框
									?>
                                                <li>
                                                    <p>
                                                        <strong><?= $P['projectName']['titleGuest']?><?= ($k+1);?>（小孩）：</strong> 
                                                        <?php if($P['is_travel_companion']=="1"){?>
                                                            <?= $P['passenger']['gues_email_account'][$k] == '' ? '' : '<span class="email">'.$P['passenger']['gues_email_account'][$k].'</span>';?>
                                                        <?php }?>
                                                        <?= '<span>'.$P['passenger']['child_last_name'][$k].' '.$P['passenger']['child_name'][$k].'</span>' ?>
                                                        <?= $P['passenger']['child_gender'][$k] == '' ? '' : '<span class="genger">'.($P['passenger']['child_gender'][$k] == 'm' ? '男':'女').'</span>' ?>
                                                        <?= $P['passenger']['child_birth_date'][$k] == '' ? '' : '<span class="birth">'.$P['passenger']['child_birth_date'][$k].'</span>' ?>
                                                        <?= $P['passenger']['child_body_weight'][$k] == '' ? '' : '<span class="weight">'.$P['passenger']['child_body_weight'][$k].'KG'.'</span>'?>
                                                        <?= $P['passenger']['child_body_height'][$k] == '' ? '' : '<span class="height">'.$P['passenger']['child_body_height'][$k].'CM'.'</span>'?>
                                                    </p>
                                                    <!--
                                                    <div class="passenger-detail">
                                                        <ul>
                                                        	<?php if($P['is_travel_companion']=="1"){?>
                                                            	<li><span>Email：</span><?= $P['passenger']['gues_email_account'][$k];?></li>
                                                            <?php }?>
                                                            <li><span>姓(拼音或者英文)：</span><?= $P['passenger']['child_last_name'][$k] ?></li>
                                                            <li><span>名(拼音或者英文)：</span><?= $P['passenger']['child_name'][$k] ?></li>
                                                            <li><span>性别：</span><?=$P['passenger']['child_gender'][$k] == 'm' ? '男':'女' ?></li>
                                                            <li><span>出生日期：</span><?=$P['passenger']['child_birth_date'][$k] ?></li>
                                                            <li><span>体重：</span><?=$P['passenger']['child_body_weight'][$k].'KG'?></li>
                                                            <li><span>身高：</span><?=$P['passenger']['child_body_height'][$k].'CM'?></li>
                                                        </ul>
                                                    </div> -->
                                                </li>
                                    		<?php
											  	} else {
											?>
                                                <li>
                                                    <p>
                                                        <strong><?= $P['projectName']['titleGuest']?><?= ($k+1);?><?= $k==0 ? '（主要联系人）：':'：'?></strong>
                                                        <?php if($P['is_travel_companion']=="1"){?>
                                                            	<?= $P['passenger']['gues_email_account'][$k] == '' ? '' : '<span class="email">'.$P['passenger']['gues_email_account'][$k].'</span>'?>
                                                        <?php }?>
                                                        <?= '<span>'.$P['passenger']['adult_last_name'][$k].' '.$P['passenger']['adult_name'][$k].'</span>' ?>
                                                        <?= $P['passenger']['mobile_phone'][$k] == '' ? '' : '<span class="phone">'.$P['passenger']['mobile_phone'][$k].'</span>' ?>
                                                        <?= $P['passenger']['adult_gender'][$k] == '' ? '' : '<span class="gender">'.($P['passenger']['adult_gender'][$k] == 'm' ? '男':'女').'</span>' ?>
                                                        <?= $P['passenger']['adult_birth_date'][$k] == '' ? '' : '<span class="birth">'.$P['passenger']['adult_birth_date'][$k].'</span>' ?>
                                                        <?= $P['passenger']['adult_body_weight'][$k] == '' ? '' : '<span class="weight">'.$P['passenger']['adult_body_weight'][$k].'KG'.'</span>' ?>
                                                        <?= $P['passenger']['adult_body_height'][$k] == '' ? '' : '<span class="height">'.$P['passenger']['adult_body_height'][$k].'CM'.'</span>' ?>
                                                        <?php
															if($P['passenger']['adult_single_pu_key'][$k] == '1'){
																echo '<span>单人配房</span>';
															}
                                                        ?>
                                                    </p>
                                                    <!--
                                                    <div class="passenger-detail">
                                                        <ul>
                                                        	<?php if($P['is_travel_companion']=="1"){?>
                                                            	<li><span>Email：</span><?= $P['passenger']['gues_email_account'][$k]?></li>
                                                            <?php }?>
                                                            <li><span>姓(拼音或者英文)：</span><?= $P['passenger']['adult_last_name'][$k] ?></li>
                                                            <li><span>名(拼音或者英文)：</span><?= $P['passenger']['adult_name'][$k] ?></li>
                                                            <li><span>手机号：</span><?= $P['passenger']['mobile_phone'][$k] ?></li>
                                                            <li><span>性别：</span><?= $P['passenger']['adult_gender'][$k] == 'm' ? '男':'女' ?></li>
                                                            <li><span>出生日期：</span><?= $P['passenger']['adult_birth_date'][$k] ?></li>
                                                            <li><span>体重：</span><?= $P['passenger']['adult_body_weight'][$k].'KG' ?></li>
                                                            <li><span>身高：</span><?= $P['passenger']['adult_body_height'][$k].'CM' ?></li>
                                                        </ul>
                                                    </div>
                                                    -->
                                                </li>
                                    
                                    <?php
												}
										}
                                    ?>
                                </ul>
                                </div>
                                
                                
							<?php
								$size = sizeof($_SESSION['flights'][$P['id']]['flightsGuest']);
								if($size > 0){
							?>
                            <div class="flight-wrap">
                            <h3>航班信息 <a onclick="G._goto('#ContactInfo');" href="javascript:void(0);">[编辑]</a></h3>
                            <?php /* print_r($_SESSION); */?>
                            <ul class="flight-info-wrap clear">
                            	<?php
                                	$P['flights'] = $_SESSION['flights'][$P['id']];
                               			for ($k=0, $len=sizeof($P['flights']['arrival_date']); $k<$len; $k++) {
								?>
                            
                                <li class="flight-con">
                                            <div class="aerobus-info">
                                                <h3>航班<?=k+1?></h3>
                                                <table>
                                                    <tbody>
                                                    <tr>
                                                        <td class="attr reach" colspan="2"><label><input onclick="javascript:return false;" type="checkbox" value="1" <?=$P['flights']['self_define_reach'][$k] == 1 ?'checked':'' ?>>参团日自行入住酒店</label></td>
                                                        
                                                        <td class="attr departure" colspan="2"><label><input onclick="javascript:return false;" type="checkbox" <?=$P['flights']['self_define_departure'][$k] == '1' ? 'checked':'' ?>>行程结束自行离团</label></td>
                                                    </tr>
                                                    
                                                    <tr>
                                                        <td class="attr">接机乘客：</td>
                                                        <td class="val">
                                                        	<?php
																for ($h=0, $total=sizeof($P['flights']['flightsGuest'][$i]); $h<$total; $h++) {
																	echo '<span class="pass-name">'.arrays::iconv('utf-8',CHARSET,$P['flights']['flightsGuest'][$i][$h]).'</span>';
																}
															 ?>
                                                        </td>
                                                        
                                                        <td class="attr">送机乘客：</td>
                                                        <td class="val">
                                                        	<?php
																for ($h=0, $total=sizeof($P['flights']['flightsGuestDep'][$i]); $h<$total; $h++) {
																	echo '<span class="pass-name">'.arrays::iconv('utf-8',CHARSET,$P['flights']['flightsGuestDep'][$i][$h]).'</span>';
																}
															 ?>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="attr">接机日期：</td>
                                                        <td class="val"><?=$P['flights']['arrival_date'][$k]?></td>
                                                        <td class="attr">送机日期：</td>
                                                        <td class="val"><?=$P['flights']['departure_date'][$k]?></td>
                                                    </tr>
                                                    <tr>
                                                        <td class="attr">航空公司：</td>
                                                        <td class="val"><?=$P['flights']['airline_name'][$k]?></td>
                                                        <td class="attr">航空公司：</td>
                                                            <td class="val"><?=$P['flights']['airline_name_departure'][$k]?></td>
                                                    </tr>
                                                    <tr>
                                                        <td class="attr">接机航班：</td>
                                                        <td class="val"><?=$P['flights']['flight_no'][$k]?></td>
                                                        <td class="attr">送机航班：</td>
                                                            <td class="val"><?=$P['flights']['flight_no_departure'][$k]?></td>
                                                    </tr>
                                                    <tr>
                                                        <td class="attr">接机机场：</td>
                                                        <td class="val"><?=$P['flights']['airport_name'][$k]?></td>
                                                        <td class="attr">送机机场：</td>
                                                            <td class="val"><?=$P['flights']['airport_name_departure'][$k]?></td>
                                                    </tr>
                                                    <tr>
                                                        <td class="attr">到达时间：</td>
                                                        <td class="val"><?=$P['flights']['arrival_time_hour'][$k].':'.$P['flights']['arrival_time_minute'][$k]?></td>						
                                                        <td class="attr">起飞时间：</td>
                                                            <td class="val"><?=$P['flights']['departure_time_hour'][$k].':'.$P['flights']['departure_time_minute'][$k]?></td>
                                                    </tr>
                                                    
                                                </tbody></table>
                                            </div>
                                        
                                        <!---
                                            <div class="flight-con">
                                                <p>乘坐此航班的游客</p>
                                                                
                                                <div class="passenger">
                                                     <ul class="js-passenger-option1">
                                                        <?php
                                                            for ($h=0, $total=sizeof($P['flights']['flightsGuest'][$i]); $h<$total; $h++) {
                                                                echo '<li>'.$P['flights']['flightsGuest'][$i][$h].'</li>';
                                                            }
                                                         ?>
                                                     </ul>
                                                </div>
                                                
                                                <div class="aerobus-info">
                                                    <h3>送机航班</h3>
                                                    <table>
                                                        <caption>
                                                            <label><input onclick="javascript:return false;" type="checkbox" <?=$P['flights']['self_define_departure'][$k] == '1' ? 'checked':'' ?>>行程结束自行离团</label>
                                                        </caption>
                                                        <tbody>
                                                        <tr>
                                                            <td class="attr">送机日期：</td>
                                                            <td class="val"><?=$P['flights']['departure_date'][$k]?></td>
                                                                                        
                                                        </tr>
                                                        <tr>
                                                            <td class="attr">航空公司：</td>
                                                            <td class="val"><?=$P['flights']['airline_name_departure'][$k]?></td>
                                                        </tr>
                                                        <tr>
                                                            <td class="attr">送机航班：</td>
                                                            <td class="val"><?=$P['flights']['flight_no_departure'][$k]?></td>
                                                        </tr>
                                                        <tr>
                                                            <td class="attr">送机机场：</td>
                                                            <td class="val"><?=$P['flights']['airport_name_departure'][$k]?></td>
                                                        </tr>
                                                        <tr>
                                                            <td class="attr">起飞时间：</td>
                                                            <td class="val"><?=$P['flights']['departure_time_hour'][$k].':'.$P['flights']['departure_time_minute'][$k]?></td>
                                                        </tr>
                                                    </tbody></table>
                                                </div>
                                            </div>
                                           --> 

                                </li>
                            </ul>
                            </div>
                            <?php
								}
							?>
                        </li>                   
					<?php
						 }
					}
					//购物车产品详细信息 end }
					?>
                </ul>
		</div>
</div>
<?php //产品清单 end }?>
</div>

<?php //结账清单 start { ?>

  <div class="payment-wrap">
  	  <!-- <h3>结算信息</h3> -->

      <div class="contentText">
        <table border="0" width="100%" cellspacing="1" cellpadding="2">
          <tr>
            <td width="30%" valign="top">
            <table border="0" width="100%" cellspacing="0" cellpadding="2">
            <?php
              $used_billing = 0;	//是否启用账单地址
              if($used_billing == "1"){
            ?>
              <tr>
                <td><?php echo '<strong>' . HEADING_BILLING_ADDRESS . '</strong> <a href="' . html::href_link(FILENAME_CHECKOUT_PAYMENT_ADDRESS, '', 'SSL') . '"><span class="orderEdit">(' . TEXT_EDIT . ')</span></a>'; ?></td>
              </tr>
              <?php }?>
              <tr>
                <td><?php echo tep_address_format($FastCart->billing['format_id'], $FastCart->billing, 1, ' ', '<br />'); ?></td>
              </tr>
              <tr>
                <td>
                <strong>
                <?php // HEADING_PAYMENT_METHOD . ' '.$order->info['payment_method']; //支付方式XXX ?>
                <?php
                //注释付款模块$obj = new ${$payment_modules->selected_module};
                //注释付款模块echo HEADING_PAYMENT_METHOD.'：'.$obj->title;
                ?>
                </strong>
                <?php
                /*注释付款模块<a href="javascript:void(0);" onClick="G._goto('#PaymentInfo');">(<?= TEXT_EDIT;?>)</a>*/
                ?>
                <?php /* FILENAME_CHECKOUT_PAYMENT */ ?>
                </td>
              </tr>
            </table>
            
                <?php
                //优惠选择模块(->do_InputHtml())
                if($data['Ot_Input_List']){
                ?>
                <div>
                    <ul class="dis-item">
                        <?php
                        foreach($data['Ot_Input_List'] as $val){
                            if($val){
                                echo $val; //输出的是<li>...</li>
                            }
                        }
                        ?>
                    </ul>
                </div>
                <?= $data['Ot_Js_Code'];?>
                <?php }?>
            
            </td>
            <td width="70%" valign="top" align="right">
    <?php /*
            <ul class="order_total">
            <li class="b"><span class="title">总价：</span><span class="text"><?= $currencies->format($FastCart->show_total()); ?></span></li>
            </ul>
    */ ?>
                
                <div id="J_cartTotal" class="total_details money-total">
                    <?php
                    //总价信息
                    $_eur = $_cny = $_twd = $_jpy = $_gbp = $_hkd = '';
                    $_t = $FastCart->getTotalDetails();
                    $_i_will_pay = 0;
                    $_ot_total = 0;
                    foreach($_t as $val){
                    ?>
                        <p><label><?= $val['title'];?></label><em><?= $val['text'];?></em></p>
                    <?php
                        if(strtolower($val['class'])=='ot_total'){
                            $_ot_total = $_i_will_pay = $val['value'];
                            $_eur = $currencies->format ($val['value'], true, 'EUR');
                            $_cny = $currencies->format ($val['value'], true, 'CNY');
                            $_twd = $currencies->format ($val['value'], true, 'TWD');
                            $_jpy = $currencies->format ($val['value'], true, 'JPY');
                            $_gbp = $currencies->format ($val['value'], true, 'GBP');
                            $_hkd = $currencies->format ($val['value'], true, 'HKD');
                        }
                    }
                    ?>
                </div>
                
                <?php
                if($cart_have_jiebantongyong === true){	//结伴同游时的付款情况
                    $_i_will_pay = Calculators_Cart::getMyJieBanTongYouWillPay ($_ot_total, $_SESSION['passenger'], $FastCart);
                    $_other_pay = $_ot_total - $_i_will_pay;
                ?>
                <div class="together money-total">	 
                    <p><label>其他人付款金额(结伴同游):</label><em id="J_jiebantongyou_pay"><?= $currencies->format ($_other_pay, true, 'USD');?></em></p>
                </div>	
                <?php
                }
                ?>
                
                <div class="fr" id="payable">
                    <span>您需要支付：</span><span id="J_payable-cost" class="payable-cost"><?= $currencies->format ($_i_will_pay, true, 'USD');?></span>
                </div>
                <div class="other-money" style="display:<?= 'none'?>">
                    <a href="javascript:void(0)" class="see-other">查看其他币种金额</a>
                    <div class="other-currency">
                        <span class="currency-rmb">人民币:</span><span class="important-text-f60"><?= $_cny;?></span>
                        <span class="currency-euro">欧元:</span><span class="important-text-f60"><?= $_eur;?></span>
                        <span class="currency-euro">英镑:</span><span class="important-text-f60"><?= $_gbp;?></span>
                        <span class="currency-euro">日元:</span><span class="important-text-f60"><?= $_jpy;?></span>
                        <span class="currency-euro">港币:</span><span class="important-text-f60"><?= $_hkd;?></span>
                        <span class="currency-euro">新台币:</span><span class="important-text-f60"><?= $_twd;?></span>
                    </div>
                </div>
                
            </td>
          </tr>
        </table>
      </div>
  </div>
<?php //结账清单 end } ?>

<?php
//支付方式模块 start {
//注释付款模块
if (is_array($payment_modules->modules)) {
	if ($confirmation = $payment_modules->confirmation()) {
?>

  <h2><?php echo HEADING_PAYMENT_INFORMATION; //支付信息 ?></h2>

  <div class="contentText">
    <table border="0" cellspacing="0" cellpadding="2">
      <tr>
        <td colspan="4"><?php echo $confirmation['title']; ?></td>
      </tr>

	<?php
    for ($i=0, $n=sizeof($confirmation['fields']); $i<$n; $i++) {
    ?>

      <tr>
        <td><?php echo html::separator('pixel_trans.gif', '10', '1'); ?></td>
        <td class="main"><?php echo $confirmation['fields'][$i]['title']; ?></td>
        <td><?php echo html::separator('pixel_trans.gif', '10', '1'); ?></td>
        <td class="main"><?php echo $confirmation['fields'][$i]['field']; ?></td>
      </tr>

<?php
}
?>

    </table>
  </div>

<?php
	}
}
//支付方式模块 end }
?>
  
<form name="checkout_confirmation" action="<?= $form_action_url?>" method="post" enctype="multipart/form-data" onsubmit="return validateConfirmation(this);">  
  <div class="contentText clear">
    <div>
<?php
//支付模块的一些按钮信息 start {
if (is_array($payment_modules->modules)) {
	//注意：可能会有很多隐藏域。不能删除！
	echo $payment_modules->process_button();
}
//支付模块的一些按钮信息 end }
?>

<?php if($error == false){?><button type="submit" class="confirmation-orders-btn">确认订单</button><?php }?>

    </div>
    <div>
          <label id="js-agree-label"><input id="agree-check" type="checkbox">已阅读并同意《<a href="javascript:void(0);" onclick="seeProtocol()">订购协议</a>》</label>
    </div>
  </div>
</form>

<div id="protocol">
    <h3>订购协议</h3>
    <p onclick="closeProtocol()">x</p>
    <div>
        <textarea class="con"></textarea>
    </div>
 </div>
