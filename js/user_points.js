var __usitrip = {
    reSendValidationEmail : function(url) {
        $.post(url,{'action':'resend'},function(r){
            if (r.error == 0) {
                alert('��֤���ѳɹ����ͣ�');
            }
        },'json');
    }
}