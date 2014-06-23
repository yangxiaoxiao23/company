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
return array('subject' => '您的走四方网验证码！', 'content' => $top . '
<table cellpadding="0" cellspacing="0" width="668" align="center" style="border-left:1px solid #c1d6e2;border-right:1px solid #c1d6e2;">
	<tbody>
	<tr>
		<td>
			<table width="634" cellspacing="0" cellpadding="0" border="0" align="center">
				<tbody>
				<tr>
					<td align="right" style="font-size:12px; padding-top:8px; color:#d5d5d5;"><a style="padding:0 10px;color:#848484; text-decoration:none;" href="{{$login_url}}">登录</a>|<a style="padding:0 10px;color:#848484; text-decoration:none;" href="{{$faq_question_url}}">帮助中心</a>
					</td>
				</tr>
				<tr>
					<td><p style="font-size:14px;margin:0; color:#4d4d4d; line-height:26px; padding-bottom:30px;">您已在<a
								style="color:#1974dc; text-decoration:underline;" target="_blank"
								href="{{$http_server}}">走四方旅游网</a>申请注册！<br> 为了确认您能收到旅游邀请函、行程确认信、参团凭证等重要邮件，请即刻激活您的账户！<br>
							您的走四方验证码是：<strong style="color:#ff6600; font-weight:bold; font-size:16px;">{{$validation_code}}</strong>（注意区分大小写）
						</p>

						<p style="color:#808080; padding-bottom:30px;margin:0; font-size:12px; line-height:22px;">
							您也可点击下面的链接，直接激活账户，开启属于您的快乐之旅！<br>
							（若链接无法直接点击，也可将其复制到浏览器中访问激活）<br><a
								style="color:#1974dc; text-decoration:underline; line-height:18px;"
								href="{{$validation_url}}">{{$validation_url_name}}</a></p>

						<p style="color:#808080; padding-bottom:30px;margin:0; font-size:12px; line-height:22px;">
							激活邮箱还能帮您更安全地保护帐户。<br> 如有任何疑问，请点击<a style="color:#1974dc; text-decoration:underline;"
							                                   href="{{$contact_us_url}}">这里</a>，或直接拨打24小时全球热线电话与我们联系，谢谢！
						</p></td>
				</tr>
				<tr>
					<td><a style="width:85px; height:23px; display:block;" href="{{$faq_question_url}}">
					<img width="85" height="23" border="0" alt="更多帮助"  src="{{$images}}/morehelp.gif"></a>
					<p style="color:#666666; font-size:12px; padding:12px 0; margin:0;">注：此为系统邮件，请勿回复！</p></td>
				</tr>
				</tbody>
			</table>
		</td>
	</tr>
	</tbody>
</table>' . $bottom);

