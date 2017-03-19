
var table = require('cli-table');
var table = new table({
    head: ['Ride type', 'ETA']
  , colWidths: [20, 20]
});
access_token = ""
cmd = process.argv[2]
if(cmd == "time"){
address = process.argv[3]
var add = address.split(' ').join('+');
var address_list = add.split(",")
}
var lyft = function(lat,lng){
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
        table.push(
            [info["eta_estimates"][i]["ride_type"],info["eta_estimates"][i]["eta_seconds"] + " mins" ]
          );
      }
      console.log(table.toString())
    }
    request(lyft_payload, callback2)
}
const credentials = {
  client: {
    id: '6IdErdHhxMxx',
    secret: 'N_kv_hG6yhltdK_lu9WSnT135LbcG0wX'
  },
  auth: {
    tokenHost: 'https://api.lyft.com/oauth/token'
  }
};

// Initialize the OAuth2 Library
const oauth2 = require('simple-oauth2').create(credentials);
const tokenConfig = {};

// Callbacks
// Get the access token object for the client
oauth2.clientCredentials.getToken(tokenConfig, (error, result) => {
  if (error) {
    return console.log('Access Token Error', error.message);
  }

  token = oauth2.accessToken.create(result);
  access_token = token["token"]["access_token"]
  bearer = "Bearer" + " " + access_token
if(cmd = "time"){
    var lat=""
    var lng = ""
    var google_payload = {
        url : "https://maps.googleapis.com/maps/api/geocode/json?address="+ address_list[0] + "," + address_list[1] + "," + address_list[2] + "&key=" + "AIzaSyCE6oqj_iJCLXjeK9GPp1a5cQ1Gn2HLrJs"
    }
    function callback1(error, response, body){
        info = JSON.parse(body);
        var lat_1 = info["results"][0]["geometry"]["location"]["lat"]
        var lng_1 = info["results"][0]["geometry"]["location"]["lng"]
        lat = parseFloat(lat_1)
        lng = parseFloat(lng_1)
            lyft(lat,lng)
      }
    request(google_payload, callback1)
}
});


