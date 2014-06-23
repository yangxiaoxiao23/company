function email_validation(id) {
    bindValidateEmail(id);
}


var bindValidateEmail = function(id){
	 $('.J-email-validation').click(function () {
        var button = $(this);
        var email = $('#ucchg-email').val();
		button.find('span').html('正在发送验证邮件');
        $.post(validateUrl, {'action': 'send_validate_email', 'email': email}, function (r) {
            if (r.error == 0) {
                $('#ValidatingTips').html(r.errmsg);
            }
            button.unbind('click').find('span').html('验证中...');
        }, 'json');
    });
}


var reSendValidationEmail = function () {
	$('.J-email-validation span').html('正在发送验证邮件');
	$.post(validateUrl, {'action': 'resend'}, function (r) {
		if (r.error == 0) {
			artDialog.alert('验证码已成功发送！');
			$('.J-email-validation span').html('验证中...');
		}
	}, 'json');
}

var cancleValidateEmail = function(){
	$.post(ajaxCurrentUrl, {'action': 'unbind_email'}, function (r) {
		if (r.error == 0) {
			artDialog.alert('邮箱验证已取消!');
			window.location.reload();
		}
	}, 'json');
}

/**
 * 手机号验证AJAX请求
 */
$(function(){
	
	var timeer;
	
    $('.J_mobile_validation').click(function(){
        var m_phone = $('input[name="mobilephone"]').val();
		var button = $(this);
        $.post(ajaxCurrentUrl,{'action':'validation_mobile_phone','mobilephone':m_phone},function(r){
            if (r.error == 0) {
                artDialog.alert('验证短信已发送！');
				var html = '<p id="countdownTip">验证码已发送!如果 <em id="countdown">' + r['validation_time'] + '</em> 秒后您的手机还未收到请点击"重发验证码"</p><p><span id="verify_phone">验证码:<input onblur="this.value = simplized(this.value);" type="text" class="text" id="validate_code"/><span id="GetPasswordBtn">验证</span></span></p>';
				button.find('span').text('验证码已发送');
				$('#verify_phone_warp').html(html).show();
				
				timeer = setInterval(function(){
					var time = parseInt($('#countdown').text());
					if(time){
						$('#countdown').text(parseInt(time) - 1);
					} else {
						$('#countdownTip').hide();
						clearInterval(timeer);
						button.find('span').text('重发验证码');
					}
				}, 1000);
				
            } else {
                artDialog.alert(r.errorMessage);
            }
        },'json');
    });
    //ajaxCurrentUrl

    $("#GetPasswordBtn").live('click', function(){
        var m_phone = $('input[name="mobilephone"]').val();
        var code = $("#validate_code").val();
        $.post(ajaxCurrentUrl,{'action':'check_sms_validate_code','mobilephone':m_phone,'code':code},function(r){
            if (r.error == 0) {
                artDialog.alert('成功绑定！');
				var html = '<span class="successTip">手机已通过验证。</span><a class="uc-reg-emlvld" onclick="cancleMobileValidate()" href="javascript:void(0);"><span>取消验证</span></a>';
				clearInterval(timeer);
				$('#mobile-tips').html(html);
				$('#verify_phone_warp').empty();
            } else {
                artDialog.alert(r.errorMessage);
            }
        },'json');
    });
});

var cancleMobileValidate = function(){
	$.post(ajaxCurrentUrl, {'action': 'unbind_mobilephone'}, function (r) {
		if (r.error == 0) {
			artDialog.alert('手机验证已取消!');
			window.location.reload();
		}
	}, 'json');
}