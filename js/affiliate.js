/* ��¼��������������� */
function _check_login_affiliate_input(jQueryObj){
    if(jQuery(jQueryObj).val() != ""){
        jQuery(jQueryObj).next("label").hide();
    }else{
        jQuery(jQueryObj).next("label").show();
    }
}

jQuery(document).ready(function(){
    var emailInput = jQuery("#email_address");
    var passInput = jQuery("#password");

    setTimeout(function(){
        _check_login_affiliate_input("#email_address");
        _check_login_affiliate_input("#password");
    }, 0);

    jQuery(emailInput).bind('keyup keydown change blur mouseenter mouseleave',function(){
        _check_login_affiliate_input(emailInput);
        _check_login_affiliate_input(passInput);
    });

    jQuery(passInput).bind('keyup keydown change blur mouseenter mouseleave',function(){
        _check_login_affiliate_input(emailInput);
        _check_login_affiliate_input(passInput);
    });


    /*������Ʒ�Ƽ�����*/
    jQuery("ul.sinfo_pro > li").find("div.sinfo_propic").hover(function(){
        jQuery(this).find("div.sinfo_profilter").stop(true,true).slideUp(350).end().find("div.sinfo_protext").stop(true,true).slideUp(350);
    },function(){
        jQuery(this).find("div.sinfo_profilter").stop(true,true).slideDown(350).end().find("div.sinfo_protext").stop(true,true).slideDown(350);
    });
});

/* ����ֲ����� start{*/
window.onload = function(){
    var oBox = document.getElementById("spic_box");
    var oList = oBox.getElementsByTagName("ul")[0];
    var aImg = oBox.getElementsByTagName("img");
    var timer = playTimer = null;
    var index = i = 0;
    var bOrder = true;
    var aTmp = [];
    var aBtn = null;

    for (i = 0; i < aImg.length; i++){
        aTmp.push("<li>" + (i + 1) + "</li>")
    };

    var oCount = document.createElement("ul");
    oCount.className = "spic_control";
    oCount.innerHTML = aTmp.join("");
    oBox.appendChild(oCount);
    aBtn = oBox.getElementsByTagName("ul")[1].getElementsByTagName("li");

    cutover();

    for (i = 0; i < aBtn.length; i++){
        aBtn[i].index = i;
        aBtn[i].onmouseover = function (){
            index = this.index;
            cutover()
        }
    }

    function cutover(){
        for (i = 0; i < aBtn.length; i++){
            aBtn[i].className = "";
        }
        aBtn[index].className = "current";
        startMove(-(index * aImg[0].offsetHeight))
    }

    function next(){
        bOrder ? index++ : index--;
        index <= 0 && (index = 0, bOrder = true);
        index >= aBtn.length - 1 && (index = aBtn.length - 1, bOrder = false)
        cutover()
    }

    playTimer = setInterval(next, 3000);

    oBox.onmouseover = function (){
        clearInterval(playTimer)
    };

    oBox.onmouseout = function (){
        playTimer = setInterval(next, 3000)
    };
    function startMove(iTarget){
        clearInterval(timer);
        timer = setInterval(function (){
            doMove(iTarget)
        }, 30)
    }
    function doMove (iTarget){
        var iSpeed = (iTarget - oList.offsetTop) / 10;
        iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
        oList.offsetTop == iTarget ? clearInterval(timer) : oList.style.top = oList.offsetTop + iSpeed + "px"
    }
};