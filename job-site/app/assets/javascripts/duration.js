 var duration = (function() {
     var self = {

      ajax: function(url) {
        return $.ajax(url, {
          crossDomain:true, 
          dataType: "jsonp",         
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



    };
    return self;
}());

$(function() {
  duration.getLatLng("s64 0QQ");
});  
