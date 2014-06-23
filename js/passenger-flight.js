// 结账过程中,顾客信息和游客信息的互动过程

Usitrip.ns('usitrip.data');
Usitrip.ns('usitrip.checkout');

usitrip.data.PassengerData = function(data){
    this.no = data['no'] || 0;
    this.firstName = data['firstName'] || '';
    this.lastName = data['lastName'] || '';
    this.phone = data['phone'] || '';
    this.gender = data['gender'] || '';
    this.birthday = data['birthday'] || '';
    this.weight = data['weight'] || '';
    this.height = data['height'] || '';
	this.email = data['email'] || '';
    
    
    usitrip.data.PassengerData.superclass.constructor.apply(this);
    this.addEvents('datachange');
}

Usitrip.extend(usitrip.data.PassengerData, usitrip.event.UsitripEvent, {
    
    setData: function(key, value){
        this[key] = value;
        this.fireEvent('datachange', this, this, key, value);
    },
    
    getData: function(key){
        return this[key] || '';
    }
});

usitrip.data.FlightData = function(data){
    this.flightNo = data['flightNo'] || '';
    this.passengers = data['passengers'] || [];
    this.date = data['date'] || '';
    this.companyName = data['companyName'] || '';
    this.airport = data['airport'] || '';
    this.time = data['time'] || '';
    this.phone = data['phone'] || '';
    
    usitrip.data.FlightData.superclass.constructor.apply(this);
    this.addEvents('datachange');
}

Usitrip.extend(usitrip.data.FlightData, usitrip.event.UsitripEvent, {
    setData: function(key, value){
        this[key] = value;
        this.fireEvent('datachange', this, this, key, value);
    },
    
    getData: function(key){
        return this[key] || '';
    }
});



usitrip.checkout.PassengerFlight = function(config){
    this.ulId = config['ulId'];
    this.passengerData = config['passengerData'] || []; //顾客信息
    this.arrivalFlightData = config['arrivalFlightData'] || ''; //接机航班信息
    this.departureFlightData = config['departureFlightData'] || ''; //送机航班信息
    
    
    this.initEvent();
    this.renderView();
    
    usitrip.checkout.PassengerFlight.superclass.constructor.apply(this);
}

Usitrip.extend(usitrip.checkout.PassengerFlight, usitrip.event.UsitripEvent, {
    
    initEvent: function(){
        var passenger;
        for(var i=0,len=this.passengerData.length;i<len;i++){
            passenger = this.passengerData[i];
            passenger.on('datachange', function(data, key, value){
                if(key === 'firstName' || key === 'lastName'){
                    this.updateView(data);
                }
            },this );
        }
    
    },
    
    renderView: function(){
        var passengersHtml = '',
            passenger;
    
        for(var i=0,len=this.passengerData.length;i<len;i++){
            passenger = this.passengerData[i];
            var lastName = passenger.getData('lastName');
            var firstName =  passenger.getData('firstName');
            if(lastName || firstName){
                passengersHtml += '<li><label><input type="checkbox">' + lastName + ' ' + firstName + '</label></li>'
            }
            
        };
        $('.' + this.ulId).html(passengersHtml);
    },
    
    
    updateView: function(data){
       /*var html = '<li><label><input type="checkbox">' + data.getData('lastName') + ' ' + data.getData('firstName') + '</label></li>';
       $('.' + this.ulId).each(function(){
          var li = $(this).find('li').eq(data.getData('no'));
          if(li.length > 0){
             li.html('<label><input type="checkbox">' + data.getData('lastName') + ' ' + data.getData('firstName') + '</label>');
          } else {
             $(this).append(html);
          }
       });*/
       
       this.renderView();
    }
});

