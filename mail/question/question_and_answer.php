<?php
/**
 * 结伴同游有人申请的邮件模板
 * @author lwkai 2014-03-11
 * @package 邮件
 * @subpackage  邮件模板
 *
 * 数组KEY说明：
 * subject      邮件标题
 * content      邮件正文
 * tag说明：
 *    {{$http_server}}         网站域名根地址
 *  {{$login_url}}           登录地址
 *  {{$contact_us_url}}      联系我们
 *  {{$about_us_url}}        关于我们
 *  {{$faq_question_url}}    常见问题
 *  {{$images}}              图片路径
 *  {{$customers_name_cn}}   用户中文名称
 *  {{$customers_firstname}} 用户英文名
 *  {{$customers_lastname}}  用户英文姓
 *  {{$email}}               用户邮箱
 *  {{$validation_code}}     用户验证码
 *  {{$validation_url}}      验证地址
 *  {{$validation_url_name}} 验证地址名称
 */
$path = dirname(__FILE__);
$top = include($path . '/../header.php');
$bottom = include($path . '/../footer.php');
return array('subject' => '您在usitrip.com提交的问题得到回复啦！', 'content' => $top . '
<table cellspacing="0" cellpadding="0" border="0" width="668" align="center" style="color:#4d4d4d;border:1px solid #cedee8;border-bottom:0 none; border-top:0 none;font-family:tahoma,SimSun;">
    <tr>
    	<td style="font-size:14px;font-weight:bold;padding:10px 15px;">
        	亲爱的会员 <span style="color:#000000">{{$customers_name}}</span>您好！
        </td>
    </tr>
    <tr>
    	<td style="padding:0 15px;font-size:14px;">感谢您在走四方旅游网（usitrip.com）进行咨询</td>
    </tr>
    <tr>
    	<td style="padding:10px 15px;">
        	<div style="margin:0;padding:30px;border:1px solid #f5d9a3;background:#ffffe8;font-size:12px;">
            	<p style="margin:0;padding:0;line-height:20px;">{{$main_text}}</p>
                <p style="margin:0;padding:10px 0;font-size:14px;font-weight:bold;color:#ff6f00;">您可以<a href="{{$login_url}}" style="color:#006eea;text-decoration:none;">登录</a>我们的网站或直接点击以下链接，查看您想要的满意答案&gt;&gt;</p>
                <p style="margin:0;padding:0;">{{$product_info_page}}</p>
            </div>
        </td>
    </tr>
    <tr>
    	<td style="padding:0 15px;">
        	<p style="border-top:1px dashed #d8d8d8;font-size:12px;margin:0;padding:15px 0 50px;line-height:20px;">希望我们的回复已解决了您的需求或疑惑！<br />若还有任何疑问，请点击<a href="{{$contact_us_url}}" style="color:#1974dc;">这里</a>，或直接拨打24小时全球热线电话与我们联系，我们竭诚为您解疑答惑！</p>
        </td>
    </tr>
</table>' . $bottom);


