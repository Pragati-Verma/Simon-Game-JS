//alert("Hello");
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];
var level = 0;
var started = false;

$(document).keydown(function(event){
    //calls nextSequence only first time the button is pressed
    if (!started) {
        $("#level-title").text("Level 0");
        nextSequence();
        started = true;
    }
})

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    //console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    //after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence
    checkAnswer(userClickedPattern.length-1);
})

function playSound(name) {
    var audio = new Audio('sounds/' + name + '.mp3');
    audio.play();
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed")
    } ,100);
}

function checkAnswer(currentLevel){
    //if the most recent user answer is the same as the game pattern
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        //console.log("success");
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else {
        //console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(function(){
            $("body").removeClass("game-over")
        },200);
        
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}