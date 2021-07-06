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
    for (let r=0; r<this.rowNum + 2; r++) {
      let temp = [];
      this.board.push(temp);
      for(let c=0; c<this.colNum + 2; c++) { 
        this.board[r].push(new Cell());
      }
    }

    //this will place bombs at random locations
    for (let i =1; i<this.bombNum+1; i++) {
      let row = 1 + Math.floor(Math.random()*this.rowNum);
      let col = 1 + Math.floor(Math.random()*this.colNum);
      if(this.board[row][col].isBomb === true) {
        i--; 
      }
      else {
        this.board[row][col].isBomb = true;
      }
    }
    
    this.bombDetector();
  }
  bombDetector() {
    for(let r=1; r<=this.rowNum; r++) {
      for(let c=1; c<=this.colNum; c++) {
        if(this.board[r][c].isBomb === true) {
          this.board[r][c-1].adjacentBombs++; //done
          this.board[r][c+1].adjacentBombs++; //done
          this.board[r-1][c].adjacentBombs++; //done
          this.board[r+1][c].adjacentBombs++; //done
          this.board[r-1][c-1].adjacentBombs++; //done
          this.board[r+1][c+1].adjacentBombs++; //done
          this.board[r+1][c-1].adjacentBombs++; //done
          this.board[r-1][c+1].adjacentBombs++; //done
        }
      }
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