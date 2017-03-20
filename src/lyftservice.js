var request = require('request')
var table = require('cli-table')
var helper = require('./helper')
time_table = new table({
    head: [
        "Ride type", "ETA"
    ],
    colWidths: [15, 15]
})
price_table = new table({
    head: [
        "Ride type", "Avg.Price", "Distance", "Time", "Primetime %"
    ],
    colWidths: [15, 15, 15, 15, 15]
})
module.exports = {
    lyfttimeservice: function(lat, lng, bearer) {
        var lyft_payload = {
            url: "https://api.lyft.com/v1/eta?" + "lat=" + lat + "&" + "lng=" + lng,
            headers: {
                'Authorization': bearer
            }
        }
        function callback(error, response, body) {
            if(error){
                helper.printMessage("timeerror")
            }
            else{
            var info = JSON.parse(body);
            for (var i = 0; i < info["eta_estimates"].length; i++) {
                info["eta_estimates"][i]["eta_seconds"] /= 60
                time_table.push([info["eta_estimates"][i]["ride_type"],
                    info["eta_estimates"][i]["eta_seconds"] + " mins"
                ]);
            }
            console.log(time_table.toString())
        }

        }
        request(lyft_payload, callback)
    },
    lyftpriceservice: function(start_lat, start_lng, end_lat, end_lng, bearer) {
        var lyft_payload = {
            url: "https://api.lyft.com/v1/cost?" + "start_lat=" + start_lat + "&" + "start_lng=" + start_lng + "&&end_lat=" + end_lat + "&end_lng=" + end_lng,
            headers: {
                'Authorization': bearer
            }
        }
        function callback(error, response, body) {
            if(error){
                helper.printMessage("priceerror")
            }
            else{
            var info = JSON.parse(body);
            for (var i = 0; i < info["cost_estimates"].length; i++) {
                info["cost_estimates"][i]["estimated_duration_seconds"] /= 60
                var time = Math.ceil(info["cost_estimates"][i]["estimated_duration_seconds"])
                info["cost_estimates"][i]["estimated_cost_avg"] = ((info["cost_estimates"][i]["estimated_cost_cents_max"] / 100 + info["cost_estimates"][i]["estimated_cost_cents_min"] / 100) / 2).toFixed(2);
                price_table.push([info["cost_estimates"][i]["ride_type"],
                    "$" + info["cost_estimates"][i]["estimated_cost_avg"],
                    info["cost_estimates"][i]["estimated_distance_miles"] + " miles",
                    time + " mins",
                    info["cost_estimates"][i]["primetime_percentage"]
                ]);
            }
            console.log(price_table.toString())
}
        }
        request(lyft_payload, callback)
    }

}
