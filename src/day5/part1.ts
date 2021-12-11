export { };

const actualInput = ``;

const testInput = `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`;

type Coordinate = {
  x: number;
  y: number;
}

type Line = {
  from: Coordinate;
  to: Coordinate;
}

main()

function main() {
  const input = actualInput;
  const lines = parseInput(input);
  console.log(lines);

  const dangerousPointsTotal = calculateDangerousPoints(lines);
  console.log(`Result: ${dangerousPointsTotal}`);
}

function parseInput(input: string): Line[] {
  console.log(input)
  console.log(input.split('\n'))
  const lines = input
    .split('\n')
    .map(row => row
      .split(' -> ')
      .map(linePoint => linePoint.split(',')))
    .map(line => ({
      from: { x: parseInt(line[0][0]), y: parseInt(line[0][1]) },
      to: { x: parseInt(line[1][0]), y: parseInt(line[1][1]) }
    }));
  return lines;
}

function calculateDangerousPoints(lines: Line[]) {
  const points: Record<string, number> = {};
  let dangerousPoints = 0;

  for (const { from, to } of lines) {
    if (from.x === to.x) {
      console.log('vertical line', from, to)
      // vertical line
      const x = from.x;
      const minY = Math.min(from.y, to.y);
      const maxY = Math.max(from.y, to.y);

      for (let y = minY; y <= maxY; y++) {
        const key = `${x},${y}`;
        points[key] = points[key] ? points[key] + 1 : 1;
        if (points[key] === 2) {
          dangerousPoints++;
        }
      }
    }
    else if (from.y === to.y) {
      console.log('horizontal line', from, to)
      // horizontal line
      const y = from.y;
      const minX = Math.min(from.x, to.x);
      const maxX = Math.max(from.x, to.x);

      for (let x = minX; x <= maxX; x++) {
        const key = `${x},${y}`;
        points[key] = points[key] ? points[key] + 1 : 1;
        if (points[key] === 2) {
          dangerousPoints++;
        }
      }
    }
  }

  return dangerousPoints;
}
