# $ ->
# 	getOptions = (places) -> 
# 		out = ""
# 		for place in places
# 			out += "<option>" + place + "</option>"
# 		out

# 	getPlacesNear = (place) ->
# 		$.ajax({
# 			type: "GET",
# 			dataType: "json",
# 			url: "http://api.geonames.org/citiesJSON",
# 			data: "username=jubjubbird01&"	
# 		})
# 	$('#location-select').html(getOptions(getPlacesNear("London")));


# var getPlacesNear;
# $(function() {
#   var getOptions, out, place, _i, _len;
#   getOptions = function(places) {};
#   out = "";
#   for (_i = 0, _len = places.length; _i < _len; _i++) {
#     place = places[_i];
#     out += "<option>" + place + "</option>";
#   }
#   return out;
# });
# getPlacesNear = function(place) {
#   return ["Cardiff", "Glasgow", "Here Be Dragons"];
# };
# $('#location-select').html(getOptions(getPlacesNear("London")));