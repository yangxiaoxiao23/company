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
return array('subject' => '����usitrip.com�ύ������õ��ظ�����', 'content' => $top . '
<table cellspacing="0" cellpadding="0" border="0" width="668" align="center" style="color:#4d4d4d;border:1px solid #cedee8;border-bottom:0 none; border-top:0 none;font-family:tahoma,SimSun;">
    <tr>
    	<td style="font-size:14px;font-weight:bold;padding:10px 15px;">
        	�װ��Ļ�Ա <span style="color:#000000">{{$customers_name}}</span>���ã�
        </td>
    </tr>
    <tr>
    	<td style="padding:0 15px;font-size:14px;">��л�������ķ���������usitrip.com��������ѯ</td>
    </tr>
    <tr>
    	<td style="padding:10px 15px;">
        	<div style="margin:0;padding:30px;border:1px solid #f5d9a3;background:#ffffe8;font-size:12px;">
            	<p style="margin:0;padding:0;line-height:20px;">{{$main_text}}</p>
                <p style="margin:0;padding:10px 0;font-size:14px;font-weight:bold;color:#ff6f00;">������<a href="{{$login_url}}" style="color:#006eea;text-decoration:none;">��¼</a>���ǵ���վ��ֱ�ӵ���������ӣ��鿴����Ҫ�������&gt;&gt;</p>
                <p style="margin:0;padding:0;">{{$product_info_page}}</p>
            </div>
        </td>
    </tr>
    <tr>
    	<td style="padding:0 15px;">
        	<p style="border-top:1px dashed #d8d8d8;font-size:12px;margin:0;padding:15px 0 50px;line-height:20px;">ϣ�����ǵĻظ��ѽ��������������ɻ�<br />�������κ����ʣ�����<a href="{{$contact_us_url}}" style="color:#1974dc;">����</a>����ֱ�Ӳ���24Сʱȫ�����ߵ绰��������ϵ�����ǽ߳�Ϊ�����ɴ��</p>
        </td>
    </tr>
</table>' . $bottom);


