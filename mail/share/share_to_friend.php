<?php
/**
 * ��Ʒ�����ʼ�ģ��
 * @author chankit 2014-05-27
 * @package �ʼ�
 * @subpackage  �ʼ�ģ��
 *
 * ����KEY˵����
 * subject      �ʼ�����
 * content      �ʼ�����
 * tag˵����
 *  {{$http_server}}         ��վ��������ַ
 *  {{$login_url}}           ��¼��ַ
 *  {{$contact_us_url}}      ��ϵ����
 *  {{$about_us_url}}        ��������
 *  {{$faq_question_url}}    ��������
 *  {{$images}}              ͼƬ·��
 *  {{$from_name}}           ������
 *  {{$product_url}}         ��Ʒ·��
 *  {{$product_name}}        ��Ʒ����
 *  {{$email_content}}       ��������
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
								�𾴵�����/Ůʿ��</p>

							<p style=" padding-left:25px; margin:0; padding-top:5px; line-height:18px;">���ã�<br/>
								��������<span style=" color:#ff6c00">{{$from_name}}</span>�Ƽ��������ķ����������ζȼٲ�Ʒ��ϣ������ϲ����</p>

							<p style="padding-left:25px; line-height:18px;"><a href="{{$product_url}}" target="_blank"
							                                                   style=" color:#ff6c00; text-decoration:none;">{{$product_name}}</a><br/><a
									href="{{$product_url}}" target="_blank" style=" color:#065f97; text-decoration:none;">{{$product_url}}</a>
							</p>

							<p style="padding-left:25px; line-height:18px;">

								�����ѵ����ԣ�{{$email_content}}<br/><br/>

								��ӭ��ѯԤ����</p></td>
					</tr>
				</table>
			</div>
		</td>
	</tr>
	</tbody>
</table>' . $bottom);


