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
        
        renderCat(randomDna) 
   });

   $('.defaultFrogButton').click(function(event){
        renderCat(defaultDNA) 
    });
    
    $('.createFrogButton').click(function(event){
        createFrog() 
    });

    $(".container").on('change', 'input:checkbox', function(){
        var bol = $("input:checkbox:checked").length >= 2;   
        $("input:checkbox").not(":checked").attr("disabled",bol);
     });
});     