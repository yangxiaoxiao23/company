<?php
/*
$Id$

osCommerce, Open Source E-Commerce Solutions
http://www.oscommerce.com

Copyright (c) 2010 osCommerce

Released under the GNU General Public License
*/

//require(DIR_WS_INCLUDES . 'counter.php');
//walter added (get friendly_links)
$category = explode('_', $_GET['cPath']);
$category = tep_not_null($category)?end($category):'index';
$friendly_links = tep_get_friendly_links($category);
/* ȥ���ɹ�����ʾ��ʽ
if ($_banner = $bannerObj->exists('dynamic', '468x50')) {
?>

<div class="grid_24" style="text-align: center; padding-bottom: 20px;">
  <?php echo tep_display_banner('static', $_banner); ?>
</div>

<?php
}
*/

?>






<div id="foot">
        <div class="uiWrap uifix">
            <div class="partners">
                <h3>�������</h3>
                <dl>
                    <dt>�ؼۻ�Ʊ</dt>
                    <dd><a href="http://www.jdoqocy.com/click-5516128-10630638" target="_blank">��ѧ����Ʊ CheapOair</a></dd>
                    <dd><a href="http://www.anrdoezrs.net/click-5516128-10392969" target="_blank">ȫ���ؼۻ�Ʊ Priceline</a></dd>
                </dl>
                <dl>
                    <dt>�ͼ۾Ƶ�</dt>
                    <dd><a href="http://www.booking.com/index.html?aid=336352" target="_blank">�������ȾƵ�������Booking</a></dd>
                    <dd><a href="http://travel.ian.com/index.jsp?cid=232843" target="_blank">�����ͼ۾Ƶ�Ԥ�� Hotels</a></dd>
                </dl>
                <dl>
                    <dt>����&amp;�⳵</dt>
                    <dd><a href="<?=html::href_link('insurance.php');?>" target="_blank">����רҵ�����ṩ��Travelinsure</a></dd>
                    <dd><a href="http://www.rentalcars.com/Home.do?affiliatecode=usitrip&adplat=footer&adcamp=footer=hk&preflang=zs" target="_blank">ȫ������⳵ƽ̨rentalcars.com</a></dd>
                </dl>
            </div>
            <div class="site_help">
                <ul class="site_helplist">
                    <li>
                        <div class="site_helpitems">
                            <h4 class="title">��������</h4>
                            <ul class="getstart">
                                <li><a target="_blank" class="highlight" href="<?php echo html::href_link('order_process.php')?>">��������</a></li>
                                <li><a target="_blank" href="<?php echo html::href_link('faq_question.php')?>">��������</a></li>
                                <li><a target="_blank" href="<?php echo html::href_link('payment.php')?>">֧����ʽ</a></li>
                                <li><a target="_blank" href="<?php echo html::href_link('order_agreement.php')?>">����Э��</a></li>
                                <li><a target="_blank" href="<?php echo html::href_link('visa_related.php')?>">ǩ֤���</a></li>
                                <li><a target="_blank" href="<?php echo html::href_link('companions_process.php')?>">���ͬ������</a></li>
                                <li class="nowidth"><a target="_blank" class="highlight" href="<?php echo html::href_link('points.php')?>">���ֺ���(����Ż�100%)</a></li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <div class="site_helpitems">
                            <h4 class="title">������֪</h4>
                            <ul class="getnotes">
                                <li><a target="_blank" href="<?php echo html::href_link('tour_america_need.php')?>#a1">����֤��</a><a href="<?php echo html::href_link('tour_america_need.php')?>#a2">�߼�</a><a href="<?php echo html::href_link('tour_america_need.php')?>#a3">ʱ��</a><a href="<?php echo html::href_link('tour_america_need.php')?>#a4">��ѹ</a></li>
                                <li><a target="_blank" href="<?php echo html::href_link('tour_america_need.php')?>#a9">����״��</a><a href="<?php echo html::href_link('tour_america_need.php')?>#a5">�绰</a><a href="<?php echo html::href_link('tour_america_need.php')?>#a6">����</a><a href="<?php echo html::href_link('tour_america_need.php')?>#a7">�ΰ�</a></li>
                                <li><a target="_blank" href="<?php echo html::href_link('tour_america_need.php')?>#a11">��������</a><a href="<?php echo html::href_link('tour_america_need.php')?>#a8">�ڽ�</a><a href="<?php echo html::href_link('tour_america_need.php')?>#a10">�Ļ�</a><a href="<?php echo html::href_link('tour_america_need.php')?>#a12">�ΰ�</a></li>
                                <li><a target="_blank" href="<?php echo html::href_link('tour_america_need.php')?>#a16">ע������</a><a href="<?php echo html::href_link('tour_america_need.php')?>#a13">ס��</a><a href="<?php echo html::href_link('tour_america_need.php')?>#a14">��ͨ</a><a href="<?php echo html::href_link('tour_america_need.php')?>#a15">����</a></li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <div class="site_helpitems">
                            <h4 class="title">��Ա����</h4>
                            <ul>
                                <li><a target="_blank" href="<?php echo html::href_link('faq_points.php#list1')?>">ʲô�ǻ��֣���ʲô�ã�</a></li>
                                <li><a target="_blank" href="<?php echo html::href_link('faq_points.php#list2')?>">��û��ֵ�;������Щ��</a></li>
                                <li><a target="_blank" href="<?php echo html::href_link('faq_points.php#list4')?>">���ֵ��ֽ�һ���׼�Ƕ��٣�</a></li>
                                <li><a target="_blank" class="highlight" href="<?php echo html::href_link('faq_points.php#list5')?>">�������ܵ������ۿ��޶��ǣ�</a></li>
                            </ul>
                        </div>
                    </li>
                    <li class="last">
                        <div class="site_helpitems">
                            <h4 class="title">ǩ֤���</h4>
                            <ul class="">
                                <li><a target="_blank" class="highlight" href="<?php echo html::href_link('visa_related.php')?>#question_1">ȥ�������Σ�����õ�ǩ֤��</a></li>
                                <li><a target="_blank" href="<?php echo html::href_link('visa_related.php')?>#question_2">���ô�ǩ֤��ô����</a></li>
                                <li><a target="_blank" href="<?php echo html::href_link('visa_related.php')?>#question_27">ǩ֤��һ�������Щ���⣿</a></li>
                                <li><a target="_blank" href="<?php echo html::href_link('visa_related.php')?>#question_28">ʲô��ǩ֤��ѵ���кΰ�����</a></li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
            <ul class="imagelink uifix">
                <li><a target="_blank" class="link1" href="http://www.bbb.org/baton-rouge/business-reviews/travel-agencies-and-bureaus/unitedstars-international-ltd-in-baton-rouge-la-90012303">BBB</a></li>
                <li><a target="_blank" class="link2" href="http://www.rackspace.com/">rackspace</a></li>
                <li><a target="_blank" class="link3" href="https://seal.godaddy.com/verifySeal?sealID=Sw7SK8bpKlM5UcG9KesPbuhOlyKbqTQ85J99lyGiBVVfZRxR9Qcu">����Ͷ��</a></li>
                <li><a target="_blank" class="link4" href="<?php echo html::href_link('payment.php')?>">paypal</a></li>
                <li><a target="_blank" class="link5" href="http://cn.unionpay.com/">����֧��</a></li>
                <li><a target="_blank" class="link6" href="https://www.alipay.com/">֧����֧��</a></li>
                <li><a target="_blank" class="link7" href="http://t.qq.com/usItrip2012">��Ѷ΢��</a></li>
                <li><a target="_blank" class="link8" href="http://e.weibo.com/3223551651/profile">����΢��</a></li>
            </ul>
            <dl class="hotlinks uifix">
                <dt>�������У�</dt>
                <dd><a href="#">��ɼ�����</a><a href="#">�ɽ�ɽ����</a><a href="#">��˹ά��˹����</a><a href="#">ŦԼ����</a><a href="#">��ʢ������</a><a href="#">��ʿ������</a><a href="#">�¸绪����</a></dd>
            </dl>
            <dl class="hotlinks uifix">
                <dt>�������У�</dt>
                <dd><a href="#">��ʯ��԰����</a><a href="#">��Ͽ������</a><a href="#">��ʤ��������</a><a href="#">���⹫԰����</a><a href="#">���Ǽ����ٲ�����</a><a href="#">���ɽ����</a><a href="#">����������</a></dd>
            </dl>
            
			
                <?php if(($friendly_links_num = count($friendly_links)) > 0){
					echo '<dl class="friendlinks uifix"><dt>�������ӣ�</dt><dd>';
					for($i=0; $i<$friendly_links_num; $i++){
						echo '<a href="' . $friendly_links[$i]['website_url'] . '" target="_blank">' . $friendly_links[$i]['website_name'] . '</a>';
					}
					echo '<a href="#" class="highlight">����&gt;&gt;</a>';
					echo '</dd></dl>';
				}?>
            
			
            <div class="copyright">
                <ul>
                    <li><a href="<?php echo html::href_link('index.php')?>">��վ��ҳ</a>-</li>
                    <li><a href="<?php echo html::href_link('about_us.html')?>">�������ķ�</a>-</li>
                    <li><a href="<?php echo html::href_link('contact_us.php')?>">��ϵ����</a>-</li>
                    <li><a href="<?php echo html::href_link('privacy-policy.php')?>">��˽&amp;��Ȩ����</a>-</li>
                    <li><a href="<?php echo html::href_link('links.html')?>">��������</a>-</li>
                    <li><a href="<?php echo html::href_link('faq_question.php')?>">��������</a>-</li>
                    <li><a href="<?php echo html::href_link('sitemap.html')?>">��վ��ͼ</a>-</li>
                    <li><a href="<?php echo html::href_link('affiliate.php')?>">��վ����</a></li>
                </ul>
                <p>Ӫҵִ�� | Copyright&copy;2008-2012 usitrip.com | ���ķ������� All rights reserved.</p>
            </div>
        </div>
    </div>
