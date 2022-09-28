var buttonColors = ["red", "blue", "yellow", "green"];
var gamePattern = [];
var userPattern = [];
var gameOn = false;
var gameLevel = 0


function nextSequence(){
    var randomNumber = Math.floor(Math.random() * 4);
    var chosenColor = buttonColors[randomNumber];
    gamePattern.push(chosenColor);
    $("#" + chosenColor).fadeOut(90).fadeIn(90);
    playSound(chosenColor);
    
    $("#level-title").text("Level " + gameLevel)
    gameLevel ++;
}


function playSound(name){
    var sound = new Audio("sounds/" + name + ".mp3");
    sound.play();
}


function pressAnimate(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function (){
        $("#" + currentColor).removeClass("pressed");
    }, 80);
}


function checkAnswer(){
    var lastAnswerIndex = userPattern.length - 1;
    if (userPattern[lastAnswerIndex] === gamePattern[lastAnswerIndex]){
        if (userPattern.length === gamePattern.length){
            console.log("Level Cleared");
            setTimeout(nextSequence, 1000);
            userPattern = []
        }
    } else {
        var wrongSound = new Audio("sounds/wrong.mp3");

        wrongSound.play();

        $("body").addClass("game-over");
        setTimeout(function (){
            $("body").removeClass("game-over");
        }, 250);
        $("#level-title").text("Game Over. Press Any key to restart the game.")
        gameOn = false
    }
}


function startOver() {
    gameLevel = 0
    gamePattern = []
    userPattern = []
}


$(document).keypress(function (){
    if (!gameOn) {
        startOver()
        nextSequence();
        $("#level-title").text("Level 1");
        gameOn = true;
    }
})


$(".btn").click(function (){
    var userColor = this.id;

    userPattern.push(userColor);
    playSound(userColor);
    pressAnimate(userColor);
    checkAnswer()
})