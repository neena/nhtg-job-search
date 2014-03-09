var geolocation = (function() {
     var self = {

      checkGeolocation: function() {
        if (navigator.geolocation) {
          return true;
        }
        return false;
      },

      getLocation: function() {
        var promise = $.Deferred();
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = {};
          pos.lat = position.coords.latitude;
          pos.lng = position.coords.longitude;
          promise.resolve(pos);
        });
        return promise;
      },

      ajax: function(url) {
        return $.ajax(url, {
	         crossDomain:true, 
			    dataType: "jsonp", 		     
		    });
      },

      nearPostcode: function(element) {
        var promise = $.Deferred();
        if (this.checkGeolocation()) {	
  	      var getLocation = self.getLocation();
          getLocation.then(function(pos) {
            var url = "http://api.postcodes.io/postcodes/lon/" + pos.lng + "/lat/" + pos.lat;
            var getPostcode = self.ajax(url);
            getPostcode.success(function(data) {
              var name = data.result[0].admin_district;
              console.log(data);
              promise.resolve(name);
            });

          }); 
        }
        return promise;
      },

      findElements: function() {
        // Find textboxes looking for geolocation
        var geolocation_city = $('.js-geolocation-city').length;
        if (geolocation_city > 0) {
           var city = self.nearPostcode();
           city.then(function(name) {
            $('.js-geolocation-city').val(name);
           });
        }
      }
    };
    return self;
}());

$(function() {
  geolocation.findElements();
});  
