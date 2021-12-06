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


main();

function main() {
  const inputDay3 = inputDay3Actual;
  const binaries = inputDay3.split('\n');

  const oxygenGenRating = getOxygenGenRating(binaries, 0);
  const ogrDecimal = parseInt(oxygenGenRating, 2);
  console.log(`Oxygen Generator Rating: ${oxygenGenRating}; ${ogrDecimal}`);

  const co2ScrubberRating = getCO2ScrubberRating(binaries, 0);
  const co2Decimal = parseInt(co2ScrubberRating, 2);
  console.log(`CO2 Scrubber Rate: ${co2ScrubberRating}; ${co2Decimal}`);

  console.log(`Life support rating: ${ogrDecimal * co2Decimal}`)
}


function getOxygenGenRating(binaries: string[], useCharAt: number): string {
  if (binaries.length === 1) {
    return binaries[0];
  }
  const { zeros, ones } = separate(binaries, useCharAt);

  if (ones.length >= zeros.length) {
    return getOxygenGenRating(ones, useCharAt + 1);
  } else {
    return getOxygenGenRating(zeros, useCharAt + 1);
  }
}

function getCO2ScrubberRating(binaries: string[], useCharAt: number): string {
  if (binaries.length === 1) {
    return binaries[0];
  }
  const { zeros, ones } = separate(binaries, useCharAt);

  if (zeros.length <= ones.length) {
    return getCO2ScrubberRating(zeros, useCharAt + 1);
  } else {
    return getCO2ScrubberRating(ones, useCharAt + 1);
  }
}

function separate(binaries: string[], useCharAt: number): { zeros: string[], ones: string[] } {
  const zeros = [];
  const ones = [];

  for (let binary of binaries) {
    if (binary[useCharAt] === '0') {
      zeros.push(binary)
    } else {
      ones.push(binary);
    }
  }
  // console.log(zeros);
  // console.log(ones);
  return {
    zeros,
    ones,
  }
}

