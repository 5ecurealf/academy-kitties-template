
// balance = getBalanceof()
// create balance amount of loops
// getFroggyDetails.dna
// set the dna to a variable to pass to createMiniFrog and render miniFrog
var web3 = new Web3(Web3.givenProvider); 

// variable to hold the instance of the contract 
var instance; 

var user;

var contractAddress = "0x48A5087FaDa74F40D1AeD4CF769919344Bc9CFD0"; //change contractAddress variable whenever deploying a new instance of the contract

var numberOfFrogs = 0;

$( document ).ready(function() {

    window.ethereum.enable().then(function(accounts){
        instance = new web3.eth.Contract(abi, contractAddress, {from: accounts[0]});
        console.log(instance);

        instance.methods.totalSupply().call({},function(error, txHash){
            if(error){
                console.log(error);
            }else{
                numberOfFrogs = Number(txHash)
                console.log(numberOfFrogs);
                createMiniFrogs(numberOfFrogs)
            }
        });


 
        
    })         

});

function createMiniFrog(id){
    $(".row").append(
        $('<label>').append(
            $('<input type="checkbox" id="scales" name="scales">')
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
                            $('<span class ="miniFrog'+id+'"id="dnahead">1</span>'),
                            $('<span class ="miniFrog'+id+'"id="dnamouth">2</span>'),
                            $('<span class ="miniFrog'+id+'"id="dnaeyes">3</span>'),
                            $('<span class ="miniFrog'+id+'"id="dnafreckles">1</span>'),
                            $('<span class ="miniFrog'+id+'"id="dnatongue">2</span>'),
                            $('<span class ="miniFrog'+id+'"id="dnaeyeShape">3</span>'),
                            $('<span class ="miniFrog'+id+'"id="dnawartShape">1</span>'),
                            $('<span class ="miniFrog'+id+'"id="dnawartsColor">2</span>'),
                            $('<span class ="miniFrog'+id+'"id="dnaanimation">3</span>'),
                            $('<span class ="miniFrog'+id+'"id="dnaspecial">1</span>')
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
    animationSelection(dna.animation,id)
}

function createMiniFrogs(_numberOfFrogs){
    var i;
    var item = $(".row")
    for (i = 0; i < _numberOfFrogs; ++i) {
        var randomDna = {
            "headColor" : (Math.floor(Math.random()*89) +10), //range 10-100
            "mouthColor" : (Math.floor(Math.random()*89) +10),
            "eyesColor" : (Math.floor(Math.random()*89) +10),
            "freckleColor" : (Math.floor(Math.random()*89) +10), 
            //attributes
            "tongueShape" : String(Math.floor(Math.random()*4) +1), //range 1-4
            "eyeShape" : String(Math.floor(Math.random()*4) +1), //range 1-3
            "wartsShape" : String(Math.floor(Math.random()*4) +1), //range 1-3
            "wartColor" : (Math.floor(Math.random()*89) +10), 
            "animation" :  String(Math.floor(Math.random()*4) +1), 
            "lastNum" :  (Math.floor(Math.random()*10) +1) //range 1-3
            }
        createMiniFrog(i)
        renderMiniFrog(randomDna,i)
    }  
}