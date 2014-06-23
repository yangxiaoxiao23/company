$(document).ready(function(){
	$('#topicList dt a').hover(function(){
        if ($(this).parent().next().css('display') == 'none') {
            $('#topicList > dd:visible').stop(true,true);
            $('#topicList > dd:visible').slideUp(300).parent().find('dt > a').removeClass('current');
            $(this).parent().next().slideDown(300);
            $(this).addClass('current');
        }
        return false;
    });						   
});