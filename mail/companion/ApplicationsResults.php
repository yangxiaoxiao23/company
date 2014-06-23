<?php
return array(
	'agree' => array(
		'pople_group' => '男人:[{{$tca_people_man}}] 女人:[{{$tca_people_woman}}] 小孩:[{{$tca_people_child}}]',
		'pople' => '{{$tca_people}}人',
		'subject' => '走四方结伴同游 - 申请通过',
		'content' => '尊敬的 {{$to_name}}
　　恭喜！你向 『{{$t_user_name}}』申请名称为 『{{$t_companion_title}}』的结伴同游,申请已通过。
线路是：{{$products}}
点此连接查看<a href="{{$user_url}}" target="_blank">{{$user_url}}</a> 注：如果点击打不开，请复制该连接到浏览器地址栏打开。

------------------------------------------------------
发起人的资料如下：
姓名：{{$user_name}}
性别：{{$user_gender}}
电子邮箱：{{$user_mail}}
电话：{{$user_tel}}
人数：{{$user_people}}
留言内容：{{$user_message}}
------------------------------------------------------

{{$mail_foot}}'
	),
	'refuse' => array(
		'subject' => '走四方结伴同游 - 申请未通过',
		'content' => '尊敬的 {{$to_name}}
　　很遗憾！你向 『{{$t_user_name}}』申请名称为 『{{$t_companion_title}}』的结伴同游,未被对方接爱或者对方已经有了同游者。
走四方建议您查阅其他同游信息，或者自行发布一条,
线路是：{{$products}}的结伴同游贴 。
点此连接查看<a href="{{$user_url}}" target="_blank">{{$user_url}}</a> 注：如果点击打不开，请复制该连接到浏览器地址栏打开。
------------------------------------------------------

{{$mail_foot}}'
	),
	'agree_canceled' => array(
		'subject' => '走四方结伴同游  - 申请结果[同意]被取消',
		'content' => '尊敬的 {{$to_name}}
　　很抱歉！你向 『{{$t_user_name}}』申请名称为 『{{$t_companion_title}}』的结伴同游,申请结果[同意]被取消。
走四方建议您查阅其他同游信息，或者自行发布一条，线路是：{{$products}}的结伴同游贴。
点此连接查看<a href="{{$user_url}}" target="_blank">{{$user_url}}</a> 注：如果点击打不开，请复制该连接到浏览器地址栏打开。


------------------------------------------------------
发起人给您的留言内容如下：
{{$user_message}}
------------------------------------------------------


{{$mail_foot}}'
	),
	'refuse_canceled' => array(
		'subject' => '走四方结伴同游  - 申请结果[拒绝]被取消',
		'content' => '尊敬的 {{$to_name}}
　　恭喜！你向 『{{$t_user_name}}』申请名称为 『{{$t_companion_title}}』的结伴同游,申请结果[拒绝]被取消。您可以继续等待对方再次处理您的申请。
线路是：{{$products}}
点此连接查看<a href="{{$user_url}}" target="_blank">{{$user_url}}</a> 注：如果点击打不开，请复制该连接到浏览器地址栏打开。


------------------------------------------------------
发起人给您的留言内容如下：
{{$user_message}}
------------------------------------------------------


{{$mail_foot}}'
	)
);