<?php
/**
 * 优惠券激活成功邮件模板
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
 *  {{$customer_name}}  用户英文姓
 *  {{$coupon_url}}   我的优惠券链接地址 
 *  {{$to_date}}  	  截止时间	
 *  {{$coupon_value}} 优惠券价值
 *  {{$expire_date}}  优惠券过期时间
 */
$path = dirname(__FILE__);
$top = include($path . '/../header.php');
$bottom = include($path . '/../footer.php');
return array('subject' => '恭喜您的优惠券已经激活，请您在有效期内使用！走四方网', 'content' => $top . '
<table cellspacing="0" cellpadding="0" border="0" width="668" align="center"
       style="border-left:1px solid #c1d6e2;border-right:1px solid #c1d6e2;font-size:12px;font-family:Arial,SimSun;color:#333333;">
	<tr>
		<td bgcolor="#E1F2FC">
			<table width="600" border="0" cellspacing="0" cellpadding="0">
				<tr>
					<td><p style="font-size:12px; line-height:16px; color:#223C6A; padding-top:10px"><span
								style="font-size:14px; font-weight:700;"> 亲爱的顾客{{$customer_name}}您好！ </span><br/><br/>截至{{$to_date}}
							您已激活优惠券{{$coupon_value}}元，请于{{$expire_date}}前使用，过期作废。</p></td>
				</tr>
			</table>
		</td>
	</tr>
	<tr>
		<td>
			<table border="0" cellpadding="0" cellspacing="1" bgcolor="#FFCC00" style="margin-top:5px; width:600px;">
				<tr>
					<td height="25"><span
							style=" padding: 3px 3px 3px 8px; display:block; line-height:18px; font-weight:bold; font-size:12px; color :#223C6A">您可以通过点击以下链接，查看优惠券。 </span>
					</td>
				</tr>
				<tr>
					<td bgcolor="#FFFFFF">
						<table width="100%" border="0" cellspacing="0" cellpadding="2">
							<tr>
								<td height="23"><a href="{{$coupon_url}}" target="_blank"><span
											style=" padding-left:10px;font-size:12px; color:#223C6A;">{{$coupon_url}}</span></a>
								</td>
							</tr>
							<tr>
								<td></td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
		</td>
	</tr>
	<tr></tr>
	<tr>
		<td>
			<div style=" margin-top:8px; padding-left:8px; font-size:12px; line- height:18px;">
				如果您需要任何线上帮助，请发送电子邮件至我们的客户服务团队：<br/><a href="mailto:service@usitrip.com" target="_blank"
				                                      style="color:#108BCD; text-decoration:none; line-height:16px;">service@usitrip.com</a><br/>
				<table border="0" cellspacing="0" cellpadding="0" style="font-size:12px; line- height:18px;">
					<tr>
						<td align="left" valign="top">或拨打客服电话：</td>
						<td align="left" valign="top">1-626-898-7800[国际]<br/>1-888-887-2816(美加免费)<br/>0086-4006-333-926(中国免费)
						</td>
					</tr>
				</table>
				<br/>我们真诚的期望您与走四方网一起旅行愉快!<br/>
				<br/>
				<br/>
			</div>
		</td>
	</tr>
</table>' . $bottom);