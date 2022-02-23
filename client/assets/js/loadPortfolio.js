
// balance = getBalanceof()
// create balance amount of loops
// getFroggyDetails.dna
// set the dna to a variable to pass to createMiniFrog and render miniFrog
var web3 = new Web3(Web3.givenProvider); 

// variable to hold the instance of the contract 
var instance; 

var user;

var contractAddress = "0xF184cE5bE38db02c82ff9516A126a98de4a45C13"; //change contractAddress variable whenever deploying a new instance of the contract

var numberOfFrogs = 0;

$( document ).ready(function() {

    window.ethereum.enable().then(function(accounts){
        instance = new web3.eth.Contract(abi, contractAddress, {from: accounts[0]});
        //console.log(instance);
        // Web3 call to get the toto
        instance.methods.balanceOf(accounts[0]).call({},function(error, txHash){
            if(error){
                console.log(error);
            }else{
                numberOfFrogs = Number(txHash)
                //console.log(numberOfFrogs);
                createMiniFrogs(numberOfFrogs)               
            }
        });

        instance.events.Birth({}, function(error, event){ 
            setTimeout(function(){location.reload();},2000);
         });

    })         

});

async function createMiniFrogs(_numberOfFrogs){
    var i;
    var item = $(".row")
    for (i = 0; i < _numberOfFrogs; ++i) {
        createMiniFrog(i)
        //get the frog DNA and render the frog
         await instance.methods.getFrogDetails(i).call({},function(error, txHash){
            if(error){
                //console.log(error);
            }else{
                console.log(txHash);
                // console.log('typeof txhash',typeof txHash);
                // console.log(txHash.genes);
                // console.log('typeof txhash.genes',typeof txHash.genes);

                // frogObjects.push(txHash);
                // console.log('frogObjects[i].genes:',frogObjects[i].genes);
                // var frogDnaString = frogObjects[i].genes

                //format the data
                var frogDnaString = txHash.genes
                var frogDna = formatDna(frogDnaString)
                // console.log('frogDnaString:',frogDnaString)
                // console.log('frogDna:',frogDna)

                //render Frog
                //createMiniFrog(i)
                renderMiniFrog(frogDna,i)
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
    "lastNum" :   _dna.slice(14,15)//range 1-10
	}
}


$(".breedFrogButton").click(function(){
    var frogIndexes = [];
    $.each($("input:checkbox:checked"), function(){
        frogIndexes.push($(this).val());
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
    await instance.methods.breed(f1,f2).send({},function(error, txHash){
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

