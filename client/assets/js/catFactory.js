
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

//This function code needs to modified so that it works with Your cat code.
function headColor(color,code) {
    $('.frog__head').css('background', '#' + color)  //This changes the color of the frog's 
    $('#headcode').html('code: '+code) //This updates text of the badge next to the slider
    $('#dnahead').html(code) //This updates the head color part of the DNA that is displayed below the frog
}

function mouthColor(color,code) {
    $('.frog__mouth').css('background', '#' + color) //This changes the color of the frog's mouth
    $('#mouthcode').html('code: '+code) //This updates text of the badge next to the slider
    $('#dnamouth').html(code) //This updates the body color part of the DNA that is displayed below the frog
}

function eyesColor(color,code) {
    $('.frog__eye,.frog__eyelid').css('background', '#' + color)  //This changes the color of the frog's eyes
    $('#eyecode').html('code: '+code) //This updates text of the badge next to the slider
    $('#dnaeyes').html(code) //This updates the body color part of the DNA that is displayed below the frog
}

function frecklesColor(color,code) {
    $('.frog__freckle').css('background', '#' + color)  //This changes the color of the frog's eyes
    $('#frecklecode').html('code: '+code) //This updates text of the badge next to the slider
    $('#dnafreckles').html(code) //This updates the body color part of the DNA that is displayed below the frog
}

function wartColor(color,code) {
    console.log(color)
    $('.frog__wart').css('background', '#' + color)  //This changes the color of the frog's eyes
    $('#wartsCode').html('code: '+code) //This updates text of the badge next to the slider
    $('#dnawartsColor').html(code) //This updates the body color part of the DNA that is displayed below the frog
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

function animationSelection(num) {
    $('#dnaanimation').html(num)
    switch (num) {
        case "1":
            $('#animationName').html('None') //set the badge
            resetAnimation()
            break        
        case "2":
            $('#animationName').html('Eyes') //set the badge
            eyeAnimation()
            break
        case "3":
            $('#animationName').html('Tongue') //set the badge
            tongueAnimation()
            break
    }
}

async function eyeAnimation() {
    resetAnimation()
    $(".frog__eyelid").addClass("blink")
}

async function tongueAnimation() {
    resetAnimation()
    $(".tongue").addClass("lick")
}

async function resetAnimation() {
    $(".tongue").removeClass("lick")
    $(".frog__eyelid").removeClass("blink")
}

async function normalTongue() {
    await $('.tongue').css('height', '0%')
    await $('.tongue').css('width', '47%')

}

async function smallTongue() {
    await $('.tongue').css('height', '70%')
}

async function fatTongue() {
    await $('.tongue').css('height', '70%')
    await $('.tongue').css('width', '80%')
}

async function longTongue() {
    await $('.tongue').css('height', '150%')
    
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

async function smallEyes() {
    await $('.frog__eye').css('height', '50px')
    await $('.frog__eye').css('width', '50px')
    await $('.frog__eye').css('left', '76px')
    await $('.iris').css('height', '45px')
    await $('.iris').css('width', '45px')
}

async function hugeEyes() {
    await $('.iris').css('height', '95px')
    await $('.iris').css('width', '95px')
    await $('.frog__eye').css('left', '51px')
    await $('.frog__eye').css('height', '100px')
    await $('.frog__eye').css('width', '100px')
}

async function noWarts() {
    await $('.frog__wart').css('height', '0px')
    await $('.frog__wart').css('width', '10px')
    await $('#wart1').css('top','12px')
}

async function smallWarts() {
    await $('.frog__wart').css('height', '10px')
    await $('.frog__wart').css('width', '10px')
}

async function largeWarts() {
    await $('.frog__wart').css('height', '20px')
    await $('.frog__wart').css('width', '20px')
    await $('#wart1').css('top','21px')
}
