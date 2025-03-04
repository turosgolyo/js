// Feladat:
// Adottak az alábbi tömbök:
// const numbers = [2,13,3,7,17,5,11,19,9]
// const names = ['Eva', 'Adel', 'Cedric', 'Dior', 'Frank', 'Bob']
// const fruits = ['pineapple', 'kiwi', 'banana', 'pear', 'cherry']

// Hozd létre az alábbi függvényeket:
// sortByLength() - String tömböt a szavak hossza szerint rendezi és a rendezett tömböz adja vissza
// sortByLengthAsc() - String tömböt a szavak hossza szerint rendezi ABC sorrendbe és a rendezett tömböz adja vissza
// sortFrom15() - számokat rendez a 15-től való távolság alapján és a rendezett tömböt adja vissza
// addAsterisk() - String tömb mindegy elemének az elejére és végére egy csillagot tesz és visszaadja a módosított tömböt
// between5And15() - számokat tartalmazó tömb 5 és 15 közötti elemeit adja vissza egy tömbben
// isAllOdd() - számokat tartalmazó tömb minden eleme páratlan-e. Visszatérési érték true vagy false
// hasEven() - számokat tartalmazó tömb tartalmaz-e páros elemet. Visszatérési érték true vagy false
// sigma() -  számokat tartalmazó tömb elemeit összeszorozza és a szorzatot adja vissza 

// Tipp:
// localeCompare
// Math.abs

const numbers = [2,13,3,7,17,5,11,19,9];
const names = ['Eva', 'Adel', 'Cedric', 'Dior', 'Frank', 'Bob'];
const fruits = ['pineapple', 'kiwi', 'banana', 'pear', 'cherry'];

function sortByLength(words) {
    return words.sort((a, b) => a.length - b.length);
};

function sortByLengthAsc(words) {
    return words.sort();
};

function sortFrom15(numbers) {
    return numbers.sort((a, b) => a - b, 15);
};

function sortFrom15(arr) {
    return arr.sort((a, b) => Math.abs(a - 15) - Math.abs(b - 15));
  }
  
function addAsterisk(arr) {
    return arr.map(str => `*${str}*`);
  }
  
function between5And15(arr) {
    return arr.filter(num => num >= 5 && num <= 15);
  }
  
function isAllOdd(arr) {
    return arr.every(num => num % 2 !== 0);
  }
  

function hasEven(arr) {
    return arr.some(num => num % 2 === 0);
  }
  
function sigma(arr) {
    return arr.reduce((product, num) => product * num, 1);
  }
  