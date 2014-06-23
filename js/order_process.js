jQuery(document).ready(function(){
    jQuery("div.step_tabitem ul > li").bind("click",function(){
        jQuery(this).parents("div.step_tabitem").find("li").removeClass("current");
        jQuery(this).addClass("current");
        jQuery("div.step_notice").find("strong").html(jQuery(this).find("span.txt").text());
        jQuery(this).parents("div.step_content").find("div.step_pic div").hide();
        jQuery(this).parents("div.step_content").find("div.step_pic div").eq(jQuery(this).parents("div.step_tabitem").find("li").index(this)).show();
    });
    jQuery("div.step_button span.prev").click(function(){
        var curtd = jQuery("div.help_step").find("td.current");
        var steptd = jQuery("div.help_step td");
        var curtd_idx = jQuery("div.help_step td").index(curtd);
        if(curtd_idx == 0){
            jQuery(this).removeClass("on").addClass("un");
            alert("当前已经是第一步");
            return false;
        }
        prev(curtd_idx);
    });
    jQuery("div.step_button span.next").click(function(){
        var curtd = jQuery("div.help_step").find("td.current");
        var steptd = jQuery("div.help_step td");
        var curtd_idx = jQuery("div.help_step td").index(curtd)
        if(curtd_idx == (jQuery("div.help_step td").length-1)){
            alert("当前已经是最后一步");
            return false;
        }
        next(curtd_idx);
    });
    function prev(curtd_idx){
        jQuery("div.step_button span.next").removeClass("un").addClass("on");
        jQuery("div.help_step td").removeClass("current");
        jQuery("div.help_step td").eq(curtd_idx-1).addClass("current");
        jQuery("div.help_cnt div.step_content").hide();
        jQuery("div.help_cnt div.step_content").eq(curtd_idx-1).show();
        if(curtd_idx == 1){
            jQuery("div.step_button span.prev").removeClass("on").addClass("un");
        }
        var showcnt = jQuery("div.help_cnt div.step_content").eq(curtd_idx-1);
        var showitem = jQuery(showcnt).find("li.current");
        var txt = jQuery(showitem).find("span.txt").text();
        jQuery("div.step_notice").find("strong").html(txt);
    }
    function next(curtd_idx){
        jQuery("div.step_button span.prev").removeClass("un").addClass("on");
        jQuery("div.help_step td").removeClass("current");
        jQuery("div.help_step td").eq(curtd_idx+1).addClass("current");
        jQuery("div.help_cnt div.step_content").hide();
        jQuery("div.help_cnt div.step_content").eq(curtd_idx+1).show();
        if(curtd_idx == jQuery("div.help_step").find("td").length - 2){
            jQuery("div.step_button span.next").removeClass("on").addClass("un");
        }
        var showcnt = jQuery("div.help_cnt div.step_content").eq(curtd_idx+1);
        var showitem = jQuery(showcnt).find("li.current");
        var txt = jQuery(showitem).find("span.txt").text();
        jQuery("div.step_notice").find("strong").html(txt);
    }
    var urlstr = window.location.href;
    var ids = urlstr.split("#")[1];
    if(ids){
        if(ids == 0){
            return;
        }
        var ids = ids.replace("o","");
        ids--;
        //alert(ids);
        next(ids);
    }
});