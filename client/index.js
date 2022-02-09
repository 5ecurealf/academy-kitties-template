// connects us to the Blockchain accesign it throught the web3 variable
// givenProvider passes metamask as a provider 
var web3 = new Web3(Web3.givenProvider); 

// variable to hold the instance of the contract 
var instance; 

var user;

var contractAddress = "0xc54c9029F27f30Af7474332f23D9A2d93434089b"; //change contractAddress variable whenever deploying a new instance of the contract

// use JQuery to check the page has finished loading 
// when it loads, request user to connect to site, and allow us to interact with the blockchain from their account
$(document).ready(function(){
    
        window.ethereum.enable().then(function(accounts){
            instance = new web3.eth.Contract(abi, contractAddress, {from: accounts[0]});
            console.log(instance);
            
        })

        
});

