<?php
/**
 * ������Ϣģ�塣
 * ע�⣺checkout���˹��� �� �û����ĵĶ�����Ϣ ������ô�ģ��Ӵ���޸ĵ�ʱ��ע�����
 * @package 
 */

$_readonly0 = '';
$_readonly1 = '';

if($P['flights']['self_define_reach'][$J]=="1"){
	$_readonly0 = ' readonly="readonly" ';
}
if($P['flights']['self_define_departure'][$J]=="1"){
	$_readonly1 = ' readonly="readonly" ';
}
$i_J = $i.'_'.$J;
?>

<!-- <li num_tag="<?= $i_J?>"> -->
	<li num_tag="<?= $i_J?>" class="edit-flight">
        <p class="flight-title pngFix">��������</p>
        <?php if((int)$J){?>
        	<div class="action-delete"><button class="delete" onclick="$(this).parent('div').parent('li').remove();">�Ƴ�</button></div>
        <?php }?>
        <div class="clear">
        	<div class="flight-con">
                <p id="J_flights_guest_result_<?= $i_J?>" class="title">�����˺�����οͣ��ɶ�ѡ��</p>
                
                <?php /*
                <p class="passenger" id="J_flights_guest_result_<?= $i_J?>">
                	<?php
						if(is_array($P['flights']['flightsGuest'][$J])){
							foreach($P['flights']['flightsGuest'][$J] as $key => $val){
								echo '<span>��'.$DB->output($val).'��</span> ';
							}
						}
					?>
                </p>
				*/ ?>
                
                
                <div class="passenger clear">
                    <div class="select-all fl">
                    
                    	<label><input type="checkbox" value="all" onclick="select_all_checkbox(this);" /> ȫѡ </label>
                        <!-- <label class="js-select-all"><input type="checkbox">ȫѡ</label> -->
                    </div>
                    
                    <div class="passenger-option fl">
                        <ul class="js-passenger-option<?=$i?>  clear" checkboxtarget="flightsGuest[<?= $i?>][<?= $J?>]" id="J_flights_guest_checkbox_<?= $i_J?>">
                            <?php
								if(is_array($P['flights']['flightsGuest'][$J])){
									foreach($P['flights']['flightsGuest'][$J] as $key => $val){
							?>
							<li><label><input name="flightsGuest[<?= $i?>][<?= $J?>][]" value="<?= $val['value'];?>" type="checkbox" <?= ($val['checked'] === true ? 'checked="checked"' :'')?>><?= $val['text'];?></label></li>
							<?php
									}
								}
							?>
                        </ul>
                    </div>
                </div>
                
                <div class="aerobus-info">
                    <h3>�ӻ�����</h3>
                    <table>
                        <caption>
                            <label><?= html::input_checkbox_field('self_define_reach['.$i.']['.$J.']','1', $P['flights']['self_define_reach'][$J], 'onclick="self_define_reach(\''.$i_J.'\', this);"');?>������������ס�Ƶ�</label>
                            <p class="tips">������ѡ��������ס�Ƶ꣬��㹴ѡ����ĸ�ѡ�򡣣�</p>
                        </caption>
                        <tbody>
                        <tr>
                            <td class="attr">�ӻ����ڣ�</td>
                            <td class="val" id="p_arrival_date_<?= $i?>_<?= $J?>"><?= html::input_num_en_field('arrival_date['.$i.']['.$J.']',$P['flights']['arrival_date'][$J],'reach_tag="'.$i_J.'" size="17"'.$_readonly0.' id="arrival_date_'.$i.'_'.$J.'" ');?></td>
                            <script>flightsCalendarYhb("<?= 'arrival_date_'.$i.'_'.$J;?>","<?= tep_not_null($P['flights']['arrival_date'][$J]) ? date('Y-m-d',strtotime($P['flights']['arrival_date'][$J])) : (date('Y-m-d'));?>","<?= date('Y-m-d', strtotime('+2 years'));?>");</script>
                        </tr>
                        <tr>
                            <td class="attr">���չ�˾��</td>
                            <td class="val"><?= html::input_field('airline_name['.$i.']['.$J.']',$P['flights']['airline_name'][$J],'reach_tag="'.$i_J.'" size="17"'.$_readonly0);?></td>
                        </tr>
                        <tr>
                            <td class="attr">�ӻ����ࣺ</td>
                            <td class="val"><?= html::input_num_en_field('flight_no['.$i.']['.$J.']',$P['flights']['flight_no'][$J],'reach_tag="'.$i_J.'" size="17"'.$_readonly0);?></td>
                        </tr>
                        <tr>
                            <td class="attr">�ӻ�������</td>
                            <td class="val"><?= html::input_field('airport_name['.$i.']['.$J.']',$P['flights']['airport_name'][$J],'reach_tag="'.$i_J.'" size="17"'.$_readonly0);?></td>
                        </tr>
                        <tr>
                            <td class="attr">����ʱ�䣺</td>
                            <td class="val"><?= html::select_field('arrival_time_hour['.$i.']['.$J.']', Flights::getTimeHoursArray('H'), $P['flights']['arrival_time_hour'][$J]).html::select_field('arrival_time_minute['.$i.']['.$J.']', Flights::getTimeHoursArray('I'), $P['flights']['arrival_time_minute'][$J]); ?></td>
                        </tr>
                        <!--
                        <tr>
                            <td class="attr">�ο��ֻ���</td>
                            <td class="val"><?= html::input_num_en_field('flight_contact_phone['.$i.']['.$J.']',$P['flights']['flight_contact_phone'][$J],'reach_tag="'.$i_J.'" size="17"'.$_readonly0);?> <label><input name="same_contact_phone[<?= $i;?>][<?= $J;?>]" type="checkbox" value="1" onclick="var findObj = $(this).parents('p').find('input[name^=\'flight_contact_phone\']'); if(this.checked==true){ $(findObj).hide(); }else{ $(findObj).show(); }" > ͬ�����ο��ֻ�</label>
                            </td>
                        </tr>
                        -->
                        
                    </tbody></table>
                </div>
            </div>
        	
            <div class="flight-con">
                <p id="J_flights_guest_result_<?= $i_J?>"  class="title">�����˺�����οͣ��ɶ�ѡ��</p>
                <?php /* <p class="passenger" id="J_flights_guest_result_<?= $i_J?>">
					<?php
						if(is_array($P['flights']['flightsGuest'][$J])){
							foreach($P['flights']['flightsGuest'][$J] as $key => $val){
								echo '<span>��'.$DB->output($val).'��</span> ';
							}
						}
					?>
                </p> */ ?>
                
                <div class="passenger clear">
                    <div class="select-all fl">
                    	<label><input type="checkbox" value="all" onclick="select_all_checkbox(this); " /> ȫѡ </label>
                        <!-- <label class="js-select-all"><input type="checkbox">ȫѡ</label> -->
                    </div>
                    
                    <div class="passenger-option fl">
                        <ul class="js-passenger-option<?=$i?> clear" checkboxtarget="flightsGuestDep[<?= $i?>][<?= $J?>]" id="J_flights_guest_checkbox_<?= $i_J?>">
							<?php
								if(is_array($P['flights']['flightsGuestDep'][$J])){
									foreach($P['flights']['flightsGuestDep'][$J] as $key => $val){
							?>
							<li><label><input name="flightsGuestDep[<?= $i?>][<?= $J?>][]" value="<?= $val['value'];?>" type="checkbox" <?= ($val['checked'] === true ? 'checked="checked"' :'')?>><?= $val['text'];?></label></li>
							<?php
									}
								}
							?>
                        </ul>
                    </div>
                </div>
                
                <div class="aerobus-info">
                    <h3>�ͻ�����</h3>
                    <table>
                        <caption>
                            <label><?= html::input_checkbox_field('self_define_departure['.$i.']['.$J.']','1', $P['flights']['self_define_departure'][$J], 'onclick="self_define_departure(\''.$i_J.'\', this);"');?>�г̽�����������</label>
                            <p class="tips">���������ź��࣬Ĭ��Ϊ�������š���</p>
                        </caption>
                        <tbody>
                        <tr>
                            <td class="attr">�ͻ����ڣ�</td>
                            <td class="val"  id="p_departure_date_<?= $i?>_<?= $J?>"><?= html::input_num_en_field('departure_date['.$i.']['.$J.']',$P['flights']['departure_date'][$J],'depa_tag="'.$i_J.'" size="17"'.$_readonly1.' id="departure_date_'.$i.'_'.$J.'" ');?></td>
                            <script>flightsCalendarYhb("<?= 'departure_date_'.$i.'_'.$J;?>","<?= tep_not_null($P['flights']['departure_date'][$J]) ? date('Y-m-d',strtotime($P['flights']['departure_date'][$J])) : (date('Y-m-d'));?>","<?= date('Y-m-d', strtotime('+2 years'));?>");</script>                            
                        </tr>
                        <tr>
                            <td class="attr">���չ�˾��</td>
                            <td class="val"><?= html::input_field('airline_name_departure['.$i.']['.$J.']',$P['flights']['airline_name_departure'][$J],'depa_tag="'.$i_J.'" size="17"'.$_readonly1);?></td>
                        </tr>
                        <tr>
                            <td class="attr">�ͻ����ࣺ</td>
                            <td class="val"><?= html::input_num_en_field('flight_no_departure['.$i.']['.$J.']',$P['flights']['flight_no_departure'][$J],'depa_tag="'.$i_J.'" size="17"'.$_readonly1);?></td>
                        </tr>
                        <tr>
                            <td class="attr">�ͻ�������</td>
                            <td class="val"><?= html::input_field('airport_name_departure['.$i.']['.$J.']',$P['flights']['airport_name_departure'][$J],'depa_tag="'.$i_J.'" size="17"'.$_readonly1);?></td>
                        </tr>
                        <tr >
                            <td class="attr">���ʱ�䣺</td>
                            <td class="val"><?= html::select_field('departure_time_hour['.$i.']['.$J.']', Flights::getTimeHoursArray('H'), $P['flights']['departure_time_hour'][$J]).html::select_field('departure_time_minute['.$i.']['.$J.']', Flights::getTimeHoursArray('I'), $P['flights']['departure_time_minute'][$J]); ?></td>
                        </tr>
                    </tbody></table>
                </div>
            </div>
        </div>
		
        <?php /*
		<span checkboxtarget="flightsGuest[<?= $i?>][<?= $J?>]" id="J_flights_guest_checkbox_<?= $i_J?>">
		<?php
		if(is_array($P['flights']['flightsGuest'][$J])){
			//echo '��ѡ������˺�����ο�(�ɶ�ѡ)��';
			foreach($P['flights']['flightsGuest'][$J] as $key => $val){
		?>
		<label style="display:none"><input type="checkbox" onclick="get_guest_from_checkbox_to_result(<?= $i;?>)" value="<?= $val;?>" name="flightsGuest[<?= $i?>][<?= $J?>][]" checked="checked"> <?= $val;?></label>
		<?php
			}
		}
		?>
		</span>
		<p id="J_flights_guest_result_<?= $i_J?>">	
		<?php
		if(is_array($P['flights']['flightsGuest'][$J])){
			echo '�����˺�����οͣ�';
			foreach($P['flights']['flightsGuest'][$J] as $key => $val){
				echo '<span>��'.$DB->output($val).'��</span> ';
			}
		}
		?>
		</p>
	</div>
	<div class="pick-see">
        <div class="pick-up">
        <p><label><?= html::input_checkbox_field('self_define_reach['.$i.']['.$J.']','1', $P['flights']['self_define_reach'][$J], 'onclick="self_define_reach(\''.$i_J.'\', this);"');?>������������ס�Ƶ�</label></p>
        
        <p id="p_arrival_date_<?= $i?>_<?= $J?>">�ӻ����ڣ�<?= html::input_num_en_field('arrival_date['.$i.']['.$J.']',$P['flights']['arrival_date'][$J],'reach_tag="'.$i_J.'" size="17"'.$_readonly0.' id="arrival_date_'.$i.'_'.$J.'" ');?></p>
        <script>flightsCalendarYhb("<?= 'arrival_date_'.$i.'_'.$J;?>","<?= tep_not_null($P['flights']['arrival_date'][$J]) ? date('Y-m-d',strtotime($P['flights']['arrival_date'][$J])) : (date('Y-m-d'));?>","<?= date('Y-m-d', strtotime('+2 years'));?>");</script>
        
        <p>����ʱ�䣺<?= html::select_field('arrival_time_hour['.$i.']['.$J.']', Flights::getTimeHoursArray('H'), $P['flights']['arrival_time_hour'][$J]).html::select_field('arrival_time_minute['.$i.']['.$J.']', Flights::getTimeHoursArray('I'), $P['flights']['arrival_time_minute'][$J]); ?></p>
        <p>���չ�˾��<?= html::input_field('airline_name['.$i.']['.$J.']',$P['flights']['airline_name'][$J],'reach_tag="'.$i_J.'" size="17"'.$_readonly0);?></p>
        <p>�ӻ����ࣺ<?= html::input_num_en_field('flight_no['.$i.']['.$J.']',$P['flights']['flight_no'][$J],'reach_tag="'.$i_J.'" size="17"'.$_readonly0);?></p>
        <p>�ӻ�������<?= html::input_field('airport_name['.$i.']['.$J.']',$P['flights']['airport_name'][$J],'reach_tag="'.$i_J.'" size="17"'.$_readonly0);?></p>
        <p>�ο��ֻ���<?= html::input_num_en_field('flight_contact_phone['.$i.']['.$J.']',$P['flights']['flight_contact_phone'][$J],'reach_tag="'.$i_J.'" size="17"'.$_readonly0);?> <label><input name="same_contact_phone[<?= $i;?>][<?= $J;?>]" type="checkbox" value="1" onclick="var findObj = $(this).parents('p').find('input[name^=\'flight_contact_phone\']'); if(this.checked==true){ $(findObj).hide(); }else{ $(findObj).show(); }" > ͬ�����ο��ֻ�</label></p>
        </div>
	<div class="see-off flight-con">
		<p><label><?= html::input_checkbox_field('self_define_departure['.$i.']['.$J.']','1', $P['flights']['self_define_departure'][$J], 'onclick="self_define_departure(\''.$i_J.'\', this);"');?>�г̽�����������</label></p>
		<p id="p_departure_date_<?= $i?>_<?= $J?>">�ͻ����ڣ�<?= html::input_num_en_field('departure_date['.$i.']['.$J.']',$P['flights']['departure_date'][$J],'depa_tag="'.$i_J.'" size="17"'.$_readonly1.' id="departure_date_'.$i.'_'.$J.'" ');?></p>
		<script>flightsCalendarYhb("<?= 'departure_date_'.$i.'_'.$J;?>","<?= tep_not_null($P['flights']['departure_date'][$J]) ? date('Y-m-d',strtotime($P['flights']['departure_date'][$J])) : (date('Y-m-d'));?>","<?= date('Y-m-d', strtotime('+2 years'));?>");</script>
		
		<p>���ʱ�䣺<?= html::select_field('departure_time_hour['.$i.']['.$J.']', Flights::getTimeHoursArray('H'), $P['flights']['departure_time_hour'][$J]).html::select_field('departure_time_minute['.$i.']['.$J.']', Flights::getTimeHoursArray('I'), $P['flights']['departure_time_minute'][$J]); ?></p>
		<p>���չ�˾��<?= html::input_field('airline_name_departure['.$i.']['.$J.']',$P['flights']['airline_name_departure'][$J],'depa_tag="'.$i_J.'" size="17"'.$_readonly1);?></p>
		<p>�ͻ����ࣺ<?= html::input_num_en_field('flight_no_departure['.$i.']['.$J.']',$P['flights']['flight_no_departure'][$J],'depa_tag="'.$i_J.'" size="17"'.$_readonly1);?></p>
		<p>�ͻ�������<?= html::input_field('airport_name_departure['.$i.']['.$J.']',$P['flights']['airport_name_departure'][$J],'depa_tag="'.$i_J.'" size="17"'.$_readonly1);?></p>
	</div>
	<div class="clear"></div> */ ?>
	</li>



<!-- </li> -->
