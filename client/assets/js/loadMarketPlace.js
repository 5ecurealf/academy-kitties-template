
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

// ganache network 
// var frogContractAddress = "0xfF9e3fFeb7a7318D943cb005572e7175043A5BCC"; //change frogContractAddress variable whenever deploying a new froggyContractInstance of the contract
// var marketPlaceContractAddress = "0xb93dAD7B67Da8bAc7C5669c645b8042eF1c89033";


var numberOfFrogs = 0;

var account

$( document ).ready(function() {
    window.ethereum.enable().then(function(accounts){      
        account = accounts[0];
         window.ethereum.on('accountsChanged', function (accounts) {
            // Time to reload your interface with accounts[0]!
            console.log("account set to:",accounts[0])
            account = accounts[0];
        });
        froggyContractInstance = new web3.eth.Contract(abiFrogContract, frogContractAddress);
        marketPlaceContractInstance = new web3.eth.Contract(abiMarketPlaceContract, marketPlaceContractAddress);
        //console.log(froggyContractInstance);
        // Web3 call to get the toto
        marketPlaceContractInstance.methods.getAllTokenOnSale().call({},function(error, txHash){
            if(error){
                console.log(error);
                showSnackBar("Could not load MarketPlace, refresh the page")
            }else{
                console.log("getAllTokenOnSale output:",txHash)
                frogIdArray = txHash
                numberOfFrogs = txHash.length
                createMiniFrogs(numberOfFrogs,frogIdArray)               
            }
        });
        marketPlaceContractInstance.events.MarketTransaction({}, function(error, event){ 
            console.log("MarketTransaction: ",event)
            var string = "";
            string += 'TxType: '
            string+= event.returnValues[0]
            string += ', Owner: '
            string+= event.returnValues[1]
            string += ', TokenId: '
            string+= event.returnValues[2]
            showSnackBar(string);
            setTimeout(function() {location.reload();}, 5000);
        });

    })         

});

async function createMiniFrogs(_numberOfFrogs,frogIdArray){
    var i;
    var item = $(".row")
    for (i = 0; i < _numberOfFrogs; ++i) {
        // createMiniFrog(frogIdArray[i])
        //get the frog DNA and render the frog
         await froggyContractInstance.methods.getFrogDetails(frogIdArray[i]).call({},function(error, txHash){
            if(error){
                console.log(error);
            }else{
                console.log("Frog:"+frogIdArray[i]+" details:",txHash);
                // //format the data
                 var frogDnaString = txHash.genes
                 var frogDna = formatDna(frogDnaString)
                getOfferDetails(frogDna,frogIdArray[i])
                // //render Frog
                // renderMiniFrog(frogDna,frogIdArray[i])
            }
        });
    }  
}
 
async function getOfferDetails(_genes,_frogId){
    await marketPlaceContractInstance.methods.getOffer(_frogId).call({},function(error, txHash){
        if(error){
            console.log(error);
            showSnackBar("Could not locate frog"+_frogId+", refresh the page")
        }else{
            //console.log(txHash);
            console.log("Frog:"+_frogId+" price:",txHash.price)
            var price = toEth(txHash.price)
            // //format the data
            // var frogDnaString = txHash.genes
            // var frogDna = formatDna(frogDnaString)
            //createFrogHtml
            createMiniFrog(_frogId,price)
            // //render Frog
            renderMiniFrog(_genes,_frogId)
        }
    });
}
// function createMiniFrog(id,_price){
//     $(".row").append(
//         $('<label>').append(
//             $('<input type="checkbox" id="scales" value="'+id+'">')
//         ).append(
//             $('<div class="col-{breakpoint}-auto mini frogBox m-2 light-b-shadow radio miniFrog'+id+'" style="padding-right: 65px;">').append(
//                 $(' <div class="frog miniFrog'+id+'">').append(
//                     $(' <div class="frog__head miniFrog'+id+'">').append(
//                         $(' <div class="frog__freckles miniFrog'+id+'">').append(
//                             $('<div class="frog__freckle miniFrog'+id+'" id="freckle1"></div>')
//                         )
//                         .append(
//                             $('<div class="frog__freckle miniFrog'+id+'" id="freckle2"></div>')
//                         )
//                         .append(
//                             $('<div class="frog__freckle miniFrog'+id+'" id="freckle3"></div>')
//                         )

