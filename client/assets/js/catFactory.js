
//Random color
function getColor() {
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return randomColor
}

function genColors(){
    var colors = []
    for(var i = 10; i < 99; i ++){
      var color = getColor()
      colors[i] = color
    }
    return colors
}

//This function code needs to modified so that it works with Your frog code.
function headColor(color,code) {
    $('.frog__head').css('background', '#' + color)  //This changes the color of the frog's 
    $('#headcode').html('code: '+code) //This updates text of the badge next to the slider
    $('#dnahead').html(code) //This updates the head color part of the DNA that is displayed below the frog
}
function miniHeadColor(color,code,id) {
    $('.frog__head.miniFrog'+id).css('background', '#' + color)  //This changes the color of the frog's 
    $('.miniFrog'+id+'#dnahead').html(code) //This updates the head color part of the DNA that is displayed below the frog
}

function mouthColor(color,code) {
    $('.frog__mouth').css('background', '#' + color) //This changes the color of the frog's mouth
    $('#mouthcode').html('code: '+code) //This updates text of the badge next to the slider
    $('#dnamouth').html(code) //This updates the body color part of the DNA that is displayed below the frog
}

function miniMouthColor(color,code,id) {
    $('.frog__mouth.miniFrog'+id).css('background', '#' + color) //This changes the color of the frog's mouth
    $('.miniFrog'+id+'#dnamouth').html(code) //This updates the body color part of the DNA that is displayed below the frog
}

function eyesColor(color,code) {
    $('.frog__eye,.frog__eyelid').css('background', '#' + color)  //This changes the color of the frog's eyes
    $('#eyecode').html('code: '+code) //This updates text of the badge next to the slider
    $('#dnaeyes').html(code) //This updates the body color part of the DNA that is displayed below the frog
}

function miniEyesColor(color,code,id) {
    $('.frog__eye.miniFrog'+id+',.frog__eyelid.miniFrog'+id).css('background', '#' + color)  //This changes the color of the frog's eyes
    $('.miniFrog'+id+'#dnaeyes').html(code) //This updates the body color part of the DNA that is displayed below the frog
}

function frecklesColor(color,code) {
    $('.frog__freckle').css('background', '#' + color)  //This changes the color of the frog's eyes
    $('#frecklecode').html('code: '+code) //This updates text of the badge next to the slider
    $('#dnafreckles').html(code) //This updates the body color part of the DNA that is displayed below the frog
}

function miniFrecklesColor(color,code,id) {
    $('.frog__freckle.miniFrog'+id).css('background', '#' + color)  //This changes the color of the frog's eyes
    $('.miniFrog'+id+'#dnafreckles').html(code) //This updates the body color part of the DNA that is displayed below the frog
}

function wartColor(color,code) {
    // console.log(color)
    $('.frog__wart').css('background', '#' + color)  //This changes the color of the frog's eyes
    $('#wartsCode').html('code: '+code) //This updates text of the badge next to the slider
    $('#dnawartsColor').html(code) //This updates the body color part of the DNA that is displayed below the frog
}
function miniWartColor(color,code,id) {
    $('.frog__wart.miniFrog'+id).css('background', '#' + color)  //This changes the color of the frog's eyes
    $('.miniFrog'+id+'#dnawartsColor').html(code) //This updates the body color part of the DNA that is displayed below the frog
}

//###################################################
//Functions below will be used later on in the project
//###################################################
function tongueVariation(num) {

    $('#dnatongue').html(num)
    switch (num) {
        case "1":
            normalTongue()
            $('#tongueName').html('None') //tongue shape label 
            break;
        case "2":
            normalTongue() //function call to reset the eyes 
            $('#tongueName').html('Small') //eye shape label 
            smallTongue()
            break;
        case "3":
            normalTongue() //function call to reset the eyes 
            $('#tongueName').html('Fat') //eye shape label 
            fatTongue()
            break;        
        case "4":
            normalTongue() //function call to reset the eyes 
            $('#tongueName').html('Long') //eye shape label 
            longTongue()
            break;  
    }
}

