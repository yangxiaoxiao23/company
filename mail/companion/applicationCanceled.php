<?php
/**
 * ���ͬ��ȡ��������ʼ�ģ��
 * @author  lwkai 2014-03-22
 * @package �ʼ�
 * ����KEY˵����
 * subject      �ʼ�����
 * content      �ʼ�����
 * tag˵����
 *    {{$to_name}}            ���͸�ĳ�˵�����
 *    {{$tca_cn_name}}        ��������������
 *    {{$tca_en_name}}        ������Ӣ������
 *    {{$t_companion_title}}  ���ͬ�εĽ�����
 *    {{$user_url}}            ��ת���û�������������ҳ�������
 *    {{$mail_foot}}            �ʼ�ҳ�š�ͳһ���á�
 */
return array(
	'subject' => '���ķ����ͬ�� - ȡ������',
	'content' => '
�𾴵� {{$to_name}}
�������ķ�����{{$tca_cn_name}}���������Ľ��ͬ������<a href="{{$user_url}}" target="_blank">{{$t_companion_title}}</a>���ϵ����������Ѿ���������������ȡ��������֪Ϥ��
������Ӳ鿴<a href="{{$user_url}}" target="_blank">{{$user_url}}</a> ע���������򲻿����븴�Ƹ����ӵ��������ַ���򿪡�

{{$mail_foot}}'
);