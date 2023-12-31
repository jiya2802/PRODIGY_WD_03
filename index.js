const startButtons = document.getElementById('start-buttons');
const board = document.getElementById('board');
let currentPlayer = 'X';
let gameOver = false;
let isHumanVsAI = false;
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let home=document.querySelector(".home")

function resetGame(){
   home.style.display='flex';
   msgContainer.classList.add("hide");
   board.innerHTML = '';
    currentPlayer = 'X';
    gameOver = false;
}

function makeMove(cell) {
    if (!gameOver && cell.textContent === '') {
        cell.textContent = currentPlayer;
        if (checkWinner()) {
            // alert(`${currentPlayer} wins!`);
            gameOver = true;
        } else if (isBoardFull()) {
            alert('It\'s a tie!');
            gameOver = true;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            if (isHumanVsAI && currentPlayer === 'O') {
                makeAIMove();
            }
        }
    }
}

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
  };

function startGame(vsAI) {
      isHumanVsAI = vsAI;
      startButtons.style.display = 'none';
      board.style.display = 'grid';
      for (let i = 0; i < 9; i++) {
          const cell = document.createElement('div');
          cell.className = 'cell';
          cell.id = i;
          cell.addEventListener('click', () => makeMove(cell));
          board.appendChild(cell);
      }
  }

  function checkWinner() {
      const lines = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6]
      ];

      for (const line of lines) {
          const [a, b, c] = line;
          if (document.getElementById(a).textContent &&
              document.getElementById(a).textContent === document.getElementById(b).textContent &&
              document.getElementById(a).textContent === document.getElementById(c).textContent) {
                showWinner(document.getElementById(a).textContent);
              return true;
          }
      }

      return false;
  }

  function isBoardFull() {
      return Array.from(board.children).every(cell => cell.textContent !== '');
  }
  function makeAIMove() {
      const emptyCells = Array.from(board.children).filter(cell => cell.textContent === '');
      if (emptyCells.length > 0 && !gameOver) {
          const randomIndex = Math.floor(Math.random() * emptyCells.length);
          const cell = emptyCells[randomIndex];
          makeMove(cell);
      }
  }

newGameBtn.addEventListener("click", resetGame)

