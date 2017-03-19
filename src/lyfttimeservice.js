var request = require('request')
var table = require('cli-table')
table = new table({
    head : ["Ride type", "ETA"],
    colWidths : [20,20]
})
module.exports = {
    lyftservice: function(lat,lng, bearer){
        var lyft_payload = {
            url : "https://api.lyft.com/v1/eta?" + "lat=" +lat + "&" + "lng=" + lng,
            headers : {
                'Authorization': bearer
            }
        }
        function callback2(error, response, body){
            info = JSON.parse(body);

            for(i=0;i<info["eta_estimates"].length;i++){
                info["eta_estimates"][i]["eta_seconds"] /= 60
                table.push([info["eta_estimates"][i]["ride_type"],info["eta_estimates"][i]["eta_seconds"] + " mins" ]);
        }
        console.log(table.toString())

        }
        request(lyft_payload, callback2)
    }


}
