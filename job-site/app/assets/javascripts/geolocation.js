function find_city(element) {
	if (navigator.geolocation) {
     	navigator.geolocation.getCurrentPosition(function(position) {
     		var lat = position.coords.latitude;
   			var lng = position.coords.longitude;
   			var url = "http://uk-postcodes.com/latlng/" + lat + "," + lng + ".json?callback=alertme";
   			console.log(url);
   			$.ajax({
			    url: url,
			    dataType: "jsonp",
			    jsonp: true,
			    type: 'GET',
			    crossDomain: true,
			    success: function(response) {
			        console.log(response.postcode); // server response
			    }
			});
     	}, null);
	} 
}
function alertme(data) {
	console.log(data);
}
find_city();