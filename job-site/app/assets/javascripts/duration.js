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
          var promise = $.Deferred();
          var directionsService = new google.maps.DirectionsService();

           var request = {
              origin:origin,
              destination:dest,
              travelMode: google.maps.TravelMode.TRANSIT,
              transitOptions: {
                departureTime: new Date(1337675679473)
              },
          };
          directionsService.route(request, function(response, status) {
            console.log(response);
            if (response.routes.length > 0) {
              var arrival_time = new Date(response.routes[0].legs[0].arrival_time.value);
              var departure_time = new Date(response.routes[0].legs[0].departure_time.value);
              var dif = (arrival_time.getTime() - departure_time.getTime()) / 1000;
              
              var hours = parseInt(dif / 3600 ) % 24;
              var minutes = parseInt(dif / 60 ) % 60;
              var seconds = dif % 60;

              var time = (hours !== 0 ? hours + " hours" : "") + " " + (minutes !== 0 ? minutes + " minutes" : "") + " " + (seconds !== 0 ? seconds + " seconds" : "");  
              promise.resolve(time);
            }    
          });


          var key = "AIzaSyB7pQJntosgECglKdaCS7QxSBdY1a97IVo"; // Google Maps API key
          
          return promise;
        }
      },
      getURLParameter: function(name) {
        return decodeURI(
          (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
        );
      },
      calculateTime: function() {
        var home = this.getURLParameter("home");
        var location = this.getURLParameter("location");
        if (home !== null && location !== null) {
           var time = duration.transit.distance(home, location);
           time.then(function(time) {
            console.log(time);
           });
        }
      }



    };
    return self;
}());

// This is so ugly
var ready_called = 0;
function ready() {
  if (ready_called == 0) {
    duration.calculateTime();
    ready_called = 1;
  }
} 
$(document).ready(ready);