import './styles/main.css';
import $ from 'jquery';
import { GameBoard } from './lib/GameBoard';

const renderStats = (game) => {
  const elStatsFlagsPlanted = $('#output-flags-planted');
  const elStatsOpenCells = $('#output-open-cells');
  elStatsFlagsPlanted.text(game.flagPlanted);
  elStatsOpenCells.text(game.numofOpenCells);
};

const renderBoard = (game) => {
  const elBoard = $('#game-board');
  elBoard.css('gridTemplateColumns', `repeat(${game.colNum}, var(--cell-size))`);

  elBoard.html('');

  for (let r = 1; r <= game.rowNum; r++) {
    for (let c = 1; c <= game.colNum; c++) {
      const cell = game.board[r][c];
      // ternary operator : condition ? valueIfTrue : valueIfFalse
      // const cellContent = cell.isBomb ? '.' : cell.adjacentBombs;

      if (cell.isVisible) {
        let cellContent = '';
        if (cell.isBomb) {
          cellContent = '.';
        } else {
          cellContent = cell.adjacentBombs;
        }
        elBoard.append(`
          <div class="cell" data-row="${r}" data-col="${c}">
            ${cellContent}
          </div>`
        );
      } else if (cell.hasFlag) {
        elBoard.append(`
        <div class="cell" data-row="${r}" data-col="${c}">
          f
        </div>`);
      } else if (cell.hasQuestionMark) {
        elBoard.append(`
      <div class="cell" data-row="${r}" data-col="${c}">
          ?
      </div>`);
      } else {
        elBoard.append(`
          <div class="cell" data-row="${r}" data-col="${c}">
            
          </div>`
        );
      }
    }
  }
};

const addEventListeners = (game) => {
  const elCells = $('.cell');

  elCells.on('click', function (event) {
    const el = $(this);
    const row = el.data('row');
    const col = el.data('col');

    game.checkCell(row, col);

    renderBoard(game);
    renderStats(game);
    addEventListeners(game);
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
  const game = new GameBoard(5, 7, 1);
  console.log(game);

  renderBoard(game);
  renderStats(game);
  addEventListeners(game);
};

main();

// do not show cells right away
// handle when user left clicks
// handle when user right clicks
// redraw board on changes
// show stats
// open cells
// flags planted

// have easy/medium/hard mode
