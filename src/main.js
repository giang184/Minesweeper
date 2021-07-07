import './styles/main.css';

class GameBoard {
  constructor (rowNum, colNum, bombNum) {
    this.board = [];
    this.rowNum = rowNum;
    this.colNum = colNum;
    this.bombNum = bombNum;
    this.flagPlanted = 0;
    this.complete = false;
    this.numOfOpenCells = rowNum * colNum - bombNum;
    this.generateBoard();
  }

  generateBoard () {
    // this will create a board with dimension rowNum by colNum of default cells
    for (let r = 0; r < this.rowNum + 2; r++) {
      const temp = [];
      this.board.push(temp);
      for (let c = 0; c < this.colNum + 2; c++) {
        this.board[r].push(new Cell());
      }
    }

    // this will place bombs at random locations
    for (let i = 1; i <= this.bombNum; i++) {
      const row = 1 + Math.floor(Math.random() * this.rowNum);
      const col = 1 + Math.floor(Math.random() * this.colNum);
      if (this.board[row][col].isBomb === true) {
        i--;
      } else {
        this.board[row][col].isBomb = true;
      }
    }

    this.bombDetector();
  }

  bombDetector () {
    for (let r = 1; r <= this.rowNum; r++) {
      for (let c = 1; c <= this.colNum; c++) {
        if (this.board[r][c].isBomb === true) {
          this.board[r][c - 1].adjacentBombs++;
          this.board[r][c + 1].adjacentBombs++;
          this.board[r - 1][c].adjacentBombs++;
          this.board[r + 1][c].adjacentBombs++;
          this.board[r - 1][c - 1].adjacentBombs++;
          this.board[r + 1][c + 1].adjacentBombs++;
          this.board[r + 1][c - 1].adjacentBombs++;
          this.board[r - 1][c + 1].adjacentBombs++;
        }
      }
    }
  }

  clearing (r, c) {
    this.board[r][c + 1].isVisible = true;
    this.board[r - 1][c].isVisible = true;
    this.board[r + 1][c].isVisible = true;
    this.board[r][c - 1].isVisible = true;
    this.board[r - 1][c - 1].isVisible = true;
    this.board[r + 1][c + 1].isVisible = true;
    this.board[r + 1][c - 1].isVisible = true;
    this.board[r - 1][c + 1].isVisible = true;
    if (this.board[r][c + 1].adjacentBombs === 0) {
      this.clearing(r, c + 1);
    }
    if (this.board[r - 1][c].adjacentBombs === 0) {
      this.clearing(r - 1, c);
    }
    if (this.board[r + 1][c].adjacentBombs === 0) {
      this.clearing(r + 1, c);
    }
    if (this.board[r][c - 1].adjacentBombs === 0) {
      this.clearing(r, c - 1);
    }
    if ([r - 1][c - 1].adjacentBombs === 0) {
      this.clearing(r - 1, c - 1);
    }
    if ([r + 1][c + 1].adjacentBombs === 0) {
      this.clearing(r + 1, c + 1);
    }
    if ([r + 1][c - 1].adjacentBombs === 0) {
      this.clearing(r + 1, c - 1);
    }
    if ([r - 1][c + 1].adjacentBombs === 0) {
      this.clearing(r - 1, c + 1);
    }
  }

  checkCell (r, c) {
    if (this.board[r][c].isVisible === false && this.board[r][c].hasFlag === false) {
      this.checkWinGame();
      this.checkLoseGame();
      if (this.board[r][c].adjacentBombs === 0) {
        this.clearing(r, c);
      }
      this.board[r][c].isVisible = true;
    }
  }
}

class Cell {
  constructor () {
    this.isBomb = false;
    this.hasFlag = false;
    this.hasQuestionMark = false;
    this.adjacentBombs = 0;
    this.isVisible = false;
  }
}

const game = new GameBoard(5, 7, 10);
console.log(game);

const elBoard = document.querySelector('#game-board');
elBoard.style.gridTemplateColumns = `repeat(${game.colNum}, var(--cell-size))`;

for (let r = 1; r <= game.rowNum; r++) {
  for (let c = 1; c <= game.colNum; c++) {
    const cell = game.board[r][c];
    // ternary operator : condition ? valueIfTrue : valueIfFalse
    // const cellContent = cell.isBomb ? '.' : cell.adjacentBombs;

    let cellContent = '';
    if (cell.isBomb) {
      cellContent = '.';
    } else {
      cellContent = cell.adjacentBombs;
    }

    elBoard.innerHTML += `<div class="cell">${cellContent}</div>`;
  }
}
