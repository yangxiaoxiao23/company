
<script language="javascript">
function popupWindow(url) {
	window.open(url,'popupWindow','toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=yes,copyhistory=no,width=600,height=600,screenX=150,screenY=150,top=150,left=150')
}
</script>
<table border="0" width="100%" cellspacing="3" cellpadding="3">
<tr>
<?php
if ($article_check['total'] < 1) {
	?>
	<tr>
	<td class="pageHeading" ><?php echo HEADING_ARTICLE_NOT_FOUND; ?></td>
	</tr>
	<tr>
	<td><?php echo html::separator('pixel_trans.gif', '100%', '10'); ?></td>
	</tr>
	<tr>
	<td class="main" ><?php echo TEXT_ARTICLE_NOT_FOUND; ?></td>
	</tr>
	<?php
} else {
	$article_info_query = $DB->query("select a.articles_id, a.articles_date_added, a.articles_date_available, a.authors_id, ad.articles_name, ad.articles_description, ad.articles_image, ad.articles_url from " . TABLE_ARTICLES . " a, " . TABLE_ARTICLES_DESCRIPTION . " ad where a.articles_status = '1' and a.articles_id = '" . (int)$_GET['articles_id'] . "' and ad.articles_id = a.articles_id and ad.language_id = '" . (int)$languages_id . "'");
	$article_info = $DB->fetch_array($article_info_query);

	$DB->query("update " . TABLE_ARTICLES_DESCRIPTION . " set articles_viewed = articles_viewed+1 where articles_id = '" . (int)$_GET['articles_id'] . "' and language_id = '" . (int)$languages_id . "'");

	$articles_name = $article_info['articles_name'];
	$articles_author_id = $article_info['authors_id'];
	$articles_author = $article_info['authors_name'];

	?>
	<tr>
	<td><table border="0" width="100%" cellspacing="0" cellpadding="0">
	<tr>
	<td valign="top"><h1><?php echo $articles_name; ?></h1></td>
	<td align="right" valign="top"><h1>
	<?php
	if (tep_not_null($articles_author) && DISPLAY_AUTHOR_ARTICLE_LISTING == 'true') {
		$authorsImage = DIR_WS_IMAGES . 'article_manager_uploads/' . $article_info['authors_image'];
		if (file_exists($authorsImage) && is_file($authorsImage)) {
			echo '<a href="' . html::href_link(FILENAME_ARTICLES,'authors_id=' . $articles_author_id) . '">' . html::img($authorsImage, HEADING_TITLE, HEADING_IMAGE_WIDTH, HEADING_IMAGE_HEIGHT) . '</a>';
		} else {
			echo TEXT_BY . '<a href="' . html::href_link(FILENAME_ARTICLES,'authors_id=' . $articles_author_id) . '">' . $articles_author . '</a>';
		}
	}
	?>
	</h1></td>
	</tr>
	</table></td>
	</tr>
	<?php if (tep_not_null($article_info['articles_image']) && file_exists(DIR_WS_IMAGES . 'article_manager_uploads/'.$article_info['articles_image'])) { ?>
	<tr>
	<td><?php echo html::separator('pixel_trans.gif', '100%', '10'); ?></td>
	</tr>
	<tr>
	<td class="main"><?php echo html::img(DIR_WS_IMAGES . 'article_manager_uploads/'.$article_info['articles_image'], $article_info['articles_name'], ARTICLES_IMAGE_WIDTH, ARTICLES_IMAGE_HEIGHT); ?></td>
	</tr>
	<?php } ?>
	<tr>
	<td><?php echo html::separator('pixel_trans.gif', '100%', '10'); ?></td>
	</tr>
	<tr>
	<td class="main">
	<p><?php echo stripslashes($article_info['articles_description']); ?></p>
	</td>
	</tr>
	<?php
	if (tep_not_null($article_info['articles_url'])) {
		?>
		<tr>
		<td class="main"><?php echo sprintf(TEXT_MORE_INFORMATION, "http://" . urlencode($article_info['articles_url']) ); ?></td>
		</tr>
		<tr>
		<td><?php echo html::separator('pixel_trans.gif', '100%', '10'); ?></td>
		</tr>
		<?php
	}
	if (DISPLAY_DATE_ADDED_ARTICLE_LISTING == 'true') {
		if ($article_info['articles_date_available'] > date('Y-m-d H:i:s')) {
			?>
			<tr>
			<td align="left" class="smallText"><?php echo sprintf(TEXT_DATE_AVAILABLE, tep_date_long($article_info['articles_date_available'])); ?></td>
			</tr>

			<?php
		}
	}
	?>
	<tr>
	<td><?php echo html::separator('pixel_trans.gif', '100%', '10'); ?></td>
	</tr>
	<?php
	if (ENABLE_ARTICLE_REVIEWS == 'true') {

		?>

		<tr>
		<td><?php echo html::separator('pixel_trans.gif', '100%', '10'); ?></td>
		</tr>
		<tr>
		<td><table border="0" width="100%" cellspacing="1" cellpadding="2">
		<tr>
		<td><table border="0" width="100%" cellspacing="0" cellpadding="2">
		<tr>
		<td width="10"><?php echo html::separator('pixel_trans.gif', '10', '1'); ?></td>
		<?php
		if ($reviews['count'] <= 0) {
			?>
			<td class="main"><?php // echo '<a href="' . html::href_link(FILENAME_ARTICLE_REVIEWS_WRITE, tep_get_all_get_params()) . '">' . html::button_image('button_write_review.gif', IMAGE_BUTTON_WRITE_REVIEW) . '</a>'; ?></td>
			<td align="right"  style="display:none"><script language="javascript">
			document.write('<?php echo '<a href="javascript:popupWindow(\\\'' . html::href_link('article_popup_print.php', 'aID=' .  (int)$_GET['articles_id'] . '&language_id=' . (int)$languages_id) . '\\\')">' . html::button_image('button_print_article.gif', IMAGE_PRINT_ARTICLE) . '</a>'; ?>');
			</script>
			</td>
			<?php
		} else {
			?>
			<td class="main"><?php //echo '<a href="' . html::href_link(FILENAME_ARTICLE_REVIEWS_WRITE, tep_get_all_get_params()) . '">' . html::button_image('button_write_review.gif', IMAGE_BUTTON_WRITE_REVIEW) . '</a> '; ?>
			<td class="center"><?php echo '<a href="' . html::href_link(FILENAME_ARTICLE_REVIEWS, tep_get_all_get_params()) . '">' . html::button_image('button_reviews.gif', IMAGE_BUTTON_REVIEW) . '</a> '; ?></td>
			<td align="right"  style="display:none"><script language="javascript">
			document.write('<?php echo '<a href="javascript:popupWindow(\\\'' . html::href_link('article_popup_print.php', 'aID=' .  (int)$_GET['articles_id'] . '&language_id=' . (int)$languages_id) . '\\\')">' . html::button_image('button_print_article.gif', IMAGE_PRINT_ARTICLE) . '</a>'; ?>');
			</script>
			</td>
			<?php
		}
	} else {
		?>
		<td align="right" style="display:none"><script language="javascript">
		document.write('<?php echo '<a href="javascript:popupWindow(\\\'' . html::href_link('article_popup_print.php', 'aID=' .  (int)$_GET['articles_id'] . '&language_id=' . (int)$languages_id) . '\\\')">' . html::button_image('button_print_article.gif', IMAGE_PRINT_ARTICLE) . '</a>'; ?>');
		</script>
		</td>
		<?php
	}

	?>
	<td width="10"><?php echo html::separator('pixel_trans.gif', '10', '1'); ?></td>
	</tr>
	</table></td>
	</tr>
	</table></td>
	</tr>

	<!-- tell_a_friend //-->
	<tr>
	<td><?php echo html::separator('pixel_trans.gif', '100%', '10'); ?></td>
	</tr>
	<tr>
	<td>
	<?php
	if (false and ENABLE_TELL_A_FRIEND_ARTICLE == 'true') {
		if (isset($_GET['articles_id'])) {
			$info_box_contents = array();
			$info_box_contents[] = array('text' => BOX_TEXT_TELL_A_FRIEND);

			new infoBoxHeading($info_box_contents, true, true);

			$info_box_contents = array();
			//$info_box_contents[] = array('form' => html::form('tell_a_friend', html::href_link_noseo(FILENAME_TELL_A_FRIEND, '', 'NONSSL', false), 'get'),
			//                          'align' => 'left',
			//                        'text' => TEXT_TELL_A_FRIEND . '&nbsp;' . html::input_field('to_email_address', '', 'size="10" maxlength="30" style="width: ' . (BOX_WIDTH-30) . 'px"') . '&nbsp;' . html::input_image('button_tell_a_friend.gif', BOX_HEADING_TELL_A_FRIEND) . html::input_hidden_field('articles_id', $_GET['articles_id']) . html::input_hidden_session_id() );

			//new infoBox($info_box_contents);
		}
	}
	?>
	</td>
	</tr>
	<tr>
	<td><?php echo html::separator('pixel_trans.gif', '100%', '10'); ?></td>
	</tr>
	<!-- tell_a_friend_eof //-->
	<tr>
	<td>
	<?php
	//added for cross-sell
	if ( (USE_CACHE == 'true') && !SID) {
		// include(DIR_WS_MODULES . FILENAME_ARTICLES_XSELL);
	} else {
		// include(DIR_WS_MODULES . FILENAME_ARTICLES_XSELL);
	}
}
?>
</td>
</tr>
</table></td>
