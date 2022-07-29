var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern=[];

var userClickedPAttern=[];

var started=false;

var level=0;

$(document).keypress(function() {
    if(!started){
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
});

$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPAttern.push(userChosenColour);
  playsound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPAttern.length-1);
});

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] == userClickedPAttern[currentLevel]){
    console.log("success");
    if(userClickedPAttern.length == gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }else{
    console.log("wrong");
    playsound("wrong");
    $("body").addClass("game-over");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function nextSequence(){
  userClickedPAttern=[];

  level++;
  $("#level-title").text("Level " + level);

  var randomNumber= Math.floor(Math.random()*4);
  var randomChosenColour=buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  var audio = new Audio("sounds/"+randomChosenColour+".mp3");
  audio.play();

  playsound(randomChosenColour);
}

function playsound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#"+ currentColour).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function startOver(){
  level=0;
  gamePattern=[];
  started=false;
}
