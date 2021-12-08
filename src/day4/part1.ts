export { };

const actualInput = ``;

const testInput = `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7`;

type Board = number[][];

interface BoardType {
  board: Board,
  status: { rows: number[], columns: number[] }
};


const input = actualInput;
main();

function main() {
  const split = input.split('\n\n');
  const tirage = split[0].split(',').map(item => parseInt(item, 10));
  console.log(tirage);

  const boards: BoardType[] = split
    .slice(1)
    .map(boardStr => ({
      board: boardStr
        .split('\n')
        .map(boardRowStr =>
          boardRowStr
            .split(' ')
            .filter(str => str != '')
            .map(str => parseInt(str, 10))
        ),
      status: { rows: new Array<number>(5).fill(0), columns: new Array<number>(5).fill(0) },
    })
    );
  console.log(boards);
  console.log(boards[0].board);

  const { board, lastTirage } = processTirage(boards, tirage);

  console.log(board, lastTirage);

  const result = sum(board);

  console.log(`Result: ${result * lastTirage}`);
}

function processTirage(boards: BoardType[], tirage: number[]): { board: Board, lastTirage: number } {
  for (const tirageItem of tirage) {
    for (let b = 0; b < boards.length; b++) {
      console.debug(`Processing board ${b}`);

      const board = boards[b];
      for (let rowIndex = 0; rowIndex < 5; rowIndex++) {
        const row = board.board[rowIndex];
        const columnIndex = row.indexOf(tirageItem);

        if (columnIndex >= 0) {
          console.debug(`Board ${b} hit with ${tirageItem} at row: ${rowIndex}; column: ${columnIndex}`)
          // mark hit
          board.status.rows[rowIndex]++;
          board.status.columns[columnIndex]++;

          // mark number as -1 after hit
          row[columnIndex] = -1;

          if (board.status.rows[rowIndex] === 5) {
            console.log('BINGO ROW');
            return {
              board: board.board,
              lastTirage: tirageItem
            }
          }
          if (board.status.columns[columnIndex] === 5) {
            console.log('BINGO COLUMN');
            return {
              board: board.board,
              lastTirage: tirageItem
            }
          }
        }
      }
    }
  }
  throw Error('No Bingo')
}

function sum(board: Board): number {
  return board.reduce(
    (previous, boardRow) => previous + boardRow.reduce(
      (previousItem, item) => previousItem + Math.max(item, 0),
      0),
    0);
}