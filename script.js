'use strict';

///DOM Element Selectors
const player0Selector = document.querySelector('.player--0');
const player1Selector = document.querySelector('.player--1');
const totalScore0PlayerSelector = document.getElementById('score--0');
const totalScore1PlayerSelector = document.getElementById('score--1');
const currentScore0PlayerSelector = document.getElementById('current--0');
const currentScore1PlayerSelector = document.getElementById('current--1');
const dicePictureSelector = document.querySelector('.dice');
const rollButtonSelector = document.querySelector('.btn--roll');
const newButtonSelector = document.querySelector('.btn--new');
const holdButtonSelector = document.querySelector('.btn--hold');


/// Variables for functions
let playerTotalScoresArray = [];
let currentScore;
let activePlayer;
let stillPlaying;

/////Functions

    // restart the game function//
const restartFunction = function() {
  playerTotalScoresArray = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  stillPlaying = true;

  totalScore0PlayerSelector.textContent = 0;
  totalScore1PlayerSelector.textContent = 0;
  currentScore0PlayerSelector.textContent = 0;
  currentScore1PlayerSelector.textContent = 0;

  dicePictureSelector.classList.add('hidden');
  player0Selector.classList.remove('player--winner');
  player1Selector.classList.remove('player--winner');
  player0Selector.classList.add('player--active');
  player1Selector.classList.remove('player--active');
}
restartFunction();

    //switch player function//
const switchPlayerFunction = function() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Selector.classList.toggle('player--active');
  player1Selector.classList.toggle('player--active');
}

    //rolling button function//
const rollButtonFunction = function() {
  if (stillPlaying) {
    const diceRandomNumber = Math.trunc(Math.random() * 6) + 1;
    dicePictureSelector.classList.remove('hidden');
    dicePictureSelector.src = `dice-${diceRandomNumber}.png`;

    if (diceRandomNumber !== 1) {
      currentScore += diceRandomNumber;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
      switchPlayerFunction();
    }
  }
}

    // hold button function//
const holdButtonFunction = function() {
  if (stillPlaying) {
    playerTotalScoresArray[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = playerTotalScoresArray[activePlayer];

    if (playerTotalScoresArray[activePlayer] >= 100) {
      stillPlaying = false;
      dicePictureSelector.classList.add('hidden');
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    } else {
      switchPlayerFunction();
    }
  }
}

    //new button function//
const newButtonFunction = function() {
  restartFunction();
}


///event listeners on buttons (function calls)
rollButtonSelector.addEventListener('click', rollButtonFunction);
holdButtonSelector.addEventListener('click', holdButtonFunction);
newButtonSelector.addEventListener('click', newButtonFunction);



