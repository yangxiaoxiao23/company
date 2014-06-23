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
/* 去掉旧广告的显示方式
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
                <h3>合作伙伴</h3>
                <dl>
                    <dt>特价机票</dt>
                    <dd><a href="http://www.jdoqocy.com/click-5516128-10630638" target="_blank">留学生机票 CheapOair</a></dd>
                    <dd><a href="http://www.anrdoezrs.net/click-5516128-10392969" target="_blank">全球特价机票 Priceline</a></dd>
                </dl>
                <dl>
                    <dt>低价酒店</dt>
                    <dd><a href="http://www.booking.com/index.html?aid=336352" target="_blank">世界领先酒店合作伙伴Booking</a></dd>
                    <dd><a href="http://travel.ian.com/index.jsp?cid=232843" target="_blank">美国低价酒店预订 Hotels</a></dd>
                </dl>
                <dl>
                    <dt>保险&amp;租车</dt>
                    <dd><a href="<?=html::href_link('insurance.php');?>" target="_blank">美国专业保险提供商Travelinsure</a></dd>
                    <dd><a href="http://www.rentalcars.com/Home.do?affiliatecode=usitrip&adplat=footer&adcamp=footer=hk&preflang=zs" target="_blank">全球最大租车平台rentalcars.com</a></dd>
                </dl>
            </div>
            <div class="site_help">
                <ul class="site_helplist">
                    <li>
                        <div class="site_helpitems">
                            <h4 class="title">新手入门</h4>
                            <ul class="getstart">
                                <li><a target="_blank" class="highlight" href="<?php echo html::href_link('order_process.php')?>">订购流程</a></li>
                                <li><a target="_blank" href="<?php echo html::href_link('faq_question.php')?>">常见问题</a></li>
                                <li><a target="_blank" href="<?php echo html::href_link('payment.php')?>">支付方式</a></li>
                                <li><a target="_blank" href="<?php echo html::href_link('order_agreement.php')?>">订购协议</a></li>
                                <li><a target="_blank" href="<?php echo html::href_link('visa_related.php')?>">签证相关</a></li>
                                <li><a target="_blank" href="<?php echo html::href_link('companions_process.php')?>">结伴同游流程</a></li>
                                <li class="nowidth"><a target="_blank" class="highlight" href="<?php echo html::href_link('points.php')?>">积分豪礼(最高优惠100%)</a></li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <div class="site_helpitems">
                            <h4 class="title">旅美须知</h4>
                            <ul class="getnotes">
                                <li><a target="_blank" href="<?php echo html::href_link('tour_america_need.php')?>#a1">旅游证件</a><a href="<?php echo html::href_link('tour_america_need.php')?>#a2">边检</a><a href="<?php echo html::href_link('tour_america_need.php')?>#a3">时差</a><a href="<?php echo html::href_link('tour_america_need.php')?>#a4">电压</a></li>
                                <li><a target="_blank" href="<?php echo html::href_link('tour_america_need.php')?>#a9">消费状况</a><a href="<?php echo html::href_link('tour_america_need.php')?>#a5">电话</a><a href="<?php echo html::href_link('tour_america_need.php')?>#a6">气候</a><a href="<?php echo html::href_link('tour_america_need.php')?>#a7">治安</a></li>
                                <li><a target="_blank" href="<?php echo html::href_link('tour_america_need.php')?>#a11">美国节日</a><a href="<?php echo html::href_link('tour_america_need.php')?>#a8">宗教</a><a href="<?php echo html::href_link('tour_america_need.php')?>#a10">文化</a><a href="<?php echo html::href_link('tour_america_need.php')?>#a12">治安</a></li>
                                <li><a target="_blank" href="<?php echo html::href_link('tour_america_need.php')?>#a16">注意事项</a><a href="<?php echo html::href_link('tour_america_need.php')?>#a13">住宿</a><a href="<?php echo html::href_link('tour_america_need.php')?>#a14">交通</a><a href="<?php echo html::href_link('tour_america_need.php')?>#a15">购物</a></li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <div class="site_helpitems">
                            <h4 class="title">会员积分</h4>
                            <ul>
                                <li><a target="_blank" href="<?php echo html::href_link('faq_points.php#list1')?>">什么是积分，有什么用？</a></li>
                                <li><a target="_blank" href="<?php echo html::href_link('faq_points.php#list2')?>">获得积分的途径有哪些？</a></li>
                                <li><a target="_blank" href="<?php echo html::href_link('faq_points.php#list4')?>">积分的现金兑换标准是多少？</a></li>
                                <li><a target="_blank" class="highlight" href="<?php echo html::href_link('faq_points.php#list5')?>">积分享受的消费折扣限额是？</a></li>
                            </ul>
                        </div>
                    </li>
                    <li class="last">
                        <div class="site_helpitems">
                            <h4 class="title">签证相关</h4>
                            <ul class="">
                                <li><a target="_blank" class="highlight" href="<?php echo html::href_link('visa_related.php')?>#question_1">去美国旅游，如何拿到签证？</a></li>
                                <li><a target="_blank" href="<?php echo html::href_link('visa_related.php')?>#question_2">加拿大签证怎么办理？</a></li>
                                <li><a target="_blank" href="<?php echo html::href_link('visa_related.php')?>#question_27">签证官一般会问哪些问题？</a></li>
                                <li><a target="_blank" href="<?php echo html::href_link('visa_related.php')?>#question_28">什么是签证培训？有何帮助？</a></li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
            <ul class="imagelink uifix">
                <li><a target="_blank" class="link1" href="http://www.bbb.org/baton-rouge/business-reviews/travel-agencies-and-bureaus/unitedstars-international-ltd-in-baton-rouge-la-90012303">BBB</a></li>
                <li><a target="_blank" class="link2" href="http://www.rackspace.com/">rackspace</a></li>
                <li><a target="_blank" class="link3" href="https://seal.godaddy.com/verifySeal?sealID=Sw7SK8bpKlM5UcG9KesPbuhOlyKbqTQ85J99lyGiBVVfZRxR9Qcu">在线投保</a></li>
                <li><a target="_blank" class="link4" href="<?php echo html::href_link('payment.php')?>">paypal</a></li>
                <li><a target="_blank" class="link5" href="http://cn.unionpay.com/">在线支付</a></li>
                <li><a target="_blank" class="link6" href="https://www.alipay.com/">支付宝支付</a></li>
                <li><a target="_blank" class="link7" href="http://t.qq.com/usItrip2012">腾讯微博</a></li>
                <li><a target="_blank" class="link8" href="http://e.weibo.com/3223551651/profile">新浪微博</a></li>
            </ul>
            <dl class="hotlinks uifix">
                <dt>出发城市：</dt>
                <dd><a href="#">洛杉矶旅游</a><a href="#">旧金山旅游</a><a href="#">拉斯维加斯旅游</a><a href="#">纽约旅游</a><a href="#">华盛顿旅游</a><a href="#">波士顿旅游</a><a href="#">温哥华旅游</a></dd>
            </dl>
            <dl class="hotlinks uifix">
                <dt>出发城市：</dt>
                <dd><a href="#">黄石公园旅游</a><a href="#">大峡谷旅游</a><a href="#">优胜美地旅游</a><a href="#">主题公园旅游</a><a href="#">尼亚加拉瀑布旅游</a><a href="#">落基山旅游</a><a href="#">夏威夷旅游</a></dd>
            </dl>
            
			
                <?php if(($friendly_links_num = count($friendly_links)) > 0){
					echo '<dl class="friendlinks uifix"><dt>友情链接：</dt><dd>';
					for($i=0; $i<$friendly_links_num; $i++){
						echo '<a href="' . $friendly_links[$i]['website_url'] . '" target="_blank">' . $friendly_links[$i]['website_name'] . '</a>';
					}
					echo '<a href="#" class="highlight">更多&gt;&gt;</a>';
					echo '</dd></dl>';
				}?>
            
			
            <div class="copyright">
                <ul>
                    <li><a href="<?php echo html::href_link('index.php')?>">网站首页</a>-</li>
                    <li><a href="<?php echo html::href_link('about_us.html')?>">关于走四方</a>-</li>
                    <li><a href="<?php echo html::href_link('contact_us.php')?>">联系我们</a>-</li>
                    <li><a href="<?php echo html::href_link('privacy-policy.php')?>">隐私&amp;版权声明</a>-</li>
                    <li><a href="<?php echo html::href_link('links.html')?>">友情链接</a>-</li>
                    <li><a href="<?php echo html::href_link('faq_question.php')?>">帮助中心</a>-</li>
                    <li><a href="<?php echo html::href_link('sitemap.html')?>">网站地图</a>-</li>
                    <li><a href="<?php echo html::href_link('affiliate.php')?>">网站联盟</a></li>
                </ul>
                <p>营业执照 | Copyright&copy;2008-2012 usitrip.com | 走四方旅游网 All rights reserved.</p>
            </div>
        </div>
    </div>
