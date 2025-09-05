import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const filePath = path.join(__dirname, 'adatok.json')

const users = [
    { id: 1, name: 'Adam'}, {id: 2, name : 'Bianka'}, {id: 3, name: 'Cecil'},
]

try{
    fs.writeFileSync(filePath, JSON.stringify(users))
} catch (err) {
    console.log(err)
}
console.log(content)

const newdata = JSON.parse(content)
console.log(newdata)

function readFile() {
    try {
        const content = fs.readFileSync(filePath, 'utf8')
    } catch (err) {
        console.log(err)
    }
}

function writeFile(data) {
    try{
        fs.writeFileSync(filePath, JSON.stringify(data))
    } catch (err) {
        console.log(err)
    }
}
writeFile(users)
readFile();