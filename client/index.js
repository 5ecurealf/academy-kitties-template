// connects us to the Blockchain accesign it throught the web3 variable
// givenProvider passes metamask as a provider 
var web3 = new Web3(Web3.givenProvider); 

// variable to hold the instance of the contract 
var instance; 

var user;

var contractAddress = "0xB02cE0774335aFe9F60Ad9ba6dCd6373f83Aa69c"; //change contractAddress variable whenever deploying a new instance of the contract

// use JQuery to check the page has finished loading 
// when it loads, request user to connect to site, and allow us to interact with the blockchain from their account
$(document).ready(function(){
    
        window.ethereum.enable().then(function(accounts){
            instance = new web3.eth.Contract(abiFrogContract, contractAddress, {from: accounts[0]});
            console.log(instance);

            // instance.methods.createFrogGen0(1).send({},function(error, txHash){
            //     if(error){
            //         console.log(error);
            //     }else{
            //         console.log(txHash);
            //     }
            // });

            instance.events.Birth({}, function(error, event){ 
                // console.log('event.returnValues');
                // console.log(event.returnValues);
                var string = "";
                string += 'Owner: '
                string+= event.returnValues[0]
                string += ', tokenId: '
                string+= event.returnValues[1]
                string += ', mum: '
                string+= event.returnValues[2]
                string += ', dad: '
                string+= event.returnValues[3]
                string += ', genes: '
                string+= event.returnValues[4]
                // console.log('string');
                // console.log(string);

                showSnackBar(string);
             });
            
             setApprovalForAll()
        })

         
});

function createFrog(){
    var dna = getDna();
    console.log('creatFrog{getDna() returns}',dna);
    instance.methods.createFrogGen0(dna).send({},function(error, txHash){
        if(error){
            console.log(error);
        }else{
            console.log(txHash);
        }
    });
}

function setApprovalForAll(){
    instance.methods.setApprovalForAll('0x596b7E83B97fcf7c62Aa3F09e1201201B7546D46',true).send({},function(error, txHash){
        if(error){
            console.log(error);
        }else{
            console.log(txHash);
        }
    });
}

function showSnackBar(_string) {
    // Get the snackbar DIV
    $('#snackbar').html(_string) 
    var x = document.getElementById("snackbar");
    // Add the "show" class to DIV
    x.className = "show";
    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 5000);
  }

