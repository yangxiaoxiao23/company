<?php
//���ﳵģ��
//���ﳵ������ʱ
if ($data['List']) {
?>

<div class="shopcart-wrap">
			<div class="shopping-progress">
				<div class="shopping-progress-left pngFix">
					<span>��������</span>
				</div>
				<div class="shopping-progress-right clear">
					<div class="one-step fl"><strong>1</strong><span>�ҵĹ��ﳵ</span></div>
					<div class="two-step fl"><strong>2</strong><span>��д�˶Զ���</span></div>
					<div class="three-step fr"><strong>3</strong><span>���֧��</span></div>
				</div>
			</div>
			
            <div class="shopcart-panel">
            	<table class="shopcart-pro-list">
                	<thead>
                    	<tr>
                        	<th>��Ʒ��Ϣ</th>
                        </tr>
                    </thead>
                    <tbody>
                    <?php	
					//���ﳵ��Ʒ��ϸ��Ϣ sart {
					for ($i=0, $n=sizeof($data['List']); $i<$n; $i++) {
					?>	
						<tr id="J_catrTr_<?= $data['List'][$i]['id']?>" class="<?= $data['List'][$i]['trClass'];?>">
                        	<td>
                            	<div class="shopcart-pro-box uifix">
                                	<div class="shopcart-pro-pic">
                                    	<a href="<?= $data['List'][$i]['productHref'];?>"><img src="<?= $data['List'][$i]['imgSrc'];?>"></a>
                                    </div>
                                    <div class="shopcart-pro-info">
                                    	<h4><a href="<?= $data['List'][$i]['productHref'];?>"><?= $data['List'][$i]['titleTag'].$data['List'][$i]['productName']?></a></h4>
										<div id="infoBox_<?= $data['List'][$i]['id'];?>">
										<dl class="pro-attr">
										<?php
										if($data['List'][$i]['productsModel']){	//�����ź�
										?>
										<dd>
										<span class="option-label"><?= $data['List'][$i]['productsModel']['title']?>��</span><?= $data['List'][$i]['productsModel']['text']?>
											<?php if($data['List'][$i]['travelCompanions']){ //���ͬ�α�ǩ?>
												<span class="is-jieban"><?= $data['List'][$i]['travelCompanions'];?></span>
											<?php }?>
										</dd>
										<?php }
										if($data['List'][$i]['departureDate']){	//��������
										?>
										<dd><p style="float:left;width:320px;"><span class="option-label"><?= $data['List'][$i]['departureDate']['title'];?>��</span><em class="start-date"><?= $data['List'][$i]['departureDate']['text'];?></em></p>
                                            <?php if($data['List'][$i]['endDate']){?>
											<p style="float:left;"><span class="option-label">�������ڣ�</span><em class="end-date"><?= $data['List'][$i]['endDate'];?></em></p>
											<?php }?>
										</dd>
										<?php }
										if($data['List'][$i]['checkoutDate']){	//�˷�����
										?>
										<dd><span class="option-label"><?= $data['List'][$i]['checkoutDate']['title'];?>��</span><em class="start-date"><?= $data['List'][$i]['checkoutDate']['text'];?></em></dd>
										<?php }
										//�ϳ���ַ
										if($data['List'][$i]['departureAddress']){
										?>
										<dd><span class="option-label"><?= $data['List'][$i]['departureAddress']['title']?>��</span><?= $data['List'][$i]['departureAddress']['text']?></dd>
										<?php
										}
										?>
										<?php
										//�з������������Ϣ
										if($data['List'][$i]['roomInfo']){
											$_room_NO = 0;
											$_loop_size = sizeof($data['List'][$i]['roomInfo']['room']);
											if($data['List'][$i]['roomInfo']['roomTotal'] && $_loop_size > 1){	//�ܷ���������1ʱ����ʾ
											?>
											<dd>
											<b><span class="option-label"><?= $data['List'][$i]['roomInfo']['roomTotal']['title'];?>��</span><?= $data['List'][$i]['roomInfo']['roomTotal']['text'];?></b>
											<?php
											//�в�Ʒ����ʱ���ҷ����� > 1 ʱ��������ʾ�������
											if($data['List'][$i]['productsAttributes']){
											?>
											<strong class="fr">
											������ã�<em id="J_TrPriceBox_<?= $data['List'][$i]['id'];?>" class="shopcart-pro-price"><?= $data['List'][$i]['proPrice'];?></em>
											</strong>
											<?php
											}
											?>
											</dd>
											<?php
											}
											foreach($data['List'][$i]['roomInfo']['room'] as $key => $val){	//���巿��������Ϣ
												$_room_NO++;
												if($_loop_size <= 1){ $_room_NO = "����"; }
												?>
												<!--����-->
												<dd>
												<span class="option-label">����<?= $_room_NO;?>��</span> <?= $val['adult']['text'].$val['adult']['title']?> <b> <?= $val['adult']['agreeAllocates']?> </b>
												<?php if($val['child']){?>
												<!--��ͯ-->
												<?= $val['child']['text'].$val['child']['title']?>
												<?php
												}
												?>
												<?php
												//�в�Ʒ����ʱ���ҷ�����==1ʱҪ��������ʾ�������
												if($data['List'][$i]['productsAttributes'] && $_loop_size <= 1){
												?>
												<strong class="fr">
												������ã�<em id="J_TrPriceBox_<?= $data['List'][$i]['id'];?>" class="shopcart-pro-price"><?= $data['List'][$i]['proPrice'];?></em>
												</strong>
												<?php
												}
												?>
												</dd>
										<?php
											}
										}elseif($data['List'][$i]['adult']){
										//û�з����������Ϣ
										?>
										<dd>
										<span class="option-label">������Ա��</span><?= $data['List'][$i]['adult']['text'].$data['List'][$i]['adult']['title'];?>
										<?php
											if($data['List'][$i]['child']){	//��ͯ
											?>
											<?= $data['List'][$i]['child']['text'].$data['List'][$i]['child']['title'];?>
											<?php 
											}
											?>
											
											<?php
											//�в�Ʒ����ʱҪ��ʾ��������
											if($data['List'][$i]['productsAttributes']){
											?>
											<strong class="fr">
											�������ã�<em id="J_TrPriceBox_<?= $data['List'][$i]['id'];?>" class="shopcart-pro-price"><?= $data['List'][$i]['proPrice'];?></em>
											</strong>
											<?php
											}
											?>
										<?php
										}
										?>
										</dd>
										
										<?php
										//��Ʒ����
										if($data['List'][$i]['productsAttributes']){
											foreach($data['List'][$i]['productsAttributes'] as $key => $atts){
										?>
												<dd><span class="option-label"><?= $atts['title']?>��</span>
												<?= $atts['text'];?>
												</dd>
										<?php
											}
										}
										?>
										<dd><span class="option-label">���ͻ��֣�</span><b id="J_TrPoint_<?= $data['List'][$i]['id'];?>"><?= $data['List'][$i]['points'];?></b>��</dd>
										<dd style="text-align:right;border-top: 1px dotted #AED5FF;">
											<strong>С�ƣ�<em class="small-total"><?= $data['List'][$i]['smallTotal'];?></em></strong>
											<?php
											if($data['List'][$i]['peopleAverage']){	//�˾�ֵ
											?>
												<span class="capita"><?= $data['List'][$i]['peopleAverage']['title'];?><?= $data['List'][$i]['peopleAverage']['text'];?></span>
											<?php
											}
											?>
										</dd>
										
										<div class="product-action">
										<form name="<?= $data['List'][$i]['quantityForm']['name'];?>" enctype="multipart/form-data" method="post" action="<?= $data['List'][$i]['quantityForm']['action'];?>">
										<?= $data['List'][$i]['quantityForm']['quantityInput'];?>
										<?php
										//��Ʒ���������򼯺�
										echo $data['List'][$i]['hidden_fields'];
										?>
										<a class="shopcart-btn gradient" href="javascript:void(0);" onclick="cartRemove('<?= $data['List'][$i]['id'];?>','<?= $data['List'][$i]['cartRemoveHref'];?>');">�Ƴ�</a>		
										</form>
										
										</div>
										</dl>
										</div>
										
										<div id="<?= $data['List'][$i]['editBoxId'];?>" tag="���ﳵ��Ʒ�༭��"></div>
										
                                    </div>
                                </div>
                            </td>
                        </tr>                    
					<?php
					}
					//���ﳵ��Ʒ��ϸ��Ϣ end }
					?>
                    </tbody>
                </table>
                
                <div class="shopcart-money">
                    
                	<div style="display:none;">
                        <strong>ѡ����ʾ���֣�</strong>
                        <label for="J_choose-USD"><input href="<?php echo html::href_link_noseo(FILENAME_SHOPPING_CART,'currency=USD');?>" type="radio" name="choose-money" <?= ($currency == 'USD' ? 'checked="checked"':'');?> id="J_choose-USD"  />$</label>
                        <label for="J_choose-CNY"><input href="<?php echo html::href_link_noseo(FILENAME_SHOPPING_CART,'currency=CNY');?>" type="radio" name="choose-money" <?= ($currency == 'CNY' ? 'checked="checked"':'');?>  id="J_choose-CNY"  />&#65509;</label><!--��-->
                        <script type="text/javascript">
                        jQuery(document).ready(function(){
                            jQuery("input[name='choose-money']").click(function(){
                                location.href = jQuery(this).attr("href");
                            });
                        });
                        </script>
					</div>
					
					<?php
					//�Ż�ѡ��ģ��(->do_InputHtml())
					if(!$_SESSION['customer_id']){
					?>
					<div><a href="<?= html::href_link_noseo('login.php');?>">��¼</a>���ʹ�û��֡��ۿ�ȯ�Ż�</div>
                    
                    <?php
					}
					?>
                    <div class="clear">
					<?php
					if($data['Ot_Input_List']){
					?>
                        <ul class="dis-item">
                            <?php
                            foreach($data['Ot_Input_List'] as $val){
                                if($val){
                                    echo $val; //�������<li>...</li>
                                }
                            }
                            ?>
                        </ul>
					<?= $data['Ot_Js_Code'];?>
					<?php }?>
                        
                        <div style="float:right;">
                            
                            <div id="J_cartTotal" class="total_details money-total">
                                <?php
                                //�ܼ���Ϣ
								$_eur = $_cny = $_twd = $_jpy = $_gbp = $_hkd = '';
                                $_t = $cart->getTotalDetails();
                                foreach($_t as $val){
                                ?>
                                    <p><label><?= $val['title'];?></label><em><?= $val['text'];?></em></p>
                                <?php
                                	if(strtolower($val['class'])=='ot_total'){
		                                $_eur = $currencies->format ($val['value'], true, 'EUR');
		                                $_cny = $currencies->format ($val['value'], true, 'CNY');
		                                $_twd = $currencies->format ($val['value'], true, 'TWD');
		                                $_jpy = $currencies->format ($val['value'], true, 'JPY');
		                                $_gbp = $currencies->format ($val['value'], true, 'GBP');
		                                $_hkd = $currencies->format ($val['value'], true, 'HKD');
									}
								}
                                ?>
                            </div>
                            <div class="other-money">
                                <a href="javascript:void(0)" class="see-other pngFix">�鿴�������ֽ��</a>
                                <div class="other-currency">
                                    <span class="currency">�����:</span><span class="important-text-f60"><?= $_cny;?></span>
	                                <span class="currency">ŷԪ:</span><span class="important-text-f60"><?= $_eur;?></span>
	                                <span class="currency">�۱�:</span><span class="important-text-f60"><?= $_hkd;?></span>
	                                <!--
	                                <span class="currency">Ӣ��:</span><span class="important-text-f60"><?= $_gbp;?></span>
	                                <span class="currency">��Ԫ:</span><span class="important-text-f60"><?= $_jpy;?></span>
	                                <span class="currency">��̨��:</span><span class="important-text-f60"><?= $_twd;?></span>
	                                -->
                                </div>
                            </div>
                        
                        </div>
                        
                    </div>
					<span class="money-total">��<i id="J_cartPoints"><?= $cart->show_total_points();?></i>����</span>
                </div>
                
                <?php
				if($currency == 'CNY'){ // ���RMB��ʾ��
				?>
				<div class="is-rmb">���ķ����в�Ʒ����Ԫ��Ϊ��׼�Ƽ۱��֣���Ԫ�һ�����һ��������е��ջ����м��Ϊ׼������������ѡ���˫���ֶ���֧����ʽ��Ԥ������</div>
				
				<?php }
				if($data['travelCompanionsTips']){ // ��ӽ��ͬ����ʾ��
				?>
				<div class="is-rmb"><?= $data['travelCompanionsTips'];?></div>				
				<?php				
				}
				?>
				
                
				<div class="control-panel clear">
                	<a class="fr order-btns" href="<?= html::href_link_noseo('checkout.php', 'action=checkout', 'SSL');?>"><span>ȷ������ȥ����</span></a>
                    <a class="control-btns prev-step pngFix" href="javascript:history.go(-1)"><span>������һ��</span></a>
                    <a class="control-btns clear-shopcart pngFix" href="javascript:void(0);" onclick="cartClearAll('<?= html::href_link_noseo('shopping_cart.php','timeid='.microtime(true))?>');"><span>��չ��ﳵ</span></a>
                    <a class="control-btns next-step pngFix" href="<?= html::href_link(FILENAME_DEFAULT);?>"><span>��������</span></a>
                </div>
            </div>
			
			<?php
			// ��治������ start {
			if(0){
				if ($data['anyOutOfStock'] == 1) {
					if (STOCK_ALLOW_CHECKOUT == 'true') {
			?>
				<div><p class="stockWarning" align="center"><?php echo OUT_OF_STOCK_CAN_CHECKOUT; ?></p></div>
			<?php
					} else {
			?>
				<div><p class="stockWarning" align="center"><?php echo OUT_OF_STOCK_CANT_CHECKOUT; ?></p></div>
			<?php
					}
				}
			}
			// ��治������ end }
			?>
        </div>

<?php
} else {
//���ﳵΪ��ʱ
?>
<div class="shopcart-wrap">
  <div class="contentText">
    <?php echo TEXT_CART_EMPTY; ?>
    <p align="right"><a href="<?= $data['nullCart']['continueHref'];?>">����</a></p>
  </div>
</div>
<?php
}
?>

<script type="text/javascript">
   $(function(){
        var productBoxs = $('.shopcart-pro-box');
        var  productInfos = productBoxs.find('.shopcart-pro-info');
        var infoWin = productInfos.width();
        productBoxs.each(function(i){
            var optionLabels = $(this).find('.option-label');
            var maxWidth = 0;
            optionLabels.each(function(i){
                var win = $(this).width();
                if(maxWidth < win){
                    maxWidth = win;
                }
            });
            optionLabels.css('width', maxWidth + 5);
            $(this).find('.special-project-detail').css('width', infoWin - maxWidth - 5);
        });
   });
</script>