function miniTongueVariation(num,id) {

    $('.miniFrog'+id+'#dnatongue').html(num)
    switch (num) {
        case "1":
            miniNormalTongue(id)
            break;
        case "2":
            miniNormalTongue(id) //function call to reset the eyes 
            miniSmallTongue(id)
            break;
        case "3":
            miniNormalTongue(id) //function call to reset the eyes 
            miniFatTongue(id)
            break;        
        case "4":
            miniNormalTongue(id) //function call to reset the eyes 
            miniLongTongue(id)
            break;  
    }
}

function eyeVariation(num) {

    $('#dnaeyeShape').html(num)
    switch (num) {
        case "1":
            normalEyes()
            $('#eyeShapeName').html('Small') //eye shape label 
            smallEyes()
            break;
        case "2":
            normalEyes()
            $('#eyeShapeName').html('Normal') //eye shape label 
            break;
        case "3":
            $('#eyeShapeName').html('Huge') //eye shape label 
            hugeEyes()
            break;

    }
}

function miniEyeVariation(num,id) {

    $('.miniFrog'+id+'#dnaeyeShape').html(num)
    switch (num) {
        case "1":
            miniNormalEyes(id)
            miniSmallEyes(id)
            break;
        case "2":
            miniNormalEyes(id)
            break;
        case "3":
            miniHugeEyes(id)
            break;

    }
}
function wartVariation(num) {
    $('#dnawartShape').html(num)
    switch (num) {
        case "1":
            $('#wartsShapeName').html('None') //set the badge
            noWarts()
            break        
        case "2":
            $('#wartsShapeName').html('Small') //set the badge
            noWarts()
            smallWarts()
            break
        case "3":
            $('#wartsShapeName').html('Large') //set the badge
            noWarts()
            largeWarts()
            break
    }
}

function miniWartVariation(num,id) {
    $('.miniFrog'+id+'#dnawartShape').html(num)
    switch (num) {
        case "1":
            miniNoWarts(id)
            break        
        case "2":
            miniNoWarts(id)
            miniSmallWarts(id)
            break
        case "3":
            miniNoWarts(id)
            miniLargeWarts(id)
            break
    }
}

function animationSelection(num,id) {
    $('#dnaanimation.miniFrog'+id).html(num)
    switch (num) {
        case "1":
            miniResetAnimation(id)
            break        
        case "2":
            miniEyeAnimation(id)
            break
        case "3":
            miniTongueAnimation(id)
            break
    }
}

async function eyeAnimation() {
    resetAnimation()
    $(".frog__eyelid").addClass("blink")
}

async function miniEyeAnimation(id) {
    miniResetAnimation(id)
    $(".frog__eyelid.miniFrog"+id).addClass("blink")
}

async function tongueAnimation() {
    resetAnimation()
    $(".tongue").addClass("lick")
}
async function miniTongueAnimation(id) {
    miniResetAnimation(id)
    $(".tongue.miniFrog"+id).addClass("lick")
}

async function resetAnimation() {
    $(".tongue").removeClass("lick")
    $(".frog__eyelid").removeClass("blink")
}

async function miniResetAnimation(id) {
    $(".tongue.miniFrog"+id).removeClass("lick")
    $(".frog__eyelid.miniFrog"+id).removeClass("blink")
}

async function normalTongue() {
    await $('.tongue').css('height', '0%')
    await $('.tongue').css('width', '47%')
}

async function miniNormalTongue(id) {
    await $('.tongue.miniFrog'+id).css('height', '0%')
    await $('.tongue.miniFrog'+id).css('width', '47%')
}

async function smallTongue() {
    await $('.tongue').css('height', '70%')
}

async function miniSmallTongue(id) {
    await $('.tongue.miniFrog'+id).css('height', '70%')
}

async function fatTongue() {
    await $('.tongue').css('height', '70%')
    await $('.tongue').css('width', '80%')
}

