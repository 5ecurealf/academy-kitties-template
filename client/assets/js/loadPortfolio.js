
// balance = getBalanceof()
// create balance amount of loops
// getFroggyDetails.dna
// set the dna to a variable to pass to createMiniFrog and render miniFrog
var web3 = new Web3(Web3.givenProvider); 

// variable to hold the froggyContractInstance of the contract 
var froggyContractInstance; 
var marketPlaceContractInstance;

// rinkeby test network 
var frogContractAddress = "0xa6c023E43C608344d291c9d195c362410Ec111C9"; //test network address
var marketPlaceContractAddress = "0xe30689CF5b5e3f7b8dEf666441A13186d19A5EFb";

// var frogContractAddress = "0xfF9e3fFeb7a7318D943cb005572e7175043A5BCC"; //change frogContractAddress variable whenever deploying a new froggyContractInstance of the contract
// var marketPlaceContractAddress = "0xb93dAD7B67Da8bAc7C5669c645b8042eF1c89033";

var numberOfFrogs = 0;

var account;

$( document ).ready(function() {

    window.ethereum.enable().then(function(accounts){
        // Get contract instances to interact with contracts
        froggyContractInstance = new web3.eth.Contract(abiFrogContract, frogContractAddress, {from: accounts[0]});
        marketPlaceContractInstance = new web3.eth.Contract(abiMarketPlaceContract, marketPlaceContractAddress, {from: accounts[0]});
        
        // set the accounts variable 
        account = accounts[0]
        
        // Change the "account" variable when the user changes the current account in their metamask wallet
        window.ethereum.on('accountsChanged', function (accounts) {
            // Time to reload your interface with accounts[0]!
            console.log("account set to:",accounts[0])
            account = accounts[0];
            window.location.reload();
        });

        froggyContractInstance.methods.tokensOfOwner(account).call({},function(error, frogArray){
            if(error){
                console.log(error);
                showSnackBar("Could not locate your portfolio, refresh the page")
            }else{
                console.log("result",frogArray)
                createMiniFrogs(frogArray)               
            }
        });
        
        froggyContractInstance.events.ApprovalForAll({}, function(error, event){ 
            // console.log("ApprovalForAll Event values: ",event.returnValues);
            var string = "";
            string += 'Approved: '
            string+= event.returnValues[0]
            string += ', Operator: '
            string+= event.returnValues[1]
            string += ', Owner: '
            string+= event.returnValues[2]
            showSnackBar(string);
            // setTimeout(function(){location.reload();},2000);
        });
        froggyContractInstance.events.Birth({}, function(error, event){ 
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
            setTimeout(function() {location.reload();}, 5000);
        });
        marketPlaceContractInstance.events.MarketTransaction({}, function(error, event){ 
            var string = "";
            string += 'TxType: '
            string+= event.returnValues[0]
            string += ', Owner: '
            string+= event.returnValues[1]
            string += ', TokenId: '
            string+= event.returnValues[2]
            showSnackBar(string);
        });
        
        //check if website has been set as an operator, and set if not
        isApprovedForAll(account,marketPlaceContractAddress);
    })         

});

async function createMiniFrogs(_frogArray){

    for (var i = 0; i < _frogArray.length; ++i) {
        var frog = _frogArray[i]
        createMiniFrog(frog)
        //get the frog DNA and render the frog
         await froggyContractInstance.methods.getFrogDetails(frog).call({},function(error, txHash){
            if(error){
                //console.log(error);
            }else{
                console.log('Creating frog'+frog,txHash);

                //format the data
                var frogDnaString = txHash.genes
                var frogDna = formatDna(frogDnaString)
                console.log('frog'+frog+'dna',frogDna);
                //render Frog
                renderMiniFrog(frogDna,_frogArray[i])
            }
        });
    }  
}

