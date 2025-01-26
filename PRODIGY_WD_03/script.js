const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartButton = document.getElementById('restart');
const gameModeSelect = document.getElementById('game-mode');

let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;
let gameMode = 'player'; // default is player vs player

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleCellClick(event) {
  const cell = event.target;
  const cellIndex = cell.getAttribute('data-index');

  if (gameState[cellIndex] !== '' || !isGameActive) {
    return;
  }

  gameState[cellIndex] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add('taken');

  checkWinner();
  
  if (gameMode === 'ai' && isGameActive && currentPlayer === 'X') {
    setTimeout(aiMove, 500); // AI makes a move after a small delay
  }
}

function aiMove() {
  let availableCells = gameState.map((value, index) => value === '' ? index : null).filter(index => index !== null);
  let randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];

  gameState[randomIndex] = 'O';
  cells[randomIndex].textContent = 'O';
  cells[randomIndex].classList.add('taken');
  
  checkWinner();
}

function checkWinner() {
  let roundWon = false;

  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    isGameActive = false;
    return;
  }

  if (!gameState.includes('')) {
    statusText.textContent = 'Draw!';
    isGameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function restartGame() {
  gameState = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  isGameActive = true;
  statusText.textContent = `Player ${currentPlayer}'s turn`;

  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('taken');
  });
}

function handleGameModeChange() {
  gameMode = gameModeSelect.value;
  restartGame();
}

gameModeSelect.addEventListener('change', handleGameModeChange);
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);

statusText.textContent = `Player ${currentPlayer}'s turn`;
