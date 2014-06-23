/* 购物车JS代码 */
/**
 * 删除购物车产品
 * @param string prid_str 产品id字符串
 * @param string url 提交的目标网址
 */
function cartRemove(prid_str, url){
	if(confirm("确定从购物车中删除此商品？")){
		jQuery.post(url,{ajax : 'true' ,action : 'remove_product' , products_id : prid_str } , function(data){
			if(data){
				if(data['removeSuccess'] == "1"){
					var tr = document.getElementById('J_catrTr_'+prid_str);
					$(tr).fadeOut("500",function(o){
						$(o).remove();
						var table = '';/* <p><label><?= $val['title'];?></label><em><?= $val['text'];?></em></p>*/
						var n = data['J_cartTotal'].length;
						for(var i=0; i < n; i++){
							table+= '<p>';
							table+= '<label>' + data['J_cartTotal'][i]['title'] + '</label><em>' + data['J_cartTotal'][i]['text'] + '</em>';
							table+= '</p>';
						}
						table += '';
						$('#J_cartTotal').html(table);
						$('#J_cartPoints').html(data['J_cartPoints']);
					});
				}
			}
		}, "json");
	}
}

/**
 * 清空购物车产品
 * @param string url 提交的目标网址
 */
function cartClearAll (url){
	if(confirm("确定清空购物车所有商品，且不能恢复？")){
		if(url.indexOf('?') > -1){
			url += '&action=clear_cart';
		} else {
			url += '?action=clear_cart';
		}
		jQuery.post(url, {ajax : 'true'} , function(data){
			if(data){
				if(data['OK'] == "1"){
					artDialog('您的购物车已清空。',function(){
						window.location.reload();
					});
				}
			}
		}, "json");
	}
}

/**
 * 打开编辑购物车产品界面
 * @param string url 提取的网址
 * @param string products_id_str 产品id字符串
 * @param string BookingBoxId 购物车面板id
 * @param string needHideID 需要隐藏的元素id
 */
function editCartProducts(url, products_id_str, BookingBoxId, needHideID){
	var BookingBox = document.getElementById(BookingBoxId);
	$('div[id^="infoBox_"]').show();
	$(BookingBox).hide(0);
	//将同类的BookingBoxId中的板块清空，id有‘BookingBox_’开头的去掉

	$('div[id^="BookingBox_"]').html('');
	
	//alert(BookingBoxId);
	G.getBookingBox(url, products_id_str, BookingBoxId);
	var hideObj = document.getElementById(needHideID);
	$(hideObj).fadeOut(300, function(){
		$(BookingBox).fadeIn(100);
	});
}
