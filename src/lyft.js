#! /usr/bin/env node
'use strict';

/**
 * Adds commas to a number
 * @param {number} number
 * @param {string} locale
 * @return {string}
 */

var request = require('request')
var location = require('./geolocation')
var lyfttime = require('./lyfttimeservice')
var lyftprice= require('./lyftpriceservice')

var access_token = ""
var cmd = process.argv[2]
if(cmd == "time"){
var address = process.argv[3]
var add = address.split(' ').join('+');
var address_list = add.split(",")
}

else if(cmd == 'price'){
    if(process.argv[2] == "-s"){
        if(process.argv[4] == "-e"){
            var start_address = process.argv[4]
            var end_address = process.argv[6]
            var start_add = start_address.split(' ').join('+');
            var end_add = end_address.split(' ').join('+');
            var start_address_list = start_add.split(",")
            var end_address_list = end_add.split(",")
        }
        else {
            console.log("Usage error")
        }
    }
        else {
            console.log("Usage error")
        }
    }

else{
    console.log("Usage error")
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

  var token = oauth2.accessToken.create(result);
  access_token = token["token"]["access_token"]
  var bearer = "Bearer" + " " + access_token

if(cmd == "time"){
var data = location.get_coordinates(address_list[0],address_list[1],address_list[2])
lyfttime.lyftservice(data[0],data[1],bearer)
}
else if(cmd == "price"){
var start_data = location.get_coordinates(start_address_list[0], start_address_list[1], start_address_list[2])
var end_data = location.get_coordinates(end_address_list[0], end_address_list[1], end_address_list[2])


lyftprice.lyftservice(start_data[0],start_data[1],end_data[0],end_data[1],bearer)
}
else{
    console.log("Usage error")
}
});
