const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");
const resetScoresBtn = document.getElementById("resetScores");

const xWinsText = document.getElementById("xWins");
const oWinsText = document.getElementById("oWins");
const drawsText = document.getElementById("draws");

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

let xWins = 0, oWins = 0, draws = 0;

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
resetScoresBtn.addEventListener("click", resetScores);

function cellClicked() {
  const index = this.getAttribute("data-index");

  if (board[index] !== "" || !gameActive) return;

  updateCell(this, index);
  checkWinner();
}

function updateCell(cell, index) {
  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add("taken");
}

function changePlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function checkWinner() {
  let roundWon = false;

  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      roundWon = true;
      highlightWinner(pattern);
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `🎉 Player ${currentPlayer} Wins! 🎉`;
    gameActive = false;
    updateScore(currentPlayer);
    return;
  }

  if (!board.includes("")) {
    statusText.textContent = "🤝 It's a Draw!";
    gameActive = false;
    draws++;
    drawsText.textContent = draws;
    return;
  }

  changePlayer();
}

function highlightWinner(pattern) {
  pattern.forEach(i => cells[i].classList.add("winner"));
}

function updateScore(player) {
  if (player === "X") {
    xWins++;
    xWinsText.textContent = xWins;
  } else {
    oWins++;
    oWinsText.textContent = oWins;
  }
}

function restartGame() {
  currentPlayer = "X";
  board = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("taken", "winner");
  });
}

function resetScores() {
  xWins = 0;
  oWins = 0;
  draws = 0;
  xWinsText.textContent = oWinsText.textContent = drawsText.textContent = 0;
  restartGame();
}
