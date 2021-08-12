import 'regenerator-runtime';
import './styles/main.css';
import $ from 'jquery';
import { GameBoard } from './lib/GameBoard';

const renderStats = (game) => {
  const elStatsFlagsPlanted = $('#output-flags-planted');
  const elStatsBombsLeft = $('#output-bombs-left');
  const elStatsCellsLeft = $('#output-cells-left');

  elStatsFlagsPlanted.text(game.flagPlanted);
  elStatsBombsLeft.text(game.bombNum - game.flagPlanted);
  elStatsCellsLeft.text(game.numOfNonBombCells);
};

const renderBoard = (game) => {
  console.log('current board state', game.board);
  const elBoard = $('#game-board');
  elBoard.css('gridTemplateColumns', `repeat(${game.colNum}, var(--cell-size))`);

  elBoard.html('');

  for (let r = 1; r <= game.rowNum; r++) {
    for (let c = 1; c <= game.colNum; c++) {
      const cell = game.board[r][c];
      // ternary operator : condition ? valueIfTrue : valueIfFalse
      // const cellContent = cell.isBomb ? '.' : cell.adjacentBombs;

      let cellContent = '';
      if (cell.isVisible && cell.isBomb) {
        cellContent = '<img src="assets/bomb.svg">';
      } else if (cell.hasFlag) {
        cellContent = '<img src="assets/flag.svg">';
      } else if (cell.hasQuestionMark) {
        cellContent = '<img src="assets/question.svg">';
      } else if (cell.isVisible) {
        if (cell.adjacentBombs === 0) {
          cellContent = '<img src="assets/0.PNG">';
        } else if (cell.adjacentBombs === 1) {
          cellContent = '<img src="assets/1.PNG">';
        } else if (cell.adjacentBombs === 2) {
          cellContent = '<img src="assets/2.PNG">';
        } else if (cell.adjacentBombs === 3) {
          cellContent = '<img src="assets/3.PNG">';
        } else if (cell.adjacentBombs === 4) {
          cellContent = '<img src="assets/4.PNG">';
        } else if (cell.adjacentBombs === 5) {
          cellContent = '<img src="assets/5.PNG">';
        } else if (cell.adjacentBombs === 6) {
          cellContent = '<img src="assets/6.PNG">';
        } else if (cell.adjacentBombs === 7) {
          cellContent = '<img src="assets/7.PNG">';
        } else {
          cellContent = '<img src="assets/8.PNG">';
        }
      }

      elBoard.append(`
        <div class="cell" data-row="${r}" data-col="${c}">
          ${cellContent}
        </div>
      `);
    }
  }
};

const addEventListeners = (game) => {
  const elCells = $('.cell');
  const eldifficulty = $('#difficulty');
  eldifficulty.on('change', function (event) {
    const choice = $('#difficulty').val();
    if (choice === 'easy') {
      game = new GameBoard(9, 9, 10);
    } else if (choice === 'medium') {
      game = new GameBoard(16, 16, 40);
    } else if (choice === 'expert') {
      game = new GameBoard(16, 30, 99);
    }

    renderBoard(game);
    renderStats(game);
    addEventListeners(game);
  });

  elCells.on('click', async function (event) {
    const el = $(this);
    const row = el.data('row');
    const col = el.data('col');

    game.checkCell(row, col);

    renderBoard(game);
    renderStats(game);
    addEventListeners(game);

    if (game.state !== 'playing') {
      await new Promise(resolve => {
        setTimeout(resolve, 100);
      });

      if (game.state === 'won') {
        alert('You have won!');
      } else {
        alert('You have lost!');
      }

      game.initialize();
      renderBoard(game);
      renderStats(game);
      addEventListeners(game);
    }
  });

  elCells.on('contextmenu', function (event) {
    event.preventDefault();
    const el = $(this);
    const row = el.data('row');
    const col = el.data('col');

    game.markCell(row, col);

    renderBoard(game);
    renderStats(game);
    addEventListeners(game);
  });
};

const main = () => {
  const game = new GameBoard(16, 16, 40);

  renderBoard(game);
  renderStats(game);
  addEventListeners(game);
};

main();
console.log('hi');
