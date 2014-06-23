<?php
/**
 * 结伴同游有人回复的中文邮件模板
 * @author lwkai 2014-03-11
 * @package 邮件
 *
 * 数组KEY说明：
 * subject      邮件标题
 * content      邮件正文
 *
 * tag说明：
 * 	{{$to_name}}            发送给某人的名称
 * 	{{$t_companion_title}}  结伴同游的结伴标题
 * 	{{$products}}			结伴同游中选定的线路名称
 * 	{{$user_url}}			跳转到用户中心有人申请页面的链接
 * 	{{$tca_cn_name}}		申请用户的中文名
 * 	{{$tca_en_name}}		申请用户的英文名
 * 	{{$tca_gender}}			申请用户的性别
 * 	{{$tca_email_address}}	申请用户的邮箱
 * 	{{$tca_phone}}			申请用户的电话
 * 	{{$tca_people}}			申请人数，对应出现上面设置的pople_group或者是pople
 * 	{{$tca_content}}		申请人的留言

 *
 *	{{$mail_foot}}			邮件页脚【统一设置】
 */
return array(
	'subject' => '走四方结伴同游 - 有人回复',
	'content' => '
尊敬的 {{$to_name}}
　　您发起的名称为 『{{$t_companion_title}}』 的结伴同游，有人回复了一条新内容！
线路是：{{$products}}
点此连接查看<a href="{{$user_url}}" target="_blank">{{$user_url}}</a> 注：如果点击打不开，请复制该连接到浏览器地址栏打开。

------------------------------------------------------
回帖人的资料如下：
姓名：{{$tca_cn_name}}
性别：{{$tca_gender}}
电子邮箱：{{$tca_email_address}}
回复内容：
{{$tca_content}}
------------------------------------------------------

{{$mail_foot}}'
);