$("#t_companion_content").bind("keyup paste keydown",	function() {
		var curLength = $.trim($(this).val()).length;
		var worldlenName = parseInt($(this).attr('maxlength'));
		worldlenName = worldlenName > 0 ? worldlenName : 100;
		if (curLength > worldlenName) {
			var num = $.trim($(this).val()).length - worldlenName;
			albumNote = "<em class='orange'>" + eval(parseInt(worldlenName) + parseInt(num)) + "</em>字/" + worldlenName + "字,您已超过<em style='color:#f00; padding:0 2px;' class='orange'>" + num + "</em>字";
			$(this).parent().parent().find(".r").html("<p id='doubleName' class='specialadd_talk_error f12 darkgray666 png24'><span class='png24'>" + albumNote + "</span></p>");
		} else {
			if (curLength == 0) {
				if ($.trim($(this).val()) == "") {
					$(this).parent().parent().find(".r").html("<p id='doubleName' ><span>还可以输入<em style='color:#4CA20D; padding:0 2px;' >" + worldlenName + "</em>个字</span></p>");
				} else {
					$(this).parent().parent().find(".r").html("<p id='doubleName'><span>还可以输入<em style='color:#4CA20D; padding:0 2px;' >" + worldlenName - 1 + "</em>个字</span></p>");
				}
			} else {
				var num = worldlenName - $.trim($(this).val()).length;
				$(this).parent().parent().find(".r").html("<p id='doubleName' ><span>还可以输入<em style='color:#4CA20D; padding:0 2px;' >" + num + "</em>个字</span></p>");
			}
		}
		//setState();
});