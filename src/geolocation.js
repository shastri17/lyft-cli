
var sync = require('sync-request')

module.exports = {
    get_coordinates : function(address1, address2, address3){

        var res = sync("GET","https://maps.googleapis.com/maps/api/geocode/json?address="+ address1 + "," + address2 + "," + address3 + "&key=" + "AIzaSyCE6oqj_iJCLXjeK9GPp1a5cQ1Gn2HLrJs",{

        });
        var info = JSON.parse(res.getBody());
        var lat_1 = info["results"][0]["geometry"]["location"]["lat"]
        var lng_1 = info["results"][0]["geometry"]["location"]["lng"]
        var lat = parseFloat(lat_1)
        var lng = parseFloat(lng_1)
        var lat_data = lat;
        var long_data = lng;
        return [lat_data,long_data]


    }
}
