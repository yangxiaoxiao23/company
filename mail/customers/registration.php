<?php
/**
 * ���ͬ������������ʼ�ģ��
 * @author lwkai 2014-03-11
 * @package �ʼ�
 * @subpackage  �ʼ�ģ��
 *
 * ����KEY˵����
 * subject      �ʼ�����
 * content      �ʼ�����
 * tag˵����
 *    {{$mail_foot}}            �ʼ�ҳ�š�ͳһ���á�
 */
$path = dirname(__FILE__);
$top = include($path . '/../header.php');
$bottom = include($path . '/../footer.php');
return array('subject' => '��ӭ���� usitrip ��������ĵ�¼��Ϣ', 'content' => $top . '
<table cellpadding="0" cellspacing="0" align="center" width="668"
       style="color:#666;padding:10px 20px;border-left:1px solid #c1d6e2;border-right:1px solid #c1d6e2;font-size:12px;font-family:tahoma,SimSun;">
	<tbody>
	<tr>
		<td style="margin:10px 0;font-family:\'Microsoft Yahei\';"><p
				style="margin:0;padding:5px 0;font-size:18px;font-weight:bold;">�װ��Ļ�Ա��<strong style="color:#000000">{{$customers_name_cn}}</strong>���ã�
			</p>

			<div style="height:60px;background:url({{$images}}/success.gif) no-repeat;font-size:14px;line-height:28px;">
				<p style="margin:0;padding-left:80px;">��ϲ�����ѳɹ�ע��Ϊusitrip��Ա��</p>

				<p style="margin:0;padding-left:80px;"><a href="{{$http_server}}/" style="color:#4164d8;">���ķ�������</a>ף��������죡
				</p></div>
		</td>
	</tr>
	</tbody>
</table>
<table cellpadding="0" cellspacing="0" align="center" width="668"
       style="color:#666;border-left:1px solid #c1d6e2;border-right:1px solid #c1d6e2;font-size:12px;font-family:tahoma">
	<tbody>
	<tr>
		<td style="padding:10px 20px;color:#333;">
			<div style="font-size:14px;"><p style="margin:0;padding:0;">���ĵ�¼E-mai��{{$email}}</p> {{$password}} <p
					style="margin:0;padding:0;">�Ͻ�<a style="color:#1974dc; text-decoration:underline;" target="_blank"
			                                         href="{{$login_url}}">��¼��վ</a>!������Ŀ���֮�ð�&gt;&gt; <a
						href="{{$http_server}}/" style="text-decoration:none;color:#1974dc;">www.usitrip.com</a></p>
			</div>
			<div style="margin-top:15px;"><p style="margin:0;padding:0;">��ܰ��ʾ�������Ʊ��������˺����룬���б�Ҫ���붨�ڵ�¼<a
						style="color:#1974dc; text-decoration:underline;" target="_blank" href="{{$login_url}}">��Ա����</a>�������롣
				</p>

				<p style="margin:0;padding:0;">�����κ����ʣ�����<a style="color:#1974dc; text-decoration:underline;"
				                                            target="_blank" href="{{$contact_us_url}}">����</a>����ֱ�Ӳ���24Сʱȫ�����ߵ绰��������ϵ��лл!
				</p></div>
			<div style="margin-top:15px;"><p style="margin:0;padding:0;"><a
						style="width:85px; height:23px; display:block;" href="{{$faq_question_url}}"><img width="85"
			                                                                                              height="23"
			                                                                                              border="0"
			                                                                                              alt="�������"
			                                                                                              src="{{$images}}/morehelp.gif"></a>

				<p style="color:#666666; font-size:12px; padding:12px 0; margin:0;">ע����Ϊϵͳ�ʼ�������ظ��� </p></div>
		</td>
	</tr>
	</tbody>
</table>
<table cellpadding="0" cellspacing="0" align="center" width="668"
       style="color:#666;padding:0 20px;border-left:1px solid #c1d6e2;border-right:1px solid #c1d6e2;font-size:12px;font-family:\'Microsoft Yahei\';">
	<tbody>
	<tr>
		<td style="font-size:14px;font-weight:bold;color:#444444;line-height:30px;padding-top:10px;border-top:1px dotted #ccc;">
			������������ȫ����??
		</td>
	</tr>
	<tr>
		<td style="padding-bottom:10px;border-bottom:1px dotted #ccc;">
			<table cellpadding="0" cellspacing="0" border="0" style="font-size:12px;color:#666;">
				<tbody>
				<tr>
					<td width="132" height="22"><img src="{{$images}}/dot.gif"/>��ͼ۸���</td>
					<td width="132" height="22"><img src="{{$images}}/dot.gif"/>�����������</td>
					<td width="132" height="22"><img src="{{$images}}/dot.gif"/>רҵ����������</td>
				</tr>
				<tr>
					<td width="132" height="22"><img src="{{$images}}/dot.gif"/>��������Ŷ�</td>
					<td width="132" height="22"><img src="{{$images}}/dot.gif"/>��ά������ϵ</td>
					<td width="132" height="22"><img src="{{$images}}/dot.gif"/>���ͬ�ν���</td>
				</tr>
				<tr>
					<td width="132" height="22"><img src="{{$images}}/dot.gif"/>ǩ֤����ϵͳ</td>
					<td width="132" height="22"><img src="{{$images}}/dot.gif"/>��·ר����</td>
					<td width="132" height="22"><img src="{{$images}}/dot.gif"/>���ݿͷ���ϵ</td>
				</tr>
				<tr>
					<td colspan="3"><p style="margin:0;padding:0;"><a href="{{$about_us_url}}"
					                                                  style="float:right;margin-right:30px;color:#1974dc;">�˽�����&gt;&gt;</a>
						</p></td>
				</tr>
				</tbody>
			</table>
		</td>
	</tr>
	</tbody>
</table>
<table cellpadding="0" cellspacing="0" align="center" width="666"
       style="border-left:1px solid #c1d6e2;border-right:1px solid #c1d6e2;font-size:14px;font-family:\'SimSun\';">
	<tbody>
	<tr>
		<td style="height:258px;background:url({{$images}}/banner.jpg) no-repeat;">
			<div style="position:relative;width:666px;height:258px;">
				<div style="position:absolute;top:0;right:0;padding-top:5px;padding-right:10px;float:right;"><a
						href="{{$login_url}}" style="color:#09f;">��¼</a>&nbsp;| <a href="{{$faq_question_url}}"
				                                                                   style="color:#09f;">��������</a></div>
			</div>
		</td>
	</tr>
	</tbody>
</table>' . $bottom);

