const test1 = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9
]

const test2 = [
  9, 8, 7, 6, 5, 4, 3, 2, 1, 0
]

const test3 = [1, 2]

const test4 = [2, 1]

const arr = test1;

let counter = 0;

for (let i = 0; i < arr.length - 3; i++) {
  const A = arr[i] + arr[i + 1] + arr[i + 2];
  const B = arr[i + 1] + arr[i + 2] + arr[i + 3];
  // console.log(A, B);
  if (B > A) {
    counter++;
  }
}

console.log(`Result: ${counter}`);
