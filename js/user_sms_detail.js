// JavaScript Document
function del_sms(sms_id,type) {
	if (type == 'travel_companion') {
		if (!window.confirm('您确定要删除此条短消息！删除此消息时，附带的会删除他的所有回复消息！')) {
			return;
		}
	}
	if (typeof sms_id != 'undefined') {
		$.post(del_sms_url,{'del_id':sms_id,'type':type},function(data,textStatus,jqX){
			console.log(data);
			console.log(textStatus);
			console.log(jqX);
			if (data.status == 0) {
				alert('删除成功！');
				window.location.reload();
			} else {
				alert(data.errmsg);
			}
		},'json');
	}
}