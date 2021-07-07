import { Cell, GameBoard } from '../../src/lib/GameBoard';

describe('class GameBoard', () => {
  describe('method bombDetector()', () => {
    it('should correctly count adjacent bombs', () => {
      const game = new GameBoard(3, 3, 3);
      game.board = [
        [new Cell(), new Cell(), new Cell(), new Cell(), new Cell()],
        [new Cell(), new Cell(), new Cell(), new Cell(), new Cell()],
        [new Cell(), new Cell(), new Cell(), new Cell(), new Cell()],
        [new Cell(), new Cell(), new Cell(), new Cell(), new Cell()],
        [new Cell(), new Cell(), new Cell(), new Cell(), new Cell()]
      ];

      game.board[1][1].isBomb = true;
      game.board[2][1].isBomb = true;
      game.board[2][3].isBomb = true;

      game.bombDetector();

      expect(game.board[1][1].adjacentBombs).toEqual(1);
      expect(game.board[1][2].adjacentBombs).toEqual(3);
      expect(game.board[1][3].adjacentBombs).toEqual(1);
      expect(game.board[2][1].adjacentBombs).toEqual(1);
      expect(game.board[2][2].adjacentBombs).toEqual(3);
      expect(game.board[2][3].adjacentBombs).toEqual(0);
      expect(game.board[3][1].adjacentBombs).toEqual(1);
      expect(game.board[3][2].adjacentBombs).toEqual(2);
      expect(game.board[3][3].adjacentBombs).toEqual(1);
    });
  });

  describe('method clearing()', () => {
    it('should set the correct rows to visible', () => {
      const game = new GameBoard(3, 3, 1);

      game.board = [
        [new Cell(), new Cell(), new Cell(), new Cell(), new Cell()],
        [new Cell(), new Cell(), new Cell(), new Cell(), new Cell()],
        [new Cell(), new Cell(), new Cell(), new Cell(), new Cell()],
        [new Cell(), new Cell(), new Cell(), new Cell(), new Cell()],
        [new Cell(), new Cell(), new Cell(), new Cell(), new Cell()]
      ];

      game.board[1][1].isBomb = true;
      game.board[1][2].isBomb = true;
      game.board[1][3].isBomb = true;
      game.board[2][1].adjacentBombs = 2;
      game.board[2][2].adjacentBombs = 3;
      game.board[2][3].adjacentBombs = 2;

      game.clearing(3, 1);

      expect(game.board[2][1].isVisible).toEqual(true);
      expect(game.board[2][2].isVisible).toEqual(true);
      expect(game.board[2][3].isVisible).toEqual(true);
      expect(game.board[3][1].isVisible).toEqual(true);
      expect(game.board[3][2].isVisible).toEqual(true);
      expect(game.board[3][3].isVisible).toEqual(true);
    });

    it('should not set rows visible past cells with mines next to them', () => {
      const game = new GameBoard(3, 3, 1);

      game.board = [
        [new Cell(), new Cell(), new Cell(), new Cell(), new Cell()],
        [new Cell(), new Cell(), new Cell(), new Cell(), new Cell()],
        [new Cell(), new Cell(), new Cell(), new Cell(), new Cell()],
        [new Cell(), new Cell(), new Cell(), new Cell(), new Cell()],
        [new Cell(), new Cell(), new Cell(), new Cell(), new Cell()]
      ];

      game.board[1][1].isBomb = true;
      game.board[1][2].isBomb = true;
      game.board[1][3].isBomb = true;
      game.board[2][1].adjacentBombs = 2;
      game.board[2][2].adjacentBombs = 3;
      game.board[2][3].adjacentBombs = 2;

      game.clearing(3, 1);

      expect(game.board[1][1].isVisible).toEqual(false);
      expect(game.board[1][2].isVisible).toEqual(false);
      expect(game.board[1][3].isVisible).toEqual(false);
    });
  });
});
