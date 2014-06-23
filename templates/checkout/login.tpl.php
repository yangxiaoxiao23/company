<?php if(!(int)$_SESSION['customer_id']){?>
<dl>
	<dt>订购人信息</dt>
	<dd class="js-register position-element clear" style="display: block;">
		<div class="status"><span>已是会员：<e class="go-login">登录</e></span></div>
		<?= $data['reg_form_start'].$data['hidden_input'];?>
		<input name="fast_reg" type="hidden" value="1" />
		<div class="register-form">
			<div class="purchaser-info clear">
				<div class="person-attr fl">
					<p><span class="must-input-mark">*</span>姓名：</p>
					<p><span class="must-input-mark">*</span>电子邮箱：</p>
					<p><span class="must-input-mark">*</span>手机号码：</p>
				</div>
				<div class="person-value fl">
					<p><input name="customers_name_cn" type="text" id="purchaser-name"></p>
					<p><input name="email_address" type="text" tooltip="请输入您的邮箱地址，以便接收电子参团凭证信息。" class="txt tooltip" style="ime-mode: disabled;" /></p>
					<p id="mobile-phone">
                    	<!--
						<input class="country-select"> 
						<input value="86" readonly="" class="country-id">
						<input name="mobilephone" class="tourist-phone">
						<span class="tooltip">6位</span>
                        -->
                    </p>
				</div>
			</div>
				
			<div class="submit-btn"><button id="register-submit" type="submit" >开始预订</button></div>
		</div>
		<?= $data['reg_form_end'];?>
										
		<div class="register-tooltip">
			<p>提示：我们会将您注册为会员,便于在线跟踪订单详情及查看积分情况，密码将发送到您的邮箱！</p>    
		</div>
	</dd>
		
	<dd style="display: none;" class="js-login position-element  clear">
		<div class="status"><span>非会员：</span><span class="go-register">返回</span></div>
		<?= $data['form_start']?>
		<div class="login-form">	
			<div class="purchaser-info clear">
				<div class="person-attr fl">
					<p><span class="must-input-mark">*</span>电子邮箱：</p>
					<p><span class="must-input-mark">*</span>登录密码：</p>
				</div>
				<div class="person-value fl">
					<p>
					<input name="email_address" tooltip="请输入您的账号！" type="text" class="validate[required] txt tooltip" value="" onblur="<?= $data['onblur']?>"  autocomplete="off" style="ime-mode: disabled;" />
					<span class="login-tooltip">已是会员，请登录</span>
					</p>
					<p>
					<input name="password" tooltip="请输入您的密码！" type="password" value="" class="validate[required] txt tooltip" />
					<a class="forget-password" href="<?= $data['href']['password_forgotten']?>" target="_blank">忘记密码</a>
					</p>
				</div>
			</div>
			<div class="submit-btn"><button id="login-submit" type="submit">登录</button></div>
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
/* 提交登录账号信息 */
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
			alert('未知原因造成登录失败！');
		}
	},'json');
};

/* 提交注册信息 */
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
			alert('未知原因造成注册失败！');
		}
	},'json');
};

<?php if(tep_session_is_registered('customer_id') && $_SESSION['customer_id'] >0 ){	//如果已经登录则显示游客信息和航班信息?>
	$().ready(function(){
		getCheckoutModule("<?= html::href_link_noseo('ajax.php','mod=checkout_passenger&write_tmp_orders=1','SSL');?>", "getCheckoutPassenger", "PassengerFlightInfo");
	});
<?php }?>

$(function(){

	<!--  第一级节点 -->
	var bodyEl = $('body') ; //页面主体body
		
	// 第二级节点
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
