var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var n = 1;

$(document).keydown(function(event) {
  if (n === 1) {
    nextSequence();
  }
  n++;
})


function nextSequence()

{
  userClickedPattern = [];

  var randomNumber = Math.random();
  randomNumber = randomNumber * 4;
  randomNumber = Math.floor(randomNumber);

  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).slideUp().delay(100).slideDown();
  playSound(randomChosenColour);

  level++;
  $("h1").text("Level " + level);
}

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length);
})

function checkAnswer(input) {}

  if (gamePattern[input - 1] === userClickedPattern[input - 1]) {
    if (input === gamePattern.length) {
      setTimeout(
        function() {
          nextSequence();
        }, 1000);
    }
  }

  else {
    var voice = new Audio("sounds/wrong.mp3");
    voice.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200)
    $("h1").text("Game Over , Press any key to restart");
    startOver();
  }
}

function startOver() {
  level = 0;
  n = 1;
  click = 1;
  gamePattern = [];
}

function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}


function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
