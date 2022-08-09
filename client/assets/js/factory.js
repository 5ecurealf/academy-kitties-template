// connects us to the Blockchain accesign it throught the web3 variable
// givenProvider passes metamask as a provider 
var web3 = new Web3(Web3.givenProvider); 

// variable to hold the instance of the contract 
var instance; 

var user;

var frogContractAddress = "0xa6c023E43C608344d291c9d195c362410Ec111C9"; //2nd deployment to test network 
// var frogContractAddress = "0x282c870aA2FD6fE5fA3e616e0bE7C45A8071fd81"; //change frogContractAddress variable whenever deploying a new froggyContractInstance of the contract


// use JQuery to check the page has finished loading 
// when it loads, request user to connect to site, and allow us to interact with the blockchain from their account
$(document).ready(function(){
    
    window.ethereum.enable().then(function(accounts){
        instance = new web3.eth.Contract(abiFrogContract, frogContractAddress, {from: accounts[0]});
        console.log(instance);

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
        
        //  setApprovalForAll()
    })

         
});

async function createFrog(){
    var dna = getDna();
    console.log('creatFrog{getDna() returns:}',dna);
    await instance.methods.createFrogGen0(dna).send({},function(error, txHash){
        if(error){
            console.log(error);
        }else{
            console.log(txHash);
        }
    });
}

// function setApprovalForAll(){
//     instance.methods.setApprovalForAll('0x8DBA9f8724e21Cc9Ce61dCC079808E330814496A',true).send({},function(error, txHash){
//         if(error){
//             console.log(error);
//         }else{
//             console.log(txHash);
//         }
//     });
// }

function showSnackBar(_string) {
    // Get the snackbar DIV and change the string to _string argument
    $('#snackbar').html(_string) 
    var x = document.getElementById("snackbar");
    // Add the "show" class to DIV
    x.className = "show";
    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 5000);
  }

