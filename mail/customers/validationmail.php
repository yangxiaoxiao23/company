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
 *    {{$http_server}}         ��վ��������ַ
 *  {{$login_url}}           ��¼��ַ
 *  {{$contact_us_url}}      ��ϵ����
 *  {{$about_us_url}}        ��������
 *  {{$faq_question_url}}    ��������
 *  {{$images}}              ͼƬ·��
 *  {{$customers_name_cn}}   �û���������
 *  {{$customers_firstname}} �û�Ӣ����
 *  {{$customers_lastname}}  �û�Ӣ����
 *  {{$email}}               �û�����
 *  {{$validation_code}}     �û���֤��
 *  {{$validation_url}}      ��֤��ַ
 *  {{$validation_url_name}} ��֤��ַ����
 */
$path = dirname(__FILE__);
$top = include($path . '/../header.php');
$bottom = include($path . '/../footer.php');
return array('subject' => '�������ķ�����֤�룡', 'content' => $top . '
<table cellpadding="0" cellspacing="0" width="668" align="center" style="border-left:1px solid #c1d6e2;border-right:1px solid #c1d6e2;">
	<tbody>
	<tr>
		<td>
			<table width="634" cellspacing="0" cellpadding="0" border="0" align="center">
				<tbody>
				<tr>
					<td align="right" style="font-size:12px; padding-top:8px; color:#d5d5d5;"><a style="padding:0 10px;color:#848484; text-decoration:none;" href="{{$login_url}}">��¼</a>|<a style="padding:0 10px;color:#848484; text-decoration:none;" href="{{$faq_question_url}}">��������</a>
					</td>
				</tr>
				<tr>
					<td><p style="font-size:14px;margin:0; color:#4d4d4d; line-height:26px; padding-bottom:30px;">������<a
								style="color:#1974dc; text-decoration:underline;" target="_blank"
								href="{{$http_server}}">���ķ�������</a>����ע�ᣡ<br> Ϊ��ȷ�������յ��������뺯���г�ȷ���š�����ƾ֤����Ҫ�ʼ����뼴�̼��������˻���<br>
							�������ķ���֤���ǣ�<strong style="color:#ff6600; font-weight:bold; font-size:16px;">{{$validation_code}}</strong>��ע�����ִ�Сд��
						</p>

						<p style="color:#808080; padding-bottom:30px;margin:0; font-size:12px; line-height:22px;">
							��Ҳ�ɵ����������ӣ�ֱ�Ӽ����˻��������������Ŀ���֮�ã�<br>
							���������޷�ֱ�ӵ����Ҳ�ɽ��临�Ƶ�������з��ʼ��<br><a
								style="color:#1974dc; text-decoration:underline; line-height:18px;"
								href="{{$validation_url}}">{{$validation_url_name}}</a></p>

						<p style="color:#808080; padding-bottom:30px;margin:0; font-size:12px; line-height:22px;">
							�������仹�ܰ�������ȫ�ر����ʻ���<br> �����κ����ʣ�����<a style="color:#1974dc; text-decoration:underline;"
							                                   href="{{$contact_us_url}}">����</a>����ֱ�Ӳ���24Сʱȫ�����ߵ绰��������ϵ��лл��
						</p></td>
				</tr>
				<tr>
					<td><a style="width:85px; height:23px; display:block;" href="{{$faq_question_url}}">
					<img width="85" height="23" border="0" alt="�������"  src="{{$images}}/morehelp.gif"></a>
					<p style="color:#666666; font-size:12px; padding:12px 0; margin:0;">ע����Ϊϵͳ�ʼ�������ظ���</p></td>
				</tr>
				</tbody>
			</table>
		</td>
	</tr>
	</tbody>
</table>' . $bottom);

