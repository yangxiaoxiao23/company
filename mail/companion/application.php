<?php
/**
 * ���ͬ������������ʼ�ģ��
 * @author lwkai 2014-03-11
 * @package �ʼ�
 * @subpackage  �ʼ�ģ��
 *
 * ����KEY˵����
 * subject      �ʼ�����
 * pople_group  ��������������ڳ�������Ҫ������ŮС�������ô˿顣
 * pople        ��������������ڳ����в���Ҫ������ŮС���ӣ����ô˿顣
 * content      �ʼ�����
 *
 * tag˵����
 * 	{{$to_name}}            ���͸�ĳ�˵�����
 * 	{{$t_companion_title}}  ���ͬ�εĽ�����
 * 	{{$products}}			���ͬ����ѡ������·����
 * 	{{$user_url}}			��ת���û�������������ҳ�������
 * 	{{$tca_cn_name}}		�����û���������
 * 	{{$tca_en_name}}		�����û���Ӣ����
 * 	{{$tca_gender}}			�����û����Ա�
 * 	{{$tca_email_address}}	�����û�������
 * 	{{$tca_phone}}			�����û��ĵ绰
 * 	{{$tca_people}}			������������Ӧ�����������õ�pople_group������pople
 * 	{{$tca_content}}		�����˵�����
 * 	{{$tca_people_man}}		������ʱ�����������ŮС������Ϊ��������
 * 	{{$tca_people_woman}}	ͬ�ϣ�Ů������
 * 	{{$tca_people_child}}	ͬ�ϣ�С������
 * 	{{$tca_people}}			��������Ůʱ��������
 *
 *	{{$mail_foot}}			�ʼ�ҳ�š�ͳһ���á�
 */
return array(
	'subject' => '���ķ����ͬ�� - ��������',
	'pople_group' => '����:[{{$tca_people_man}}] Ů��:[{{$tca_people_woman}}] С��:[{{$tca_people_child}}]',
	'pople' => '{{$tca_people}}��',
	'content' => '
�𾴵� {{$to_name}}
���������������Ϊ ��{{$t_companion_title}}���Ľ��ͬ��,���µ���Ա���롣
��·�ǣ�{{$products}}
������Ӳ鿴<a href="{{$user_url}}" target="_blank">{{$user_url}}</a> ע���������򲻿����븴�Ƹ����ӵ��������ַ���򿪡�

------------------------------------------------------
�����˵��������£�
������{{$tca_cn_name}} [{{$tca_en_name}}]
�Ա�{{$tca_gender}}
�������䣺{{$tca_email_address}}
�绰��{{$tca_phone}}
����������{{$tca_people}}
�������ݣ�
{{$tca_content}}
------------------------------------------------------

{{$mail_foot}}'
);