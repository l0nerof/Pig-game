'use strict';

const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnRestartEl = document.querySelector('.btn--new');
const btnRollEl = document.querySelector('.btn--roll');
const btnHoldEl = document.querySelector('.btn--hold');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

let currentScore = 0;
let activePlayer = 0;
let scores = [0, 0];
let playing = true;

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

btnRollEl.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHoldEl.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 20) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
    } else {
      switchPlayer();
    }
  }
});

btnRestartEl.addEventListener('click', function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  switchPlayer();
  scores = [0, 0];
  playing = true;
});
