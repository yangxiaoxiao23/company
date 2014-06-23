jQuery(document).ready(function(){
    var $seft = jQuery("#faq_question > ul > li");
    var $seft2 = jQuery(".hidebox >li");

    $seft.find(":first").click(function(){
        jQuery(this).parent().addClass("cur").siblings().removeClass("cur");
        jQuery(this).next().slideDown(300).end().parent().siblings().find(".hide").slideUp(300);
        jQuery(".hidebox >li").find(".hide2").slideUp().end().removeClass("current");

    })
    $seft2.find(":first").click(function(){
        jQuery(this).parent().addClass("current").siblings().removeClass("current");
        jQuery(this).next().slideDown(300).end().parent().siblings().find(".hide2").slideUp(300);

    });

});