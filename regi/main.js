const szamok = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// ciklussal
const szures = [];

szamok.forEach((i) => {
    if (i % 2 == 0 && i < 5) {
        szures.push(i);
    }
});

console.log(szures);

// filter
const szures2 = szamok.filter((i) => i % 2 == 0 && i < 5);

console.log(szures2);