//                     ).append(
//                         $('<div class="frog__warts miniFrog'+id+'">').append(
//                             $('<div class="frog__wart miniFrog'+id+'" id="wart1"></div>')
//                             ,$('<div class="frog__wart miniFrog'+id+'" id="wart2"></div>')
//                         )
//                     )
//                 )
//                 .append(
//                     $('<div class="frog__eye miniFrog'+id+'">').append(
//                         $('<div class="iris miniFrog'+id+'">').append(
//                             $('<div class="reflection1 miniFrog'+id+'"></div>'),
//                             $('<div class="reflection2 miniFrog'+id+'"></div>'),
//                             $('<div class="frog__eyelid miniFrog'+id+'"></div>')
//                         )
//                     )
//                 )
//                 .append(
//                     $('<div class="frog__eye right miniFrog'+id+'">').append(
//                         $('<div class="iris right miniFrog'+id+'">').append(
//                             $('<div class="reflection1 miniFrog'+id+'"></div>'),
//                             $('<div class="reflection2 miniFrog'+id+'"></div>'),
//                             $('<div class="frog__eyelid miniFrog'+id+'"></div>')
//                         )
//                     )
//                 )
//                 .append(
//                     $('<div class="frog__mouth miniFrog'+id+'">').append(
//                         $('<div class="tongue miniFrog'+id+'"></div>')
//                     )
//                 )
//             )
//             .append(
//                 $('<br>')
//             )
//             .append(
//                 $('<div class="dnaDiv miniFrog'+id+'" id="frogDNA">').append(
//                     $('<b>').append(
//                         $('<span>DNA:</span>').append(
//                             $('<span class ="miniFrog'+id+'"id="dnahead"></span>'),
//                             $('<span class ="miniFrog'+id+'"id="dnamouth"></span>'),
//                             $('<span class ="miniFrog'+id+'"id="dnaeyes"></span>'),
//                             $('<span class ="miniFrog'+id+'"id="dnafreckles"></span>'),
//                             $('<span class ="miniFrog'+id+'"id="dnatongue"></span>'),
//                             $('<span class ="miniFrog'+id+'"id="dnaeyeShape"></span>'),
//                             $('<span class ="miniFrog'+id+'"id="dnawartsShape"></span>'),
//                             $('<span class ="miniFrog'+id+'"id="dnawartsColor"></span>'),
//                             $('<span class ="miniFrog'+id+'"id="dnaanimation"></span>'),
//                             $('<span class ="miniFrog'+id+'"id="dnaspecial"></span>')
//                         )
//                     )
//                 ).append(
//                     $('<div>').append(
//                         $('<b>').append(
//                             $('<span id="price'+id+'">Price: '+_price+' ETH</span>')
//                         )
//                     )
//                 )
//             )
//         )
//     );
// }

function createMiniFrog(id,_price){
    var newFrog = 
    `<label>
        <input type="checkbox" id="scales" value="`+id+`">
        <input id="burger" type="checkbox" />
    
        <label for="burger">
            <span></span>
            <span></span>
            <span></span>
        </label>
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
            <div>
                <b>
                    <span id="price`+id+`">Price: `+_price+` ETH</span>
                </b>
            </div>
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

async function buyFrog(_tokenId,_price){
    
    console.log("current account used in the transaction:",account)
    var priceInWei = web3.utils.toWei(_price,'ether')
    await marketPlaceContractInstance.methods.buyFroggy(_tokenId).send({from:account,value:priceInWei},function(error, txHash){
        if(error){
            console.log(error);
            showSnackBar("Could not purchase Frog, please try again")
        }else{
            console.log(txHash);
            window.location.reload();
        }
    });
}

async function removeOffer(){
    var _tokenId = [];
    $.each($("input:checkbox:checked"), function(){
        _tokenId.push($(this).val());
    });
    if(_tokenId.length == 1){
        await marketPlaceContractInstance.methods.removeOffer(_tokenId[0]).send({from:account},function(error, txHash){
            if(error){
                console.log(error);
                showSnackBar("Could not remove offer, Only the seller of frog"+_tokenId[0]+" can remove offer")
            }else{
                console.log(txHash);
            }
        });
    }else{
        alert("Select an offer to remove");
    }
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


function toEth(_priceWei){
    var ETH =  web3.utils.fromWei(_priceWei, 'ether');
    console.log('priceWei: '+_priceWei+' to ETH:'+ETH+'')
    return ETH
}

function toWei(_priceETH){
    var wei =  web3.utils.toWei(_priceETH);
    console.log('priceWei: '+_priceWei+' to ETH:'+ETH+'')
    return ETH
}


   // ------------Modal----------------

     // Get the modal
     var modal = document.getElementById("myModal");
     // Get the <span> element that closes the modal
     var span = document.getElementsByClassName("close")[0];
     // Get the sellButton element that closes the modal
     var sellButton = document.getElementById("sellButton");
     // Get the removeButton element that closes the modal
     var removeButton = document.getElementById("removeButton");
     
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

     removeButton.onclick = function() {
      console.log("removeButton click registered");
        modal.style.display = "none";
        removeOffer();
     }


     //---------------------------------