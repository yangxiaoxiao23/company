<?php
/**
 * 结伴同游取消申请的邮件模板
 * @author  lwkai 2014-03-22
 * @package 邮件
 * 数组KEY说明：
 * subject      邮件标题
 * content      邮件正文
 * tag说明：
 *    {{$to_name}}            发送给某人的名称
 *    {{$tca_cn_name}}        申请人中文名称
 *    {{$tca_en_name}}        申请人英文名称
 *    {{$t_companion_title}}  结伴同游的结伴标题
 *    {{$user_url}}            跳转到用户中心有人申请页面的链接
 *    {{$mail_foot}}            邮件页脚【统一设置】
 */
return array(
	'subject' => '走四方结伴同游 - 取消申请',
	'content' => '
尊敬的 {{$to_name}}
　　走四方网友{{$tca_cn_name}}在您发布的结伴同游贴『<a href="{{$user_url}}" target="_blank">{{$t_companion_title}}</a>』上的申请请求已经被他（她）本人取消！敬请知悉！
点此连接查看<a href="{{$user_url}}" target="_blank">{{$user_url}}</a> 注：如果点击打不开，请复制该连接到浏览器地址栏打开。

{{$mail_foot}}'
);