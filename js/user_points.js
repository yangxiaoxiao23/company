var __usitrip = {
    reSendValidationEmail : function(url) {
        $.post(url,{'action':'resend'},function(r){
            if (r.error == 0) {
                alert('验证码已成功发送！');
            }
        },'json');
    }
}