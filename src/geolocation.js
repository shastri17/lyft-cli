var request = require('request')
var lyft = require('./lyftservice')
module.exports = {
    get_coordinates : function(address1, address2, address3, bearer){
        var data = ""
        var google_payload = {
            url : "https://maps.googleapis.com/maps/api/geocode/json?address="+ address1 + "," + address2 + "," + address3 + "&key=" + "AIzaSyCE6oqj_iJCLXjeK9GPp1a5cQ1Gn2HLrJs"
        }
        function callback1(error, response, body){
            info = JSON.parse(body);
            var lat_1 = info["results"][0]["geometry"]["location"]["lat"]
            var lng_1 = info["results"][0]["geometry"]["location"]["lng"]
            lat = parseFloat(lat_1)
            lng = parseFloat(lng_1)
            lyft.lyftservice(lat,lng, bearer)
          }
        request(google_payload, callback1)
    }
}
