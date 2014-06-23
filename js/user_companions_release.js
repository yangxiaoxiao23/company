// JavaScript Document
function setApplicationStatu(tca_id,status,oldStatus){
	if (tca_id > 0 && status > 0) {
		var msg = window.prompt('还是留个言给对方吧！','填写你想讲的话。');
        if (!msg) return;
		$.post(setApplicationStatusUrl,{'tca_id':tca_id,'status':status,'msg':msg,'oldstatus' : oldStatus},function(data,textStatus,jqXHR){
			console.log(data);
			console.log(textStatus);
			console.log(jqXHR);
			if (data.status == 0) {
				alert('操作成功！');
				window.location.reload();
			} else {
				alert(data.errmsg);
			}
		},'json');
	} else {
		alert('参数错误！');
	}
}

function setToExpire(t_companion_id,status){
	if(window.confirm('确认要更改结伴同游状态！')) {
		if (status == 0 || status == 1) {
			$.post(setCompanionsToExpireUrl,{'t_companion_id':t_companion_id,'status':status},function(data,textStatus,jqXHR){
				console.log(data);
				console.log(textStatus);
				if (data.status == 0) {
					alert('设置成功！');
					window.location.reload();
				} else {
					alert(data.errmsg);
				}
			},'json');
		} else {
			alert('参数错误!');
		}
	} else {
		return false;
	}
}

function toOrder(t_companion_id){
	var string = '';
	var len=products[t_companion_id].length;
	if (len == 1) {
		location.href = products[t_companion_id][0]['href'] + '?t_companion_id=' + t_companion_id;
		return;
	}
	for(var i=0;i<len;i++){
		string += i + "," +products[t_companion_id][i]['name'] + "\n";
	}
	var ipt = window.prompt(string,'请输入上面的序号');
	console.log(ipt);
	if(isNaN(ipt) || ipt == null) return;
	location.href = products[t_companion_id][ipt]['href'] + '?t_companion_id=' + t_companion_id;
}