
window.addEventListener('load', function() {
// Checking if Web3 has been injected by the browser (Mist/MetaMask)
    hideMenu()
    if (typeof web3 == 'undefined') {
        showSnackBar("Install Metamask to use this website")
    }else{
        web3 = new Web3(web3.currentProvider);
        web3.eth.getAccounts(function(err, accounts){
            if (err != null) console.error("An error occurred: "+err);
            else if (accounts.length == 0) {console.log("User is not logged in to MetaMask");}
            else {
                console.log("User is logged in to MetaMask");
                showMenu()
            }
        })
    }
    

})

function connectWallet(){
    window.ethereum.enable().then(function(){
        showMenu()
    })
}

function showSnackBar(_string) {
    // Get the snackbar DIV and change the string to _string argument
    $('#snackbar').html(_string) 
    var x = document.getElementById("snackbar");
    // Add the "show" class to DIV
    x.className = "show";
  }

function showMenu(){
      // Select the element with id "theDIV"
  var x = document.getElementById("burgerLabel");
  
  // If selected element is hidden
  if (x.style.display === "none") {
    // Show the hidden element
    x.style.display = "block";
  }
}

function hideMenu(){
    var x = document.getElementById("burgerLabel");
    x.style.display = "none";
}
