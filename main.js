var request = require('request')

latitude = process.argv[2];
longitude = process.argv[3];
var payload = {
    url : 'https://api.uber.com/v1.2/estimates/time' + '?' + 'start_latitude=' + latitude + '&' + 'start_longitude=' + longitude,
    method : 'GET',
    headers : {
        "Authorization" :  "Token m0C0CyBESQDpxEH7X-hg1sTHb3BidaAJRqJqZvH4",
        "Accept-Language": "en_US",
        "Content-Type": "application/json"
    }
}
function callback(error,response,body){
var info = JSON.parse(body);
console.log(info);
}
request(payload,callback);
