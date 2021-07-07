
export class GameBoard {
  constructor (rowNum, colNum, bombNum) {
    this.board = [];
    this.rowNum = rowNum;
    this.colNum = colNum;
    this.bombNum = bombNum;
    this.flagPlanted = 0;
    this.numOfNonBombCells = rowNum * colNum - bombNum;
    this.numofOpenCells = 0;
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

  getNeighbors (r, c) {
    const neighbors = [];

    if (r >= 1 && c - 1 >= 1 && r <= this.rowNum && c - 1 <= this.colNum) {
      neighbors.push([this.board[r][c - 1], r, c - 1]);
    }
    if (r >= 1 && c + 1 >= 1 && r <= this.rowNum && c + 1 <= this.colNum) {
      neighbors.push([this.board[r][c + 1], r, c + 1]);
    }
    if (r - 1 >= 1 && c >= 1 && r - 1 <= this.rowNum && c <= this.colNum) {
      neighbors.push([this.board[r - 1][c], r - 1, c]);
    }
    if (r + 1 >= 1 && c >= 1 && r + 1 <= this.rowNum && c <= this.colNum) {
      neighbors.push([this.board[r + 1][c], r + 1, c]);
    }
    if (r - 1 >= 1 && c - 1 >= 1 && r - 1 <= this.rowNum && c - 1 <= this.colNum) {
      neighbors.push([this.board[r - 1][c - 1], r - 1, c - 1]);
    }
    if (r + 1 >= 1 && c + 1 >= 1 && r + 1 <= this.rowNum && c + 1 <= this.colNum) {
      neighbors.push([this.board[r + 1][c + 1], r + 1, c + 1]);
    }
    if (r + 1 >= 1 && c - 1 >= 1 && r + 1 <= this.rowNum && c - 1 <= this.colNum) {
      neighbors.push([this.board[r + 1][c - 1], r + 1, c - 1]);
    }
    if (r - 1 >= 1 && c + 1 >= 1 && r - 1 <= this.rowNum && c + 1 <= this.colNum) {
      neighbors.push([this.board[r - 1][c + 1], r - 1, c + 1]);
    }
    return neighbors;
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
    const neighborCells = this.getNeighbors(r, c);

    neighborCells.forEach((element) => {
      if (element[0].isVisible === false) {
        element[0].isVisible = true;
        this.numofOpenCells++;
        if (element[0].adjacentBombs === 0) {
          this.clearing(element[1], element[2]);
        }
      }
    });
  }

  /*
  board = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, x, x, x, x, x, 0],
    [0, 2, 3, 3, 3, 2, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ]
  */

  checkCell (r, c) {
    if (this.board[r][c].isVisible === false && this.board[r][c].hasFlag === false) {
      this.checkWinGame();
      this.checkLoseGame();
      if (this.board[r][c].adjacentBombs === 0) {
        this.clearing(r, c);
      }
      this.board[r][c].isVisible = true;
      this.numofOpenCells++;
    }
  }

  markCell (r, c) {
    if (this.board[r][c].isVisible === false) {
      if (this.board[r][c].hasFlag === true) {
        this.board[r][c].hasFlag = false;
        this.board[r][c].hasQuestionMark = true;
      } else if (this.board[r][c].hasQuestionMark === true) {
        this.board[r][c].hasQuestionMark = false;
      } else {
        this.board[r][c].hasFlag = true;
      }
    }
  }

  checkWinGame () {
    if (this.numOfNonBombCells === this.numofOpenCells) {
      alert('you win!');
    }
  }

  checkLoseGame (r, c) {
    if (this.board[r][c].isBomb === true) {
      alert('you lose!');
    }
  }
}

export class Cell {
  constructor () {
    this.isBomb = false;
    this.hasFlag = false;
    this.hasQuestionMark = false;
    this.adjacentBombs = 0;
    this.isVisible = false;
  }
}