async function miniFatTongue(id) {
    await $('.tongue.miniFrog'+id).css('height', '70%')
    await $('.tongue.miniFrog'+id).css('width', '80%')
}

async function longTongue() {
    await $('.tongue').css('height', '150%')
}

async function miniLongTongue(id) {
    await $('.tongue.miniFrog'+id).css('height', '150%')
}

async function normaldecoration() {
    //Remove all style from other decorations
    //In this way we can also use normalDecoration() to reset the decoration style
    $('.cat__head-dots').css({ "transform": "rotate(0deg)", "height": "48px", "width": "14px", "top": "1px", "border-radius": "0 0 50% 50%" })
    $('.cat__head-dots_first').css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
    $('.cat__head-dots_second').css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "0 50% 50% 50%" })
}

async function normalEyes() {
    await $('.frog__eye').css('height', '80px')
    await $('.frog__eye').css('width', '80px')
    await $('.frog__eye').css('left', '64px')
    await $('.iris').css('height', '75px')
    await $('.iris').css('width', '75px')
}

async function miniNormalEyes(id) {
    await $('.frog__eye.miniFrog'+id).css('height', '80px')
    await $('.frog__eye.miniFrog'+id).css('width', '80px')
    await $('.frog__eye.miniFrog'+id).css('left', '64px')
    await $('.iris.miniFrog'+id).css('height', '75px')
    await $('.iris.miniFrog'+id).css('width', '75px')
}

async function smallEyes() {
    await $('.frog__eye').css('height', '50px')
    await $('.frog__eye').css('width', '50px')
    await $('.frog__eye').css('left', '76px')
    await $('.iris').css('height', '45px')
    await $('.iris').css('width', '45px')
}

async function miniSmallEyes(id) {
    await $('.frog__eye.miniFrog'+id).css('height', '50px')
    await $('.frog__eye.miniFrog'+id).css('width', '50px')
    await $('.frog__eye.miniFrog'+id).css('left', '76px')
    await $('.iris.miniFrog'+id).css('height', '45px')
    await $('.iris.miniFrog'+id).css('width', '45px')
}

async function hugeEyes() {
    await $('.iris').css('height', '95px')
    await $('.iris').css('width', '95px')
    await $('.frog__eye').css('left', '51px')
    await $('.frog__eye').css('height', '100px')
    await $('.frog__eye').css('width', '100px')
}

async function miniHugeEyes(id) {
    await $('.iris.miniFrog'+id).css('height', '95px')
    await $('.iris.miniFrog'+id).css('width', '95px')
    await $('.frog__eye.miniFrog'+id).css('left', '51px')
    await $('.frog__eye.miniFrog'+id).css('height', '100px')
    await $('.frog__eye.miniFrog'+id).css('width', '100px')
}

async function noWarts() {
    await $('.frog__wart').css('height', '0px')
    await $('.frog__wart').css('width', '10px')
    await $('#wart1').css('top','12px')
}

async function miniNoWarts(id) {
    await $('.frog__wart.miniFrog'+id).css('height', '0px')
    await $('.frog__wart.miniFrog'+id).css('width', '10px')
    await $('#wart1.miniFrog'+id).css('top','12px')
}
async function smallWarts() {
    await $('.frog__wart').css('height', '10px')
    await $('.frog__wart').css('width', '10px')
}

async function miniSmallWarts(id) {
    await $('.frog__wart.miniFrog'+id).css('height', '10px')
    await $('.frog__wart.miniFrog'+id).css('width', '10px')
}

async function largeWarts() {
    await $('.frog__wart').css('height', '20px')
    await $('.frog__wart').css('width', '20px')
    await $('#wart1').css('top','21px')
}

async function miniLargeWarts(id) {
    await $('.frog__wart.miniFrog'+id).css('height', '20px')
    await $('.frog__wart.miniFrog'+id).css('width', '20px')
    await $('#wart1.miniFrog'+id).css('top','21px')
}