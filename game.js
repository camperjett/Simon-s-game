
let buttonColors = ["red", "blue", "green", "yellow"];

// Stores the Game pattern
let gamePattern = [];
// Stores the user clicks' pattern
let userClickedPattern =[];
// level
let level = 0;
//  Maintains whether game has begun
let started = false;

function nextSequence(){

  level++;

  // Change title text
  $("#level-title").text("Level " + level );

  //  Create next step in gamePattern
  let randomNumber = Math.floor(Math.random() * 4);
  let randomColor = buttonColors[randomNumber];
  gamePattern.push(randomColor);

  //  Now show it to user
  showAnimation(randomColor);

}
// For game's Pattern animation
function showAnimation(lastAddedColor){
  playSound(lastAddedColor);
  $("#" + lastAddedColor).fadeOut(50).fadeIn(50);

}
// For user clicks' animation
function animateClick(clickedButtonId){

  playSound(clickedButtonId);
  $("#" + clickedButtonId).addClass("pressed");
  setTimeout(function(){
    $("#" + clickedButtonId).removeClass("pressed")
  }, 100);

}
// Plays sound
function playSound(name){
  let buttonSound = new Audio("sounds/" + name + ".mp3");
  buttonSound.play();
}
//  Game Over
function gameOver(){

  let gameOverAudio = new Audio("sounds/wrong.mp3");
  gameOverAudio.play();
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  }, 200);
  $("#level-title").text("Game Over, Press Any Key to Restart");
  $(document).keydown(startOver());
}

function startOver(){
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;
}

//  Game begins here
$(document).keydown(function(){
  if(!started){
    // Change title text
    
    setTimeout(function(){
      nextSequence();
      started = true;
    }, 100);

  }


});

//  Records clicks individually
$(".btn").click(function(){

  let lastClickedButton = $(this).attr("id");

  userClickedPattern.push(lastClickedButton);
  animateClick(lastClickedButton);

  let correspondingPatternButton = gamePattern[userClickedPattern.length - 1];

  //  checkAnswer
  if(lastClickedButton !== correspondingPatternButton){
    gameOver();
  }

  else if(gamePattern.length === userClickedPattern.length){

    //  We go to next level

    userClickedPattern = [];
    setTimeout(function(){
      nextSequence();
    }, 1000);

  }

});
