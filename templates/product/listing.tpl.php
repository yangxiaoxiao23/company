<?php
echo "���ļ��Ѿ�û���ˣ�";
exit;







































































/*
$Id$

osCommerce, Open Source E-Commerce Solutions
http://www.oscommerce.com

Copyright (c) 2010 osCommerce

Released under the GNU General Public License
*/
//��Ʒ�б���������б�ģ��
// ����һ���Ѿ����Ƶ�index.php
//$listing_split = new splitPageResults($listing_sql, MAX_DISPLAY_SEARCH_RESULTS, 'p.products_id');
?>

<div class="screening_warp">
                	<div class="screening">
                        <?php if(sizeof($_SEARCH_DATA['attractions'])>1){?>
						<div class="city">
                            <h4><strong>��ȥ�Ķ���</strong></h4>
                            <ul>
                                <?php
                                foreach((array)$_SEARCH_DATA['attractions'] as $key => $val){
								?>
								<li class="<?= $val['class']?>"><a href="<?= $val['href']?>"><?= $val['name']?></a></li>
								<?php }?>
                                
								
                                <div class="del_float"></div>
                            </ul>
                        </div>

						<?php if(tep_not_null($_GET['attractions'])){?>
						<div class="Continue">��ѡ����<strong class="color_orange"><?= tep_get_city_name($_GET['attractions']);?></strong>������ɸѡ��
                        	<em class="dot"></em>                        
                        </div>
						<?php }?>
						<?php }?>
						
                        <div class="choose">
                        	<?php if(sizeof($_SEARCH_DATA['departure'])>1){?>
							<dl>
                            	<dt>�������У�</dt>
                                <dd>
								<?php
								foreach((array)$_SEARCH_DATA['departure'] as $key => $val){
								?>
								<a href="<?= $val['href']?>" class="<?= $val['class']?>"><?= $val['name']?></a>
								<?php }?>
								</dd>
                                <div class="del_float"></div>
                            </dl>
                            <?php }?>
							<?php if(sizeof($_SEARCH_DATA['destination'])>1){?>
							<dl>
                            	<dt>�������У�</dt>
                                <dd>
								<?php
								foreach((array)$_SEARCH_DATA['destination'] as $key => $val){
								?>
								<a href="<?= $val['href']?>" class="<?= $val['class']?>"><?= $val['name']?></a>
								<?php }?>
								</dd>
                                <div class="del_float"></div>
                            </dl>
							<?php }?>
                           <?php if(sizeof($_SEARCH_DATA['days'])>1){?>
						    <dl>
                            	<dt>�г�������</dt>
                                <dd>
								<?php
								foreach((array)$_SEARCH_DATA['days'] as $key => $val){
								?>
								<a href="<?= $val['href']?>" class="<?= $val['class']?>"><?= $val['name']?></a>
								<?php }?>
								</dd>
                                <div class="del_float"></div>
                            </dl>
							<?php }?>
                            <?php if(sizeof($_SEARCH_DATA['prices'])>1){?>
							<dl>
                            	<dt>�۸�Ԥ�㣺</dt>
                                <dd>
								<?php
								foreach((array)$_SEARCH_DATA['prices'] as $key => $val){
								?>
								<a href="<?= $val['href']?>" class="<?= $val['class']?>"><?= $val['name']?></a>
								<?php }?>
								</dd>
                                <div class="del_float"></div>
                            </dl>
							<?php }?>
                            <?php if(sizeof($_SEARCH_DATA['preferential'])>1 ){?>
							<dl>
                            	<dt>�Żݻ��</dt>
                                <dd>
								<?php
								foreach((array)$_SEARCH_DATA['preferential'] as $key => $val){
								?>
								<a href="<?= $val['href']?>" class="<?= $val['class']?>"><?= $val['name']?></a>
								<?php }?>
								</dd>
                                <div class="del_float"></div>
                            </dl>
							<?php }?>
                        </div>
                        <div class="has">
                          <dl>
                            <dt>��ѡ��</dt>
                            <dd>
							<?php foreach((array)$tags_m as $key => $val){?>
							<span><?= $tags_m[$key]['name']?><a href="<?= $tags_m[$key]['href']?>">�ر�</a></span>
							<?php }?>
							</dd>
                            <div class="more"><a href="<?= html::href_link(basename($PHP_SELF), tep_get_all_get_params($sub_params));?>" class="fr color_orange">����ɸѡ����&gt;&gt;</a></div>
                          </dl>
                        </div>
                  </div>
						<div class="close_open"><span>����</span></div>
                </div>
