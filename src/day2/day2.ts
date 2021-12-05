const str = `real input here`;

const strTest = `forward 5
down 5
forward 8
up 3
down 8
forward 2`;

const inputStr = strTest

const input = inputStr.split('\n').map(elt => {
  const [what, size] = elt.split(' ');
  return {
    what, size: parseInt(size, 10)
  }
}
);

console.log(input.slice(0, 10));
console.log('...')
console.log(input.slice(input.length - 10, input.length));

const position = {
  horizontal: 0,
  depth: 0,
  aim: 0,
}

for (let i = 0; i < input.length; i++) {
  const { what, size } = input[i];

  switch (what) {
    case 'forward':
      position.horizontal = position.horizontal + size;
      position.depth = position.depth + position.aim * size;
      break;
    case 'up':
      position.aim = position.aim - size;
      break;
    case 'down':
      position.aim = position.aim + size;
      break;
    default:
      throw Error('unknown');
  }
}

console.log(position.horizontal, position.depth);
console.log(position.horizontal * position.depth)
