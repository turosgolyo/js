import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, 'dobasok.txt');

function readFile(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        console.log(content)
        return content;
    } catch (err) {
        console.log(err);
    };
};
const dobasok = readFile(filePath).replace(" ", "").split(',');
let hely = 0;

for(let i = 0; i < dobasok.length; i++){
    hely += parseInt(dobasok[i]);
    if(hely % 10 !== 0){
        hely -= 3;
        console.log('Visszalépett 3 helyet! Jelenlegi helye: ', hely)
    }
    else{
        console.log('Előrelépett ', parseint(dobasok[i]), 'helyet!')
    }
};