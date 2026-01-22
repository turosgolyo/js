const table = [
  [3, 7, 4],
  [5, 16, 11],
  [2, 9, 7],
];

const checkTable = (table) => {
  const a = table[0][0];
  const b = table[0][2];
  const c = table[2][0];
  const d = table[2][2];

  if (
    table[0][1] !== a + b ||
    table[1][0] !== a + c ||
    table[1][2] !== b + d ||
    table[2][1] !== c + d ||
    table[1][1] !== a + b + c + d
  ) {
    return [-1];
  } else {
    return [a, b, c, d];
  }
};

console.log(checkTable(table));
