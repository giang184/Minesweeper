class GameBoard {
  constructor(rowNum, colNum, bombNum) {
    this.board = [[]];
    this.rowNum = rowNum;
    this.colNum = colNum;
    this.bombNum = bombNum;
    this.flagPlanted = 0;
    this.complete = false;
    this.numOfOpenCells = rowNum*colNum - bombNum;
    this.generateBoard();
  }

  generateBoard() {
    for (let i =0; i<this.bombNum; i++) {
      let row = Math.floor(Math.random()*this.rowNum);
      let col = Math.floor(Math.random()*this.colNum);
      this.board[row][col] = new Cell();
      this.board[row][col].isBomb = true; 
    }

  }
}

class Cell {
  constructor() {
    this.isBomb = false;
    this.hasFlag = false;
    this.hasQuestionMark = false;
    this.adjacentBombs = 0;
    this.isVisible = false;
  }
}

