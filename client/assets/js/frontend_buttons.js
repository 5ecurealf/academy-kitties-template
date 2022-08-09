$(document).ready(function(){
    $('.tabcontents:first').show();
    $('.tab_navigation li:first').addClass('active');

    $('.tab_navigation li').click(function(event){
        index = $(this).index();
        $('.tab_navigation li').removeClass('active');
        $(this).addClass('active');
        $('.tabcontents').hide();
        $('.tabcontents').eq(index).show()
    });

    $('.randomiseFrogButton').click(function(event){
        
        var randomDna = {
         "headColor" : (Math.floor(Math.random()*89) +10), //range 10-100
         "mouthColor" : (Math.floor(Math.random()*89) +10),
         "eyesColor" : (Math.floor(Math.random()*89) +10),
         "freckleColor" : (Math.floor(Math.random()*89) +10), 
         //attributes
         "tongueShape" : String(Math.floor(Math.random()*4) +1), //range 1-4
         "eyeShape" : String(Math.floor(Math.random()*3) +1), //range 1-3
         "wartsShape" : String(Math.floor(Math.random()*3) +1), //range 1-3
         "wartColor" : (Math.floor(Math.random()*89) +10), 
         "animation" :  String(Math.floor(Math.random()*3) +1), 
         "lastNum" :  (Math.floor(Math.random()*10) +1) //range 1-3
        }
        
        renderFrog(randomDna) 
   });

   $('.defaultFrogButton').click(function(event){
        renderFrog(defaultDNA) 
    });
    
    $('.createFrogButton').click(function(event){
        createFrog() 
    });

    $(".container").on('change', 'input:checkbox', function(){
        var bol = $("input:checkbox:checked").length >= 2;   
        $("input:checkbox").not(":checked").attr("disabled",bol);
     });


    // <------- Portfolio Page ------->

    // breed button
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

    // <------- MarketPlace Page ------->

    // buyfrog button
    $(".buyFrogButton").click(function(){
        var frogIndexes = [];
        var priceString
        $.each($("input:checkbox:checked"), function(){
            frogIndexes.push($(this).val());
            var strings = $('#price'+frogIndexes[0]+'').text()
            priceString = strings.split(" ")[1]
        });
        if(frogIndexes.length == 1){
            buyFrog(frogIndexes[0],priceString);
        }else{
            alert("Select a frog single to buy ");
        }
    });

    // <-------  HomePage  ------->

    // connect Metamask button
    $(".btn-connect").click(function(){
        console.log("button registered")
        connectWallet()
    });
    
    // <------- Other ------->
    // open Modal button Portfolio.setOffer Marketplace.removeOffer
    $("#myBtn").click(function(){
        modal.style.display = "block";    
    });



});     