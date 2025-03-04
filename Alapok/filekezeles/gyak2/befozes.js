import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const filePath = path.join(__dirname, 'uvegek.txt')

function readFile(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8')
        return content
    } catch (err) {
        console.log('A hiba oka: ', err)
    }
}

const uvegek = readFile(filePath).split(',').map(u => parseInt(u.replace(/\s/g, ''), 10));
console.log(uvegek)

let lekvarMennyiseg = 75;

let maxUveg = Math.max(...uvegek);
let maxUvegIndex = uvegek.indexOf(maxUveg) + 1;
console.log('A legnagyobb üveg: ', maxUveg, 'dl és ', maxUvegIndex, '. a sorban.');

let osszUvegKapacitas = uvegek.reduce((a, b) => a + b, 0);

if (osszUvegKapacitas >= lekvarMennyiseg) {
    console.log("4. feladat\nElegendő üveg volt.");
} else {
    console.log("4. feladat\nMaradt lekvár.");
}