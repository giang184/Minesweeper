import './styles/main.css';
import { GameBoard } from './lib/GameBoard';

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
