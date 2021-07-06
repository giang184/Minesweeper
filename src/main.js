class GameBoard {

  constructor(rowNum, colNum, bombNum) {
    this.board = [];
    this.rowNum = rowNum;
    this.colNum = colNum;
    this.bombNum = bombNum;
    this.flagPlanted = 0;
    this.complete = false;
    this.numOfOpenCells = rowNum*colNum - bombNum;
    this.generateBoard();
  }

  generateBoard() {

    //this will create a board with dimension rowNum by colNum of default cells
    for (let r=0; r<this.rowNum; r++) {
      let temp = [];
      this.board.push(temp);
      for(let c=0; c<this.colNum; c++) {
        this.board[r].push(new Cell());
      }
    }
    //this will place bombs at random locations
    for (let i =0; i<this.bombNum; i++) {
      let row = Math.floor(Math.random()*this.rowNum);
      let col = Math.floor(Math.random()*this.colNum);
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


