<?php
/**
 * �Ż�ȯ����ɹ��ʼ�ģ��
 * @author lwkai 2014-03-11
 * @package �ʼ�
 * @subpackage  �ʼ�ģ��
 *
 * ����KEY˵����
 * subject      �ʼ�����
 * content      �ʼ�����
 * tag˵����
 *    {{$http_server}}         ��վ��������ַ
 *  {{$login_url}}           ��¼��ַ
 *  {{$contact_us_url}}      ��ϵ����
 *  {{$about_us_url}}        ��������
 *  {{$faq_question_url}}    ��������
 *  {{$images}}              ͼƬ·��
 *  {{$customers_name_cn}}   �û���������
 *  {{$customers_firstname}} �û�Ӣ����
 *  {{$customers_lastname}}  �û�Ӣ����
 *  {{$customer_name}}  �û�Ӣ����
 *  {{$coupon_url}}   �ҵ��Ż�ȯ���ӵ�ַ 
 *  {{$to_date}}  	  ��ֹʱ��	
 *  {{$coupon_value}} �Ż�ȯ��ֵ
 *  {{$expire_date}}  �Ż�ȯ����ʱ��
 */
$path = dirname(__FILE__);
$top = include($path . '/../header.php');
$bottom = include($path . '/../footer.php');
return array('subject' => '��ϲ�����Ż�ȯ�Ѿ������������Ч����ʹ�ã����ķ���', 'content' => $top . '
<table cellspacing="0" cellpadding="0" border="0" width="668" align="center"
       style="border-left:1px solid #c1d6e2;border-right:1px solid #c1d6e2;font-size:12px;font-family:Arial,SimSun;color:#333333;">
	<tr>
		<td bgcolor="#E1F2FC">
			<table width="600" border="0" cellspacing="0" cellpadding="0">
				<tr>
					<td><p style="font-size:12px; line-height:16px; color:#223C6A; padding-top:10px"><span
								style="font-size:14px; font-weight:700;"> �װ��Ĺ˿�{{$customer_name}}���ã� </span><br/><br/>����{{$to_date}}
							���Ѽ����Ż�ȯ{{$coupon_value}}Ԫ������{{$expire_date}}ǰʹ�ã��������ϡ�</p></td>
				</tr>
			</table>
		</td>
	</tr>
	<tr>
		<td>
			<table border="0" cellpadding="0" cellspacing="1" bgcolor="#FFCC00" style="margin-top:5px; width:600px;">
				<tr>
					<td height="25"><span
							style=" padding: 3px 3px 3px 8px; display:block; line-height:18px; font-weight:bold; font-size:12px; color :#223C6A">������ͨ������������ӣ��鿴�Ż�ȯ�� </span>
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
				�������Ҫ�κ����ϰ������뷢�͵����ʼ������ǵĿͻ������Ŷӣ�<br/><a href="mailto:service@usitrip.com" target="_blank"
				                                      style="color:#108BCD; text-decoration:none; line-height:16px;">service@usitrip.com</a><br/>
				<table border="0" cellspacing="0" cellpadding="0" style="font-size:12px; line- height:18px;">
					<tr>
						<td align="left" valign="top">�򲦴�ͷ��绰��</td>
						<td align="left" valign="top">1-626-898-7800[����]<br/>1-888-887-2816(�������)<br/>0086-4006-333-926(�й����)
						</td>
					</tr>
				</table>
				<br/>������ϵ������������ķ���һ���������!<br/>
				<br/>
				<br/>
			</div>
		</td>
	</tr>
</table>' . $bottom);