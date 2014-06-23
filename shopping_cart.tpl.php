<?php
//购物车模板
//购物车有内容时
if ($data['List']) {
?>

<div class="shopcart-wrap">
			<div class="shopping-progress">
				<div class="shopping-progress-left pngFix">
					<span>购物流程</span>
				</div>
				<div class="shopping-progress-right clear">
					<div class="one-step fl"><strong>1</strong><span>我的购物车</span></div>
					<div class="two-step fl"><strong>2</strong><span>填写核对订单</span></div>
					<div class="three-step fr"><strong>3</strong><span>完成支付</span></div>
				</div>
			</div>
			
            <div class="shopcart-panel">
            	<table class="shopcart-pro-list">
                	<thead>
                    	<tr>
                        	<th>商品信息</th>
                        </tr>
                    </thead>
                    <tbody>
                    <?php	
					//购物车产品详细信息 sart {
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
										if($data['List'][$i]['productsModel']){	//旅游团号
										?>
										<dd>
										<span class="option-label"><?= $data['List'][$i]['productsModel']['title']?>：</span><?= $data['List'][$i]['productsModel']['text']?>
											<?php if($data['List'][$i]['travelCompanions']){ //结伴同游标签?>
												<span class="is-jieban"><?= $data['List'][$i]['travelCompanions'];?></span>
											<?php }?>
										</dd>
										<?php }
										if($data['List'][$i]['departureDate']){	//出发日期
										?>
										<dd><p style="float:left;width:320px;"><span class="option-label"><?= $data['List'][$i]['departureDate']['title'];?>：</span><em class="start-date"><?= $data['List'][$i]['departureDate']['text'];?></em></p>
                                            <?php if($data['List'][$i]['endDate']){?>
											<p style="float:left;"><span class="option-label">离团日期：</span><em class="end-date"><?= $data['List'][$i]['endDate'];?></em></p>
											<?php }?>
										</dd>
										<?php }
										if($data['List'][$i]['checkoutDate']){	//退房日期
										?>
										<dd><span class="option-label"><?= $data['List'][$i]['checkoutDate']['title'];?>：</span><em class="start-date"><?= $data['List'][$i]['checkoutDate']['text'];?></em></dd>
										<?php }
										//上车地址
										if($data['List'][$i]['departureAddress']){
										?>
										<dd><span class="option-label"><?= $data['List'][$i]['departureAddress']['title']?>：</span><?= $data['List'][$i]['departureAddress']['text']?></dd>
										<?php
										}
										?>
										<?php
										//有房房间的人数信息
										if($data['List'][$i]['roomInfo']){
											$_room_NO = 0;
											$_loop_size = sizeof($data['List'][$i]['roomInfo']['room']);
											if($data['List'][$i]['roomInfo']['roomTotal'] && $_loop_size > 1){	//总房间数大于1时才显示
											?>
											<dd>
											<b><span class="option-label"><?= $data['List'][$i]['roomInfo']['roomTotal']['title'];?>：</span><?= $data['List'][$i]['roomInfo']['roomTotal']['text'];?></b>
											<?php
											//有产品属性时并且房间数 > 1 时在这里显示房间费用
											if($data['List'][$i]['productsAttributes']){
											?>
											<strong class="fr">
											房间费用：<em id="J_TrPriceBox_<?= $data['List'][$i]['id'];?>" class="shopcart-pro-price"><?= $data['List'][$i]['proPrice'];?></em>
											</strong>
											<?php
											}
											?>
											</dd>
											<?php
											}
											foreach($data['List'][$i]['roomInfo']['room'] as $key => $val){	//具体房间人数信息
												$_room_NO++;
												if($_loop_size <= 1){ $_room_NO = "人数"; }
												?>
												<!--成人-->
												<dd>
												<span class="option-label">房间<?= $_room_NO;?>：</span> <?= $val['adult']['text'].$val['adult']['title']?> <b> <?= $val['adult']['agreeAllocates']?> </b>
												<?php if($val['child']){?>
												<!--儿童-->
												<?= $val['child']['text'].$val['child']['title']?>
												<?php
												}
												?>
												<?php
												//有产品属性时并且房间数==1时要在这里显示房间费用
												if($data['List'][$i]['productsAttributes'] && $_loop_size <= 1){
												?>
												<strong class="fr">
												房间费用：<em id="J_TrPriceBox_<?= $data['List'][$i]['id'];?>" class="shopcart-pro-price"><?= $data['List'][$i]['proPrice'];?></em>
												</strong>
												<?php
												}
												?>
												</dd>
										<?php
											}
										}elseif($data['List'][$i]['adult']){
										//没有房间的人数信息
										?>
										<dd>
										<span class="option-label">参团人员：</span><?= $data['List'][$i]['adult']['text'].$data['List'][$i]['adult']['title'];?>
										<?php
											if($data['List'][$i]['child']){	//儿童
											?>
											<?= $data['List'][$i]['child']['text'].$data['List'][$i]['child']['title'];?>
											<?php 
											}
											?>
											
											<?php
											//有产品属性时要显示基本费用
											if($data['List'][$i]['productsAttributes']){
											?>
											<strong class="fr">
											基本费用：<em id="J_TrPriceBox_<?= $data['List'][$i]['id'];?>" class="shopcart-pro-price"><?= $data['List'][$i]['proPrice'];?></em>
											</strong>
											<?php
											}
											?>
										<?php
										}
										?>
										</dd>
										
										<?php
										//产品属性
										if($data['List'][$i]['productsAttributes']){
											foreach($data['List'][$i]['productsAttributes'] as $key => $atts){
										?>
												<dd><span class="option-label"><?= $atts['title']?>：</span>
												<?= $atts['text'];?>
												</dd>
										<?php
											}
										}
										?>
										<dd><span class="option-label">赠送积分：</span><b id="J_TrPoint_<?= $data['List'][$i]['id'];?>"><?= $data['List'][$i]['points'];?></b>分</dd>
										<dd style="text-align:right;border-top: 1px dotted #AED5FF;">
											<strong>小计：<em class="small-total"><?= $data['List'][$i]['smallTotal'];?></em></strong>
											<?php
											if($data['List'][$i]['peopleAverage']){	//人均值
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
										//产品属性隐藏域集合
										echo $data['List'][$i]['hidden_fields'];
										?>
										<a class="shopcart-btn gradient" href="javascript:void(0);" onclick="cartRemove('<?= $data['List'][$i]['id'];?>','<?= $data['List'][$i]['cartRemoveHref'];?>');">移除</a>		
										</form>
										
										</div>
										</dl>
										</div>
										
										<div id="<?= $data['List'][$i]['editBoxId'];?>" tag="购物车产品编辑框"></div>
										
                                    </div>
                                </div>
                            </td>
                        </tr>                    
					<?php
					}
					//购物车产品详细信息 end }
					?>
                    </tbody>
                </table>
                
                <div class="shopcart-money">
                    
                	<div style="display:none;">
                        <strong>选择显示币种：</strong>
                        <label for="J_choose-USD"><input href="<?php echo html::href_link_noseo(FILENAME_SHOPPING_CART,'currency=USD');?>" type="radio" name="choose-money" <?= ($currency == 'USD' ? 'checked="checked"':'');?> id="J_choose-USD"  />$</label>
                        <label for="J_choose-CNY"><input href="<?php echo html::href_link_noseo(FILENAME_SHOPPING_CART,'currency=CNY');?>" type="radio" name="choose-money" <?= ($currency == 'CNY' ? 'checked="checked"':'');?>  id="J_choose-CNY"  />&#65509;</label><!--￥-->
                        <script type="text/javascript">
                        jQuery(document).ready(function(){
                            jQuery("input[name='choose-money']").click(function(){
                                location.href = jQuery(this).attr("href");
                            });
                        });
                        </script>
					</div>
					
					<?php
					//优惠选择模块(->do_InputHtml())
					if(!$_SESSION['customer_id']){
					?>
					<div><a href="<?= html::href_link_noseo('login.php');?>">登录</a>后可使用积分、折扣券优惠</div>
                    
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
                                    echo $val; //输出的是<li>...</li>
                                }
                            }
                            ?>
                        </ul>
					<?= $data['Ot_Js_Code'];?>
					<?php }?>
                        
                        <div style="float:right;">
                            
                            <div id="J_cartTotal" class="total_details money-total">
                                <?php
                                //总价信息
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
                                <a href="javascript:void(0)" class="see-other pngFix">查看其他币种金额</a>
                                <div class="other-currency">
                                    <span class="currency">人民币:</span><span class="important-text-f60"><?= $_cny;?></span>
	                                <span class="currency">欧元:</span><span class="important-text-f60"><?= $_eur;?></span>
	                                <span class="currency">港币:</span><span class="important-text-f60"><?= $_hkd;?></span>
	                                <!--
	                                <span class="currency">英镑:</span><span class="important-text-f60"><?= $_gbp;?></span>
	                                <span class="currency">日元:</span><span class="important-text-f60"><?= $_jpy;?></span>
	                                <span class="currency">新台币:</span><span class="important-text-f60"><?= $_twd;?></span>
	                                -->
                                </div>
                            </div>
                        
                        </div>
                        
                    </div>
					<span class="money-total">赠<i id="J_cartPoints"><?= $cart->show_total_points();?></i>积分</span>
                </div>
                
                <?php
				if($currency == 'CNY'){ // 添加RMB提示语
				?>
				<div class="is-rmb">走四方所有产品以美元作为基准计价币种，美元兑换人民币汇率以银行当日汇率中间价为准。您可以自由选择此双币种多种支付方式的预订服务。</div>
				
				<?php }
				if($data['travelCompanionsTips']){ // 添加结伴同游提示语
				?>
				<div class="is-rmb"><?= $data['travelCompanionsTips'];?></div>				
				<?php				
				}
				?>
				
                
				<div class="control-panel clear">
                	<a class="fr order-btns" href="<?= html::href_link_noseo('checkout.php', 'action=checkout', 'SSL');?>"><span>确定无误，去结算</span></a>
                    <a class="control-btns prev-step pngFix" href="javascript:history.go(-1)"><span>返回上一步</span></a>
                    <a class="control-btns clear-shopcart pngFix" href="javascript:void(0);" onclick="cartClearAll('<?= html::href_link_noseo('shopping_cart.php','timeid='.microtime(true))?>');"><span>清空购物车</span></a>
                    <a class="control-btns next-step pngFix" href="<?= html::href_link(FILENAME_DEFAULT);?>"><span>继续购物</span></a>
                </div>
            </div>
			
			<?php
			// 库存不足提醒 start {
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
			// 库存不足提醒 end }
			?>
        </div>

<?php
} else {
//购物车为空时
?>
<div class="shopcart-wrap">
  <div class="contentText">
    <?php echo TEXT_CART_EMPTY; ?>
    <p align="right"><a href="<?= $data['nullCart']['continueHref'];?>">继续</a></p>
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