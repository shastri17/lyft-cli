var request = require('request')
var location = require('./geolocation')
access_token = ""
cmd = process.argv[2]
if(cmd == "time"){
address = process.argv[3]
var add = address.split(' ').join('+');
var address_list = add.split(",")
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
location.get_coordinates(address_list[0],address_list[1],address_list[2],bearer)
}
});
