/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;

init();

var previousDice;

//lets select stuff the way we do it in css
//SETTER
//document.querySelector("#current-" + activePlayer).textContent = dice;
/* document.querySelector("#current-" + activePlayer).innerHTML =
  "<em>" + dice + "</em>";

//READER
//GETTER
var x = document.querySelector("#score-0").textContent;
console.log(x); */

document.querySelector(".btn-roll").addEventListener("click", function() {
  if (gamePlaying) {
    //1. Random number
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;

    //2. Display the result
    document.getElementById("dice-1").style.display = "block";
    document.getElementById("dice-2").style.display = "block";
    document.getElementById("dice-1").src = "dice-" + dice1 + ".png";
    document.getElementById("dice-2").src = "dice-" + dice2 + ".png";

    //console.log(dice, previousDice);
    //3. Update the round score IF the rolled number was NOT a 1
    /*  if (dice === 6 && previousDice === 6) {
      //Player looses score
      scores[activePlayer] = 0;
      document.querySelector("#score-" + activePlayer).textContent = 0;
      nextPlayer();
    } else if (dice !== 1) {
      //Add score
      roundScore += dice;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else {
      //Next player
      nextPlayer();
    }
    previousDice = dice; */

    if (dice1 === 6 && dice2 === 6) {
      //Player looses score
      scores[activePlayer] = 0;
      document.querySelector("#score-" + activePlayer).textContent = 0;
      nextPlayer();
    } else if (dice1 !== 1 && dice2 !== 1) {
      //Add score
      roundScore += dice1 + dice2;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else {
      //Next player
      nextPlayer();
    }
  }
});

document.querySelector(".btn-hold").addEventListener("click", function() {
  if (gamePlaying) {
    // 1. Add current score to global score
    scores[activePlayer] += roundScore;
    // 2. Update UI
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];

    var input = document.querySelector(".scoreGoal").value;
    var scoreGoal;

    //Undefined, 0, null or "" are COERCED to false
    //Anything else is COERCED to true

    if (input) {
      scoreGoal = input;
    } else {
      scoreGoal = 100;
    }

    // 3. Check if player won the game
    if (scores[activePlayer] >= scoreGoal) {
      document.querySelector("#name-" + activePlayer).textContent = "Winner!";
      document.getElementById("dice-1").style.display = "none";
      document.getElementById("dice-2").style.display = "none";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      gamePlaying = false;
    } else {
      // 4. Next player
      nextPlayer();
    }
  }
});

function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  // ADD, REMOVE, TOGGLE

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  //document.querySelector('.player-0-panel').classList.remove('active');
  //document.querySelector('.player-1-panel').classList.add('active');

  document.getElementById("dice-1").style.display = "none";
  document.getElementById("dice-2").style.display = "none";
}

document.querySelector(".btn-new").addEventListener("click", init); //calling init function without () because that would call it inmediately

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;

  gamePlaying = true;

  document.getElementById("dice-1").style.display = "none";
  document.getElementById("dice-2").style.display = "none";

  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";

  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");

  document.querySelector(".player-0-panel").classList.add("active");
}
