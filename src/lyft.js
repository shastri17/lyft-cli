#!/usr/bin/env node

'use strict';

/**
 * Adds commas to a number
 * @param {number} number
 * @param {string} locale
 * @return {string}
 */

var request = require('request')
var location = require('./geolocation')
var lyft = require('./lyftservice')
var helper = require('./helper')
var cmd = process.argv[2]
const credentials = {
    client: {
        id: '6IdErdHhxMxx',
        secret: 'N_kv_hG6yhltdK_lu9WSnT135LbcG0wX'
    },
    auth: {
        tokenHost: 'https://api.lyft.com/oauth/token'
    }
};

const oauth2 = require('simple-oauth2').create(credentials);
const tokenConfig = {};

oauth2.clientCredentials.getToken(tokenConfig, (error, result) => {
    if (error) {
        return console.log('Access Token Error', error.message);
    }

    var token = oauth2.accessToken.create(result);
    var access_token = token["token"]["access_token"];
    var bearer = "Bearer " + access_token;
    if (cmd == "time") {
        var address = process.argv[3]
        if (address == null)
            helper.printMessage("notimeaddress")
        else {
            var add = address.split(' ').join('+');
            var address_list = add.split(",")
            var data = location.get_coordinates(address_list[0], address_list[1], address_list[2])
            if(data != null)
            lyft.lyfttimeservice(data[0], data[1], bearer)
        }
    } else if (cmd == "price") {
        if (process.argv[3] != "-s")
            helper.printMessage("no-s")
        else{
            var start_address = process.argv[4]
            if (start_address == '-e')
                helper.printMessage("nostartaddress")
            else{
            var start_add = start_address.split(' ').join('+');
            var start_address_list = start_add.split(",")
            var start_data = location.get_coordinates(start_address_list[0], start_address_list[1], start_address_list[2])
        }
    }
        if (process.argv[5] != "-e")
            helper.printMessage("no-e")
            else{
        var end_address = process.argv[6]
        if (end_address == null)
            helper.printMessage("noendaddress")
        else {

            var end_add = end_address.split(' ').join('+');

            var end_address_list = end_add.split(",")

            var end_data = location.get_coordinates(end_address_list[0], end_address_list[1], end_address_list[2])
            if(start_data && end_data != null)
            lyft.lyftpriceservice(start_data[0], start_data[1], end_data[0], end_data[1], bearer)
        }
    }
    } else if (cmd == "--help") {
        helper.printMessage("help")
    } else if (!cmd) {
        helper.printMessage("noparameter")
    } else {
        helper.printMessage("invalidparameter")
    }

});
