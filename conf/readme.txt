conf文件中允许以下常量
HEAD_JS：页面头部要导入的js文件路径
FOOT_JS：页面底部要导入的js文件路径
CSS：页面要导入的css文件路径

1.此目录下的conf文件名是与页面模板名同名的。
如：$tpl_content = '123.html'; 那么conf文件名应定为'123.conf'。
同理$tpl_content = '123.tpl.php'; 那么conf文件名应定为'123.conf'。

2.默认的tpl/www/css/目录可以省略。请参考：product_info.conf

3.默认的tpl/www/js/也可以省略。参考：product_info.conf

4.conf文件内容中的多个文件路径的第二个之后的可以省略。如：
/tpl/abc/1.css, 2.css, 3.css, /tpl008/4.css,5.css
1.css, 2.css, 3.css是同一目录/tpl/abc/下的，4.css,5.css是同一目录/tpl008下面的。