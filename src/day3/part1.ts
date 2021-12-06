export { };

const inputDay3Actual = ``;

const inputDay3Test = `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`;


const noBits = 12;
const inputDay3 = inputDay3Actual;

// split => O(n)
const binaries = inputDay3.split('\n');
// map => O(~n) (split + parse x 5)
const binariesInArr = binaries.map(b => b.split('').map(c => parseInt(c, 10)));

const total = new Array(noBits).fill(0);

// iterate => O(~n)
for (let i = 0; i < binariesInArr.length; i++) {
  const binary = binariesInArr[i];
  for (let j = 0; j < noBits; j++) {
    total[j] = total[j] + binary[j];
  }
}

console.log(total);

const threshold = Math.ceil(binariesInArr.length / 2);

console.log(`Threshold: ${threshold}`);


const { gammaStr, epsilonStr } = total.reduce(({ gammaStr, epsilonStr }, current) => {
  const gammaBit = current >= threshold ? '1' : '0';
  const epsilonBit = current >= threshold ? '0' : '1';
  return {
    gammaStr: `${gammaStr}${gammaBit}`,
    epsilonStr: `${epsilonStr}${epsilonBit}`,
  };
}, { gammaStr: '', epsilonStr: '' });

const gamma = parseInt(gammaStr, 2);
const epsilon = parseInt(epsilonStr, 2);
// considered using ~ but numbers are stored as signed integers

console.log(`Gamma: ${gamma}`);
console.log(`Epsilon: ${epsilon}`);
console.log(`Result: ${gamma * epsilon}`)