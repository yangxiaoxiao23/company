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
 *  {{$password}}            用户密码
 */
$path = dirname(__FILE__);
$top = include($path . '/../header.php');
$bottom = include($path . '/../footer.php');
return array('subject' => '走四方网提醒您：请确认您的新密码。', 'content' => $top . '
<table cellpadding="0" cellspacing="0" width="668" align="center"
       style="border-left:1px solid #c1d6e2;border-right:1px solid #c1d6e2;">
	<tbody>
	<tr>
		<td>
			<table width="634" cellspacing="0" cellpadding="0" border="0" align="center">
				<tbody>
				<tr>
					<td align="right" style="font-size:12px; padding-top:8px; color:#d5d5d5;"><a
							style="padding:0 10px;color:#848484; text-decoration:none;" href="{{$login_url}}">登录</a>|<a
							style="padding:0 10px;color:#848484; text-decoration:none;" href="{{$faq_question_url}}">帮助中心</a>
					</td>
				</tr>
				<tr>
					<td><p style="font-size:14px; margin:0; padding:10px 0 30px 0; color:#2a2a2a;"><strong>亲爱的会员：<span>{{$customers_name_cn}}</span>您好！</strong>
						</p>

						<p style="font-size:14px;margin:0; color:#4d4d4d; line-height:26px; padding-bottom:30px;">
							感谢您使用<a style="color:#1974dc; text-decoration:underline;" target="_blank"
							        href="{{$http_server}}">走四方旅游网</a>！<br> 根据您找回密码的申请，我们已自动为您变更了新的登录密码。<br>
							您的新密码为：<strong
								style="color:#ff6600; font-weight:bold; font-size:16px;">{{$password}}</strong>（注意区分大小写）
						</p>

						<p style="color:#808080; padding-bottom:30px;margin:0; font-size:12px;"> 请使用新密码<a
								style="color:#1974dc; text-decoration:underline;" href="{{$login_url}}">登录</a>，或及时修改成便于您记住的密码，并妥善保管。
						</p>

						<p style="color:#808080; padding-bottom:30px;margin:0; font-size:12px; line-height:22px;">
							如果您没有申请找回密码，请忽略此邮件。<br> 如有任何疑问，请点击<a style="color:#1974dc; text-decoration:underline;" href="{{$contact_us_url}}">这里</a>，或直接拨打24小时全球热线电话与我们联系，谢谢！
						</p></td>
				</tr>
				<tr>
					<td><a style="width:85px; height:23px; display:block;" href="{{$faq_question_url}}">
							<img width="85" height="23"  border="0"  alt="更多帮助" src="{{$images}}/morehelp.gif"></a>
						<p style="color:#666666; font-size:12px; padding:12px 0; margin:0;">注：此为系统邮件，请勿回复！</p></td>
				</tr>
				</tbody>
			</table>
		</td>
	</tr>
	</tbody>
</table>' . $bottom);

