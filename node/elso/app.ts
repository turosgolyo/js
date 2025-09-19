type Szemely = {
    nev: string;
    kor: number;
    magassag?: number;
};
/*
const ember: Szemely = {
    nev: 'Bela',
    kor: 25,
};
const ember2: Szemely = {
    nev: 'Bela',
    kor: 40,
};
*/

const emberek: Array<Szemely> = [
    { nev: 'valaki', kor: 25, magassag: 170 },
    { nev: 'valaki', kor: 25 },
];

const fuggveny = (a: Szemely, b: Szemely): number => a.kor + b.kor;