function createMiniFrog(id){
    var newFrog = 
    `<label>
    <input type="checkbox" id="scales" value="`+id+`">
    <div class="col-{breakpoint}-auto mini frogBox m-2 light-b-shadow radio miniFrog`+id+`" style="padding-right: 65px;">
        <div class="frog miniFrog`+id+`">
            <div class="frog__head miniFrog`+id+`" style="background: rgb(140, 177, 117);">
                <div class="frog__freckles miniFrog`+id+`">
                    <div class="frog__freckle miniFrog`+id+`" id="freckle1" style="background: rgb(63, 17, 116);"></div>
                <div class="frog__freckle miniFrog`+id+`" id="freckle2" style="background: rgb(63, 17, 116);"></div>
                <div class="frog__freckle miniFrog`+id+`" id="freckle3" style="background: rgb(63, 17, 116);"></div>
            </div>
            <div class="frog__warts miniFrog`+id+`">
                <div class="frog__wart miniFrog`+id+`" id="wart1" style="height: 0px; width: 10px; top: 12px;"></div>
                <div class="frog__wart miniFrog`+id+`" id="wart2" style="height: 0px; width: 10px;"></div>
            </div>
        </div>
        <div class="frog__eye miniFrog`+id+`" style="background: rgb(130, 40, 108); height: 80px; width: 80px; left: 64px;">
            <div class="iris miniFrog`+id+`" style="height: 75px; width: 75px;">
                <div class="reflection1 miniFrog`+id+`"></div>
                <div class="reflection2 miniFrog`+id+`"></div>
                <div class="frog__eyelid miniFrog`+id+`" style="background: rgb(130, 40, 108);"></div>
            </div>
        </div>
        <div class="frog__eye right miniFrog`+id+`" style="background: rgb(130, 40, 108); height: 80px; width: 80px; left: 64px;">
            <div class="iris right miniFrog`+id+`" style="height: 75px; width: 75px;">
                <div class="reflection1 miniFrog`+id+`"></div>
                <div class="reflection2 miniFrog`+id+`"></div>
                <div class="frog__eyelid miniFrog`+id+`" style="background: rgb(130, 40, 108);"></div>
            </div>
        </div>
        <div class="frog__mouth miniFrog`+id+`" style="background: rgb(181, 4, 75);">
            <div class="tongue miniFrog`+id+` lick" style="height: 70%; width: 47%;"></div>
        </div>
    </div>
    <br>
    <div class="dnaDiv miniFrog`+id+`" id="frogDNA">
        <b>
            <span>
                DNA:
                <span class="miniFrog`+id+`" id="dnahead">37</span>
                <span class="miniFrog`+id+`" id="dnamouth">16</span>
                <span class="miniFrog`+id+`" id="dnaeyes">83</span>
                <span class="miniFrog`+id+`" id="dnafreckles">11</span>
                <span class="miniFrog`+id+`" id="dnatongue">2</span>
                <span class="miniFrog`+id+`" id="dnaeyeShape">2</span>
                <span class="miniFrog`+id+`" id="dnawartsShape">1</span>
                <span class="miniFrog`+id+`" id="dnawartsColor">50</span>
                <span class="miniFrog`+id+`" id="dnaanimation">3</span>
                <span class="miniFrog`+id+`" id="dnaspecial">10</span>
            </span>
        </b>
    </div>
    
    </div>
</label>`
    $(".row").append(newFrog)
}

function renderMiniFrog(dna,id){
    miniHeadColor(colors[dna.headColor],dna.headColor,id)
    miniMouthColor(colors[dna.mouthColor],dna.mouthColor,id)
    miniEyesColor(colors[dna.eyesColor],dna.eyesColor,id)
    miniFrecklesColor(colors[dna.freckleColor],dna.freckleColor,id)
    miniWartColor(colors[dna.wartColor],dna.wartColor,id)
    miniTongueVariation(dna.tongueShape,id)
    miniEyeVariation(dna.eyeShape,id)
    miniWartVariation(dna.wartsShape,id)
    miniAnimationSelection(dna.animation,id)
    miniSpecialNumber(dna.lastNum,id)
}

function formatDna(_dna){
	return {
    "headColor" : _dna.slice(0,2), //range 10-100
    "mouthColor" : _dna.slice(2,4),//range 10-100
    "eyesColor" : _dna.slice(4,6),//range 10-100
    "freckleColor" : _dna.slice(6,8), //range 10-100
    //attributes
    "tongueShape" : _dna.slice(8,9), //range 1-4
    "eyeShape" : _dna.slice(9,10), //range 1-3
    "wartsShape" : _dna.slice(10,11), //range 1-3
    "wartColor" : _dna.slice(11,13), //range 10-100
    "animation" : _dna.slice(13,14), //range 1-4
    "lastNum" :   _dna.slice(14,16)//range 1-10
	}
}

async function breedFrog(f1,f2){
    var dna = getDna();
    await froggyContractInstance.methods.breed(f1,f2).send({},function(error, txHash){
        if(error){
            console.log(error);
            showSnackBar("Could not breed Frogs")
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

async function setOffer(_price){
    console.log("_price:",_price)
    var _tokenId = [];
    $.each($("input:checkbox:checked"), function(){
        _tokenId.push($(this).val());
    });
    if(_tokenId.length == 1){
        await marketPlaceContractInstance.methods.setOffer(_price,_tokenId[0]).send({},function(error, txHash){
            if(error){
                console.log(error);
                showSnackBar("Error: An offer already exists or MarketPlace is not set up as an operator")
            }else{
                console.log(txHash);
            }
        });
    }else{
        alert("Select a maximum of 1 Frog to sell");
    }
}

async function setApprovalForAll(){
    console.log("setApprovalForAll() invoked")
    await froggyContractInstance.methods.setApprovalForAll(marketPlaceContractAddress,true).send({from:account},function(error, txHash){
        if(error){
            console.log(error);
            showSnackBar("Could not set MarketPlace as an operator")
        }else{
            console.log("setApprovalForAll txHash: ",txHash);
        }
    });
}

async function isApprovedForAll(_owner,_operator,callback){
    console.log("isApprovedForAll invoked");
    await froggyContractInstance.methods.isApprovedForAll(_owner,_operator).call({from:account},function(error, approved){
        if(error){
            console.log(error);
        }else{
            console.log("Marketplace contract approved?:",approved);
            // console.log('typeof approved',typeof approved);
            // return approved;
            if(!approved){
                setApprovalForAll()
            }
            
        }
    });
}

// ------------Modal----------------

    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
    
    var sellButton = document.getElementById("sellButton");
        
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
    modal.style.display = "none";
    }
    
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
    }
    
    sellButton.onclick = function() {
    console.log("sellButton click registered");
    var x = document.getElementById("priceWei").value;
    modal.style.display = "none";
    setOffer(x);
    }