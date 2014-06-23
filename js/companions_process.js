jQuery(document).ready(function(){
    jQuery("div.step_tabitem ul > li").bind("click",function(){
        jQuery("div.step_tabitem ul > li").removeClass("current");
        jQuery(this).addClass("current");
        jQuery("div.cp-cnt").hide();
        jQuery("div.cp-cnt").eq(jQuery("div.step_tabitem ul > li").index(this)).show();
    });

    jQuery("div.cp-cnt").each(function(index){
        var curcnt = jQuery("div.cp-cnt").eq(index);
        var prev = jQuery(curcnt).find("span.prev");
        var next = jQuery(curcnt).find("span.next");

        jQuery(prev).click(function(){
            var curtd = jQuery(curcnt).find("td.current");
            var tdlen = jQuery(curcnt).find("td").length;
            var curtdIdx = jQuery(curcnt).find("td").index(jQuery(curtd));
            if(curtdIdx == 0){
                alert("当前已经是第一步");
                return false;
            }else{
                if(curtdIdx == 1){
                    jQuery(this).removeClass("on").addClass("un")
                }
                jQuery(next).removeClass("un").addClass("on");
                jQuery(curcnt).find("td").removeClass("current");
                jQuery(curcnt).find("td").eq(curtdIdx-1).addClass("current");
                jQuery(curcnt).find("div.cp-tips").hide();
                jQuery(curcnt).find("div.cp-pic > div").hide();
                jQuery(curcnt).find("div.cp-tips").eq(curtdIdx-1).show();
                jQuery(curcnt).find("div.cp-pic > div").eq(curtdIdx-1).show();
            }
        });
        jQuery(next).click(function(){
            var curtd = jQuery(curcnt).find("td.current");
            var tdlen = jQuery(curcnt).find("td").length;
            var curtdIdx = jQuery(curcnt).find("td").index(jQuery(curtd));
            if(curtdIdx == (tdlen - 1)){
                alert("当前已经是最后步");
                return false;
            }else{
                if(curtdIdx == tdlen-2){
                    jQuery(this).removeClass("on").addClass("un")
                }
                jQuery(prev).removeClass("un").addClass("on");
                jQuery(curcnt).find("td").removeClass("current");
                jQuery(curcnt).find("td").eq(curtdIdx+1).addClass("current");
                jQuery(curcnt).find("div.cp-tips").hide();
                jQuery(curcnt).find("div.cp-pic > div").hide();
                jQuery(curcnt).find("div.cp-tips").eq(curtdIdx+1).show();
                jQuery(curcnt).find("div.cp-pic > div").eq(curtdIdx+1).show();
            }
        });
    });
});