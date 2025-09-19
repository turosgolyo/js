const emberek = [
    { nev: 'a', kor: 18 },
    { nev: 'b', kor: 32 },
    { nev: 'c', kor: 18 },
];

emberek.filter((i) => i.kor <= 20).forEach((i) => console.log(i.nev));

const keres = emberek.find((i) => i.kor === 18);
console.log(keres.nev);
