 var duration = (function() {
     var self = {

      ajax: function(url) {
        return $.ajax(url, {
          crossDomain:true, 
          dataType: "json",         
        });
      },

      getLatLng: function(postcode) {
        var promise = $.Deferred();
        var url = "http://api.postcodes.io/postcodes/" + postcode;
        var getPostcode = self.ajax(url);
        getPostcode.success(function(data) {
          var pos = {};
          pos.lat = data.result.latitude;
          pos.lng = data.result.longitude;
          
        });
        return promise;
      },

      transit: {
        distance: function(origin, dest) {
          var directionsService = new google.maps.DirectionsService();

           var request = {
              origin:origin,
              destination:dest,
              travelMode: google.maps.TravelMode.TRANSIT,
              transitOptions: {
                departureTime: new Date(1394441400)
              },
          };
          directionsService.route(request, function(response, status) {
            // console.log(response);
          });


          var key = "AIzaSyB7pQJntosgECglKdaCS7QxSBdY1a97IVo"; // Google Maps API key
          

        }
      }



    };
    return self;
}());

$(function() {
  duration.transit.distance("Sheffield", "Doncaster");
});  
