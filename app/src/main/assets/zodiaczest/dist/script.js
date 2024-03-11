// JavaScript (script.js)
const board = document.getElementById('board');
const cells = document.querySelectorAll('[data-cell]');
const currentStatus = document.getElementById('currentStatus');
const resetButton = document.getElementById('resetButton');
const gameEndOverlay = document.getElementById('gameEndOverlay');
const currentBeastStatusImg = document.getElementById('currentBeastImg');
const winningMessage = document.querySelector('[data-winning-message]');
const winningMessageText = document.querySelector('[data-winning-message] p');
const winningMessageImg = document.createElement('img');

// Add the audio elements
const cheerSound = document.getElementById('cheerSound');

// -- Game Variables --
let gameIsLive = true;
let oxTurn = true;
let winner = null;
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// -- Functions --
const setBoardHoverClass = () => {
  board.classList.remove('ox');
  board.classList.remove('dragon');

  if (oxTurn) {
    board.classList.add('ox');
  } else {
    board.classList.add('dragon');
  }
}

const placeBeastImg = (cell, currentBeast) => {
  cell.classList.add(currentBeast);
}

const swapTurns = () => {
  oxTurn = !oxTurn;
}

const updateCurrentStatus = () => {
  if (oxTurn) {
    currentBeastStatusImg.src = 'file:///android_asset/ox.png';
    currentBeastStatusImg.alt = 'ox';
  } else {
    currentBeastStatusImg.src = 'file:///android_asset/tiger.png';
    currentBeastStatusImg.alt = 'dragon';
  }
}

const checkWin = (currentBeast) => {
  return winningCombinations.some(combination => {
    return combination.every(i => {
      return cells[i].classList.contains(currentBeast);
    })
  });
}

const isDraw = () => {
  return [...cells].every(cell => {
    return cell.classList.contains('ox') || cell.classList.contains('dragon');
  })
}

const startGame = () => {
  cheerSound.pause();
  cheerSound.currentTime = 0;

  cells.forEach(cell => {
    winningMessageImg.remove();
    cell.classList.remove('ox');
    cell.classList.remove('dragon');
    cell.removeEventListener('click', handleCellClick);
    cell.addEventListener('click', handleCellClick, { once: true });
  });

  setBoardHoverClass();
  gameEndOverlay.classList.remove('show');
}

const endGame = (draw) => {
  if (draw) {
    winningMessageText.innerText = `draw!`;
  } else {
    winningMessageImg.src = oxTurn ? 'file:///android_asset/ox.png' : 'file:///android_asset/tiger.png';
    winningMessageImg.alt = oxTurn ? 'ox' : 'dragon';
    winningMessage.insertBefore(winningMessageImg, winningMessageText);
    winningMessageText.innerText = `wins!!!`;

    // Play the cheer sound
    cheerSound.play();
  }

  gameEndOverlay.classList.add('show');
}


const playClickSound = () => {
  const newClickSound = new Audio('file:///android_asset/click.wav'); // Replace with the path to your click sound file
  newClickSound.play();
}


const handleCellClick = (e) => {
  const cell = e.target;
  const currentBeast = oxTurn ? 'ox' : 'dragon';


  playClickSound();

  placeBeastImg(cell, currentBeast);
  if (checkWin(currentBeast)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    updateCurrentStatus();
    setBoardHoverClass();
  }
}


resetButton.addEventListener('click', startGame);


startGame();
