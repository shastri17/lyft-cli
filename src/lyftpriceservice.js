var request = require('request')
var table = require('cli-table')
table = new table({
    head : ["Ride type", "Avg.Price","Distance","Time","Primetime %"],
    colWidths : [20,20,20,20,20]
})
module.exports = {
    lyftservice: function(start_lat,start_lng,end_lat,end_lng, bearer){
        var lyft_payload = {
            url : "https://api.lyft.com/v1/cost?" + "start_lat=" +start_lat + "&" + "start_lng=" + start_lng + "&&end_lat=" +end_lat+"&end_lng=" + end_lng ,
            headers : {
                'Authorization': bearer
            }
        }
        function callback2(error, response, body){
            info = JSON.parse(body);
            for(i=0;i<info["cost_estimates"].length;i++){
                info["cost_estimates"][i]["estimated_duration_seconds"] /= 60
                var time = Math.ceil(info["cost_estimates"][i]["estimated_duration_seconds"])
                info["cost_estimates"][i]["estimated_cost_avg"]  = (info["cost_estimates"][i]["estimated_cost_cents_max"]/100 + info["cost_estimates"][i]["estimated_cost_cents_min"]/100)/2
                table.push([info["cost_estimates"][i]["ride_type"],"$"+info["cost_estimates"][i]["estimated_cost_avg"],info["cost_estimates"][i]["estimated_distance_miles"]+" miles",time + " mins", info["cost_estimates"][i]["primetime_percentage"]]);
        }
        console.log(table.toString())

        }
        request(lyft_payload, callback2)
    }


}
