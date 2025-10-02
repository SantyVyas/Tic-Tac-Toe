const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

cells.forEach(cell => cell.addEventListener("click", cellClicked));
restartBtn.addEventListener("click", restartGame);

function cellClicked() {
  const index = this.getAttribute("data-index");

  if (board[index] !== "" || !gameActive) return;

  updateCell(this, index);
  checkWinner();
}

function updateCell(cell, index) {
  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
}

function changePlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
  let roundWon = false;

  for (let i = 0; i < winPatterns.length; i++) {
    const [a, b, c] = winPatterns[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `Player ${currentPlayer} Wins! 🎉`;
    gameActive = false;
    return;
  }

  if (!board.includes("")) {
    statusText.textContent = "It's a Draw! 🤝";
    gameActive = false;
    return;
  }

  changePlayer();
}

function restartGame() {
  currentPlayer = "X";
  board = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  cells.forEach(cell => (cell.textContent = ""));
}
