<?php
/**
 * ���ι��������ʼ�ģ��
 * @author lwkai 2014-03-11
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
 *  {{$customers_name_cn}}   �û���������
 *  {{$customers_firstname}} �û�Ӣ����
 *  {{$customers_lastname}}  �û�Ӣ����
 */
$path = dirname(__FILE__);
$top = include($path . '/../header.php');
$bottom = include($path . '/../footer.php');
return array('content' => $top . '
<style>
	.usitrip a {
		color: #FFFFFF;
		text-decoration: none;
	}

	.usitrip a:hover {
		color: #f6f307;
		text-decoration: underline;
	}
</style>
<table cellpadding="0" cellspacing="0" align="center" width="668"
       style="color:#666;padding:10px 20px;border-left:1px solid #c1d6e2;border-right:1px solid #c1d6e2;font-size:12px;font-family:tahoma,SimSun;">
	<tbody>
	<tr>
		<td colspan="3" style="margin:10px 0;font-family:Microsoft Yahei;">
			<p style="margin:0;font-size:18px;font-weight:bold;">�װ��Ļ�Ա��<strong
					style="color:#000000">{CustomerName}</strong>���ã�</p>

			<div style="height:75px;font-size:12px;line-height:35px;">
				<p style="margin:0;padding-left:20px; font-size:16px; color:#19569e; font-weight:bold;">
					��л������������ǣ�����������֮�а���Ȩ���Ľ������ǡ�</p>

				<p style="margin:0;padding-left:20px; line-height:20px; font-size:12px; color:#646464;">
					�˿̣������ó��ѻ����˾�ţ������������ǰ��ŵ��г��Ƿ�����ȴ�������������ɻ�<br/>
					�ڳ���ϴȥƣ��֮�࣬��������ʱ��дд���ĸ��ܰɣ����ǽ��и߶��Ա����������͡�</p>
			</div>
			<br/>
	<tr>

		<td width="16" height="45">&nbsp;</td>
		<td class="usitrip" width="164" align="center" valign="middle" bordercolor="#dd3e00" bgcolor="#f98601"
		    style="font-size:16px; font-weight:bold;">
			<a href="{HREF}" target="_blank">�����д�����</a></td>

		<td width="486">&nbsp;</td>
	</tr>

	<tr>
		<td height="14" colspan="3">&nbsp;</td>
	</tr>

	<tr>
		<td height="50" colspan="3" valign="middle"
		    style="color:f98c01;font-size:14px;font-weight: bold;border-top:1px #bebebe dotted;">
			ֻҪ����������Ľ��飬���ǽ����������<span style="color:#FF0000;">{Point}</span>�ֵĻ�Ա���֣����ֿɳ�ֶ������ã�
		</td>
	</tr>


	<tr>
		<td colspan="3"></td>
	<tr>
		<td colspan="3">
	</tr>
	</tbody>
</table>' . $bottom);


