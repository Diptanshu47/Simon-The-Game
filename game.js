var buttonColours=["red", "blue", "green", "yellow"]
var gamePattern=[];
var userClickedPattern =[];
var level=0;
var start = 0;

$(document).keypress(function(){
    if(start==0){
        $('h1').html('Level'+' ' +level)
        nextSequence();
        start++;
    }
})


$('.btn').click(function() {
    var userChosenColour = $(this).attr('id');
    playSound(userChosenColour);
    animatePress(userChosenColour);
    userClickedPattern.push(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});


function nextSequence(){
    userClickedPattern=[];
    level++;
    $('h1').html('Level'+' ' +level)
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}


function playSound(name){
    var audio = new Audio("sounds/"+ name +".mp3");
    audio.play();
}


function animatePress(currentColour){
    $('#'+currentColour).addClass('pressed');
    setTimeout(function(){
        $('#'+currentColour).removeClass('pressed');
    },150);
}

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if(userClickedPattern.length==gamePattern.length){
            setTimeout(function() {nextSequence();}, 1000);
        }
    }
    else{
        playSound('wrong');
        $('body').addClass('game-over');
        setTimeout(function(){
            $('body').removeClass('game-over');
        },200);
        $('h1').text('Game Over, Press Any Key to Restart');
        startOver();
    }
}

function startOver(){
    gamePattern=[];
    level=0;
    start = 0;    
}
