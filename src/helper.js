module.exports = {
    printMessage : function(flag){
        if(flag == 'notimeaddress'){
            console.log("Usage error : `lyft time` command requires an address. Use `lyft --help` for more info.")
        }
        else if(flag == 'no-s'){
            console.log("Usage error : `lyft price` command requires -s to specify starting address. Use `lyft --help` for more info.")
        }
        else if(flag == 'no-e'){
            console.log("Usage error : `lyft price` command requires -e to specify destination address. Use `lyft --help` for more info.")
        }
        else if(flag == 'nostartaddress'){
            console.log("Usage error : `lyft price` command requires a starting address. Use `lyft --help` for more info.")
        }
        else if(flag == 'noendaddress'){
            console.log("Usage error : `lyft price` command requires a destination address. Use `lyft --help` for more info.")
        }
        else if(flag == 'invalidparameter'){
            console.log("Usage error : Command not available. Use `lyft --help` for more info.")
        }
        else if(flag == 'noparameter'){
            console.log("Usage error : `lyft` needs a command. Use `lyft --help` for more info.")
        }
        else if(flag == 'help'){
            console.log("Usage : For ETA of nearby lyfts use `lyft time 'address'`\n\nFor pricing of nearby lyfts use `lyft price -s 'starting address' -e 'destination address'`\n\nAddress format : <House number and street name, Name of town, State abbreviation, Country(optional if US)> \n\nExample : '25 first street, Cambridge, MA, US'")
        }
        else if(flag == 'invalidaddress'){
            console.log("Usage error : `lyft` needs a valid address. Use `lyft --help` for more info.")
        }
        else if(flag == 'timeerror' || flag == 'priceerror'){
            console.log("Retrieval error : `lyft` is currently unable to fetch data.")
        }
    }
}