<div class="tourismList">
  <?php if ( ($listing_split->number_of_rows > 0)) {?>
  <div class="sort">
      <dl>
          <dd><?= $listing_split->display_count(TEXT_DISPLAY_NUMBER_OF_PRODUCTS);?></dd>
          <dt>
              <ul>
                  <li>����</li>
                  <?php
                  $_class1 = $_class2 = "bottom";
                  if($_GET['sort']=='1a'){ $_class1 = "top2"; }
                  if($_GET['sort']=='1d'){ $_class1 = "bottom2"; }
                  if($_GET['sort']=='2a'){ $_class2 = "top2"; }
                  if($_GET['sort']=='2d'){ $_class2 = "bottom2"; }
				  ?>
				  <li class="<?= $_class1;?>">                  
                  <a href="<?= html::href_link(basename($PHP_SELF), tep_get_all_get_params(array('page', 'info', 'sort','x','y')) . '&sort=1' .($_GET['sort'] ==  '1a' ? 'd' : 'a'));?>">�۸�</a></li>
                  </li>
                  
                  <li class="<?= $_class2;?>">
                  <a href="<?= html::href_link(basename($PHP_SELF), tep_get_all_get_params(array('page', 'info', 'sort','x','y')) . '&sort=2' .($_GET['sort'] ==  '2a' ? 'd' : 'a'));?>">����ʱ��</a></li>
                  <li class="s_3">
                  <?php
                  echo html::select_field('sort',$sort_values,'','onChange="sort_product_list(\''.html::href_link(basename($PHP_SELF), tep_get_all_get_params(array('page', 'info', 'sort','x','y'))).'\',this.value)"');
				  ?>
				  </li>
              </ul>
          </dt>
      </dl>
  </div>
  <?php if( (PREV_NEXT_BAR_LOCATION == '1') || (PREV_NEXT_BAR_LOCATION == '3') ){?>
  <div class="listPage">
  <?= $listing_split->display_links(MAX_DISPLAY_PAGE_LINKS, tep_get_all_get_params(array('page', 'info', 'x', 'y'))); ?>
  </div>
  <?php }?>
  <div class="tourism_warp">
    <?php for($i=0, $n=sizeof($datas); $i<$n; $i++){
    	$_class = "tourism";
    	if($i>0 && (($i+1)%2 ==0)){ $_class = "tourism bg_1"; }
	?>
      <div class="<?= $_class;?>">
          <h3><a href="<?= html::href_link(FILENAME_PRODUCT_INFO, 'products_id=' . $datas[$i]['products_id'])?>"><?= others::keyword_add_css_to_string($datas[$i]['products_name'], $_w);?></a></h3>
          <dl>
              <dt>
                  <a href="<?= html::href_link(FILENAME_PRODUCT_INFO, 'products_id=' . $datas[$i]['products_id'])?>"><img src="<?= $datas[$i]['productsImageThumbnailsSrc']; //��Ʒ����Сͼ?>"></a>
                  <p>
                  <span>�����(<em class="color_orange"><?= Product::getSatisfactionRate($datas[$i]['products_id']);?></em>)</span>
                  <span class="text_r">����(<em class="color_blue"><?= Product::getReviewsCount($datas[$i]['products_id']);?></em>)</span>
                  <span>���ͬ��(<em class="color_orange"><?= Product::getTravelCompanionCount($datas[$i]['products_id']);?></em>)</span>
                  </p>
              </dt>
              <dd>
                  <ul>
                      <?php
					  if(tep_not_null($projectName[$i]['titleModel'])){?>
					  <li><h5><?= $projectName[$i]['titleModel']?>��</h5><p><?= others::keyword_add_css_to_string($datas[$i]['products_model'], $_w);?></p></li>
                      <?php
					  }
					  if(tep_not_null($projectName[$i]['titleDeparture'])){
					  ?>
					  <li><h5><?= $projectName[$i]['titleDeparture']?>��</h5><p><?= implode(', ',(array)$datas[$i]['startCity'])?></p></li>
                      <?php
					  }
					  if(tep_not_null($projectName[$i]['titleEndCity'])){
					  ?>
					  <li><h5><?= $projectName[$i]['titleEndCity']?>��</h5><p><?= implode(', ',(array)$datas[$i]['endCity'])?></p></li>
                      <?php
					  }
					  if(tep_not_null($projectName[$i]['titleViaAttractions'])){
					  ?>
					  <li><h5><?= $projectName[$i]['titleViaAttractions']?>��</h5><p><?= implode(', ',(array)$datas[$i]['attractionsCity']);?></p></li>
					  <?php
					  }
					  if(tep_not_null($projectName[$i]['titleDepartureDate'])){
					  ?>
					  <li><h5><?= $projectName[$i]['titleDepartureDate']?>��</h5><p><?= $datas[$i]['departureString']?></p></li>
                      <?php
					  }
					  if(tep_not_null($projectName[$i]['titleProductsSmall'])){
					  ?>
					  <li><h5><?= $projectName[$i]['titleProductsSmall']?>��</h5><p><?= $datas[$i]['products_small_description']?></p></li>
					  <?php 
					  }
					  ?>
                  </ul>
                  <div class="price">
					  <?= $datas[$i]['priceTag'];  //��Ʒ�۸�ע��������htmlӴ?>
                      <a href="<?= html::href_link(FILENAME_PRODUCT_INFO, 'products_id=' . $datas[$i]['products_id'])?>">���/Ԥ��</a>
                  </div>
              </dd>
          </dl>
          <div class="del_float"></div>
      </div>                
      <?php }?>
                      
  </div>  
  <?php if( (PREV_NEXT_BAR_LOCATION == '2') || (PREV_NEXT_BAR_LOCATION == '3') ){?>
  <div class="listPage">
  <?= $listing_split->display_links(MAX_DISPLAY_PAGE_LINKS, tep_get_all_get_params(array('page', 'info', 'x', 'y'))); ?>
  </div>
  <?php }?>
  <?php }else{?>
  <p><?= TEXT_NO_PRODUCTS; ?></p>
  <?php }?>
</div>
