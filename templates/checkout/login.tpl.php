<?php if(!(int)$_SESSION['customer_id']){?>
<dl>
	<dt>��������Ϣ</dt>
	<dd class="js-register position-element clear" style="display: block;">
		<div class="status"><span>���ǻ�Ա��<e class="go-login">��¼</e></span></div>
		<?= $data['reg_form_start'].$data['hidden_input'];?>
		<input name="fast_reg" type="hidden" value="1" />
		<div class="register-form">
			<div class="purchaser-info clear">
				<div class="person-attr fl">
					<p><span class="must-input-mark">*</span>������</p>
					<p><span class="must-input-mark">*</span>�������䣺</p>
					<p><span class="must-input-mark">*</span>�ֻ����룺</p>
				</div>
				<div class="person-value fl">
					<p><input name="customers_name_cn" type="text" id="purchaser-name"></p>
					<p><input name="email_address" type="text" tooltip="���������������ַ���Ա���յ��Ӳ���ƾ֤��Ϣ��" class="txt tooltip" style="ime-mode: disabled;" /></p>
					<p id="mobile-phone">
                    	<!--
						<input class="country-select"> 
						<input value="86" readonly="" class="country-id">
						<input name="mobilephone" class="tourist-phone">
						<span class="tooltip">6λ</span>
                        -->
                    </p>
				</div>
			</div>
				
			<div class="submit-btn"><button id="register-submit" type="submit" >��ʼԤ��</button></div>
		</div>
		<?= $data['reg_form_end'];?>
										
		<div class="register-tooltip">
			<p>��ʾ�����ǻὫ��ע��Ϊ��Ա,�������߸��ٶ������鼰�鿴������������뽫���͵��������䣡</p>    
		</div>
	</dd>
		
	<dd style="display: none;" class="js-login position-element  clear">
		<div class="status"><span>�ǻ�Ա��</span><span class="go-register">����</span></div>
		<?= $data['form_start']?>
		<div class="login-form">	
			<div class="purchaser-info clear">
				<div class="person-attr fl">
					<p><span class="must-input-mark">*</span>�������䣺</p>
					<p><span class="must-input-mark">*</span>��¼���룺</p>
				</div>
				<div class="person-value fl">
					<p>
					<input name="email_address" tooltip="�����������˺ţ�" type="text" class="validate[required] txt tooltip" value="" onblur="<?= $data['onblur']?>"  autocomplete="off" style="ime-mode: disabled;" />
					<span class="login-tooltip">���ǻ�Ա�����¼</span>
					</p>
					<p>
					<input name="password" tooltip="�������������룡" type="password" value="" class="validate[required] txt tooltip" />
					<a class="forget-password" href="<?= $data['href']['password_forgotten']?>" target="_blank">��������</a>
					</p>
				</div>
			</div>
			<div class="submit-btn"><button id="login-submit" type="submit">��¼</button></div>
		</div>
		<?= $data['form_end'];?>
	</dd>
</dl>
<script type="text/javascript">
	$(function(){
		new usitrip.widget.MobilePhoneField({
			el: '#mobile-phone'
		});
	
	})
</script>

<?php }?>

<script type="text/javascript">
/* �ύ��¼�˺���Ϣ */
function submit_login(){
	var ea = $('#login_form input[name="email_address"]');
	var pw = $('#login_form input[name="password"]');
	var fd = $('#login_form input[name="formid"]');
	if($(ea).val()==''){ 
		alert($(ea).attr('tooltip'));
		return false;
	}
	if($(pw).val()==''){
		alert($(pw).attr('tooltip'));
		return false;
	}
	$.post($('#login_form').attr('action'),{formid:$(fd).val(), email_address:$(ea).val(), password: $(pw).val() },function(json){
		if(json['result']=='success'){
			$("#LoginInfo").hide();
			getCheckoutModule("<?= html::href_link_noseo('ajax.php','mod=checkout_passenger&write_tmp_orders=1','SSL');?>", "getCheckoutPassenger", "PassengerFlightInfo");
			G._goto('#PassengerFlightInfo');
			$("#loginOrLogin").html(json['html']);
		}else if(json['result']=='error'){
			alert(json['errortext']);
		}else{
			alert('δ֪ԭ����ɵ�¼ʧ�ܣ�');
		}
	},'json');
};

/* �ύע����Ϣ */
function submit_register(){
	var ea = $('#register_form input[name="email_address"]');
	if($(ea).val()==''){ 
		alert($(ea).attr('tooltip'));
		return false;
	}
	var _data = G.get_form_data('register_form', 'eval_string');
	$.post($('#register_form').attr('action'), _data, function(json){
		if(json['result']=='success'){
			$("#LoginInfo").hide();
			getCheckoutModule("<?= html::href_link_noseo('ajax.php','mod=checkout_passenger&write_tmp_orders=1','SSL');?>", "getCheckoutPassenger", "PassengerFlightInfo");
			$("html,body").animate({scrollTop:$('#PassengerFlightInfo').position().top});
			$("#loginOrLogin").html(json['html']);
		}else if(json['result']=='error'){
			
			//if(json['errortext']['code']=='EMAIL_ADDRESS_ERROR_EXISTS'){
				alert(json['errortext']['text']);
			//}
		}else{
			alert('δ֪ԭ�����ע��ʧ�ܣ�');
		}
	},'json');
};

<?php if(tep_session_is_registered('customer_id') && $_SESSION['customer_id'] >0 ){	//����Ѿ���¼����ʾ�ο���Ϣ�ͺ�����Ϣ?>
	$().ready(function(){
		getCheckoutModule("<?= html::href_link_noseo('ajax.php','mod=checkout_passenger&write_tmp_orders=1','SSL');?>", "getCheckoutPassenger", "PassengerFlightInfo");
	});
<?php }?>

$(function(){

	<!--  ��һ���ڵ� -->
	var bodyEl = $('body') ; //ҳ������body
		
	// �ڶ����ڵ�
	var topBarNode = bodyEl.find("#topbar"),
		headNode = 	bodyEl.find("#head"),
		bodyNode = 	bodyEl.find("#body"),
		footNode = 	bodyEl.find("#head");
	
	var registerNode = bodyNode.find('.js-register'),
		loginNode = bodyNode.find('.js-login');
		
	var goLoginForm = registerNode.find('.go-login'),
		goRegisterForm = loginNode.find('.go-register');
				
	goLoginForm.live('click', function(){
		registerNode.slideUp(500);
		loginNode.slideDown(500);
		
		//registerNode.hide();
		//loginNode.show();
	});
	
	goRegisterForm.live('click', function(){
		loginNode.slideUp(500);
		registerNode.slideDown(500);
		
		//loginNode.hide();
		//loginNode.show();
	});		
});

</script>
