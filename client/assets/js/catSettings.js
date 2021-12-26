
var colors = Object.values(allColors())

var defaultDNA = {
    "headColor" : 10,
    "mouthColor" : 13,
    "eyesColor" : 96,
    "freckleColor" : 10,
    //attributes
    "tongueShape" : "2",
    "eyeShape" : "2",
    "wartsShape" : "1",
    "wartColor" : 13,
    "animation" :  "2",
    "lastNum" :  1
    }

// when page load
$( document ).ready(function() {
  $('#dnahead').html(defaultDNA.headColor);
  $('#dnamouth').html(defaultDNA.mouthColor);
  $('#dnaeyes').html(defaultDNA.eyesColor);
  $('#dnafreckles').html(defaultDNA.freckleColor);
    
  $('#dnatongue').html(defaultDNA.tongueShape)
  $('#dnaeyeShape').html(defaultDNA.eyeShape)
  $('#dnawartShape').html(defaultDNA.wartsShape)
  $('#dnawartsColor').html(defaultDNA.wartColor)
  $('#dnaanimation').html(defaultDNA.animation)
  $('#dnaspecial').html(defaultDNA.lastNum)

  renderCat(defaultDNA)
});

function getDna(){
    var dna = ''
    dna += $('#dnahead').html()
    dna += $('#dnamouth').html()
    dna += $('#dnaeyes').html()
    dna += $('#dnafreckles').html()
    dna += $('#dnatongue').html()
    dna += $('#dnaeyeShape').html()
    dna += $('#dnawartsShape').html()
    dna += $('#dnawartsColor').html()
    dna += $('#dnaanimation').html()
    dna += $('#dnaspecial').html()

    return parseInt(dna)
}

function renderCat(dna){
    headColor(colors[dna.headColor],dna.headColor) //setting headColor default
    $('#headcolor').val(dna.headColor) //setting slider's default 

    mouthColor(colors[dna.mouthColor],dna.mouthColor)
    $('#mouthcolor').val(dna.mouthColor)

    eyesColor(colors[dna.eyesColor],dna.eyesColor)
    $('#eyecolor').val(dna.eyesColor)

    frecklesColor(colors[dna.freckleColor],dna.freckleColor)
    $('#frecklecolor').val(dna.freckleColor)

    tongueVariation(dna.tongueShape)
    $('#tongueShape').val(dna.tongueShape)
    
    eyeVariation(dna.eyeShape)
    $('#eyeShape').val(dna.eyeShape)

    wartVariation(dna.wartsShape)
    $('#wartShape').val(dna.wartsShape)

    wartColor(colors[dna.wartColor],dna.wartColor)
    $('#wartColor').val(dna.wartColor)

    animationSelection(dna.animation)
    $('#animationType').val(dna.animation)
}

// Changing frog colors
$('#headcolor').change(()=>{
    var colorVal = $('#headcolor').val()
    headColor(colors[colorVal],colorVal)
})

$('#mouthcolor').change(()=>{
  var colorVal = $('#mouthcolor').val()
  mouthColor(colors[colorVal],colorVal)
})

$('#eyecolor').change(()=>{
  var colorVal = $('#eyecolor').val()
  eyesColor(colors[colorVal],colorVal)
})

$('#frecklecolor').change(()=>{
  var colorVal = $('#frecklecolor').val()
  frecklesColor(colors[colorVal],colorVal)
})

$('#tongueShape').change(()=>{
  var shapeVal = $('#tongueShape').val()
  tongueVariation(shapeVal)
})

$('#eyeShape').change(()=>{
  var shapeVal = $('#eyeShape').val()
  eyeVariation(shapeVal)
})

$('#wartShape').change(()=>{
  var shapeVal = $('#wartShape').val()
  wartVariation(shapeVal)
})

$('#wartColor').change(()=>{
  var colorVal = $('#wartColor').val()
  wartColor(colors[colorVal],colorVal)
})

$('#animationType').change(()=>{
  var animationtypeVal = $('#animationType').val()
  animationSelection(animationtypeVal)
})
