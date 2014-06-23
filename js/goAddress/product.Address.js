/**
 * Created with JetBrains WebStorm.
 * User: YHB
 * Date: 14-4-8
 * Time: 下午6:18
 * To change this template use File | Settings | File Templates.
 */

Usitrip.ns('usitrip.product');
(function(){

    usitrip.product.AddressData = function(data){
        this.addressName = data['addressName'] || '';
        this.dRegion = data['dRegion'] || '';
        this.defaultVal = data['defaultVal'] || '';
        this.departureAddressId = data['departure_address_id'] || '';
        this.regionName = data['regionName'] || '';
        this.addressList = data['list'] || [];

        usitrip.product.AddressData.superclass.constructor.apply(this);
        this.addEvents('datachange');
    }

    Usitrip.extend(usitrip.product.AddressData, usitrip.event.UsitripEvent, {

        get: function(attr){
            return this[attr] || '';
        },

        set: function(attr, value){
            this[attr] = value;
            this.fireEvent('datachange', this, attr, value);
        }
    });

    usitrip.product.Address = function(config){
        this.data = this.data || this.initData(config.data);
		this.targetEl = config.targetEl;
        this.initView(this.targetEl);
        this.initEvent();
        this.initDefault();

        usitrip.product.Address.superclass.constructor.apply(this);


        this.addEvents(['addlistclick', 'okBtn', 'cancelBtn', 'colseBtn']);

        //当点击城市的时候,触发的事件
        this.addListenerEvent('addlistclick', function(label, index){
            this.chooseAddress(index);
        })
    }


    Usitrip.extend(usitrip.product.Address, usitrip.event.UsitripEvent, {
        initData: function(json){
            return new usitrip.product.AddressData(json);
        },

        initView: function(targetEl){
            if(this.wrapDiv && !this.wrapDiv.is(':hidden')){
                return;
            }
            this.doRender(targetEl);
        },

        initEvent: function(){
            var self = this;
            //上车城市的label点击事件,通过代理的方式
            this.addressList.delegate('label', 'click',function(event){
                var label = $(this);
                var index = label.find('input').val();
                self.fireEvent('addlistclick', self , this, index);
            });

            //点击确定按钮
            this.addressOkBtn.click(function(event){
                self.fireEvent('okBtn', self , this, event);
            });

            //点击取消按钮
            this.addressCancelBtn.click(function(e){
				var ev = e || window.event;
                self.fireEvent('cancelBtn', self , this, ev);
            });

            //点击关闭按钮
            this.addressClose.click(function(event){
                self.fireEvent('closeBtn', self , this, event);
            });

            //给所有的dd添加hover样式和增加点击后的样式
            this.addressAllDd.hover(function(){
                $(this).toggleClass('hover');
            }).click(function(){
                    $(this).addClass('oncur').siblings().removeClass('oncur');
            });
			
			
			$(document).click(function(e){
				e = window.event || e;
				obj = $(e.srcElement || e.target);
				var wrap = [];
				wrap.push('.' + self.wrapDiv.attr('class'));
				wrap.push('.' + self.wrapDiv.attr('class') + ' *');
				wrap.push('#' + self.targetEl.attr('id'));
				wrap.push('#' + self.targetEl.attr('id') + ' *');
				
				if ($(obj).is(wrap.join(','))) { 
				    //alert('内部区域'); 
				} else {
					self.hide();
					//alert('外部区域'); 
				} 
			});
			
        },

        doRender: function(targetEl){
            var el = $(targetEl) /*,
                elOffset = el.offset(),
                elOffsetTop = elOffset.top,
                elOffsetTLeft = elOffset.left,
                elHeight = el.height(),
                parentOffsetLeft = el.parent().offset().left */;

            /*var html = '<div class="addr_common_flow" ' +
                        'style="left:' + (elOffsetTLeft - parentOffsetLeft) + 'px;top:'+ (elHeight + 2) +'px;display: block;z-index:10;">';*/
            var html = '<div class="addr_common_flow" >';
            html += '<dl class="bc_list">';
            html += '<dt class="bc_title">所在区域<a href="javascript:;" class="bc_cancel">×</a></dt>'
            html += '</dl>';
            html += '<div class="bc_detail"></div>'
            html += '<p class="h_list_btns"><a class="rbtn_ok" href="javascript:;">确定</a><a class="rbtn_cancel" href="javascript:;">取消</a></p>'
            html += '</div>';

            el.append(html);

            this.wrapDiv = el.find('.addr_common_flow'); //包裹上车地址的弹出层Div
            this.addressInputValue = this.wrapDiv.prev();
            this.addressList = this.wrapDiv.find('.bc_list'); //上车地址弹出层Div的城市列表
            this.addressDetail = this.wrapDiv.find('.bc_detail'); //上车地址弹出层DIV的详细列表
            this.addressOkBtn = this.wrapDiv.find('.h_list_btns .rbtn_ok'); //上车地址弹出层的确定按钮
            this.addressCancelBtn = this.addressOkBtn.next('.h_list_btns .rbtn_cancel'); //上车地址弹出层的取消按钮
            this.addressClose = this.addressList.find('.bc_cancel');


            var addressList = this.data.get('addressList');
            var listHtml = '', detailHtml = '';
            for(var i= 0,len=addressList.length; i<len; i++){
                var address = addressList[i];
				
                listHtml += '<dd>' +
                                '<label for="radio_index' + address.regionId + '_' + this.data.get('regionName') + '">' +
                                    '<input type="radio" id="radio_index' + address.regionId + '_' + this.data.get('regionName') + '" value="'+ address.regionId +'" name="'+ this.data.get('regionName') + '">' +
                                    '<span>'+ address.regionText +'</span>' +
                                '</label>' +
                            '</dd>';
                //if(i === 0){
                    detailHtml += '<dl class="bc_dlist list-no' + address.regionId + '"' + (i !== 0 ? " style=\"display:none;\"" : "") + '>';
                    detailHtml += '<dt class="bc_de_title"><label>'+ address.regionText +'</label>的上车时间和地点</dt>';
                    for(var j=0; j<address.addressConten.length; j++){
                        var addressContent = address.addressConten[j];
                        var detailDd = '<dd>' +
                                            '<label for="radio_detail_index' + addressContent.id + '_' + this.data.get('regionName') + '">' +
                                                '<input type="radio" id="radio_detail_index' + addressContent.id + '_' + this.data.get('regionName') + '" value="'+ addressContent.id +'" name="'+ this.data.get('addressName') +'">' +
                                                '<span class="addr_time">'+ addressContent.time +'</span><span class="addr_dd">'+ addressContent.address +'</span>' +
                                            '</label>' +
                                        '</dd>';
                        detailHtml += detailDd;
                    }
                    detailHtml += '</dl>';
                //}
            }
            this.addressList.append(listHtml);
            this.addressDetail.append(detailHtml);


            //上车地址弹出层中所有的dd
            this.addressAllDd = this.wrapDiv.find('dl dd');

            //上车地址弹出层中城市列表中Input
            this.addressAllInputs = this.addressList.find('input');
        },

        //默认选择的数据,也可以是通过URL传递过来的
        initDefault: function(){
            var dRegion = this.data['dRegion'];
            this.chooseCity(dRegion);
            var id = this.data['departureAddressId'];
            this.chooseAddress(dRegion, id);
        },

        /**
         * 根据点击列表选择城市
         * @param index
         */
        chooseCity: function(dRegion){
            var inputEl = this.addressAllInputs.filter('input[value=' + dRegion + ']');
            inputEl.attr('checked', 'checked'); //将input选中
            inputEl.parents('dd').addClass('oncur').siblings().removeClass('oncur'); //并将input所在的dd添加选择的样式
        },

        /**
         * 根据点击的城市,选择对应的上车地址
         * @param index
         */
        chooseAddress: function(index, id){
            //将对应的列表显示,将其他的列表隐藏

            var detalDl = this.addressDetail.find('dl.list-no' + index);
                detalDl.show();
                detalDl.siblings().hide();
            var detalDd = detalDl.find('dd');

            if(id){
                var shopCatReturnValue = detalDd.find('input[value=' + id + ']');

                if(shopCatReturnValue){
                    shopCatReturnValue.parent().parent().addClass('oncur').siblings().removeClass('oncur');
                    shopCatReturnValue.attr('checked', 'checked');
                    return ;
                }
            }

            var oldChange = detalDd.filter('.oncur');

            if(!Usitrip.isEmptyArray(oldChange)){
                oldChange.addClass('oncur').siblings().removeClass('oncur');
                oldChange.find('input').attr('checked', 'checked');
            } else {
                var firsetDd = detalDd.first();
                firsetDd.addClass('oncur').siblings().removeClass('oncur')
                firsetDd.find('input').attr('checked', 'checked');
            }
        },

        show: function(){
            this.wrapDiv && this.wrapDiv.show();
        },

        hide: function(){
            this.wrapDiv && this.wrapDiv.hide();
        } ,

        /**
         * 获取选择的值
         */
        getValue: function(){
            var result = [];
            result.push(this.getCity());
            return result.concat(this.getAddress());
        },

        /**
         * 获取选择的城市
         */
        getCity: function(){
            var selectedCity = this.addressList.find('input:checked');
            return selectedCity.next('span').text();
        },

        /**
         * 获取选择的上车地址和时间
         */
        getAddress: function(){
            var selectedCity = this.addressList.find('input:checked');
            var num = selectedCity.parents('dd').index();
            var selectedAddress = this.addressDetail.find('.bc_dlist:eq('+ (num - 1) +') input:checked');
            var time = selectedAddress.next('span.addr_time').text();
            var addr = selectedAddress.next().next('span.addr_dd').text();
            return [time, addr]
        }
    })
})();