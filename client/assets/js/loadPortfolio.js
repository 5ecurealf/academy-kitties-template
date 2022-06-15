
// balance = getBalanceof()
// create balance amount of loops
// getFroggyDetails.dna
// set the dna to a variable to pass to createMiniFrog and render miniFrog
var web3 = new Web3(Web3.givenProvider); 

// variable to hold the froggyContractInstance of the contract 
var froggyContractInstance; 
var marketPlaceContractInstance;

var user;
// Rinkeby test network 
// var frogContractAddress = "0x6207497730b1a78ae633D7f0b262ab53457c6644"; //change frogContractAddress variable whenever deploying a new froggyContractInstance of the contract
// var marketPlaceContractAddress = "0xB4f5E28DADD79fC11ee27A7b96CCaE3408985B0d";
// 
var frogContractAddress = "0x284c39b91324d3447Eb8C47AbD2c9e588Dba2312"; //change frogContractAddress variable whenever deploying a new froggyContractInstance of the contract
var marketPlaceContractAddress = "0x8d96Ae79465C2dF25f381B218a574584C0fa845A";

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
            }else{
                console.log("result",frogArray)
                createMiniFrogs(frogArray)               
            }
        });

        froggyContractInstance.events.Birth({}, function(error, event){ 
            // setTimeout(function(){location.reload();},2000);
         });

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
    $(".row").append(
        $('<label>').append(
            $('<input type="checkbox" id="scales" value="'+id+'">')
        ).append(
            $('<div class="col-{breakpoint}-auto mini catBox m-2 light-b-shadow radio miniFrog'+id+'" style="padding-right: 65px;">').append(
                $(' <div class="frog miniFrog'+id+'">').append(
                    $(' <div class="frog__head miniFrog'+id+'">').append(
                        $(' <div class="frog__freckles miniFrog'+id+'">').append(
                            $('<div class="frog__freckle miniFrog'+id+'" id="freckle1"></div>')
                        )
                        .append(
                            $('<div class="frog__freckle miniFrog'+id+'" id="freckle2"></div>')
                        )
                        .append(
                            $('<div class="frog__freckle miniFrog'+id+'" id="freckle3"></div>')
                        )

                    ).append(
                        $('<div class="frog__warts miniFrog'+id+'">').append(
                            $('<div class="frog__wart miniFrog'+id+'" id="wart1"></div>')
                            ,$('<div class="frog__wart miniFrog'+id+'" id="wart2"></div>')
                        )
                    )
                )
                .append(
                    $('<div class="frog__eye miniFrog'+id+'">').append(
                        $('<div class="iris miniFrog'+id+'">').append(
                            $('<div class="reflection1 miniFrog'+id+'"></div>'),
                            $('<div class="reflection2 miniFrog'+id+'"></div>'),
                            $('<div class="frog__eyelid miniFrog'+id+'"></div>')
                        )
                    )
                )
                .append(
                    $('<div class="frog__eye right miniFrog'+id+'">').append(
                        $('<div class="iris right miniFrog'+id+'">').append(
                            $('<div class="reflection1 miniFrog'+id+'"></div>'),
                            $('<div class="reflection2 miniFrog'+id+'"></div>'),
                            $('<div class="frog__eyelid miniFrog'+id+'"></div>')
                        )
                    )
                )
                .append(
                    $('<div class="frog__mouth miniFrog'+id+'">').append(
                        $('<div class="tongue miniFrog'+id+'"></div>')
                    )
                )
            )
            .append(
                $('<br>')
            )
            .append(
                $('<div class="dnaDiv miniFrog'+id+'" id="catDNA">').append(
                    $('<b>').append(
                        $('<span>DNA:</span>').append(
                            $('<span class ="miniFrog'+id+'"id="dnahead"></span>'),
                            $('<span class ="miniFrog'+id+'"id="dnamouth"></span>'),
                            $('<span class ="miniFrog'+id+'"id="dnaeyes"></span>'),
                            $('<span class ="miniFrog'+id+'"id="dnafreckles"></span>'),
                            $('<span class ="miniFrog'+id+'"id="dnatongue"></span>'),
                            $('<span class ="miniFrog'+id+'"id="dnaeyeShape"></span>'),
                            $('<span class ="miniFrog'+id+'"id="dnawartsShape"></span>'),
                            $('<span class ="miniFrog'+id+'"id="dnawartsColor"></span>'),
                            $('<span class ="miniFrog'+id+'"id="dnaanimation"></span>'),
                            $('<span class ="miniFrog'+id+'"id="dnaspecial"></span>')
                        )
                    )
                )
            )
        )
    );
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


$(".breedFrogButton").click(function(){
    var frogIndexes = [];
    $.each($("input:checkbox:checked"), function(){
        frogIndexes.push($(this).val());
        //console.log('typeof frogIndexes[0]',typeof frogIndexes[0]);
    });
    if(frogIndexes.length == 2){
        breedFrog(frogIndexes[0],frogIndexes[1])
        //setTimeout(function(){location.reload();}, 10000);
    }else{
        alert("You need to select 2 Frogs to breed");
    }
    
    
    
});

async function breedFrog(f1,f2){
    var dna = getDna();
    await froggyContractInstance.methods.breed(f1,f2).send({},function(error, txHash){
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
    // setTimeout(function(){ x.className = x.className.replace("show", ""); }, 5000);
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
    await froggyContractInstance.methods.setApprovalForAll(marketPlaceContractAddress,true).send({},function(error, txHash){
        if(error){
            console.log(error);
        }else{
            console.log(txHash);
        }
    });
}

async function isApprovedForAll(_owner,_operator,callback){
    console.log("isApprovedForAll invoked");
    await froggyContractInstance.methods.isApprovedForAll(_owner,_operator).call({},function(error, approved){
        if(error){
            console.log(error);
        }else{
            console.log("Marketplace contract approved?:",approved);
            console.log('typeof approved',typeof approved);
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

     // Get the button that opens the modal
     var btn = document.getElementById("myBtn");
     
     // Get the <span> element that closes the modal
     var span = document.getElementsByClassName("close")[0];
     
     var sellButton = document.getElementById("sellButton");
     
     var removeButton = document.getElementById("removeButton");
     // When the user clicks the button, open the modal 
     btn.onclick = function() {
       modal.style.display = "block";
     }
     
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