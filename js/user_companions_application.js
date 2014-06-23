// JavaScript Document
function cancel(tca_id) {
	if (!tca_id) return false;
	if(window.confirm('您确定要取消此结伴同游的申请吗？此操作不可逆！')){
		$.post(CompanionCancelApplicationUrl,{'tca_id':tca_id},function(data,textStatus,jqXHR){
			if (data.status == 0) {
                alert('成功取消申请！');
                window.location.reload();
            } else {
                alert(data.errmsg);
            }
		},'json');
	}
}