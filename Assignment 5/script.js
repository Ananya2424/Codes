// script.js
document.addEventListener('DOMContentLoaded', function() {
  const board = document.getElementById('board');
  const status = document.getElementById('status');

  let currentPlayer = 'X';
  let gameBoard = ['', '', '', '', '', '', '', '', ''];
  let gameActive = true;

  function renderBoard() {
    board.innerHTML = '';
    for (let i = 0; i < gameBoard.length; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.index = i;
      cell.textContent = gameBoard[i];
      cell.addEventListener('click', handleCellClick);

      board.appendChild(cell);
    }
  }

  function handleCellClick(event) {
    const index = event.target.dataset.index;

    if (gameBoard[index] === '' && gameActive) {
      gameBoard[index] = currentPlayer;
      renderBoard();
      checkWinner();
      togglePlayer();
    }
  }

  function togglePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `Player ${currentPlayer}'s turn`;
  }

  function checkWinner() {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
        gameActive = false;
        status.textContent = `Player ${currentPlayer} wins!`;
        highlightWinningCells(pattern);
        return;
      }
    }

    if (!gameBoard.includes('')) {
      gameActive = false;
      status.textContent = 'It\'s a tie!';
    }
  }

  function highlightWinningCells(pattern) {
    for (const index of pattern) {
      const cell = board.children[index];
      cell.style.backgroundColor = '#2ecc71';
      cell.style.color = '#fff';
    }
  }

  renderBoard();
});
