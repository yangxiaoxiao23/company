<?php
/*
$Id$

osCommerce, Open Source E-Commerce Solutions
http://www.oscommerce.com

Copyright (c) 2010 osCommerce

Released under the GNU General Public License
*/


ob_start();

if ($messageStack->size('global') > 0) {
	echo $messageStack->output('global').'[AJAX全局提示]';
}