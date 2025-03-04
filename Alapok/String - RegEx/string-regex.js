// Oldd meg az alábbi feladatokat!
// Hozz létre függvényeket, melyek visszatérési értéke a megoldás.
// A függvény bemeneti értéke a fenti text, a kimeneti érték a feladatban megadott feltétel szerinti tömb.
// Feladatok:

// numberLength2Or3 - Olyan számok, melyek 2 vagy 3 számjegyet tartalmaznak
// startsWithEven - Olyan számok, melyek páros számmal kezdődnek
// startsWithNumber - Olyan szavak, melyek számmal kezdődnek és betűvel végződnek
// capitalized - Olyan szabak, melyek nagybetűből állnak
// capitalizedLengthMin3 - Olyan szavak, melyek nagybetűvel kezdődnek és legalább 3 betűsek
// startsWithVowel - Olyan szavak, melyek magánhangzóval kezdődnek

let text = "Hello WORLD! Today is the 5th of June 2024 21th century. I've 15 apples, 123 oranges, and 4567 grapes.";
let regex, result;

console.log(text);

function numberLength2Or3(text){
    regex = /\b[0-9]{2,3}\b/g;
    result = text.match(regex);
    return result;
}

console.log(numberLength2Or3(text));

function startsWithEven(text){
    regex = /\b\b/g;
    result = text.match(regex);
    return result;
}
console.log(startsWithEven(text));