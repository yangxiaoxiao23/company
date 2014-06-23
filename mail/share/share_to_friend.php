<?php
/**
 * 产品分享邮件模板
 * @author chankit 2014-05-27
 * @package 邮件
 * @subpackage  邮件模板
 *
 * 数组KEY说明：
 * subject      邮件标题
 * content      邮件正文
 * tag说明：
 *  {{$http_server}}         网站域名根地址
 *  {{$login_url}}           登录地址
 *  {{$contact_us_url}}      联系我们
 *  {{$about_us_url}}        关于我们
 *  {{$faq_question_url}}    常见问题
 *  {{$images}}              图片路径
 *  {{$from_name}}           分享人
 *  {{$product_url}}         产品路径
 *  {{$product_name}}        产品名称
 *  {{$email_content}}       分享内容
 */
$path = dirname(__FILE__);
$top = include($path . '/../header.php');
$bottom = include($path . '/../footer.php');
return array('content' => $top . '
<table cellspacing="0" cellpadding="0" border="0" width="668" align="center"
       style="border:2px solid #4164d8;border:1px solid #cedee8;border-bottom:0 none; border-top:0 none;font-size:12px;font-family:Arial,SimSun;color:#333333;">
	<tbody>
	<tr style="padding:10px;line-height:24px;">
		<td style="padding:10px;">
			<div style="margin:0;padding:0;">
				<table border="0" cellspacing="0" cellpadding="0" width="650"
				       style="margin: 0px; padding:0px; font-family:Tahoma,SimSun,Arial,Helvetica,sans-serif;font-size:12px; color:#000; line-height:16px; width:650px;">
					<tr>
						<td colspan="2" width="650" height="320" style="padding:20px 0px 20px 10px"><p style="margin:0">
								尊敬的先生/女士：</p>

							<p style=" padding-left:25px; margin:0; padding-top:5px; line-height:18px;">您好！<br/>
								您的朋友<span style=" color:#ff6c00">{{$from_name}}</span>推荐给您走四方网以下旅游度假产品，希望您能喜欢：</p>

							<p style="padding-left:25px; line-height:18px;"><a href="{{$product_url}}" target="_blank"
							                                                   style=" color:#ff6c00; text-decoration:none;">{{$product_name}}</a><br/><a
									href="{{$product_url}}" target="_blank" style=" color:#065f97; text-decoration:none;">{{$product_url}}</a>
							</p>

							<p style="padding-left:25px; line-height:18px;">

								您朋友的留言：{{$email_content}}<br/><br/>

								欢迎查询预定！</p></td>
					</tr>
				</table>
			</div>
		</td>
	</tr>
	</tbody>
</table>' . $bottom);


